import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  wrapper: {flex: 1, marginBottom: rs(16)},
  container: {
    marginBottom: rs(16),
  },
  time: {
    marginBottom: rs(4),
  },
});

export default styles;
