import axios, {AxiosResponse} from 'axios';
import {Platform} from 'react-native';
import deviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import Auth0 from 'react-native-auth0';
import CodePush from 'react-native-code-push';
import deviceInfoModule from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SignUpPayload, SignUpResponse} from './data/SignUpResponse';
import {ACCESS_TOKEN, EMAIL, PASSWORD} from '../appConstants';
import {SignInResponse} from './data/SignInResponse';
import IUser, {IUserPaymentDetails} from './data/User';
import {Timeline} from './data/Question';
import getConfigBasedOnEnv from './config';
import {logApiError, logFlowInformation, setUserId} from 'utils/Analytics';
import {reportToRaygun} from 'utils/Raygun';
import {ICommunity} from './data/Community';
import {ICountry} from './data/Country';
import {resetTo} from 'NavigationService';

let isForcedDev: boolean = false;
export const forceSetDevMode = (value: boolean) => (isForcedDev = value);
export const getForceDevMode = () => isForcedDev;

export const getConfig = getConfigBasedOnEnv;

export const axiosClient = axios.create();

export enum TrackStatus {
  OK = 0,
  Information = 1,
  Warning = 2,
  Error = 3,
  Recorded = 4,
}

export type TrackInfo = {
  questionId: number;
  status?: TrackStatus;
  fileSize?: string;
  description: string;
  previousResponseDuration?: number;
};

axiosClient.interceptors.request.use(async request => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN);
  if (request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axiosClient.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    console.log({error});
    logApiError({message: error.message});
    if (error.response && error.response.status === 401) {
      const loginData = await AsyncStorage.multiGet([EMAIL, PASSWORD]);
      const email: string | null =
        loginData[0].length > 0 ? loginData[0][1] : null;
      const password: string | null =
        loginData[1].length > 0 ? loginData[1][1] : null;
      if (!email || !password) {
        reportToRaygun(
          error,
          'API ERROR 401 - Force logging out: No saved email or password found.',
        );
        forceLogout();
        return null;
      }
      const response = await performSignIn(email, password);
      if (!response) {
        reportToRaygun(
          error,
          'API ERROR 401 - Force logging out: Login failed while retrying automatically.',
        );
        forceLogout();
        return null;
      }
      await AsyncStorage.setItem(ACCESS_TOKEN, response.accessToken);
      return await axiosClient.request(error.config);
    } else {
      reportToRaygun(error, 'API ERROR');
    }
    return error.response ? error.response : error;
  },
);

export const forceLogout = () => {
  resetTo('SPLASH_SCREEN', {isForceLogout: true});
};

export const getValidationErrorMessage = (response: AxiosResponse) => {
  let message =
    'Some error occurred while updating your profile. Please try again later.';
  if (response.status === 400) {
    if (response.data?.title) {
      message = response.data.title;
    }
    if (response.data.errors) {
      let errorMessage = '';
      Object.values(response.data.errors).forEach((errorArray: any) => {
        errorMessage = errorMessage.concat(
          errorMessage.length ? '\n' : '',
          errorArray.join('\n'),
        );
      });
      if (errorMessage) {
        message = errorMessage;
      }
    }
  }
  return message;
};

const saveLoginTime = () => {
  return axiosClient
    .post(`${getConfig().OPINER_BASE_URL}account/setLoginTime`)
    .then(() => {
      trackVideoStatus({
        questionId: -1,
        description: 'Post login version event',
        fileSize: '0',
        status: TrackStatus.Information,
      });
    });
};

const performResetPassword = (email: string): Promise<SignUpResponse> =>
  axios
    .post(`${getConfig().AUTH_URL}dbconnections/change_password`, {
      client_id: getConfig().CLIENT_ID,
      email,
      connection: getConfig().CONNECTION,
      roles: ['reviewer'],
    })
    .then(response => response.data);

const performLogOut = (): Promise<any> => {
  return axios.get(
    `${getConfig().AUTH_URL}logout?client_id=${getConfig().CLIENT_ID}`,
  );
};

