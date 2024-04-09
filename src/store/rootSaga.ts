import {all, takeEvery, takeLeading} from 'redux-saga/effects';
import {GET_ALL_QUESTIONS} from './all_questions/actions';
import {getAllQuestions} from './all_questions/sagas';
import {
  LOGOUT,
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_UP,
} from './authentication/actions';
import {signIn, signUp, resetPassword, logout} from './authentication/sagas';
import {
  GET_COMMUNITY,
  GET_USER_COMMUNITIES,
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
  PAUSE_COMMUNITY,
  RESUME_COMMUNITY,
} from './community/actions';
import {
  getCommunityAsync,
  getUserCommunitiesAsync,
  joinCommunityAsync,
  pauseCommunityAsync,
  leaveCommunityAsync,
  resumeCommunityAsync,
} from './community/sagas';
import {OPT_IN, OPT_OUT} from './opt_in_out/actions';
import {optIn, optOut} from './opt_in_out/sagas';
import {GET_USER_PROFILE} from './profile/actions';
import {getUserProfile} from './profile/sagas';
import {GET_TIMELINE_EVENTS} from './timeline_events/actions';
import {getTimelineEvents} from './timeline_events/sagas';

export function* rootSaga() {
  yield all([
    takeEvery(GET_ALL_QUESTIONS, getAllQuestions),
    takeLeading(SIGN_UP, signUp),
    takeLeading(SIGN_IN, signIn),
    takeEvery(OPT_IN, optIn),
    takeEvery(OPT_OUT, optOut),
    takeEvery(RESET_PASSWORD, resetPassword),
    // takeEvery(OPT_CONFIRM, optConfirm),
    takeEvery(GET_USER_PROFILE, getUserProfile),
    takeEvery(LOGOUT, logout),
    takeEvery(GET_TIMELINE_EVENTS, getTimelineEvents),
    takeEvery(JOIN_COMMUNITY, joinCommunityAsync),
    takeEvery(PAUSE_COMMUNITY, pauseCommunityAsync),
    takeEvery(RESUME_COMMUNITY, resumeCommunityAsync),
    takeEvery(LEAVE_COMMUNITY, leaveCommunityAsync),
    takeEvery(GET_COMMUNITY, getCommunityAsync),
    takeEvery(GET_USER_COMMUNITIES, getUserCommunitiesAsync),
  ]);
}
