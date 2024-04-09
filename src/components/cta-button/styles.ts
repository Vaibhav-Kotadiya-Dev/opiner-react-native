import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

export const minCTAButtonHeight = rs(96);

const styles = StyleSheet.create({
  container: {
    paddingVertical: rs(16),
    paddingHorizontal: rs(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: minCTAButtonHeight,
  },
  topBorder: {
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontWeight: '600',
  },
  subtitle: {
    lineHeight: undefined,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingRight: rs(16),
  },
  image: {
    maxHeight: rs(64),
    width: rs(76),
    maxWidth: rs(76),
    marginRight: rs(16),
  },
  icon: {marginRight: rs(16)},
});

export default styles;
