import {StyleSheet} from 'react-native';

import {WHITE} from 'assets/colors';
import Font from 'assets/fonts';
import {rs} from 'utils/ResponsiveScreen';

const quoteStyles = StyleSheet.create({
  container: {
    paddingVertical: rs(12),
    marginVertical: rs(32),
    flex: 1,
  },
  indicator: {
    height: 14,
    width: 14,
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: 7,
    marginHorizontal: 4,
  },
  description: {
    fontSize: rs(20),
    fontFamily: Font.Medium,
    marginHorizontal: rs(24),
    marginBottom: rs(8),
    textAlign: 'left',
  },
  author: {
    textAlign: 'center',
    fontFamily: Font.Light,
  },
  authorInfo: {
    textAlign: 'center',
    fontFamily: Font.Light,
  },
  title: {
    textAlign: 'center',
    marginBottom: rs(4),
  },
});

export default quoteStyles;
