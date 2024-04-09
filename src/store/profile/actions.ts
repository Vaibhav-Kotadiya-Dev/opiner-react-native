import IUser from 'network/data/User';
import {ACTIONS_PACKAGE} from '../../appConstants';
import {Action} from '../ActionInterface';

const GET_USER_PROFILE = `${ACTIONS_PACKAGE}.GET_USER_PROFILE`;
const UPDATE_USER_PROFILE = `${ACTIONS_PACKAGE}.UPDATE_USER_PROFILE`;

const getUserProfile = (): Action => ({
  type: GET_USER_PROFILE,
});

const updateUserProfile = (payload: Partial<IUser>): Action => ({
  type: UPDATE_USER_PROFILE,
  payload,
});

export {
  GET_USER_PROFILE,
  getUserProfile,
  updateUserProfile,
  UPDATE_USER_PROFILE,
};
