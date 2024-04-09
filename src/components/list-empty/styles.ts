import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {hp, rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  wrapper: {
    height: hp(80),
    justifyContent: 'center',
  },
  container: {
    padding: rs(16),
    borderRadius: rs(8),
    backgroundColor: Color.Primary.Blue,
  },
  title: {
    fontSize: rs(32),
    lineHeight: rs(39),
    color: Color.White,
    marginBottom: rs(16),
    fontFamily: Font.Heavy,
    textAlign: 'center',
  },
  description: {
    fontSize: rs(16),
    lineHeight: rs(24),
    color: Color.White,
    textAlign: 'center',
    fontFamily: Font.Medium,
  },
});

export default styles;
