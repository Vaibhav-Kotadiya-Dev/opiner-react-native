import {Action} from '../ActionInterface';
import {LOGOUT, RESET_PASSWORD, SIGN_IN, SIGN_UP} from './actions';
import {FAILED, SUCCESS} from '../../appConstants';
import {NetworkDataState} from '../NetworkDataState';

export interface AuthenticationState extends NetworkDataState {
  readonly data: any;
  readonly resetData: any;
  readonly isLogged: boolean;
}

const initState: AuthenticationState = {
  data: null,
  resetData: null,
  loading: false,
  error: '',
  isLogged: false,
};

const authentication = (
  state: AuthenticationState = initState,
  action: Action,
): AuthenticationState => {
  let newState: AuthenticationState | null = null;
  switch (action.type) {
    case SIGN_UP:
      newState = {
        ...state,
        loading: true,
      };
      break;
    case `${SIGN_UP}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: action.response,
        error: '',
      };
      break;
    case `${SIGN_UP}${FAILED}`:
      newState = {
        ...state,
        loading: false,
        error: action.response,
      };
      break;
    case SIGN_IN:
      newState = {
        ...state,
        loading: true,
        isLogged: false,
      };
      break;
    case `${SIGN_IN}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: action.response,
        error: '',
        isLogged: true,
      };
      break;
    case `${SIGN_IN}${FAILED}`:
      newState = {
        ...state,
        loading: false,
        error: action.response,
      };
      break;
    case RESET_PASSWORD:
      newState = {
        ...state,
        resetData: null,
      };
      break;
    case `${RESET_PASSWORD}${SUCCESS}`:
      newState = {
        ...state,
        resetData: action.response,
      };
      break;
    case LOGOUT:
      newState = {
        ...initState,
      };
      break;
  }
  return newState || state;
};

export default authentication;
