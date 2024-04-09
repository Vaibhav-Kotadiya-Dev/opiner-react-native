import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  buttonContainer: {marginVertical: rs(16)},
  container: {flex: 1, justifyContent: 'flex-end'},
  touchable: {flex: 1, backgroundColor: '#0005'},
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopLeftRadius: rs(6),
    borderTopRightRadius: rs(6),
    paddingVertical: rs(12),
  },
});

export default styles;
