import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';

interface Style {
  container: ViewStyle;
  wrapper: ViewStyle;
  title: TextStyle;
  full: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    borderRadius: rs(28),
    justifyContent: 'center',
    height: rs(56),
    marginTop: rs(24),
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(18),
  },
  title: {
    fontSize: rs(16),
    textAlign: 'center',
    color: Color.White,
    fontFamily: Font.SemiBold,
    lineHeight: rs(24),
    textTransform: 'uppercase',
  },
  full: {flex: 1},
});

export default styles;
