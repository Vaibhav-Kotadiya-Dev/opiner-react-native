import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import {PREVIEW_SIZE} from 'components/preview/styles';
import {CURRENT_RESPONSE_IMAGE_SIZE} from 'screens/timeline/components/RespondersList/styles';

const styles = StyleSheet.create({
  container: {},
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  full: {flex: 1},
  videoContainer: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    overflow: 'hidden',
    marginBottom: CURRENT_RESPONSE_IMAGE_SIZE / 2 + rs(12),
  },
  player: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  hideDisplay: {display: 'none'},
});

export default styles;
