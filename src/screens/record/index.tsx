import React, {forwardRef, ReactElement, RefObject} from 'react';
import {
  Alert,
  View,
  ScrollView,
  Platform,
  AppState,
  NativeEventSubscription,
  Linking,
} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';
import fs from 'react-native-fs';
import moment, {Moment} from 'moment';
import KeepAwake from 'react-native-keep-awake';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import ImageCropPicker, {PickerErrorCode} from 'react-native-image-crop-picker';
import {
  faCloudArrowUp,
  faFileArrowUp,
  faHome,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons';
import {
  deleteRecordingConfirmation,
  recordingStoppedPrompt,
  recordingTimeoutPrompt,
} from './helpers';
import {faRedo} from '@fortawesome/pro-regular-svg-icons';
import {FFmpegKitConfig, FFprobeKit} from 'ffmpeg-kit-react-native';

import Footer from './components/footer';
import RecordButton, {RecordingState} from './components/record-button';
import {Container} from 'components';
import styles from './styles';
import {
  dismissConfirmationModal,
  showConfirmationModal,
  VideoTimeConfig,
} from 'utils';
import {MainStackParam} from 'navigators/StackParams';
import ModalService, {ModalType} from 'components/modal/ModalService';
import {setCharity, TrackStatus, trackVideoStatus} from 'network/OpinerApi';
import {trackRecordedQuestion} from 'utils/LocalStorage';
import {dismissDelegate} from 'components/unfinished-upload/useUnfinishedCheck';
import {saveVideo} from 'screens/upload/utils';
import {reportToRaygun} from 'utils/Raygun';
import ThemedButton from 'components/themed-button';
import {ResponsePreview} from './preview';
import {deviceWidth, rs} from 'utils/ResponsiveScreen';
import {handleSubmit} from './preview/utils';
import RecordPermissionPrompt from './components/permission/RecordPermissionPrompt';
import Spinner from 'components/spinner/Spinner';
import {resetTo} from 'NavigationService';
import Toast from 'utils/Toast';

interface Props {
  navigation: NavigationProp<MainStackParam>;
  route: RouteProp<MainStackParam, 'RECORD_VIDEO_SCREEN'>;
}

export const getVideoPath = (questionId: number, part: number = 0): string =>
  fs.CachesDirectoryPath +
  `/recording-${questionId}-${part}.` +
  (Platform.OS === 'ios' ? 'mov' : 'mp4');

interface State {
  isFirst: boolean;
  expirationTime: Moment | null;
  recording: RecordingState;
  isModalVisible: boolean;
  countdown: number;
  videoUri: string | null;
  camPermission?: CameraPermissionStatus;
  audioPermission?: CameraPermissionStatus;
  loading: boolean;
}

const initialState: State = {
  isFirst: true,
  expirationTime: null,
  recording: 'initial',
  isModalVisible: false,
  videoUri: null,
  countdown: -1,
  loading: true,
};

const _CameraView = ({}, ref: any) => {
  const devices = useCameraDevices();
  if (!devices.front) {
    return null;
  }
  const formats = devices.front.formats.sort(
    (a, b) => a.videoWidth - b.videoWidth,
  );
  const format = formats.find(f => f.videoWidth > 300);

  return (
    <Camera
      ref={ref}
      device={devices.front}
      style={styles.captureView}
      video
      isActive
      videoStabilizationMode="cinematic-extended"
      audio
      orientation="portrait"
      format={format}
    />
  );
};

const CameraView = forwardRef(_CameraView);

class VideoRecordScreen extends React.Component<Props, State> {
  readonly state: State = initialState;
  readonly camera: RefObject<Camera> = React.createRef();
  wasCancelled: boolean = false;
  invoked: boolean = false;
  appChangeListener: NativeEventSubscription | undefined;

  confirmCharity = () => {
    try {
      const {
        donationId,
        question: {currentResponse},
      } = this.props.route.params;
      if (donationId !== undefined && currentResponse) {
        setCharity({
          responseId: currentResponse.id,
          charityId: donationId,
        });
      }
    } catch (error) {
      reportToRaygun(error as Error, 'confirmCharity');
    }
  };

  handleUpload = () => {
    if (!this.state.videoUri) {
      return;
    }
    const {
      route: {
        params: {question},
      },
    } = this.props;
    trackVideoStatus({
      questionId: question.id,
      description: 'Upload button pressed',
      fileSize: '-1',
      status: TrackStatus.Information,
    });
    fs.unlink(this.state.videoUri).catch(() => {});
    handleSubmit(question, getVideoPath(question.id));
  };

  deleteExistingVideo = async () => {
    const {
      route: {
        params: {question},
      },
    } = this.props;
    try {
      const path = getVideoPath(question.id);
      if (!path) {
        return;
      }
      const exists = await fs.exists(path);
      if (!exists) {
        return;
      }
      FFmpegKitConfig.disableLogs();
      FFprobeKit.getMediaInformation(path).then(session => {
        const info = session.getMediaInformation().getAllProperties();
        trackVideoStatus({
          questionId: question.id,
          description: 'Delete and redo button pressed',
          fileSize: (Number(info?.size || 0) / 1000000).toFixed(2),
          status: TrackStatus.Information,
          previousResponseDuration: parseFloat(info?.duration || '0'),
        }).catch(e => {
          reportToRaygun(e, 'Delete and redo - handleDeleteAndRedo');
        });
      });
      await fs.unlink(path);
    } catch (err) {
      reportToRaygun(err, 'Unlinking video path - componentDidMount');
    }
  };

  componentWillUnmount() {
    this.handleCancel();
    this.appChangeListener?.remove();
  }

  checkRecordPermissions = async () => {
    this.setState({loading: true});
    try {
      const [camPermission, audioPermission] = await Promise.all([
        Camera.getCameraPermissionStatus(),
        Camera.getMicrophonePermissionStatus(),
      ]);
      if (camPermission !== 'authorized' || audioPermission !== 'authorized') {
        // Both
        showConfirmationModal({
          title: 'Let Opiner access your camera and microphone?',
          description:
            'We need access to your camera and microphone to record your response videos.',
          onConfirm: async () => {
            dismissConfirmationModal();
            const camStatus = await Camera.requestCameraPermission();
            const audioStatus = await Camera.requestMicrophonePermission();
            dismissConfirmationModal();
            this.setState({
              camPermission: camStatus,
              audioPermission: audioStatus,
              loading: false,
            });
          },
          onCancel: () => {
            this.setState({
              camPermission,
              audioPermission,
              loading: false,
            });
            dismissConfirmationModal();
          },
        });
      } else {
        this.setState({
          camPermission,
          audioPermission,
          loading: false,
        });
      }
    } catch {
      this.setState({loading: false});
    }
  };

  async componentDidMount() {
    KeepAwake.activate();
    this.confirmCharity();
    trackRecordedQuestion(null);
    this.deleteExistingVideo();
    dismissDelegate.handle();

    // Check if user has all permissions
    await this.checkRecordPermissions();

    // Check on each app resume
    this.appChangeListener = AppState.addEventListener('change', state => {
      if (state === 'active') {
        this.checkRecordPermissions();
      }
    });
  }

  handleTimeout = (): void => {
    ModalService.setModalContent({
      type: ModalType.PromptModal,
      content: recordingTimeoutPrompt,
    });
    this.handlePausePressed('timeout');
    const {
      route: {
        params: {question},
      },
    } = this.props;
    trackVideoStatus({
      questionId: question.id,
      description: 'Recording ended: Maximum duration',
    });
    this.confirmSaveBeforeReview();
  };

  confirmSaveBeforeReview = () => {
    const {
      route: {
        params: {question},
      },
    } = this.props;
    const {videoUri} = this.state;
    if (videoUri) {
      saveVideo(videoUri, 'phone', question.id);
    }
  };

  handleReviewResponse = async (): Promise<void> => {
    ModalService.setModalContent({
      type: ModalType.PromptModal,
      content: recordingStoppedPrompt,
    });
    const {
      route: {
        params: {question},
      },
    } = this.props;
    trackVideoStatus({
      questionId: question.id,
      description: 'Recording ended: User pressed stop',
    });
    if (this.invoked) {
      return;
    }
    this.invoked = true;
    if (this.wasCancelled) {
      this.wasCancelled = false;
      return;
    }
    this.handlePausePressed('paused');
    await new Promise(r => setTimeout(r, 1000));
    this.confirmSaveBeforeReview();
  };

  handleStartPressed = (): void => {
    const {recording} = this.state;
    const {
      route: {
        params: {question},
      },
    } = this.props;
    this.invoked = false;
    switch (recording) {
      case 'initial': {
        trackVideoStatus({
          questionId: question.id,
          description: 'Record button pressed',
        });
        this.startCountDown(() => {
          this.setState({
            recording: 'recording',
          });
          this.startRecording();
        });
        break;
      }
      case 'paused': {
        this.setState({recording: 'recording'});
        this.startRecording();
        break;
      }
    }
  };

  handleVideo = async (uri: string, isFileUpload?: boolean) => {
    const question = this.props.route.params.question;
    let newVideoState = isFileUpload ? 'reviewing' : this.state.recording;
    if (this.state.recording !== 'timeout' && !this.wasCancelled) {
      newVideoState = 'reviewing';
    }
    KeepAwake.deactivate();
    const newPath = 'file://' + getVideoPath(question.id);
    const exists = await fs.exists(newPath);
    if (exists) {
      await fs.unlink(newPath);
    }
    try {
      await fs.copyFile(uri, newPath);
    } catch (error) {
      console.log(
        "Couldn't copy video file - onRecordingFinished",
        newPath,
        error,
      );
      reportToRaygun(error, 'Copying video to new path');
    }
    this.setState({
      videoUri: uri,
      recording:
        // If timed out do not change the state yet. We will change it once the user clicks play or the message.
        newVideoState,
    });
  };

  private async startRecording() {
    KeepAwake.activate();
    this.wasCancelled = false;
    this.invoked = false;
    this.setState({
      expirationTime: moment().add(
        Math.max(0, VideoTimeConfig.seconds),
        'seconds',
      ),
    });
    this.camera.current?.startRecording({
      onRecordingFinished: async video => {
        await this.handleVideo(video.path);
      },
      onRecordingError: error => {
        KeepAwake.deactivate();
        Alert.alert('Error', error.message);
        reportToRaygun(error, 'Failed to start recording: startRecording');
        this.setState({recording: 'paused', expirationTime: null});
      },
    });
  }

  handlePausePressed = async (recording: RecordingState = 'paused') => {
    this.camera.current?.stopRecording().catch(() => {});
    this.setState({expirationTime: null, recording});
  };

  handleCancel = async () => {
    this.wasCancelled = true;
    await this.camera.current?.stopRecording().catch(() => {});
    await this.deleteExistingVideo();
    this.setState({
      recording: 'initial',
      isFirst: true,
      expirationTime: null,
    });
  };

  handleDiscard = (): void => {
    ModalService.setModalContent({
      type: ModalType.ConfirmationModal,
      content: {
        ...deleteRecordingConfirmation,
        primaryAction: {
          title: 'Delete and redo',
          iconLeft: faTrash,
          type: 'danger',
          onPress: () => {
            this.handleCancel();
            ModalService.dismiss(ModalType.ConfirmationModal);
          },
        },
      },
    });
  };

  startCountDown = (onFinish: () => void): void => {
    this.setState({countdown: 3});
    setTimeout(() => {
      this.setState({countdown: 2});
    }, 1000);
    setTimeout(() => {
      this.setState({countdown: 1});
    }, 2000);
    setTimeout(() => {
      this.setState({countdown: -1}, onFinish);
    }, 2500);
  };

  render(): ReactElement<any> {
    const {expirationTime, recording, countdown} = this.state;
    const showVideo = ['timeout', 'reviewing'].includes(recording);

    const hasMissingPermission =
      this.state.camPermission !== 'authorized' ||
      this.state.audioPermission !== 'authorized';

    if (hasMissingPermission) {
      return (
        <Container withSafeArea={false}>
          {this.state.loading ? (
            <Spinner
              iconProps={{size: rs(24)}}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{alignSelf: 'center', marginVertical: rs(24)}}
            />
          ) : (
            <RecordPermissionPrompt
              onPress={() => {
                if (
                  this.state.camPermission === 'denied' ||
                  this.state.audioPermission === 'denied'
                ) {
                  Linking.openSettings();
                }
              }}
            />
          )}
        </Container>
      );
    }

    return (
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          {showVideo && this.state.videoUri ? (
            <ResponsePreview
              key={recording + this.state.videoUri}
              question={this.props.route.params.question}
              videoUri={this.state.videoUri}
              embed
              paused={recording === 'timeout'} // Do not play video when the timeout message is shown.
            />
          ) : (
            <View
              style={[
                styles.videoContainer,
                showVideo && {
                  height: deviceWidth + rs(16),
                },
              ]}>
              <CameraView ref={this.camera} />
              <Footer
                expiresOn={expirationTime!}
                countdown={countdown}
                isRecording={recording === 'recording'}
                onExpire={this.handleTimeout}
                timedOut={recording === 'timeout'}
                reviewing={recording === 'reviewing'}
                exitTimedOut={() => this.setState({recording: 'reviewing'})}
              />
            </View>
          )}
          <View style={[styles.buttons, styles.full]}>
            {showVideo ? (
              <ThemedButton
                title="Submit response"
                iconLeft={faCloudArrowUp}
                onPress={this.handleUpload}
              />
            ) : (
              <>
                <RecordButton
                  enabled={countdown === -1}
                  status={recording}
                  onPauseRecording={this.handleReviewResponse}
                  onStartRecording={this.handleStartPressed}
                />
                {recording !== 'recording' && (
                  <ThemedButton
                    title="Cancel"
                    type="secondary"
                    onPress={() => resetTo('MAIN_SCREEN')}
                  />
                )}
                {!['paused', 'recording'].includes(recording) && (
                  <ThemedButton
                    iconLeft={faFileArrowUp}
                    containerStyle={{marginVertical: rs(12)}}
                    title="Select from device"
                    type="hollow"
                    onPress={async () => {
                      try {
                        const {path} = await ImageCropPicker.openPicker({
                          mediaType: 'video',
                        });
                        await this.handleVideo(path, true);
                      } catch (error: any) {
                        if (
                          (error.code as PickerErrorCode) !==
                          'E_PICKER_CANCELLED'
                        ) {
                          Toast.show({
                            message:
                              (error.code as PickerErrorCode) ===
                              'E_NO_LIBRARY_PERMISSION'
                                ? 'Photo library access is disabled'
                                : error.message,
                            type: 'danger',
                          });
                        }
                        reportToRaygun(error, 'Error while picking video');
                        return undefined;
                      }
                    }}
                  />
                )}
              </>
            )}
            {!['initial', 'recording'].includes(recording) && (
              <>
                <ThemedButton
                  onPress={this.handleDiscard}
                  title="Redo"
                  type="secondary"
                  iconLeft={faRedo}
                />
              </>
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default VideoRecordScreen;
