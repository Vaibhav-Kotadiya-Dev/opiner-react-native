import {useCallback, useRef} from 'react';
import Upload from '../Upload';

// If the upload progress hasn't changed for 30s, then abort upload
const useUploadAbort = () => {
  const progress = useRef<number>(0);
  const timerId = useRef<number>(0);

  const abortAt = useCallback((value: number, uploadId: string) => {
    if (timerId.current !== 0) {
      clearTimeout(timerId.current);
    }

    if (value >= progress.current) {
      progress.current = value;
    }

    timerId.current = setTimeout(() => {
      if (value === progress.current && progress.current !== 100) {
        // this timer should have been canceled in case of progress
        Upload.cancelUpload(uploadId);
      }
    }, 30000);
  }, []);
  return abortAt;
};

export default useUploadAbort;
