import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';
import {baseColors} from 'theme/colors';

const {white} = tailwindColors;

export const buttonColors = {
  disabled: {
    background: {
      primary: '#e888b2',
      secondary: '#fac9e4',
      danger: '#D5281B',
      hollow: 'transparent',
      warning: baseColors.orange,
      tertiary: 'white',
    },
    text: {
      primary: white,
      danger: 'white',
      secondary: '#f296c2',
      hollow: '#90e4f5',
      warning: 'white',
      tertiary: 'black',
    },
  },
  default: {
    background: {
      primary: '#017F3B',
      secondary: baseColors.darkGrey,
      danger: baseColors.red,
      hollow: 'transparent',
      warning: baseColors.orange,
      tertiary: '#ffffff',
    },
    text: {
      primary: white,
      danger: 'white',
      secondary: white,
      hollow: baseColors.blue,
      warning: 'white',
      tertiary: 'black',
    },
  },
};

const buttonStyles = StyleSheet.create({
  wrapper: {
    marginVertical: rs(16),
    backgroundColor: '#00401E',
    borderRadius: rs(8),
    paddingBottom: 4,
  },
  container: {
    borderRadius: rs(8),
    height: rs(72),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(24),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: rs(18),
    lineHeight: rs(24),
    textAlign: 'center',
    flex: 1,
  },
  full: {flex: 1},
  icon: {marginRight: rs(8)},
  noMargin: {marginRight: 0, marginLeft: 0},
  iconRight: {marginLeft: rs(8)},
  loading: {width: rs(40), alignItems: 'flex-start'},
  noFlex: {flex: 0},
  hollowWrapper: {backgroundColor: 'transparent'},
  disabled: {opacity: 0.7},
});

export default buttonStyles;
