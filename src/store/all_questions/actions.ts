import {ACTIONS_PACKAGE, CLEAR} from '../../appConstants';
import {Action} from '../ActionInterface';
import {Question} from 'network/data/Question';

const GET_ALL_QUESTIONS = `${ACTIONS_PACKAGE}.GET_ALL_QUESTIONS`;
const UPDATE_QUESTION = `${ACTIONS_PACKAGE}.UPDATE_QUESTION`;

const getAllQuestions = (): Action => ({
  type: GET_ALL_QUESTIONS,
});
const clearAllQuestions = (): Action => ({
  type: `${GET_ALL_QUESTIONS}${CLEAR}`,
});

const updateQuestion = (question: Question): Action => ({
  type: UPDATE_QUESTION,
  payload: question,
});

export {
  GET_ALL_QUESTIONS,
  UPDATE_QUESTION,
  getAllQuestions,
  updateQuestion,
  clearAllQuestions,
};
