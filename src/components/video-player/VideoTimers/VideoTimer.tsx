import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';
import {baseColors} from 'theme/colors';

export const videoTimerHeight = rs(48);

const styles = StyleSheet.create({
  container: {
    borderRadius: rs(8),
    paddingHorizontal: rs(16),
    height: videoTimerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    opacity: 0.8,
  },
  title: {
    color: Color.White,
    fontFamily: Font.MonoMedium,
    fontSize: rs(24),
    lineHeight: undefined,
  },
});

interface VideoTimerProps {
  time?: ReactNode;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

const VideoTimer = ({
  time,
  style,
  textStyle,
  children,
  ...props
}: VideoTimerProps) => {
  return (
    <View
      {...props}
      style={[styles.container, {backgroundColor: baseColors.text}, style]}>
      {children ? (
        children
      ) : (
        <Text style={[styles.title, textStyle]}>{time}</Text>
      )}
    </View>
  );
};

export default VideoTimer;
