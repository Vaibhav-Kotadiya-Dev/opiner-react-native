import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {faCheckCircle} from '@fortawesome/pro-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'utils/Toast';
import {removeItem} from 'utils/VideoStateStore';
import {handleTimeLine} from 'screens/record/preview/utils';
import {reportToRaygun} from 'utils/Raygun';
import {HAS_ASKED_LIBRARY_PERMISSION} from 'appConstants';

const Constant = {
  isIOS: Platform.OS === 'ios',
};

const Permissions = {
  IOS: {
    Camera: PERMISSIONS.IOS.CAMERA,
    Gallery: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
  Android: {
    Camera: PERMISSIONS.ANDROID.CAMERA,
    Gallery: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  },
};

const checkPermission = async (isCamera: boolean): Promise<boolean> => {
  const OS = Constant.isIOS ? 'IOS' : 'Android';
  const permission = isCamera
    ? Permissions[OS].Camera
    : Permissions[OS].Gallery;
  const result = await check(permission);
  if (result === RESULTS.GRANTED) {
    return true;
  }
  return (await request(permission)) === RESULTS.GRANTED ? true : false;
};

const saveVideo = async (
  compressedURL: string,
  store: string,
  questionId: number,
  goBack: boolean = false,
): Promise<boolean> => {
  const uri = compressedURL.startsWith('file')
    ? compressedURL
    : 'file://' + compressedURL;
  if (Platform.OS === 'android') {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permission);
    } catch (error) {
      Alert.alert(
        'Permission needed!',
        'We need permission to save the video.',
      );
      reportToRaygun(error, 'Saving video - Permission needed! : saveVideo');
      return false;
    }
  }

  try {
    await CameraRoll.save(uri, {type: 'video'});
    if (!Constant.isIOS) {
      await AsyncStorage.setItem(HAS_ASKED_LIBRARY_PERMISSION, 'true');
    }
    removeItem(questionId);
    Toast.show({
      message: 'Response backed up',
      iconProps: {
        icon: faCheckCircle,
      },
    });
    if (goBack) {
      handleTimeLine();
    }
    return true;
  } catch (err: any) {
    reportToRaygun(err, 'Saving video: saveVideo');
    if (await checkPermission(false)) {
      // The permission is already granted so this is a real error.
      Toast.show({
        message:
          'Failed to save the video\n' +
          'Something went wrong while saving the video.',
        type: 'danger',
      });
    }
  }
  return false;
};

export {Constant, checkPermission, saveVideo};
