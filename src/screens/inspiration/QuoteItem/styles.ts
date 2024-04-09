import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {hp, rs, wp} from 'utils/ResponsiveScreen';

export const quoteCardWidth = wp(100) - rs(96);

const styles = StyleSheet.create({
  container: {
    width: quoteCardWidth,
    height: hp(60),
    paddingVertical: rs(48),
    paddingHorizontal: rs(16),
    backgroundColor: Color.Background.Light,
    borderRadius: rs(16),
  },
  quoteWrapper: {flex: 1, justifyContent: 'center'},
  quote: {
    color: Color.White,
    fontFamily: Font.SemiBold,
    fontSize: rs(18),
  },
  author: {
    color: Color.White,
    fontFamily: Font.SemiBold,
    fontSize: rs(14),
    lineHeight: rs(21),
    textAlign: 'center',
  },
  authorIs: {
    color: Color.White,
    fontFamily: Font.SemiBold,
    fontSize: rs(12),
    lineHeight: rs(18),
    textAlign: 'center',
  },
});

export default styles;
