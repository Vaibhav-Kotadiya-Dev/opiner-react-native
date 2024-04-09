import {call, put} from 'redux-saga/effects';

import {OPT_IN, OPT_OUT} from './actions';
import {Action} from '../ActionInterface';
import {FAILED, SUCCESS} from '../../appConstants';
import {opinerOptIn, opinerOptOut} from '../../network/OpinerApi';
import {reportToRaygun} from 'utils/Raygun';

export function* optIn(inAction: Action) {
  try {
    const id = inAction.payload.id;
    const response: any = yield call(opinerOptIn, id);
    const action: Action = {
      type: `${OPT_IN}${SUCCESS}`,
      response: response,
    };
    yield put(action);
  } catch (e) {
    reportToRaygun(e, 'Opting in');
    const action: Action = {
      type: `${OPT_IN}${FAILED}`,
      response: e.message,
    };
    yield put(action);
  }
}

export function* optOut(inAction: Action) {
  try {
    const id = inAction.payload.id;
    const response: any = yield call(opinerOptOut, id);
    const action: Action = {
      type: `${OPT_OUT}${SUCCESS}`,
      response: response,
    };
    yield put(action);
  } catch (e) {
    reportToRaygun(e, 'Opting out');
    const action: Action = {
      type: `${OPT_OUT}${FAILED}`,
      response: e.message,
    };
    yield put(action);
  }
}
