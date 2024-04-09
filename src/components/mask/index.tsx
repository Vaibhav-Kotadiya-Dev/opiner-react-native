import React from 'react';
import AppText from 'components/app-text';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import tailwindColors from 'theme/tailwindColors';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  translucent: {
    opacity: 0.5,
  },
  mask: {
    height: '102%',
    width: '102%',
    top: -2,
    position: 'absolute',
  },
  timedOut: {
    padding: rs(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  red: {
    backgroundColor: tailwindColors.red[500],
    opacity: 0.7,
  },
  info: {
    color: tailwindColors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    marginBottom: rs(8),
    textAlign: 'center',
  },
  details: {
    paddingHorizontal: rs(32),
  },
});

const MaskView = ({style, ...props}: Omit<FastImageProps, 'source'>) => {
  return (
    <FastImage
      source={require('assets/imgs/mask.png')}
      style={[styles.mask, styles.translucent, style]}
      {...props}
    />
  );
};

export const TimedOutView = ({
  visible,
  style,
  ...props
}: TouchableOpacityProps & {
  visible?: boolean;
}) => {
  if (!visible) {
    return null;
  }
  return (
    <TouchableOpacity style={[styles.mask, styles.timedOut, style]} {...props}>
      <View style={[StyleSheet.absoluteFillObject, styles.red]} />
      <View style={styles.details}>
        <AppText style={styles.title} size="h1">
          Time up
        </AppText>
        <AppText style={styles.info}>
          The maximum duration of 3 minutes was reached. Tap here to 'play' to
          review or 'upload' to submit your response.
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default MaskView;
