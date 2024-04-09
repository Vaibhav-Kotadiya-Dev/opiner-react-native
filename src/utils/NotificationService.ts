import PushNotification, {
  PushNotificationObject,
  ReceivedNotification,
} from 'react-native-push-notification';

import {handleNavigation} from 'screens/timeline';
import {NOTIFICATION_CHANNEL_ID} from '../appConstants';

// Create notification channel for Android
PushNotification.createChannel(
  {
    channelId: NOTIFICATION_CHANNEL_ID,
    channelName: 'Opiner Responder Client',
  },
  () => false,
);

PushNotification.configure({
  //@ts-ignore
  channelId: NOTIFICATION_CHANNEL_ID,

  // (required) Called when a remote or local notification is opened or received
  onNotification: (message: Omit<ReceivedNotification, 'userInfo'>) => {
    // User has opened the notification
    const {
      data: {list},
      userInteraction,
    } = message;
    if (list && userInteraction) {
      handleNavigation(list, message);
    }
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});

const showLocalNotification = (props: PushNotificationObject) => {
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: NOTIFICATION_CHANNEL_ID, // (required) channelId, if the channel doesn't exist, notification will not trigger.
    ...props,
  });
};

export {showLocalNotification};
