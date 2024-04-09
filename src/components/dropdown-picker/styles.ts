import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

const dropDownInputStyles = StyleSheet.create({
  label: {
    fontWeight: '600',
    marginBottom: rs(4),
    fontSize: rs(12),
    lineHeight: rs(16),
  },
  wrapper: {marginBottom: rs(24), paddingVertical: 0},
  container: {
    minHeight: undefined,
    maxHeight: rs(48),
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
    borderWidth: 2,
    borderRadius: 0,
  },
  text: {fontSize: rs(16)},
  dropDownContainer: {borderWidth: 2, marginTop: 1},
});

export default dropDownInputStyles;
