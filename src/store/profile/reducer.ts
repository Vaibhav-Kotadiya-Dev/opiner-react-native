import {Action} from '../ActionInterface';
import {GET_USER_PROFILE, UPDATE_USER_PROFILE} from './actions';
import {CLEAR, FAILED, SUCCESS} from '../../appConstants';
import {NetworkDataState} from '../NetworkDataState';
import IUser from '../../network/data/User';

export interface UserProfileState extends NetworkDataState {
  readonly data: IUser | null;
}

const initState: UserProfileState = {
  data: {},
  loading: false,
  error: 'Data is empty',
};

const userProfile = (
  state: UserProfileState = initState,
  action: Action,
): UserProfileState => {
  let newState: UserProfileState = {...state};
  switch (action.type) {
    case GET_USER_PROFILE:
      newState = {
        ...state,
        loading: true,
      };
      break;
    case UPDATE_USER_PROFILE:
      newState = {
        ...state,
        loading: true,
        data: {...state.data, ...action.payload},
      };
      break;
    case `${GET_USER_PROFILE}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: action.response,
        error: '',
      };
      break;
    case `${GET_USER_PROFILE}${FAILED}`:
      newState = {
        ...state,
        loading: false,
        error: action.response,
      };
      break;
    case `${GET_USER_PROFILE}${CLEAR}`:
      newState = initState;
      break;
  }
  return newState || state;
};

export default userProfile;
