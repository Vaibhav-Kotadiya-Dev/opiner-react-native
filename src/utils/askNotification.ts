import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setNotificationToken} from '../network/OpinerApi';
import {showLocalNotification} from './NotificationService';
import {reportToRaygun} from './Raygun';
import Toast from './Toast';

const askNotification = async ({
  email,
  silent,
}: {
  email?: string;
  silent?: boolean;
}) => {
  try {
    await messaging().requestPermission();
    const token = await messaging().getToken();
    if (token) {
      await setNotificationToken({
        email,
        token,
        os: Platform.OS,
        action: 'add',
      });
      AsyncStorage.setItem('notification_token', token);
    }
    messaging().setBackgroundMessageHandler(async message => {
      showLocalNotification({
        message: message.notification?.body || '',
        title: message.notification?.title,
      });
    });
    if (!silent) {
      // Toast.show({
      //   message: 'Notification registered!',
      //   description: 'Your device has been registered for notification.',
      //   type: 'success',
      // });
    }
  } catch (exp: any) {
    reportToRaygun(exp, 'Notification permission');
    Toast.show({
      message: 'Oops!',
      description: "We couldn't register for notification.\n" + exp.message,
      type: 'warning',
    });
  }
};

export default askNotification;
