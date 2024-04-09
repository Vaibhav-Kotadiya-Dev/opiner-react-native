import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import KeepAwake from 'react-native-keep-awake';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import fs from 'react-native-fs';

import {AppState} from 'store/rootReducer';
import {SCREEN_BACKGROUND} from 'assets/colors';
import {uploadVideo} from './Upload';
import {setVideoStatus} from 'store/response/actions';
import {
  ProcessingStatus,
  ProcessingType,
  setProgress,
} from 'utils/VideoStateStore';
import useTimeline from 'screens/timeline/hooks/useTimeline';
import useCompress, {failedMessage} from './utils/useCompress';
import ProcessView from './ProcessView';
import {MainStackParam} from 'navigators/StackParams';
import {handleTimeLine} from 'screens/record/preview/utils';
import {TrackStatus, trackVideoStatus} from 'network/OpinerApi';
import {reportToRaygun} from 'utils/Raygun';
import Toast from 'utils/Toast';
import {Container} from 'components/index';
interface UploadScreenProps {
  navigation: NavigationProp<MainStackParam>;
  route: RouteProp<MainStackParam, 'UPLOADING_SCREEN'>;
}

const UploadScreen = ({route}: UploadScreenProps) => {
  const dispatch = useDispatch();
  const {status, action} = useSelector(
    (state: AppState) => state.uploadResponseState,
  );
  const {question, videoUri} = route.params;
  const compressedURL = useCompress(question, videoUri);
  useTimeline();

  useEffect(() => {
    if (!compressedURL) {
      return;
    }
    if (status === ProcessingStatus.Cancelled) {
      if (compressedURL) {
        fs.unlink(compressedURL).catch(e =>
          reportToRaygun(e, 'Upload Cancelled - Unlinking file'),
        );
      }
      handleTimeLine();
      return;
    }
    fs.exists(compressedURL).then(exists => {
      if (
        exists &&
        action === ProcessingType.Compressing &&
        status === ProcessingStatus.Success
      ) {
        // track recorded
        trackVideoStatus({
          questionId: question.id,
          description: 'Upload starting',
          fileSize: '-1',
          status: TrackStatus.Information,
        });
        dispatch(
          setVideoStatus({
            status: ProcessingStatus.Processing,
            action: ProcessingType.Uploading,
          }),
        );

        setProgress({
          question,
          path: compressedURL,
          processType: ProcessingType.Uploading,
        });

        uploadVideo(compressedURL, question).catch(e => {
          Toast.show(failedMessage);
          reportToRaygun(e, 'Upload failed');
          KeepAwake.deactivate();
          dispatch(
            setVideoStatus({
              status: ProcessingStatus.Failed,
              action: ProcessingType.Uploading,
            }),
          );
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, compressedURL, question, status]);

  return (
    <Container>
      <ProcessView
        status={status}
        action={action}
        compressedURL={compressedURL}
        questionId={question.id}
        videoURL={videoUri}
      />
    </Container>
  );
};

export default UploadScreen;
