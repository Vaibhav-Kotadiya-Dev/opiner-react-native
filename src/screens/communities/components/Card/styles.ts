import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

const communityCardStyles = StyleSheet.create({
  container: {
    borderRadius: rs(6),
    shadowColor: tailwindColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    marginBottom: rs(16),
  },
  image: {
    borderTopLeftRadius: rs(6),
    borderTopRightRadius: rs(6),
  },
  descriptionContainer: {
    paddingHorizontal: rs(16),
    paddingBottom: rs(16),
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    flex: 1,
    paddingRight: rs(16),
    marginTop: rs(16),
  },
  descriptionView: {flex: 1},
});

export default communityCardStyles;
