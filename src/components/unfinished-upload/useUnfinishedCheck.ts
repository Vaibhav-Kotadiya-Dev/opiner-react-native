import {useState, useRef, useCallback, useEffect} from 'react';
import fs from 'react-native-fs';

import {Question} from 'network/data/Question';
import {getTrackedQuestion} from 'utils/LocalStorage';
import {getFinalOutputPath} from 'screens/record/preview/Compress';
import {getVideoPath} from 'screens/record';

const checkPath = async (questionId: number): Promise<string | undefined> => {
  // If this exists then use this one.
  // The reason is we might end up with corrupted final recording path if the compressing was cancelled in the process.
  // Moreover, the raw path will be deleted if compress succeeds.
  const rawRecordingPath = getVideoPath(questionId);
  if (await fs.exists(rawRecordingPath)) {
    return rawRecordingPath;
  }
  const finalRecordingPath = getFinalOutputPath(questionId);
  if (await fs.exists(finalRecordingPath)) {
    return finalRecordingPath;
  }
  return undefined;
};

export const dismissDelegate = {
  handle: () => {},
};

/**
 * 1. Check if we have 'pending_upload' defined
 * 2. Check if the final-response or record file exists
 *
 * If both conditions meet, the UI will pop-up
 *
 * pending_upload criterias:
 * 1. Set when user finishes recording and visits video preview screen
 * 2. Remove when user clicks 'Delete & Redo'
 * 3. Remove when user clicks 'Delete' from pop-up
 * 4. Remove when upload completes successfully
 */
const useUnfinishedCheck = () => {
  const [status, setStatus] = useState<{
    question?: Partial<Question>;
    path?: string;
  }>({
    path: undefined,
    question: undefined,
  });
  const isMounted = useRef(true);
  useEffect(() => {
    const question = getTrackedQuestion();
    if (!question) {
      return;
    }
    checkPath(question.id).then(path => {
      if (!isMounted.current) {
        return;
      }
      setStatus({
        path,
        question,
      });
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  const dismiss = useCallback(() => {
    setStatus({});
  }, []);

  useEffect(() => {
    dismissDelegate.handle = dismiss;
  }, [dismiss]);

  return {dismiss, ...status};
};

export default useUnfinishedCheck;
