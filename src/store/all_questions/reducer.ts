import {Question} from '../../network/data/Question';
import {Action} from '../ActionInterface';
import {GET_ALL_QUESTIONS, UPDATE_QUESTION} from './actions';
import {CLEAR, FAILED, SUCCESS} from '../../appConstants';
import {NetworkDataState} from '../NetworkDataState';

export interface AllQuestionsState extends NetworkDataState {
  readonly data: Question[];
  readonly entities: Record<string, Question>;
}

const convertData = (data: Question[]) => {
  return data.reduce((acc, current) => {
    acc[current.id] = current;
    return acc;
  }, {} as Record<string, Question>);
};

const initState: AllQuestionsState = {
  data: [],
  entities: {},
  loading: false,
  error: 'Data is empty',
};

const allQuestions = (
  state: AllQuestionsState = initState,
  action: Action,
): AllQuestionsState => {
  let newState: AllQuestionsState;
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      newState = {
        ...state,
        loading: true,
      };
      break;
    case UPDATE_QUESTION:
      newState = {
        ...state,
        data: state.data.map(question => {
          if (question.id === action.payload.id) {
            return action.payload;
          }
          return question;
        }),
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
        loading: false,
      };
      break;
    case `${GET_ALL_QUESTIONS}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: action.response,
        entities: convertData(action.response),
        error: '',
      };
      break;
    case `${GET_ALL_QUESTIONS}${FAILED}`:
      newState = {
        ...state,
        loading: false,
        error: action.response,
        entities: convertData(action.response),
      };
      break;
    case `${GET_ALL_QUESTIONS}${CLEAR}`:
      newState = initState;
      break;
    default:
      newState = state;
  }
  return newState;
};

export default allQuestions;
