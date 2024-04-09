import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put} from 'redux-saga/effects';

import {LOGOUT, RESET_PASSWORD, SIGN_IN, SIGN_UP} from './actions';
import {Action} from '../ActionInterface';
import {
  ACCESS_TOKEN,
  EMAIL,
  FAILED,
  PASSWORD,
  SUCCESS,
} from '../../appConstants';
import {
  performLogOut,
  performResetPassword,
  performSignIn,
  performSignUp,
} from '../../network/OpinerApi';
import {SignInResponse} from '../../network/data/SignInResponse';
import reactotron from '../../ReactotronConfig';
import askNotification from 'utils/askNotification';
import {reportToRaygun} from 'utils/Raygun';
import {SignUpPayload} from 'network/data/SignUpResponse';
import Toast from 'utils/Toast';

export function* signUp(action: Action) {
  const data: SignUpPayload = action.payload;
  try {
    const signUpResponse: SignInResponse | null = yield call(
      performSignUp,
      data,
    );
    const {email} = data;
    if (!signUpResponse) {
      throw new Error('Some error occurred. Please try again.');
    }
    const signUpSuccessAction = {
      type: `${SIGN_UP}${SUCCESS}`,
      response: signUpResponse,
    };
    setTimeout(() => askNotification({email}), 1500);
    yield put(signUpSuccessAction);
  } catch (e) {
    reportToRaygun(e, 'Signing up');
    const failedAction: Action = {
      type: `${SIGN_UP}${FAILED}`,
      response: e.message,
    };
    yield put(failedAction);
  }
}

export function* signIn(action: Action) {
  const {email, password} = action.payload;
  try {
    const signInResponse: SignInResponse = yield call(
      performSignIn,
      email,
      password,
    );
    if (!signInResponse) {
      throw new Error('Please check email and password.');
    }
    AsyncStorage.setItem(ACCESS_TOKEN, signInResponse.accessToken);
    reactotron?.log?.(signInResponse.accessToken);
    const signInSuccessAction = {
      type: `${SIGN_IN}${SUCCESS}`,
      response: signInResponse,
    };
    setTimeout(() => askNotification({email}), 1500);
    yield put(signInSuccessAction);
  } catch (e: any) {
    reportToRaygun(e, 'Login Failed');
    Toast.show({
      message: 'Login failed',
      description: e.message,
      type: 'danger',
    });
    reactotron?.log?.(e);
    const failedAction: Action = {
      type: `${SIGN_IN}${FAILED}`,
      response: e.message,
    };
    yield put(failedAction);
  }
}

export function* resetPassword(action: Action) {
  const {email} = action.payload;
  try {
    const resetPasswordResponse: any = yield call(performResetPassword, email);
    yield put({
      type: `${RESET_PASSWORD}${SUCCESS}`,
      response: resetPasswordResponse,
    });
  } catch (e) {
    reportToRaygun(e, 'Reset password');
    yield put({
      type: `${RESET_PASSWORD}${FAILED}`,
      response: e.message,
    });
  }
}

export function* logout() {
  try {
    const logoutResponse: any = yield call(performLogOut);
    // @ts-ignore
    const action: Action = {
      type: `${LOGOUT}${SUCCESS}`,
      response: logoutResponse,
    };
    yield put(action);
    AsyncStorage.clear().catch(e =>
      reportToRaygun(e, 'Clearing async storage'),
    );
  } catch (e) {
    reportToRaygun(e, 'Logging out');
    const action: Action = {
      type: `${LOGOUT}${FAILED}`,
      response: e.message,
    };
    yield put(action);
  }
}
