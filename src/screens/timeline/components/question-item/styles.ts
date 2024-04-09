import {StyleSheet, Dimensions} from 'react-native';
import tailwindColors from 'theme/tailwindColors';

import {rs} from 'utils/ResponsiveScreen';

const imageWidth = Dimensions.get('screen').width - rs(32);

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginBottom: rs(32),
    shadowColor: tailwindColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  image: {
    height: imageWidth,
    width: imageWidth,
    marginBottom: rs(16),
  },
  button: {marginHorizontal: rs(16), marginBottom: rs(16)},
  detailView: {
    paddingHorizontal: rs(16),
  },
  statusText: {marginTop: -rs(8)},
  preview: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  bold: {fontWeight: 'bold'},
});

export default styles;
