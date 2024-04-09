import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {rs, wp} from 'utils/ResponsiveScreen';

const basicStyle = {
  color: Color.White,
  textShadowColor: '#0004',
  textShadowOffset: {
    width: rs(1),
    height: rs(1),
  },
  textShadowRadius: rs(4),
};

const styles = StyleSheet.create({
  container: {
    padding: rs(12),
    alignItems: 'center',
    minWidth: wp(20),
  },
  value: {
    fontFamily: Font.Bold,
    fontSize: rs(32),
    marginBottom: rs(8),
    ...basicStyle,
  },
  label: {
    fontFamily: Font.Bold,
    fontSize: rs(10),
    ...basicStyle,
  },
});

export default styles;