const performSignUp = async (
  data: SignUpPayload,
): Promise<SignInResponse | null> => {
  try {
    await axiosClient.post(
      `${getConfig().OPINER_BASE_URL}account/register`,
      data,
    );
    trackVideoStatus({
      questionId: -1,
      description: 'User signed up',
    });
    return await performSignIn(data.email, data.password);
  } catch (error) {
    return null;
  }
};

const performSignIn = async (
  email: string,
  password: string,
): Promise<SignInResponse | null> => {
  const config = getConfig();
  const auth0 = new Auth0({
    domain: config.DOMAIN,
    clientId: config.CLIENT_ID,
  });
  try {
    const response = await auth0.auth.passwordRealm({
      username: email,
      password,
      audience: config.AUDIENCE,
      realm: 'Username-Password-Authentication',
    });
    await AsyncStorage.setItem(ACCESS_TOKEN, response.accessToken);
    trackVideoStatus({
      questionId: -1,
      description: 'User logged in',
    });
    saveLoginTime();
    return response;
  } catch (e) {
    return null;
  }
};

const opinerGetAllQuestions = async (): Promise<any> => {
  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}question/getlist`,
  );
  return response.status === 200 ? response.data : [];
};

const opinerGetTimelineEvents = async (id: number): Promise<Timeline> => {
  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}question/get/${id}`,
  );
  return response.data;
};

const opinerOptIn = async (id: number): Promise<any> => {
  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}response/optin/${id}`,
  );
  return response;
};

const opinerOptOut = async (id: number): Promise<any> => {
  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}response/optout/${id}`,
  );
  return response.data;
};

const opinerConfirm = async (id: number): Promise<any> => {
  const response = await axiosClient.post(
    `${getConfig().OPINER_BASE_URL}response/optinoutcancel/${id}`,
  );
  return response.data;
};

const opinerUpload = async (id: number, file: any): Promise<any> => {
  const body = new FormData();
  body.append('files', file);
  const options = {
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: {},
  };
  const response = await axiosClient.post(
    `${getConfig().OPINER_BASE_URL}response/post/${id}`,
    body,
    options,
  );
  return response.data;
};

