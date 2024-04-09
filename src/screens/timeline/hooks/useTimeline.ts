import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppState} from 'store/rootReducer';
import {ACCESS_TOKEN} from '../../../appConstants';
import {GET_ALL_QUESTIONS} from 'store/all_questions/actions';
import {getAllItems} from 'utils/VideoStateStore';
import {AllQuestionsState} from 'store/all_questions/reducer';

const pollInterval = 30 * 1000; // 30 secs.

const shouldRefresh = {
  current: true,
};
// prevent bug that keeps reloading video!
export const getShouldRefresh = () => shouldRefresh.current;
export const setShouldRefresh = (value: boolean) => {
  shouldRefresh.current = value;
};

let counter = 0;

const useTimeline = (
  poll = true,
  onLoad?: () => void,
): {
  questions: AllQuestionsState;
  token: string | null;
} => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>('');
  const questions = useSelector((state: AppState) => state.allQuestions);

  useEffect(() => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(setToken);
    dispatch({type: GET_ALL_QUESTIONS});
    // TODO: get rid of this code once the server can PUSH notify the app for new content.
    if (!poll) {
      return;
    }
    const timer = setInterval(async () => {
      try {
        if (!getShouldRefresh()) {
          return;
        }
        counter++;
        const items = await getAllItems();
        if (items.length || counter === 3) {
          counter = 0;
          onLoad?.();
          dispatch({type: GET_ALL_QUESTIONS});
        }
      } catch {
        //
      }
    }, pollInterval);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, poll]);

  return {questions, token};
};

export default useTimeline;
