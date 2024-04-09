import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  container: {
    borderRadius: rs(6),
    shadowColor: tailwindColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    marginBottom: rs(16),
    padding: rs(16),
  },
  noShadow: {shadowOpacity: 0},
});

interface CardProps {
  children?: ReactNode;
  withBorder?: boolean;
  noShadow?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Card = ({style, withBorder, noShadow, ...rest}: CardProps) => {
  const {theme} = useThemeContext();
  return (
    <View
      {...rest}
      style={[
        styles.container,
        {backgroundColor: theme.colors.cardBackground},
        // eslint-disable-next-line react-native/no-inline-styles
        withBorder && {borderColor: theme.colors.cardBorder, borderWidth: 1},
        noShadow && styles.noShadow,
        style,
      ]}
    />
  );
};

export default Card;
