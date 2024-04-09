import {defaultQuestion, Question} from '../../network/data/Question';
import {Action} from '../ActionInterface';
import {SET_QUESTION_DETAILS} from './actions';
import {CLEAR} from '../../appConstants';
import {NetworkDataState} from '../NetworkDataState';

export interface QuestionDetailsState extends NetworkDataState {
  readonly data: Question;
}

const initState: QuestionDetailsState = {
  data: defaultQuestion,
  loading: false,
  error: 'Data is empty',
};

const questionState = (
  state: QuestionDetailsState = initState,
  action: Action,
): QuestionDetailsState => {
  let newState: QuestionDetailsState = null;
  const {payload} = action;
  switch (action.type) {
    case SET_QUESTION_DETAILS:
      newState = {
        ...state,
        loading: true,
        data: payload.question,
      };
      break;
    case `${SET_QUESTION_DETAILS}${CLEAR}`:
      newState = initState;
      break;
  }
  return newState || state;
};

export default questionState;
