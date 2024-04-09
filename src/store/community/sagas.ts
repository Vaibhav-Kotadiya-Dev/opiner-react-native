import {call, put} from 'redux-saga/effects';

import {
  GET_COMMUNITY,
  GET_USER_COMMUNITIES,
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
  PAUSE_COMMUNITY,
  RESUME_COMMUNITY,
} from './actions';
import {Action} from '../ActionInterface';
import {FAILED, SUCCESS} from '../../appConstants';
import {
  joinCommunity,
  getCommunityDetails,
  leaveCommunity,
  pauseCommunity,
  getUserCommunities,
  resumeCommunity,
} from '../../network/OpinerApi';
import {reportToRaygun} from 'utils/Raygun';

function* performCommunityAction<T>(
  inAction: Action<{code?: string; id?: number}>,
  func: any,
  actionSpace: string,
) {
  try {
    const response: T = yield call(
      func,
      inAction.payload?.code ?? inAction.payload?.id,
    );
    const action: Action = {
      type: `${actionSpace}${SUCCESS}`,
      response,
    };
    yield put(action);
  } catch (e) {
    reportToRaygun(e, actionSpace);
    const action: Action = {
      type: `${actionSpace}${FAILED}`,
      response: (e as Error).message,
    };
    yield put(action);
  }
}

export function* getCommunityAsync(inAction: Action<{code: string}>) {
  yield call(
    performCommunityAction,
    inAction,
    getCommunityDetails,
    GET_COMMUNITY,
  );
}

export function* getUserCommunitiesAsync(inAction: Action<{code: string}>) {
  yield call(
    performCommunityAction,
    inAction,
    getUserCommunities,
    GET_USER_COMMUNITIES,
  );
}

export function* joinCommunityAsync(inAction: Action<{code: string}>) {
  yield call(performCommunityAction, inAction, joinCommunity, JOIN_COMMUNITY);
}

export function* pauseCommunityAsync(inAction: Action<{id: number}>) {
  yield call(performCommunityAction, inAction, pauseCommunity, PAUSE_COMMUNITY);
}

export function* resumeCommunityAsync(inAction: Action<{id: number}>) {
  yield call(
    performCommunityAction,
    inAction,
    resumeCommunity,
    RESUME_COMMUNITY,
  );
}

export function* leaveCommunityAsync(inAction: Action<{id: number}>) {
  yield call(performCommunityAction, inAction, leaveCommunity, LEAVE_COMMUNITY);
}
