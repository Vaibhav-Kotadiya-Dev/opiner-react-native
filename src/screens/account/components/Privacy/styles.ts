import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

const {amber, blue} = tailwindColors;

const privacyCardStyles = StyleSheet.create({
  card: {
    borderTopWidth: rs(6),
    borderBottomWidth: rs(6),
    borderTopColor: amber[400],
    borderBottomColor: amber[400],
    backgroundColor: blue[900],
  },
  image: {
    height: rs(160),
    width: '100%',
    marginBottom: rs(8),
  },
  title: {
    marginTop: rs(12),
  },
});

export default privacyCardStyles;
