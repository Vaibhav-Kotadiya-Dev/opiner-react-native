import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: rs(16),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: rs(8),
    paddingHorizontal: rs(8),
    paddingVertical: rs(4),
    opacity: 0.8,
    overflow: 'hidden',
    borderColor: '#979797',
    borderWidth: 0.5,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {fontFamily: Font.Bold, fontSize: rs(16), marginLeft: rs(4)},
  leftStraight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  rightStraight: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default styles;
