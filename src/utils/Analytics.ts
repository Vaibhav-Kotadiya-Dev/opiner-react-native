import firebaseAnalytics from '@react-native-firebase/analytics';

const Analytics = firebaseAnalytics();
const isDevMode = __DEV__;

type AnalyticsCustomEventType =
  | 'api_error'
  | 'video_response_error'
  | 'user_flow';

const logErrorToFirebase = (
  event: AnalyticsCustomEventType,
  data: {[key: string]: any} = {},
) => {
  if (isDevMode) {
    data.isDevMode = true;
  }
  Analytics.logEvent(event, data);
};

const logApiError = (data: {message: string}) => {
  logErrorToFirebase('api_error', data);
};

const logResponseError = (data: {message: string}) => {
  logErrorToFirebase('video_response_error', data);
};

const logFlowInformation = (data: {message: string}) => {
  logErrorToFirebase('user_flow', data);
};

const setUserId = (id: string) => Analytics.setUserId(id);

export {
  logErrorToFirebase,
  logApiError,
  logResponseError,
  logFlowInformation,
  setUserId,
};
