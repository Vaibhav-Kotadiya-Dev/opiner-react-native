import {useCallback, useState} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {resetTo} from 'NavigationService';
import {AppState} from 'store/rootReducer';
import {LOGOUT} from 'store/authentication/actions';
import {forceSetDevMode, setNotificationToken} from 'network/OpinerApi';

const useLogout = () => {
  const dispatch = useDispatch();
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const [isBusy, setBusy] = useState(false);

  const logout = useCallback(async () => {
    setBusy(true);
    forceSetDevMode(false);

    const notificationToken = await AsyncStorage.getItem('notification_token');
    if (notificationToken) {
      setNotificationToken({
        email: user.email,
        token: notificationToken,
        os: Platform.OS,
        action: 'remove',
      });
    }

    dispatch({type: LOGOUT});
    setBusy(false);
    resetTo('Auth');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  return {logout, isLoggingOut: isBusy};
};

export default useLogout;
