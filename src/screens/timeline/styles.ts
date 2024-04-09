import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  list: {
    paddingTop: 0,
    paddingBottom: rs(76),
  },
  sectionEmptyText: {
    paddingHorizontal: rs(30),
    paddingVertical: rs(16),
    fontWeight: '500',
  },
});

export default styles;
