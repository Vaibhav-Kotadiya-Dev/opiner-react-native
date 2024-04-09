import AsyncStorage from '@react-native-async-storage/async-storage';
import {HAS_ASKED_LIBRARY_PERMISSION} from 'appConstants';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {AppState, LayoutAnimation} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import {Constant} from 'screens/upload/utils';

import {
  checkLibraryPermissions,
  checkNotificationPermission,
} from 'utils/Permissions';

const useUserPermissions = () => {
  const [hasNotificationPermission, setHasPermission] = useState(false);
  const [hasLibraryPermission, setHasLibraryPermission] = useState(false);
  const [hasAskedLibraryPermission, setHasAskedLibraryPermission] =
    useState(false);

  const valueRef = useRef(hasNotificationPermission);
  const libraryRef = useRef(hasLibraryPermission);

  const handleFocus = () => {
    checkNotificationPermission().then(granted => {
      if (valueRef.current !== granted) {
        valueRef.current = granted;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHasPermission(granted);
      }
    });

    checkLibraryPermissions().then(granted => {
      if (libraryRef.current !== granted) {
        libraryRef.current = granted;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHasLibraryPermission(granted);
      }
    });

    if (Constant.isIOS) {
      AsyncStorage.getItem(HAS_ASKED_LIBRARY_PERMISSION).then(value => {
        if (value === 'true') {
          setHasAskedLibraryPermission(true);
        }
      });
    }
  };

  useLayoutEffect(() => {
    handleFocus();
  }, []);

  useEffect(() => {
    const {remove} = AppState.addEventListener('change', handleFocus);

    return () => {
      remove();
    };
  }, []);

  const requestLibraryPermission = () => {
    // Ask for permission
    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
      if (result === 'granted') {
        setHasLibraryPermission(true);
      }
    });
    setHasAskedLibraryPermission(true);
  };

  return {
    hasNotificationPermission,
    hasLibraryPermission,
    hasAskedLibraryPermission,
    requestLibraryPermission,
  };
};

export default useUserPermissions;
