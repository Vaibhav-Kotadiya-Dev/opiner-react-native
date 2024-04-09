import {ACTIONS_PACKAGE, CLEAR} from '../../appConstants';
import {Action} from '../ActionInterface';
import {Question} from '../../network/data/Question';

const SET_QUESTION_DETAILS = `${ACTIONS_PACKAGE}.SET_QUESTION_DETAILS`;

const setQuestionDetails = (question: Question): Action => ({
  type: SET_QUESTION_DETAILS,
  payload: {
    question,
  },
});

const clearQuestionDetails = (): Action => ({
  type: `${SET_QUESTION_DETAILS}${CLEAR}`,
});

export {SET_QUESTION_DETAILS, setQuestionDetails, clearQuestionDetails};
