import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {hp, rs, wp} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Background.Default,
  },
  absoluteText: {
    position: 'absolute',
    fontFamily: Font.Medium,
    fontSize: rs(16),
  },
  lottieContainer: {
    position: 'absolute',
    justifyContent: 'center',
    top: (hp(100) - wp(100)) / 2 - rs(18),
  },
  lottie: {
    height: wp(100),
    width: wp(100),
  },
});

export default styles;
