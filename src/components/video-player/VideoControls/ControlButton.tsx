import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';
import {faPlay, IconDefinition} from '@fortawesome/pro-solid-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';
import AppText from 'components/app-text';
import useThemeContext from 'hooks/useThemeContext';
import {baseColors} from 'theme/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export const videoControlButtonHeight = Dimensions.get('screen').width / 6; // 6 buttons

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: videoControlButtonHeight,
    width: '100%',
    flex: 1,
  },
});

interface IconButtonProps {
  onPress?: () => void;
  icon?: IconDefinition;
  disabled?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  title?: string;
  isBusy?: boolean;
  iconProps?: Partial<Props>;
  isAtEnd?: boolean;
}

const VideoControlButton = ({
  onPress,
  style,
  title,
  icon = faPlay,
  isBusy,
  disabled,
  iconProps,
}: IconButtonProps) => {
  const {theme} = useThemeContext();
  const tintColor = disabled ? theme.colors.mutedText : theme.colors.white;
  return (
    <AnimatedTouchable
      style={[
        styles.container,
        {
          backgroundColor:
            theme.name === 'Light' ? baseColors.darkGrey : baseColors.text,
        },
        style,
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
    >
      {isBusy ? (
        <ActivityIndicator color={tailwindColors.gray[400]} />
      ) : title ? (
        <AppText size="h4" style={{color: tintColor}}>
          {title}
        </AppText>
      ) : (
        <FontAwesomeIcon
          icon={icon}
          color={tintColor}
          size={rs(26)}
          {...iconProps}
        />
      )}
    </AnimatedTouchable>
  );
};

export default VideoControlButton;
