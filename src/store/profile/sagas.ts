import {call, put} from 'redux-saga/effects';
import {GET_USER_PROFILE} from './actions';
import {Action} from '../ActionInterface';
import {FAILED, SUCCESS} from '../../appConstants';
import {getAccount} from '../../network/OpinerApi';
import IUser from '../../network/data/User';
import {reportToRaygun} from 'utils/Raygun';

export function* getUserProfile() {
  try {
    const user: IUser = yield call(getAccount);
    if (!user || !user.id) {
      return;
    }
    const action: Action = {
      type: `${GET_USER_PROFILE}${SUCCESS}`,
      response: user,
    };
    yield put(action);
  } catch (e) {
    reportToRaygun(e, 'Getting user profile');
    const action: Action = {
      type: `${GET_USER_PROFILE}${FAILED}`,
      response: e.message,
    };
    yield put(action);
  }
}
