import {
  checkNotifications,
  PERMISSIONS,
  check,
  Permission,
} from 'react-native-permissions';
import {Constant} from 'screens/upload/utils';

const checkNotificationPermission = async (): Promise<boolean> => {
  const response = await checkNotifications();
  const hasPermission = response.status === 'granted';
  return hasPermission;
};

const checkLibraryPermissions = async () => {
  let permission: Permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
  if (Constant.isIOS) {
    permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  }
  const response = await check(permission);
  return response === 'granted';
};

export {checkNotificationPermission, checkLibraryPermissions};
