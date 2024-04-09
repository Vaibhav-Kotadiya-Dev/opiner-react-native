import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import {baseColors} from 'theme/colors';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {zIndex: 10},
  controls: {
    flexDirection: 'row',
    backgroundColor: baseColors.darkGrey,
  },
  responderNameContainer: {position: 'absolute', left: rs(16), top: rs(16)},
  responderName: {
    fontFamily: Font.Regular,
    fontSize: rs(18),
    fontWeight: '700',
  },
  timersContainer: {
    position: 'absolute',
    top: rs(30),
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
});

export default styles;
