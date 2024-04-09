import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useNetInfo from './useNetInfo';
import {Constant} from 'screens/upload/utils';
import tailwindColors from 'theme/tailwindColors';
import useThemeContext from 'hooks/useThemeContext';
import PromptMessage from 'components/prompt-message';
import {statusColors} from 'theme/colors';
import {faCloudSlash} from '@fortawesome/pro-solid-svg-icons';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 9999,
  },
});

const ConnectionStatus = () => {
  const netInfo = useNetInfo();
  const insets = useSafeAreaInsets();
  const {theme} = useThemeContext();
  const [isReady, setIsReady] = useState(false);

  // Show the prompt only after 5 seconds of app open/login. As the connection state might already be
  // busy, we don't want to prompt the users as soon as they enter the app or on splash screen
  useEffect(() => {
    const timerId = setTimeout(() => setIsReady(true), 5000);
    return () => clearTimeout(timerId);
  }, []);

  if (!isReady) {
    return null;
  }

  if (netInfo?.isInternetReachable) {
    return null;
  }

  const textColor =
    theme.name === 'Dark' ? tailwindColors.blue[200] : tailwindColors.blue[700];

  return (
    <View
      style={[
        styles.container,
        Constant.isIOS && {paddingTop: insets.top},
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: statusColors.warning,
        },
      ]}>
      <PromptMessage
        title="No internet connection"
        iconProps={{
          icon: faCloudSlash,
          color: theme.colors.white,
        }}
        type="warning"
      />
    </View>
  );
};

export default ConnectionStatus;
