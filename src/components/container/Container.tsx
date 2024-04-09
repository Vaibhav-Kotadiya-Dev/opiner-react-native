import React, {ReactElement, ReactNode} from 'react';
import {View, ViewStyle, StyleProp} from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import styles from './styles';
import Color from 'assets/colors';
import {getForceDevMode} from 'network/OpinerApi';
import useThemeContext from 'hooks/useThemeContext';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  showDevModeBackground?: boolean;
  hideBottomInset?: boolean;
  lightBackground?: boolean;
  safeAreaProps?: SafeAreaViewProps;
  withSafeArea?: boolean;
}

const Container = ({
  style,
  children,
  showDevModeBackground,
  hideBottomInset = false,
  lightBackground,
  safeAreaProps,
  withSafeArea = false,
}: ContainerProps): ReactElement => {
  const isDevMode = getForceDevMode();
  const {bottom} = useSafeAreaInsets();
  const {theme} = useThemeContext();
  const Wrapper = withSafeArea ? SafeAreaView : View;
  return (
    <Wrapper
      style={[
        styles.container,
        {backgroundColor: theme.colors.background},
        isDevMode &&
          showDevModeBackground && {
            backgroundColor: Color.Background.DevMode,
          },
        lightBackground && {backgroundColor: Color.Background.Light},
        hideBottomInset && withSafeArea && {paddingBottom: -bottom},
      ]}
      {...safeAreaProps}>
      <View style={[styles.container, style]}>{children}</View>
    </Wrapper>
  );
};

export default Container;
