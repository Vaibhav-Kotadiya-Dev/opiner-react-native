import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

/**
 * Calculating responders image size:
 * Full screen width = wp(100)
 * Margins (question list horizontal padding (16+16) and responder list horizontal margin (16+16)) = rs(64)
 * 5 item's overlap distance = rs(5) * 5
 * Fitting 6 items -> /6
 */
// export const RESPONDER_IMAGE_SIZE = (wp(100) - rs(64) + rs(6) * 5) / 6;
export const RESPONDER_IMAGE_SIZE = rs(30);
export const CURRENT_RESPONSE_IMAGE_SIZE = rs(30);

const styles = StyleSheet.create({
  image: {
    width: RESPONDER_IMAGE_SIZE,
    height: RESPONDER_IMAGE_SIZE,
  },
  name: {textAlign: 'center', width: '100%'},
});

export default styles;
