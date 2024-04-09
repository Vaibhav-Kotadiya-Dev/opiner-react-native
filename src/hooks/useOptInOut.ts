import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AppState} from 'store/rootReducer';
import {GET_ALL_QUESTIONS} from 'store/all_questions/actions';
import {OPT_IN, OPT_OUT} from 'store/opt_in_out/actions';
import {CLEAR} from 'appConstants';
import {resetTo} from 'NavigationService';
import {Question, ResponseStatus} from 'network/data/Question';

export type OptInOut = 'opt_in' | 'opt_out' | 'skip';

const useOptInOut = (question: Question) => {
  const optState = useSelector((state: AppState) => state.optInOutState);
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Navigate back only if success
     */
    if (optState.data) {
      question.currentResponse.responseStatus = ResponseStatus.OptedIn;
      question.currentResponse.optInDeadline =
        question.currentResponse.responseDeadline;
      dispatch({
        type: `${OPT_IN}${CLEAR}`,
      });
      dispatch({type: GET_ALL_QUESTIONS}); // TODO: don't use this
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optState]);

  const handleOpt = useCallback(
    (type: OptInOut) => {
      if (type === 'opt_in') {
        question.currentResponse.responseStatus = ResponseStatus.OptedIn;
        question.currentResponse.optInDeadline =
          question.currentResponse.responseDeadline;
        dispatch({
          type: OPT_IN,
          payload: {id: question.id},
        });
      } else {
        dispatch({
          type: OPT_OUT,
          payload: {
            id: question.id,
          },
        });
        resetTo('MAIN_SCREEN');
      }
    },
    [dispatch, question],
  );

  return {
    handleOpt,
  };
};

export default useOptInOut;
