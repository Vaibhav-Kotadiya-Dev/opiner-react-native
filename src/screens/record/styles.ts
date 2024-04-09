import {StyleSheet, Dimensions, Platform} from 'react-native';
import {rs} from 'utils/ResponsiveScreen';

import {MAIN_WHITE, TRANSPARENT_GREY, WARNING_RED} from '../../assets/colors';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rs(8),
  },
  full: {flex: 1},
  videoContainer: {
    position: 'relative',
    height: width - rs(60),
    width: width - rs(60),
    borderRadius: rs(6),
    marginTop: rs(30),
    marginBottom: rs(16),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  buttons: {
    position: 'relative',
    marginTop: rs(16),
    paddingHorizontal: rs(30),
  },
  title: {
    backgroundColor: WARNING_RED,
    height: rs(70),
    width: '100%',
  },
  captureView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    alignSelf: 'center',
  },
  captureContainer: {
    marginTop: rs(48),
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
  },
  startCountdown: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: TRANSPARENT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startCountdownText: {
    fontSize: rs(36),
    color: MAIN_WHITE,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  btnClose: {
    position: 'absolute',
    padding: rs(8),
    right: rs(12),
    top: Platform.OS === 'android' ? 4 : 0,
  },
  info: {textAlign: 'center', marginHorizontal: 16},
});

export default styles;
