import {call, put} from 'redux-saga/effects';
// @ts-ignore
import KeepAwake from 'react-native-keep-awake';
import fs from 'react-native-fs';

import {GET_ALL_QUESTIONS} from './actions';
import {Action} from '../ActionInterface';
import {FAILED, SUCCESS} from '../../appConstants';
import {Question} from '../../network/data/Question';
import {
  opinerGetAllQuestions,
  trackVideoStatus,
  TrackStatus,
} from '../../network/OpinerApi';
import {
  ProcessingStatus,
  ProcessingType,
  hasTimedOut,
  getItem,
  setDone,
  setFailed,
} from 'utils/VideoStateStore';
import {store} from 'store/configureStore';
import {setVideoStatus} from 'store/response/actions';
import Font from 'assets/fonts';
import {getSize} from 'screens/record/preview/Compress';
import {convertPropertyTime} from 'utils/Time';
import {trackRecordedQuestion} from 'utils/LocalStorage';
import {reportToRaygun} from 'utils/Raygun';
import Toast from 'utils/Toast';
import {CustomFlashMessageType} from 'components/prompt-message/CustomFlashMessage';
import {getIsActiveQuestion} from 'components/question/response-status-pill/utils';

const UNDEFINED_VIDEO = '00000000-0000-0000-0000-000000000000';

export const notifyUploadSuccess = async (question: Question) => {
  const {path} = await getItem(question.id);
  store.dispatch(
    setVideoStatus({
      status: ProcessingStatus.Success,
      action: ProcessingType.Uploading,
    }),
  );
  KeepAwake.deactivate();
  trackRecordedQuestion(null);
  setDone({
    question,
    path: path!,
    processType: ProcessingType.Uploading,
  });
  trackVideoStatus({
    description: 'Response received',
    fileSize: await getSize(path!, 'success!'),
    questionId: question.id,
    status: TrackStatus.OK,
  });
  if (path) {
    fs.unlink(path).catch(e =>
      reportToRaygun(e, 'Unlinking video - mapStatus'),
    );
  }
};

const mapStatus = async (questions: Question[]): Promise<Question[]> => {
  const mapped: Question[] = [];
  for (const question of questions) {
    const {status, processType, time, path} = await getItem(question.id);
    const {videoAddress} = question.currentResponse;
    question.localQuestionStatus = {
      time,
      status,
      processType,
    };
    if (
      status === ProcessingStatus.Processing &&
      processType === ProcessingType.Uploading
    ) {
      let config: CustomFlashMessageType | null = null;
      if (videoAddress === UNDEFINED_VIDEO && hasTimedOut(time!)) {
        store.dispatch(
          setVideoStatus({
            status: ProcessingStatus.Failed,
            action: ProcessingType.Uploading,
          }),
        );
        config = {
          type: 'danger',
          message: 'Upload unsuccessful',
        };
        setFailed({
          path: path!,
          processType: ProcessingType.Uploading,
          question,
        });
        trackVideoStatus({
          description: `Video upload failed (reason: ${
            hasTimedOut(time!) ? 'timed out' : 'unknown'
          })`,
          fileSize: await getSize(path!, 'upload'),
          questionId: question.id,
          status: TrackStatus.Error,
        });
      }
      if (config !== null) {
        Toast.show({
          ...config,
          duration: 3500,
          titleStyle: {
            fontSize: 16,
            fontFamily: Font.Regular,
            textAlign: 'center',
          },
        });
      }
      question.localQuestionStatus = {
        time,
        status: ProcessingStatus.None,
        processType: ProcessingType.None,
      };
    }
    mapped.push(question);
  }
  return mapped;
};

export function* getAllQuestions() {
  try {
    const questionsData: Question[] = yield call(opinerGetAllQuestions);
    const questions = questionsData.sort((a, b) => b.id - a.id);
    const active: Question[] = [];
    const inactive: Question[] = [];
    questions.forEach(question => {
      if (getIsActiveQuestion(question)) {
        active.push(question);
      } else {
        inactive.push(question);
      }
    });
    const sorted = active.concat(inactive);
    // Convert time from UTC to local
    const timeFormatted = sorted.map(question => {
      const newQuestion = convertPropertyTime(question);
      if (question.currentResponse) {
        newQuestion.currentResponse = convertPropertyTime(
          question.currentResponse,
        );
      }
      if (question.responses) {
        newQuestion.responses = question.responses.map(response =>
          convertPropertyTime(response),
        );
      }
      return newQuestion;
    });
    const action: Action = {
      type: `${GET_ALL_QUESTIONS}${SUCCESS}`,
      response: timeFormatted,
    };
    yield put(action); // put questions without showing status
    const response: Question[] = yield call(mapStatus, sorted);
    yield put({
      type: `${GET_ALL_QUESTIONS}${SUCCESS}`,
      response,
    });
  } catch (e) {
    reportToRaygun(e as Error, 'Getting all questions');
    const action: Action = {
      type: `${GET_ALL_QUESTIONS}${FAILED}`,
      response: (e as Error).message,
    };
    yield put(action);
  }
}
