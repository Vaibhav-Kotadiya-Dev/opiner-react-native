import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {rs, wp} from 'utils/ResponsiveScreen';

const cardWidth = (wp(100) - rs(52)) / 2;

const styles = StyleSheet.create({
  container: {
    width: (wp(100) - rs(52)) / 2,
    backgroundColor: Color.Background.Light,
    height: cardWidth / 1.5,
    borderRadius: rs(8),
    marginTop: rs(16),
    marginHorizontal: rs(8),
    paddingTop: rs(16),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: rs(32),
  },
  blob: {
    width: rs(48),
    height: rs(48),
    position: 'absolute',
    top: -rs(20),
    left: -rs(20),
    borderRadius: rs(26),
    backgroundColor: Color.Primary.Yellow,
  },
  title: {
    fontSize: rs(12),
    lineHeight: rs(16),
    color: Color.Secondary.Disabled,
    fontWeight: 'bold',
  },
  value: {
    textAlign: 'center',
    color: Color.White,
    fontSize: rs(32),
    lineHeight: rs(39),
    fontFamily: Font.Heavy,
    marginTop: rs(12),
  },
});

export default styles;
