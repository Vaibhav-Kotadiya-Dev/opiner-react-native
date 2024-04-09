import {Dimensions, StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

const {height} = Dimensions.get('screen');

const communitySearchStyles = StyleSheet.create({
  listEmptyContainer: {
    justifyContent: 'center',
    height,
    paddingHorizontal: rs(24),
  },
  icon: {alignSelf: 'center'},
  title: {textAlign: 'center', marginBottom: rs(8)},
  description: {textAlign: 'center', marginBottom: rs(16)},
  emptyInfo: {
    textAlign: 'center',
    color: tailwindColors.red[600],
  },
  fullCenter: {flex: 1, justifyContent: 'center'},
  spinner: {alignSelf: 'center'},
  homeButton: {position: 'absolute', top: rs(24), left: rs(24)},
  header: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  full: {flex: 1},
});

export default communitySearchStyles;
