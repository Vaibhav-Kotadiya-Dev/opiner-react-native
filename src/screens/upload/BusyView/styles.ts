import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  full: {flex: 1},
  container: {
    flex: 1,
    padding: rs(24),
  },
  title: {width: '100%', textAlign: 'center'},
  description: {
    fontSize: rs(17),
    marginTop: rs(12),
    lineHeight: rs(25),
    textAlign: 'center',
  },
  info: {
    marginVertical: rs(24),
    fontSize: rs(17),
    lineHeight: rs(22),
    textAlign: 'center',
  },
  lottie: {
    alignSelf: 'center',
    width: rs(414),
    height: rs(414),
  },
  titleContainer: {
    paddingVertical: rs(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: rs(24),
  },
  icon: {
    paddingHorizontal: rs(24),
    paddingVertical: rs(16),
  },
  gearIcon: {
    alignSelf: 'center',
  },
  step: {
    textAlign: 'center',
    fontFamily: Font.Heavy,
    letterSpacing: 1,
  },
  flex1: {flex: 1},
  loading: {
    marginVertical: rs(8),
  },
});

export default styles;
