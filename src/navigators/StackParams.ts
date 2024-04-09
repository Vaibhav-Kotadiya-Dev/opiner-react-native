import {Source} from 'react-native-fast-image';

import {Question, QuestionResponse} from 'network/data/Question';
import {ICommunity} from 'network/data/Community';

export type MainStackParam = {
  MAIN_SCREEN: {
    questionId?: number;
  };
  QUESTION_DETAILS_SCREEN: {
    question: Question;
  };
  RECORD_VIDEO_SCREEN: {
    question: Question;
    donationId?: number;
  };
  RESPONSE_PREVIEW_SCREEN: {
    question: Question;
    videoUri: string;
    response?: QuestionResponse;
  };
  RESPONSE_DETAILS_SCREEN: undefined;
  UPLOADING_SCREEN: {
    question: Question;
    videoUri: string;
  };
  UPDATE_ACCOUNT_INFORMATION: undefined;
  UPDATE_PROFESSIONAL_INFORMATION: undefined;
  USER_COMMUNITIES: undefined;
  UPDATE_PAYMENT_INFORMATION: undefined;
  ACCOUNT_MANAGEMENT: undefined;
  COMMUNITY_DETAILS: {
    community: ICommunity;
    isSignUpFlow: boolean;
  };
  ACCOUNT_SCREEN: undefined;
  COMMUNITIES_SCREEN: undefined;
  REWARD_SELECTION_SCREEN: {
    question: Question;
  };
  DONATION_SELECTION_SCREEN: {
    question: Question;
  };
  EDIT_PROFILE_IMAGE: undefined;
};

export type RootStackParam = {
  SPLASH_SCREEN: {isForceLogout?: boolean};
  Auth: undefined;
  Main: {isSignIn?: boolean};
};

export type AuthStackParamList = {
  LOGIN: undefined;
  REGISTER: undefined;
  WELCOME: undefined;
  COMMUNITIES: undefined;
  COMMUNITY_DETAILS: {community: ICommunity; isSignUpFlow: boolean};
};
