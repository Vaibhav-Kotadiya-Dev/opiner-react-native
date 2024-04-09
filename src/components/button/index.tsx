import React from 'react';
import {
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconDefinition} from '@fortawesome/pro-solid-svg-icons';

import styles from './styles';
import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';
import {ButtonSize, ButtonType, getButtonColor} from './helpers';

export interface ButtonProps {
  title: string;
  onPress?: (something?: any) => void;
  isBusy?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: ButtonType;
  size?: ButtonSize;
  icon?: IconDefinition;
  isAtBottom?: boolean;
  color?: string;
}

const Button = ({
  title,
  onPress,
  isBusy,
  containerStyle,
  textStyle,
  size = 'large',
  type = 'primary',
  icon,
  color,
  isAtBottom,
}: ButtonProps) => {
  const tintColor = type === 'disabled' ? Color.Primary.Grey : Color.White;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={type === 'disabled' || isBusy}
      activeOpacity={0.8}
      style={[
        styles.container,
        size === 'small' && {height: rs(40)},
        {backgroundColor: getButtonColor(type)},
        isAtBottom && {marginBottom: rs(32)},
        containerStyle,
      ]}
    >
      <View style={styles.wrapper}>
        {isBusy ? (
          <ActivityIndicator color={Color.White} size="small" />
        ) : (
          icon && (
            <FontAwesomeIcon
              icon={icon}
              size={size === 'large' ? rs(18) : rs(16)}
              color={color || tintColor}
            />
          )
        )}
        <View style={[styles.full, {marginLeft: icon ? -rs(18) : undefined}]}>
          <Text
            style={[
              styles.title,
              {color: color || tintColor},
              size === 'small' && {fontSize: rs(14)},
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
