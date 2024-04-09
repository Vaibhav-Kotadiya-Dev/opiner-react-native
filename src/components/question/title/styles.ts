import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: rs(16),
    left: rs(16),
  },
  label: {
    color: Color.White,
    textAlign: 'center',
    fontFamily: Font.Bold,
  },
  image: {height: rs(40), width: '100%', marginBottom: rs(16)},
  title: {
    color: Color.White,
    textAlign: 'center',
    fontFamily: Font.Heavy,
    fontSize: rs(32),
  },
});

export default styles;
