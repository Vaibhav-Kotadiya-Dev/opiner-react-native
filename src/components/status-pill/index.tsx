import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {ITheme} from 'theme/index';
import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import tailwindColors from 'theme/tailwindColors';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  container: {
    borderRadius: rs(24),
    paddingVertical: rs(2),
    paddingHorizontal: rs(12),
    alignSelf: 'flex-start',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});

const {green, orange, blue, red} = tailwindColors;

const getStatusPillColor = (theme: ITheme, type?: StatusPillType) => {
  const isDark = theme.name === 'Dark';
  switch (type) {
    case 'success':
      return {
        background: isDark ? green[100] : green[300],
        text: green[800],
      };
    case 'warning':
      return {
        background: isDark ? orange[100] : orange[300],
        text: orange[800],
      };
    case 'danger':
      return {
        background: red[500],
        text: red[100],
      };
    case 'info':
    default:
      return {
        background: isDark ? blue[100] : blue[300],
        text: blue[800],
      };
  }
};

export type StatusPillType = 'danger' | 'warning' | 'success' | 'info';
export interface StatusPillProps {
  status: string;
  textColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  size?: 'large' | 'small';
  type?: StatusPillType;
}

const StatusPill = ({
  status,
  backgroundColor,
  textColor,
  size = 'large',
  style,
  type,
}: StatusPillProps) => {
  const {theme} = useThemeContext();
  const {background, text} = getStatusPillColor(theme, type);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: backgroundColor || background},
        style,
      ]}>
      <AppText
        size={size === 'large' ? 'h4' : 'extraSmall'}
        style={[styles.title, {color: textColor || text}]}>
        {status}
      </AppText>
    </View>
  );
};

export default StatusPill;
