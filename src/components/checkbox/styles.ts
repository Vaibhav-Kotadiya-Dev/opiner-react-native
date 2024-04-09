import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: rs(16),
  },
  checkbox: {
    height: rs(48),
    width: rs(48),
    borderWidth: 2,
  },
  checkBoxInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  title: {
    marginLeft: rs(12),
    fontSize: rs(16),
    flex: 1,
  },
  error: {
    marginBottom: -rs(16),
    marginTop: rs(16),
  },
});

export default styles;
