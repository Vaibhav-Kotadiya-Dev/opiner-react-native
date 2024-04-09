import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

export const statusTextColor = 'rgb(30, 41, 59)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  paddedContainer: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {backgroundColor: tailwindColors.red[200]},
  successContainer: {backgroundColor: tailwindColors.green[200]},
  title: {
    marginVertical: rs(16),
    textAlign: 'center',
    color: tailwindColors.green[500],
  },
  message: {textAlign: 'center', marginBottom: rs(16)},
  description: {
    marginTop: rs(16),
    textAlign: 'left',
    color: statusTextColor,
  },
  descriptionText: {fontSize: 17, lineHeight: 25},
  info: {marginVertical: 16, textAlign: 'left'},
  mail: {paddingLeft: 8},
  successDescription: {color: statusTextColor},
  successIcon: {alignSelf: 'center'},
  successLottie: {
    height: '110%',
    position: 'absolute',
    width: '110%',
    top: '-2.5%',
    left: '-2.5%',
  },
});

export default styles;
