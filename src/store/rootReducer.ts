import {Reducer} from 'redux';
import {PersistPartial} from 'redux-persist/es/persistReducer';

import allQuestions, {AllQuestionsState} from './all_questions/reducer';
import questionDetails, {
  QuestionDetailsState,
} from './question_details/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {PersistConfig} from 'redux-persist/es/types';
import authentication, {AuthenticationState} from './authentication/reducer';
import userProfile, {UserProfileState} from './profile/reducer';
import optInOut, {OptInOutState} from './opt_in_out/reducer';
import uploadResponse, {UploadResponseState} from './response/reducer';
import {Action} from './ActionInterface';
import {LOGOUT} from './authentication/actions';
import timelineEvents, {TimelineEventsState} from './timeline_events/reducer';
import communityReducer, {CommunityState} from './community/reducer';
import {SUCCESS} from 'appConstants';

export type AppState = Api & Other & PersistPartial;

export interface Api {
  allQuestions: AllQuestionsState;
  questionDetails: QuestionDetailsState;
  authentication: AuthenticationState;
  userProfile: UserProfileState;
  optInOutState: OptInOutState;
  uploadResponseState: UploadResponseState;
  timelineEventsState: TimelineEventsState;
  communityState: CommunityState;
}

export interface Other {}

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  blacklist: ['allQuestions', 'countriesByRegion', 'questionDetails'],
  stateReconciler: autoMergeLevel2,
};

export const rootReducer: Reducer<AppState> = (
  state: AppState | undefined,
  action: Action,
) => {
  if (action.type === `${LOGOUT}${SUCCESS}`) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const appReducer: Reducer<AppState> = persistCombineReducers<AppState>(
  persistConfig,
  {
    allQuestions: allQuestions,
    questionDetails: questionDetails,
    userProfile: userProfile,
    optInOutState: optInOut,
    authentication,
    uploadResponseState: uploadResponse,
    timelineEventsState: timelineEvents,
    communityState: communityReducer,
    _persist: () => ({rehydrated: true, version: 1}),
  },
);
