import {StyleSheet} from 'react-native';
import tailwind from 'twrnc';

import {TextSize} from './utils';
import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

const {slate} = tailwindColors;

export const getThemedTextColor = (
  size: TextSize | 'muted' | 'helper',
  isDark: boolean,
) => {
  switch (size) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'small':
      return isDark ? slate[100] : slate[800];
    case 'base':
    case 'extraSmall':
      return isDark ? slate[300] : slate[600];
    case 'muted':
      return isDark ? slate[500] : slate[300];
    case 'helper':
      return slate[400];
    default:
      return isDark ? slate[200] : slate[700];
  }
};

export const responsiveTextStyles = StyleSheet.create({
  h1: {
    fontSize: rs(30),
    fontWeight: '700',
  },
  h2: {
    fontSize: rs(20),
    fontWeight: '700',
    lineHeight: rs(28),
  },
  h3: {
    fontSize: rs(18),
    fontWeight: '500',
    lineHeight: rs(28),
  },
  h4: {
    fontSize: rs(16),
    fontWeight: '500',
    lineHeight: rs(24),
  },
  base: {
    fontSize: rs(16),
    lineHeight: rs(24),
  },
  small: {
    fontSize: rs(14),
    lineHeight: rs(20),
  },
  extraSmall: {
    fontSize: rs(12),
    lineHeight: rs(16),
  },
  default: {
    fontSize: rs(16),
    lineHeight: rs(24),
  },
});

const tailwindTextStyles = {
  h1: tailwind`font-bold text-2xl`,
  h2: tailwind`font-bold text-xl`,
  h3: tailwind`font-bold text-lg`,
  h4: tailwind`text-base font-semibold`,
  base: tailwind`text-base`,
  default: tailwind`text-base`,
  small: tailwind`text-base font-medium`,
  extraSmall: tailwind`text-xs`,
};

export default tailwindTextStyles;
