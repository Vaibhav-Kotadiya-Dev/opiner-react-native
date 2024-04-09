import {SignUpPayload} from 'network/data/SignUpResponse';
import {ACTIONS_PACKAGE} from '../../appConstants';
import {Action} from '../ActionInterface';

const SIGN_UP = `${ACTIONS_PACKAGE}.SIGN_UP`;
const SIGN_IN = `${ACTIONS_PACKAGE}.SIGN_IN`;
const RESET_PASSWORD = `${ACTIONS_PACKAGE}.RESET_PASSWORD`;
const LOGOUT = `${ACTIONS_PACKAGE}.LOGOUT`;

const signUp = (data: SignUpPayload): Action => ({
  type: SIGN_UP,
  payload: data,
});

const signIn = (email: string, password: string): Action => ({
  type: SIGN_IN,
  payload: {
    email,
    password,
  },
});

const resetPassword = (email: string): Action => ({
  type: RESET_PASSWORD,
  payload: {
    email,
  },
});

const logout = (): Action => ({
  type: LOGOUT,
});

export {
  SIGN_UP,
  SIGN_IN,
  RESET_PASSWORD,
  LOGOUT,
  signUp,
  signIn,
  resetPassword,
  logout,
};
