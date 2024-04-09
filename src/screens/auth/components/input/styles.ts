import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import {rs} from 'utils/ResponsiveScreen';

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: rs(24),
  },
  title: {
    fontSize: rs(12),
    fontFamily: Font.SemiBold,
    marginTop: rs(12),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(12),
    borderWidth: 2,
  },
  input: {
    paddingVertical: rs(8),
    fontSize: rs(16),
    flex: 1,
  },
  full: {flex: 1},
  label: {
    fontWeight: '500',
    marginBottom: rs(6),
  },
});

export default inputStyles;
