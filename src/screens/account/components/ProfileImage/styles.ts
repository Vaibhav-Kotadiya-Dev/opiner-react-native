import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import {rs, wp} from 'utils/ResponsiveScreen';
import {WHITE, TRANSPARENT_RED} from 'assets/colors';

export const profileImageSize = rs(144);

export const getProfileImageStyles = (size: number = profileImageSize) => {
  return StyleSheet.create({
    wrapper: {
      marginVertical: rs(24),
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      position: 'absolute',
      top: 16,
      left: 16,
      right: 16,
      textAlign: 'center',
    },
    description: {
      color: WHITE,
      fontFamily: Font.Regular,
      fontSize: 17,
      marginBottom: 6,
    },
    button: {},
    background: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 12,
      right: 12,
    },
    optionsContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 12,
      paddingVertical: 16,
      backgroundColor: TRANSPARENT_RED(0.8),
    },
    imageLoading: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 999,
    },
    addImageButton: {
      position: 'absolute',
      left: wp(50) + size / 2 - rs(32),
      top: rs(32),
      backgroundColor: '#fff',
      overflow: 'hidden',
      borderRadius: rs(16),
    },
  })
};