const getBankDetails = async (): Promise<IUserPaymentDetails | null> => {
  try {
    const response = await axiosClient.get(
      `${getConfig().OPINER_BASE_URL}account/userpaymentget`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

const getAccount = async (): Promise<IUser> => {
  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}account/getextended`,
  );
  const bankDetailsResponse = await getBankDetails();
  if (response.data?.id) {
    setUserId(String(response.data.id));
  }
  // if (!__DEV__) {
  //   // Setting raygun user details
  //   const raygunUser = Raygun.getUser();
  //   if (!raygunUser.email) {
  //     const {id, email, firstName, fullName} = response.data;
  //     Raygun.setUser({
  //       identifier: raygunUser.identifier,
  //       uuid: id,
  //       email,
  //       firstName,
  //       fullName,
  //       isAnonymous: false,
  //     });
  //   }
  // }
  return bankDetailsResponse
    ? {...response.data, ...bankDetailsResponse}
    : response.data;
};

const changeQuestionStatus = (id: number) => {
  return axiosClient.get(
    `${getConfig().OPINER_BASE_URL}response/markviewed/${id}`,
  );
};

const setNotificationToken = ({
  token,
  action,
  os,
}: {
  email?: string;
  token: string;
  action: 'add' | 'remove';
  os: string;
}): Promise<any> => {
  return axiosClient.post(`${getConfig().OPINER_BASE_URL}account/settoken`, {
    // email,
    token,
    action,
    os,
  });
};

const getCharityList = ({countryId}: {countryId: number}): Promise<any> => {
  return axiosClient.get(
    `${getConfig().OPINER_BASE_URL}charity/getlist/${countryId}`,
  );
};

const setCharity = ({
  responseId,
  charityId,
}: {
  responseId?: number;
  charityId: number;
}): Promise<any> => {
  return axiosClient.get(
    `${getConfig().OPINER_BASE_URL}charity/set/${responseId}/${charityId}`,
  );
};

const trackVideoStatus = async ({
  questionId,
  status = TrackStatus.Information,
  description,
  fileSize = '0',
}: TrackInfo): Promise<any> => {
  if (__DEV__) {
    return;
  }
  const os = Platform.OS;
  const version = deviceInfo.getSystemVersion();
  const pushVersion = await CodePush.getUpdateMetadata();
  const appVersion = `${deviceInfoModule.getVersion()}${
    pushVersion ? pushVersion.label : ''
  }b${deviceInfoModule.getBuildNumber()}`;
  const connection = await NetInfo.fetch();

  const params = `QuestionId=${questionId}&Os=${os}&OsVersion=${version}&ConnectionType=${
    connection.type
  }&Description=${encodeURI(
    description,
  )}&FIleSize=${fileSize}&EventStatus=${status}&appVersion=${appVersion}`;
  const URL = `${getConfig().OPINER_BASE_URL}eventlog/add?${params}`;
  logFlowInformation({
    message: params,
  });
  return axiosClient.get(URL);
};

const getUserProfileImageUrl = (user: IUser) => {
  const forceUpdater = user?.modified ? '?d=' + user?.modified : '';
  if (user?.thumb) {
    return `${getConfig().OPINER_BASE_URL}${user.thumb}${forceUpdater}`;
  }
  return `${getConfig().OPINER_BASE_URL}account/getimage/${user?.id}/${
    user?.userAddress
  }${forceUpdater}`;
};

const getCommunityDetails = async (code: string): Promise<ICommunity[]> => {
  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}community/view/${code}`,
  );
  if (response.data && response.status === 200) {
    return [response.data];
  } else {
    return [];
  }
};

const getUserCommunities = async (): Promise<any> => {
  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}community/list`,
  );
  if (!response.data) {
    throw new Error("Unable to get user's community");
  }
  return response.data;
};

const joinCommunity = async (id: number): Promise<any> => {
  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}community/join/${id}/1`,
  );
  if (!response.data) {
    throw new Error('Unable to join community');
  }
  return response.data;
};

const leaveCommunity = async (id: string): Promise<any> => {
  await axiosClient.get(`${getConfig().OPINER_BASE_URL}community/leave/${id}`);
  return {id};
};

const pauseCommunity = async (id: string): Promise<any> => {
  await axiosClient.get(`${getConfig().OPINER_BASE_URL}community/pause/${id}`);
  return {id};
};

const resumeCommunity = async (id: string): Promise<any> => {
  await axiosClient.get(`${getConfig().OPINER_BASE_URL}community/resume/${id}`);
  return {id};
};

const resendConfirmationEmail = async (): Promise<any> =>
  await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}account/resendemailvalidate`,
  );

let countries: ICountry[] = [];
const getCountriesList = async (): Promise<ICountry[]> => {
  if (countries.length) {
    return countries;
  }

  const response = await axiosClient.get(
    `${getConfig().OPINER_BASE_URL}location/getlist`,
  );
  if (Array.isArray(response.data)) {
    // Cache the data
    countries = response.data;
    return response.data;
  }
  return [];
};

export {
  performResetPassword,
  performSignUp,
  performSignIn,
  performLogOut,
  opinerOptIn,
  opinerOptOut,
  opinerConfirm,
  opinerGetAllQuestions,
  opinerUpload,
  getAccount,
  saveLoginTime,
  setNotificationToken,
  opinerGetTimelineEvents,
  changeQuestionStatus,
  getCharityList,
  setCharity,
  trackVideoStatus,
  getUserProfileImageUrl,
  getCommunityDetails,
  joinCommunity,
  leaveCommunity,
  pauseCommunity,
  getCountriesList,
  getUserCommunities,
  resumeCommunity,
  resendConfirmationEmail,
};
