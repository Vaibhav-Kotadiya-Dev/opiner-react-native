import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

const promptMessageStyles = StyleSheet.create({
  container: {
    paddingHorizontal: rs(30),
    paddingVertical: rs(18),
    minHeight: rs(100),
    justifyContent: 'flex-end',
  },
  icon: {marginRight: rs(8), marginTop: rs(8)},
  title: {},
  full: {flex: 1},
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default promptMessageStyles;
