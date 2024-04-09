import {Dimensions, StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

const {width} = Dimensions.get('screen');
const spacing = rs(30);
const numColumns = 3;
const itemWidth = (width - spacing * (numColumns + 1)) / 3;
const largeItemWidth = width - itemWidth - spacing * 3;

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: itemWidth,
    marginRight: rs(30),
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: rs(15),
  },
  largeContainer: {
    width: largeItemWidth,
    height: largeItemWidth,
    marginRight: rs(30),
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: rs(15),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
  },
  name: {
    color: tailwindColors.white,
    fontWeight: '700',
    lineHeight: undefined,
  },
});

export default styles;
