import {StyleSheet, Dimensions} from 'react-native';
import {rs} from 'utils/ResponsiveScreen';

export const PREVIEW_SIZE = Dimensions.get('screen').width - rs(32);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    overflow: 'hidden',
  },
  preview: {
    height: '100%',
    width: '100%',
  },
  hidden: {display: 'none'},
});

export default styles;
