import React from 'react';
import {TextProps, Text} from 'react-native';

import {AppTextProps} from './utils';
import useThemeContext from 'hooks/useThemeContext';
import tailwindTextStyles, {
  getThemedTextColor,
  responsiveTextStyles,
} from './styles';

const AppText = ({
  style,
  size = 'default',
  children,
  ...props
}: TextProps & AppTextProps) => {
  const {theme} = useThemeContext();
  return (
    <Text
      allowFontScaling={false}
      adjustsFontSizeToFit
      {...props}
      style={[
        tailwindTextStyles.base,
        tailwindTextStyles[size],
        responsiveTextStyles[size],
        {color: getThemedTextColor(size, theme.name === 'Dark')},
        style,
      ]}>
      {children}
    </Text>
  );
};

export default AppText;
