import {ACTIONS_PACKAGE} from '../../appConstants';
import {Action} from '../ActionInterface';

const JOIN_COMMUNITY = `${ACTIONS_PACKAGE}.JOIN_COMMUNITY`;
const PAUSE_COMMUNITY = `${ACTIONS_PACKAGE}.ACTIONS_PACKAGE`;
const RESUME_COMMUNITY = `${ACTIONS_PACKAGE}.RESUME_COMMUNITY`;
const GET_COMMUNITY = `${ACTIONS_PACKAGE}.GET_COMMUNITY`;
const LEAVE_COMMUNITY = `${ACTIONS_PACKAGE}.LEAVE_COMMUNITY`;
const RESET_COMMUNITY = `${ACTIONS_PACKAGE}.RESET_COMMUNITY`;
const GET_USER_COMMUNITIES = `${ACTIONS_PACKAGE}.GET_USER_COMMUNITIES`;

const joinCommunity = (code: string): Action => ({
  type: JOIN_COMMUNITY,
  payload: {
    code,
  },
});

const pauseCommunity = (id: number): Action => ({
  type: PAUSE_COMMUNITY,
  payload: {
    id,
  },
});

const resumeCommunity = (id: number): Action => ({
  type: RESUME_COMMUNITY,
  payload: {
    id,
  },
});

const getCommunity = (code: string): Action => ({
  type: GET_COMMUNITY,
  payload: {
    code,
  },
});

const getUserCommunities = (): Action => ({
  type: GET_USER_COMMUNITIES,
});

const leaveCommunity = (id: number): Action => ({
  type: LEAVE_COMMUNITY,
  payload: {
    id,
  },
});

const resetCommunitySearch = (): Action => ({
  type: RESET_COMMUNITY,
});

export {
  JOIN_COMMUNITY,
  PAUSE_COMMUNITY,
  GET_COMMUNITY,
  LEAVE_COMMUNITY,
  RESET_COMMUNITY,
  GET_USER_COMMUNITIES,
  RESUME_COMMUNITY,
  joinCommunity,
  pauseCommunity,
  getCommunity,
  leaveCommunity,
  resetCommunitySearch,
  getUserCommunities,
  resumeCommunity,
};
