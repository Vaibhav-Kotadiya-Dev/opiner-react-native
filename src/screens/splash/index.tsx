import React, {useState, useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import SplashScreenNative from 'react-native-splash-screen';
import {RouteProp, useRoute} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  saveLoginTime,
  forceSetDevMode,
  getConfig,
  getCountriesList,
} from 'network/OpinerApi';
import Splash from './Splash';
import Toast from 'utils/Toast';
import {reportToRaygun} from 'utils/Raygun';
import {loadAsync} from 'utils/LocalStorage';
import {ACCESS_TOKEN} from '../../appConstants';
import {logout} from 'store/authentication/actions';
import askNotification from 'utils/askNotification';
import VersionUpdateInfo from './version-update-info';
import {RootStackParam} from 'navigators/StackParams';
import {getUserCommunities} from 'store/community/actions';
import {useRootNavigation} from 'hooks/useNavigationHooks';

const isLowerVersion = (currentVersion: string, serverVersion: string) => {
  const current = currentVersion.replace(/[^\d]/g, '');
  const server = serverVersion.replace(/[^\d]/g, '');
  const len = Math.min(current.length, server.length);
  return (
    parseInt(server.substring(0, len), 10) >
    parseInt(current.substring(0, len), 10)
  );
};

type SplashState = {
  needsUpdate: boolean;
  requiredVersion: string;
  hasLoaded: boolean;
  hasAnimationEnded: boolean;
};

const initialState = {
  needsUpdate: false,
  requiredVersion: '',
  hasLoaded: false,
  hasAnimationEnded: false,
};

const lastNotified = {
  time: 0,
};

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [state, updateState] = useState(initialState);
  const navigation = useRootNavigation();
  const route = useRoute<RouteProp<RootStackParam, 'SPLASH_SCREEN'>>();

  const setState = (update: Partial<SplashState>) => {
    updateState(prevState => ({...prevState, ...update}));
  };

  useEffect(() => {
    if (!route.params?.isForceLogout) {
      return;
    }
    dispatch(logout());
    navigation.setParams({isForceLogout: false});
    forceSetDevMode(false);
    if (Date.now() - lastNotified.time < 7500) {
      return;
    }
    Toast.show({
      message: 'Session expired',
      description:
        'Your session has expired. Please login with your credentials.',
      type: 'danger',
    });
  }, [route.params?.isForceLogout, dispatch, navigation]);

  const handleLoadEnd = async () => {
    SplashScreenNative.hide();
    await loadAsync();
    await checkVersion();
  };

  const {hasAnimationEnded, hasLoaded} = state;

  useEffect(() => {
    if (!hasAnimationEnded || !hasLoaded) {
      return;
    }
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      if (token) {
        saveLoginTime()
          .then(console.log)
          .catch(e => {
            // Check if the error status is 401, if yes, prevent navigation to main screen
            console.log(e);
            reportToRaygun(e, 'Saving login time');
          });
        askNotification({silent: true});
        getCountriesList();
        dispatch(getUserCommunities());
        navigation.reset({
          routes: [{name: 'Main'}],
          index: 0,
        });
      } else {
        navigation.reset({
          routes: [{name: 'Auth'}],
          index: 0,
        });
      }
    });
  }, [hasAnimationEnded, hasLoaded]);

  const checkVersion = async () => {
    const isDevMode = await AsyncStorage.getItem('isDevMode');
    forceSetDevMode(!!isDevMode);
    try {
      const response = await axios.get(
        `${getConfig().OPINER_BASE_URL}common/versionget/${Platform.OS}`,
      );
      if (isLowerVersion(DeviceInfo.getVersion(), response.data)) {
        setState({needsUpdate: true, requiredVersion: response.data});
      }
    } catch (error) {
      reportToRaygun(error, 'Checking app version: checkVersion');
      console.log({error});
    } finally {
      const {needsUpdate} = state;
      if (!needsUpdate) {
        setState({hasLoaded: true});
      }
    }
  };

  const {needsUpdate} = state;

  if (needsUpdate) {
    return <VersionUpdateInfo version={state.requiredVersion} />;
  }

  return (
    <Splash
      onLoadEnd={handleLoadEnd}
      onAnimationEnd={() => {
        setState({hasAnimationEnded: true});
      }}
    />
  );
};

export default SplashScreen;
