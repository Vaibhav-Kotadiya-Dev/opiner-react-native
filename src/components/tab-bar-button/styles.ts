import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

const tabBarButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    paddingVertical: 4,
  },
  label: {fontWeight: '600', marginTop: rs(4)},
  iconContainer: {flex: 1, justifyContent: 'center'},
  badge: {
    position: 'absolute',
    right: rs(8),
    top: rs(4),
    height: rs(20),
    minWidth: rs(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rs(24),
    zIndex: 999,
  },
  badgeText: {
    color: tailwindColors.white,
    fontWeight: 'bold',
    paddingHorizontal: rs(6),
  },
});

export default tabBarButtonStyles;
