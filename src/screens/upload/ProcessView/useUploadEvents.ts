import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {ProcessingStatus, ProcessingType} from 'utils/VideoStateStore';
import {isUploading} from '../utils/video';
import Upload, {getCustomUploadId} from '../Upload';
import {setVideoStatus} from 'store/response/actions';
// import useUploadAbort from './useUploadAbort';
import Toast from 'utils/Toast';
import {reportToRaygun} from 'utils/Raygun';

const useUploadEvents = (
  questionId: number,
  statusAction: {status: ProcessingStatus; action: ProcessingType},
) => {
  const [uploadProgress, setUploadProgress] = useState(1);
  // const duration = useRef<string | undefined>();
  const dispatch = useDispatch();
  // const abortAt = useUploadAbort();

  useEffect(() => {
    if (!isUploading(statusAction)) {
      return;
    }
    const uploadId = getCustomUploadId(questionId);
    // abortAt(0, uploadId);

    const errorListener = Upload.addListener('failed', uploadId, data => {
      reportToRaygun(data.error, 'Upload failed - Upload error listener');
      Toast.show({
        message: 'Upload failed',
        description: data.error,
        type: 'danger',
      });
      dispatch(
        setVideoStatus({
          status: ProcessingStatus.Failed,
          action: ProcessingType.Uploading,
        }),
      );
    });

    const cancelListener = Upload.addListener('cancelled', uploadId, () => {
      Toast.show({
        message: 'Upload failed',
        description: 'The upload was cancelled.',
        type: 'danger',
      });
      dispatch(
        setVideoStatus({
          status: ProcessingStatus.Failed,
          action: ProcessingType.Uploading,
        }),
      );
    });

    const uploadListener = Upload.addListener('progress', uploadId, data => {
      setUploadProgress(data.progress);
      // abortAt(Math.ceil(data.progress), uploadId);
    });

    return () => {
      uploadListener.remove?.();
      errorListener.remove?.();
      cancelListener.remove?.();
    };
  }, [questionId, statusAction, dispatch]);

  return uploadProgress;
};

export default useUploadEvents;
