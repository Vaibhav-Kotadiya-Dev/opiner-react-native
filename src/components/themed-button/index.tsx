import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import buttonStyles, {buttonColors} from './styles';
import useThemeContext from 'hooks/useThemeContext';

export type ThemedButtonType =
  | 'primary'
  | 'secondary'
  | 'hollow'
  | 'tertiary'
  | 'warning'
  | 'danger';

export type ThemedButtonSize = 'large' | 'small';

export interface ThemedButtonProps extends TouchableOpacityProps {
  title: ReactNode;
  isBusy?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: ThemedButtonType;
  size?: ThemedButtonSize;
  isAtBottom?: boolean;
  iconRight?: IconProp;
  iconLeft?: IconProp;
  noSpaceWithIcon?: boolean;
  iconSize?: number;
  leftIconColor?: string;
}

const ThemedButton = ({
  title,
  onPress,
  isBusy,
  containerStyle,
  textStyle,
  size = 'large',
  type = 'primary',
  disabled,
  isAtBottom,
  iconLeft,
  iconRight,
  noSpaceWithIcon,
  iconSize = 26,
  leftIconColor,
  style,
}: ThemedButtonProps) => {
  const {theme} = useThemeContext();
  const isDark = theme.name === 'Dark';

  const {background, text} = buttonColors.default;

  const hasTitle = Boolean(title);
  const backgroundColor = background[type] + (isDark ? 'ef' : '');

  return (
    <View
      style={[
        buttonStyles.wrapper,
        isAtBottom && {marginBottom: rs(40)},
        type === 'hollow' && buttonStyles.hollowWrapper,
        containerStyle,
        disabled && buttonStyles.disabled,
      ]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || isBusy}
        activeOpacity={0.8}
        style={[
          buttonStyles.container,
          size === 'small' && {height: rs(48)},
          {backgroundColor},
          style,
        ]}>
        {isBusy && (
          <ActivityIndicator
            style={buttonStyles.loading}
            color={
              ['hollow', 'tertiary'].includes(type) ? text[type] : Color.White
            }
            size="small"
          />
        )}
        <View
          style={[
            buttonStyles.titleContainer,
            isBusy && {marginLeft: -rs(40)},
          ]}>
          {iconLeft && (
            <FontAwesomeIcon
              icon={iconLeft}
              size={rs(iconSize)}
              color={isBusy ? 'transparent' : leftIconColor || text[type]}
              style={[buttonStyles.icon, !hasTitle && buttonStyles.noMargin]}
            />
          )}
          {hasTitle && (
            <AppText
              size={size === 'small' ? 'small' : 'h2'}
              style={[
                buttonStyles.title,
                {color: text[type]},
                iconRight && {marginLeft: rs(iconSize) + rs(8)},
                iconLeft && {marginRight: rs(16) + rs(8)},
                noSpaceWithIcon && buttonStyles.noFlex,
                textStyle,
              ]}>
              {title}
            </AppText>
          )}
          {iconRight && (
            <FontAwesomeIcon
              icon={iconRight}
              color={text[type]}
              size={rs(iconSize)}
              style={[
                buttonStyles.iconRight,
                !hasTitle && buttonStyles.noMargin,
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ThemedButton;
