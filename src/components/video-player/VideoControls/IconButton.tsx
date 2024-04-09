import React from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';
import {faPlay, IconDefinition} from '@fortawesome/pro-solid-svg-icons';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';
import {RegularText} from 'components/text/StyledText';
import {baseColors} from 'theme/colors';

type MediaButtonType = 'large' | 'medium' | 'small' | 'button';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const getButtonSizeByType = (type: MediaButtonType) => {
  switch (type) {
    case 'large':
      return rs(80);
    case 'medium':
      return rs(64);
    case 'button':
      return rs(40);
    default:
      return rs(48);
  }
};

const getIconSizeByType = (type: MediaButtonType) => {
  switch (type) {
    case 'large':
      return rs(28);
    case 'medium':
      return rs(23);
    default:
      return rs(16);
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: baseColors.darkGrey,
    shadowColor: Color.Black,
    shadowOffset: {width: 0, height: rs(2)},
    shadowOpacity: 0.4,
  },
});

interface IconButtonProps {
  onPress?: () => void;
  type?: MediaButtonType;
  icon?: IconDefinition;
  disabled?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  title?: string;
  dimmed?: boolean;
  isBusy?: boolean;
  iconProps?: Partial<Props>;
}

const IconButton = ({
  type = 'small',
  onPress,
  style,
  title,
  icon = faPlay,
  dimmed,
  isBusy,
  disabled,
  iconProps,
}: IconButtonProps) => {
  const buttonSize = getButtonSizeByType(type);

  return (
    <AnimatedTouchable
      style={[
        styles.container,
        {height: buttonSize, width: buttonSize, borderRadius: buttonSize / 2},
        style,
      ]}
      activeOpacity={1}
      disabled={disabled}
      onPress={onPress}
    >
      {isBusy ? (
        <ActivityIndicator color={Color.Secondary.Grey} />
      ) : title ? (
        <RegularText
          style={{
            fontSize: rs(12),
            fontFamily: Font.Medium,
            color: Color.Secondary.TabInactive,
          }}
        >
          {title}
        </RegularText>
      ) : (
        <FontAwesomeIcon
          icon={icon}
          style={{
            color: dimmed ? Color.Secondary.TabInactive : Color.White,
          }}
          size={getIconSizeByType(type)}
          {...iconProps}
        />
      )}
    </AnimatedTouchable>
  );
};

export default IconButton;
