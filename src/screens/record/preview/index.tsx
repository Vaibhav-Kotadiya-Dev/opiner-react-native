import React, {
  ReactElement,
  useState,
  useRef,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {
  NavigationProp,
  useRoute,
  RouteProp,
  useNavigation,
} from '@react-navigation/core';
import {FFmpegKitConfig, FFprobeKit} from 'ffmpeg-kit-react-native';
import {useSelector} from 'react-redux';

import {Container} from 'components';
import {handleSubmit, handleRedo} from './utils';
import {MainStackParam} from 'navigators/StackParams';
import ModalService, {
  ConfirmationModalProps,
  ModalType,
} from 'components/modal/ModalService';
import {discardRecordingModal} from 'components/modal/utils';
import {rs} from 'utils/ResponsiveScreen';
import VideoPlayer, {
  playerSize,
  VideoPlayerProps,
} from 'components/video-player';
import {TrackStatus, trackVideoStatus} from 'network/OpinerApi';
import useAutoVideoPause from 'hooks/useAutoVideoPause';
import ResponseUserDetails from './ResponseActions';
import {isFinalOutputPath} from './Compress';
import {trackRecordedQuestion} from 'utils/LocalStorage';
import {reportToRaygun} from 'utils/Raygun';
import {AppState} from 'store/rootReducer';
import useThemeContext from 'hooks/useThemeContext';
import {
  getResponseVideo,
  Question,
  QuestionResponse,
} from 'network/data/Question';
import ThemedButton from 'components/themed-button';
import QuestionResponsesPreview from '../responses-preview/ResponsesPreview';
import {videoControlButtonHeight} from 'components/video-player/VideoControls/ControlButton';
import {videoSliderHeight} from 'components/video-player/VideoControls/Slider';
import {HeaderLeftButton} from 'navigators/header';
import OpinerContent from 'network/methods/OpinerContent';
import {Constant} from 'screens/upload/utils';

const buttonsTopSpace = rs(32);
const {width} = Dimensions.get('screen');

/**
 * Calculating the empty space that remains between player and buttons (without scrollview)
 * This will allow us to determine when we need scrollView for smaller devices
 * so that player controls do not overlap with buttons in video preview screen
 */
const headerHeight = rs(64);
const buttonViewHeight = rs(192); // ((56 + 24) * 2) + 32
const emptySpace =
  Dimensions.get('screen').height -
  (StatusBar.currentHeight || 0) -
  headerHeight -
  playerSize -
  videoControlButtonHeight -
  videoSliderHeight -
  buttonViewHeight;

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: buttonsTopSpace,
    zIndex: -1,
  },
  container: {flex: 1},
  content: {padding: rs(16)},
});

interface Props {
  question: Question;
  videoUri: string;
  response?: QuestionResponse;
  embed?: boolean;
  paused?: boolean;
}

const Wrapper = ({
  children,
  isScrollable,
}: {
  children: ReactNode;
  isScrollable: boolean;
}) => {
  const {theme} = useThemeContext();
  if (isScrollable) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container, {backgroundColor: theme.colors.background}]}
        contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    );
  }
  return <>{children}</>;
};

interface PlayerState {
  uri: string;
  paused: boolean;
}

