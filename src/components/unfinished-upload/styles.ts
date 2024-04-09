import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  box: {
    padding: rs(16),
    marginBottom: rs(16),
    borderRadius: rs(6),
  },
  title: {textAlign: 'center', marginBottom: rs(12)},
  description: {fontWeight: 'normal'},
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -rs(8),
  },
  upload: {flex: 1, marginEnd: rs(8)},
  save: {flex: 1, marginEnd: rs(16)},
  delete: {
    shadowOpacity: 0,
    elevation: 0,
    marginTop: rs(24),
  },
  mediumText: {fontWeight: '700'},
});

export default styles;
