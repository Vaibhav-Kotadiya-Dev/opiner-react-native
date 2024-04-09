import React, {ReactElement, useEffect, useMemo, useRef, useState} from 'react';
import {LayoutAnimation, View} from 'react-native';
import {FFmpegKitConfig, FFprobeKit} from 'ffmpeg-kit-react-native';

import {ProcessingStatus, ProcessingType} from 'utils/VideoStateStore';
import {
  isUploading,
  isCompressing,
  hasUploadCompleted,
  hasCompressCompleted,
  hasUploadFailed,
  hasCompressFailed,
} from '../utils/video';
import BusyView from '../BusyView';
import styles from './styles';
import useUploadEvents from './useUploadEvents';
import AppText from 'components/app-text';
import {getValue, StorageKeys} from 'utils/LocalStorage';
import PromptModal from 'components/modal/PromptModal';
import {submitFailurePrompt, submitSuccessPrompt} from '../helpers';
import {useMainNavigation} from 'hooks/useNavigationHooks';

export const FakeProgressCompressingView = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setProgress(stateProgress => {
        if (stateProgress >= 100) {
          clearInterval(timerId);
        }
        return stateProgress + 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <BusyView progress={progress} step={1} title="Compressing" />;
};

const ProcessView = ({
  status,
  action,
  questionId,
  videoURL,
}: {
  status: ProcessingStatus;
  action: ProcessingType;
  compressedURL?: string;
  videoURL?: string;
  questionId: number;
}): ReactElement | null => {
  const statusAction = useMemo(() => ({status, action}), [status, action]);
  const uploadProgress = useUploadEvents(questionId, statusAction);
  const navigation = useMainNavigation();
  const [compressProgress, setCompressProgress] = useState(1);
  const duration = useRef<number>(0);

  useEffect(() => {
    if (!videoURL) {
      return;
    }
    FFmpegKitConfig.enableStatisticsCallback(statistics => {
      if (!statistics || !duration.current) {
        return;
      }
      let timeInMilliseconds = statistics.getTime();
      if (timeInMilliseconds > 0) {
        let totalVideoDurationMs = duration.current * 1000;
        let completePercentage = Math.round(
          (timeInMilliseconds / totalVideoDurationMs) * 100,
        );
        setCompressProgress(completePercentage);
      }
    });

    if (videoURL && !duration.current) {
      FFprobeKit.getMediaInformation(videoURL).then(session => {
        if (session && !duration.current) {
          const information = session.getMediaInformation();
          duration.current = information.getDuration();
        }
      });
    }

    return () => {
      // Cleanup any listeners or sessions if necessary
      FFmpegKitConfig.disableStatistics(); // Replace this with the appropriate method for cleanup if needed
    };
  }, [videoURL]);

  const isSubmitFailure =
    hasUploadFailed(statusAction) || hasCompressFailed(statusAction);
  const isSubmitSuccess = hasUploadCompleted(statusAction);

  useEffect(() => {
    if (isSubmitFailure || isSubmitSuccess) {
      navigation.setOptions({headerShown: false});
    }
  }, [isSubmitFailure, isSubmitSuccess]);

  if (isCompressing(statusAction)) {
    return (
      <BusyView progress={compressProgress} step={1} title="Compressing" />
    );
  }

  if (isUploading(statusAction)) {
    const size = getValue(StorageKeys.LastVideoSize, 0);
    return (
      <BusyView
        step={2}
        progress={uploadProgress}
        size={size}
        title="Uploading"
        // cancelButtonTitle="Continue in background"
        // onCancel={() => {
        // handleTimeLine();
        // TODO: Cancel video upload
        // dispatch(
        //   setVideoStatus({
        //     status: ProcessingStatus.Cancelled,
        //     action: ProcessingType.Uploading,
        //   }),
        // );
        // Upload.cancelUpload(getCustomUploadId(questionId)).then(cancelled => {
        //   if (cancelled) {
        //     Toast.show({
        //       message: 'Video upload cancelled',
        //       type: 'warning',
        //     });
        //   }
        // });
        // }}
      />
    );
  }

  if (isSubmitFailure) {
    return <PromptModal {...submitFailurePrompt} />;
  }

  if (isSubmitSuccess) {
    return <PromptModal {...submitSuccessPrompt} />;
  }

  if (hasCompressCompleted(statusAction)) {
    return (
      <>
        <View style={[styles.paddedContainer, styles.successContainer]}>
          <AppText size="h1" style={styles.title}>
            Compression success
          </AppText>
          <AppText style={styles.successDescription}>
            The video has been compressed successfully, the uploading process
            will begin shortly.
          </AppText>
        </View>
      </>
    );
  }
  return null;
};

export default ProcessView;