export const ResponsePreview = ({
  question,
  videoUri,
  response,
  paused: xPaused,
  embed,
}: Props): ReactElement => {
  const [state, updateState] = useState<PlayerState>({
    uri: videoUri,
    paused: Boolean(xPaused),
  });
  const {paused, uri} = state;
  const src = uri.startsWith('https://')
    ? uri
    : (uri.startsWith('file://') ? '' : 'file://') + uri;

  const updatedState = useRef(state);
  const setState = useCallback((newState: Partial<PlayerState>) => {
    updatedState.current = {
      ...updatedState.current,
      ...newState,
    };
    updateState(updatedState.current);
  }, []);

  useEffect(() => {
    if (response) {
      updateState({
        uri: getResponseVideo(response),
        paused: Boolean(xPaused),
      });
    } else {
      setState({paused: Boolean(xPaused)});
    }
  }, [response, setState, xPaused]);

  const isFinal = isFinalOutputPath(src);
  const playerRef = useAutoVideoPause();
  const isUserRecordingPreview = !response;
  const navigation = useNavigation<NavigationProp<MainStackParam>>();
  const {data: user} = useSelector((s: AppState) => s.userProfile);
  const timerRef = useRef<NodeJS.Timeout | number>(-1);
  const {theme} = useThemeContext();

  const handleUpload = useCallback(
    async (description?: string) => {
      trackVideoStatus({
        questionId: question.id,
        description:
          'Upload button pressed' +
          (typeof description === 'string' ? `: ${description}` : ''),
        fileSize: '-1',
        status: TrackStatus.Information,
      });
      setState({paused: true});
      handleSubmit(question, src);
    },
    [question, setState, src],
  );

  const timeout = useRef(15000);

  // Watch out if the user has been idle for a while.
  // If so, prompt the user to upload the video.
  const watchOut = useCallback(() => {
    if (!isUserRecordingPreview || Date.now() > 0) {
      // Remove Date.now() check to enable this feature.
      return;
    }
    if (timerRef.current !== -1) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (!playerRef.current?.isPaused()) {
        watchOut();
        return;
      }
      Alert.alert(
        'Ready to upload?',
        `Hey ${user?.firstName},\nIf you are done reviewing the video, we can start the upload.`,
        [
          {
            text: 'Not yet',
            style: 'cancel',
            onPress: () => {
              timeout.current += 5000;
              watchOut();
            },
          },
          {
            text: 'Start upload',
            onPress: () => handleUpload('From prompt.'),
            style: 'default',
          },
        ],
      );
    }, timeout.current);
  }, [user, playerRef, isUserRecordingPreview, handleUpload]);

  const handleDeleteAndRedo = useCallback(async () => {
    trackRecordedQuestion(null);
    watchOut();
    FFmpegKitConfig.disableLogs();
    FFprobeKit.getMediaInformation(uri).then(session => {
      const info = session.getMediaInformation().getAllProperties();
      trackVideoStatus({
        questionId: question.id,
        description: 'Delete and redo button pressed',
        fileSize: (Number(info?.size || 0) / 1000000).toFixed(2),
        status: TrackStatus.Information,
        previousResponseDuration: parseFloat(info?.duration || '0'),
      }).catch(e => {
        console.log(e);
        reportToRaygun(e, 'Delete and redo - handleDeleteAndRedo');
      });
    });
    setState({
      ...updatedState.current,
      paused: true,
    });
    const content: ConfirmationModalProps = {
      ...discardRecordingModal,
    };
    content.primaryAction!.onPress = () => {
      ModalService.dismiss(ModalType.ConfirmationModal).then(() => {
        handleRedo(question);
      });
    };
    content.secondaryAction!.onPress = () => {
      ModalService.dismiss(ModalType.ConfirmationModal);
    };
    ModalService.setModalContent({
      type: ModalType.ConfirmationModal,
      content,
    });
  }, [watchOut, uri, setState, question]);

  useEffect(() => {
    watchOut();
    return () => {
      if (timerRef.current !== -1) {
        clearTimeout(timerRef.current);
      }
    };
  }, [watchOut, paused]);

  useEffect(() => {
    if (isUserRecordingPreview) {
      navigation.setOptions({
        headerLeft: () => <HeaderLeftButton onPress={handleDeleteAndRedo} />,
      });
    }
  }, [handleDeleteAndRedo, isUserRecordingPreview, navigation]);

  useEffect(() => {
    trackRecordedQuestion(question);
  }, [question]);

  const responseThumbImageUrl = response
    ? OpinerContent.getCDNImageURL(response.cdnThumbUrlLarge)
    : undefined;

  const videoProps: VideoPlayerProps = {
    controls: true,
    resizeMode: 'cover',
    playInBackground: true,
    playWhenInactive: true,
    ignoreSilentSwitch: 'ignore',
    paused,
    videoURL: src,
    fallbackImageURL: responseThumbImageUrl,
    style: {
      // Fix for Android video mirroring
      transform: Constant.isIOS ? [] : [{scaleX: -1}],
    },
    rate: 1,
    muted: false,
  };

  const Outer = embed || !isUserRecordingPreview ? React.Fragment : Container;

  return (
    <Outer
      {...(embed || !isUserRecordingPreview ? {} : {style: [styles.content]})}>
      <Wrapper
        isScrollable={!isUserRecordingPreview || emptySpace < buttonsTopSpace}>
        <VideoPlayer
          ref={playerRef}
          key={isFinal ? 'final' : 'preview'}
          onUserDidInteract={watchOut}
          hideShutterView={isUserRecordingPreview ? true : false}
          currentTime={isUserRecordingPreview ? 0.01 : undefined}
          responseDetails={!isUserRecordingPreview ? response : undefined}
          fallbackImageURL={
            isUserRecordingPreview ? undefined : responseThumbImageUrl
          }
          {...videoProps}>
          {isUserRecordingPreview ? (
            !embed ? (
              <View style={styles.buttons}>
                <ThemedButton onPress={() => handleUpload()} title="Upload" />
                <ThemedButton
                  onPress={handleDeleteAndRedo}
                  type="secondary"
                  isAtBottom
                  title="Delete and redo"
                />
              </View>
            ) : (
              <></>
            )
          ) : (
            <ResponseUserDetails question={question} response={response} />
          )}
        </VideoPlayer>
      </Wrapper>
    </Outer>
  );
};

const ResponsePreviewScreen = () => {
  const route =
    useRoute<RouteProp<MainStackParam, 'RESPONSE_PREVIEW_SCREEN'>>();
  const {question, videoUri, response} = route.params;
  if (response) {
    return <QuestionResponsesPreview question={question} response={response} />;
  }
  return (
    <ResponsePreview
      question={question}
      videoUri={videoUri}
      response={response}
    />
  );
};

export default ResponsePreviewScreen;
