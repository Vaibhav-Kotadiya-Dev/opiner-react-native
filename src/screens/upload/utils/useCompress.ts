import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
// @ts-ignore
import KeepAwake from 'react-native-keep-awake';

import {
  processVideo,
  getSize,
  isFinalOutputPath,
} from 'screens/record/preview/Compress';
import {setVideoStatus} from 'store/response/actions';
import {
  ProcessingStatus,
  ProcessingType,
  setFailed,
  setProgress,
} from 'utils/VideoStateStore';
import {Question} from 'network/data/Question';
import {trackVideoStatus, TrackStatus} from 'network/OpinerApi';
import Font from 'assets/fonts';
import {reportToRaygun} from 'utils/Raygun';
import {CustomFlashMessageType} from 'components/prompt-message/CustomFlashMessage';
import Toast from 'utils/Toast';

export const failedMessage: CustomFlashMessageType = {
  type: 'danger',
  titleStyle: {
    fontSize: 16,
    fontFamily: Font.Regular,
    textAlign: 'center',
  },
  message: 'Upload unsuccessful',
};

const useCompress = (question: Question, uri: string) => {
  const [path, setPath] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    KeepAwake.activate();
    if (isFinalOutputPath(uri)) {
      setProgress({
        question,
        path: uri,
        processType: ProcessingType.Compressing,
      });
      dispatch(
        setVideoStatus({
          status: ProcessingStatus.Success,
          action: ProcessingType.Compressing,
        }),
      );
      setPath(uri);
    } else {
      dispatch(
        setVideoStatus({
          status: ProcessingStatus.Processing,
          action: ProcessingType.Compressing,
        }),
      );
      processVideo(question, uri)
        .then(finalPath => {
          setPath(finalPath);
          setProgress({
            question,
            path: finalPath,
            processType: ProcessingType.Compressing,
          });
          dispatch(
            setVideoStatus({
              status: ProcessingStatus.Success,
              action: ProcessingType.Compressing,
            }),
          );
        })
        .catch(async e => {
          reportToRaygun(e, 'Compression Failed - processVideo');
          Toast.show(failedMessage);
          setFailed({
            question,
            path: path || uri,
            processType: ProcessingType.Compressing,
          });
          dispatch(
            setVideoStatus({
              status: ProcessingStatus.Failed,
              action: ProcessingType.Compressing,
            }),
          );
          trackVideoStatus({
            description: 'Compress failed',
            fileSize: await getSize(path || uri, 'after compression failed'),
            questionId: question.id,
            status: TrackStatus.Error,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, uri]);
  return path;
};

export default useCompress;
