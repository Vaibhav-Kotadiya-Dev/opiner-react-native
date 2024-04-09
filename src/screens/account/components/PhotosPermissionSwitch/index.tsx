import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {
  PERMISSIONS,
  check,
  request,
  openSettings,
} from 'react-native-permissions';

import InfoItem from '../InfoItem';
import {rs} from 'utils/ResponsiveScreen';
import Checkbox from 'components/checkbox';
import HelperText from 'components/helper-text';

const photosPermission =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

interface PhotosPermissionSwitchProps {}

const PhotosPermissionSwitch = ({}: PhotosPermissionSwitchProps) => {
  const [hasPhotosPermission, setHasPhotosPermission] = useState(false);

  useEffect(() => {
    check(photosPermission).then(value => {
      if (value === 'granted') {
        setHasPhotosPermission(true);
      }
    });
  }, []);

  const handlePhotosPermissionToggle = (toggleValue: boolean) => {
    if (toggleValue) {
      request(photosPermission).then(value => {
        if (value === 'granted') {
          setHasPhotosPermission(true);
        } else if (value === 'blocked') {
          openSettings();
        }
      });
    } else {
      openSettings();
    }
  };

  return (
    <>
      <InfoItem style={{marginTop: rs(24)}} label="Access to photos">
        <HelperText>
          Allow the Opiner app access to Photos to so your response videos can
          be backed up. We will never share photos or videos without your
          permission. This can be configured in Settings.
        </HelperText>
      </InfoItem>
      <Checkbox
        title="Allow access to Photos"
        defaultValue={hasPhotosPermission}
        forcedValue={hasPhotosPermission}
        onToggle={value => {
          Alert.alert(
            hasPhotosPermission
              ? 'Revoke access to Photos?'
              : 'Let Opiner access Photos?',
            hasPhotosPermission
              ? "We won't be able to backup your response videos without your permission."
              : 'This lets you backup your response videos to your device.',
            [
              {text: 'Not Now'},
              {
                text: hasPhotosPermission ? 'Revoke Access' : 'Give Access',
                onPress: () => handlePhotosPermissionToggle(value),
              },
            ],
          );
        }}
      />
    </>
  );
};

export default PhotosPermissionSwitch;
