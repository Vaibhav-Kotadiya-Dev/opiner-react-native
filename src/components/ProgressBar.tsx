import React, {useEffect} from 'react';
import {View, StyleSheet, ViewStyle, LayoutAnimation} from 'react-native';

import {TRANSPARENT_WHITE} from '../assets/colors';
import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';
import AppText from './app-text';
import Font from 'assets/fonts';

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    borderRadius: 12,
    height: rs(10),
    overflow: 'hidden',
    backgroundColor: tailwindColors.gray[200],
  },
  progress: {
    position: 'absolute',
    backgroundColor: tailwindColors.yellow[500],
    left: 0,
    top: 0,
    height: rs(10),
    borderRadius: 12,
  },
  sizeInfo: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: rs(12),
  },
});

interface Props {
  progress: number;
  style?: ViewStyle;
  theme?: any;
  size?: number;
}

const SizeInfo = ({value}: {value: number}) => {
  return (
    <View style={styles.sizeInfo}>
      <AppText style={{fontFamily: Font.MonoBold}} size="small">
        {Number(value).toFixed(1)}MB
      </AppText>
    </View>
  );
};

const SizeView = ({size, progress}: Pick<Props, 'progress' | 'size'>) => {
  if (typeof size === 'undefined') {
    return null;
  }
  const done = Math.min(size * (progress / 100), size);
  return (
    <View style={styles.sizeContainer}>
      <SizeInfo value={done} />
      <SizeInfo value={size} />
    </View>
  );
};

const ProgressBar = ({style, progress, size}: Props) => {
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [progress]);
  return (
    <View
      style={{
        marginVertical: rs(30),
      }}
    >
      <SizeView size={size} progress={progress} />
      <View
        style={[
          style,
          styles.progressBar,
          progress === -1 && {backgroundColor: TRANSPARENT_WHITE(0)},
        ]}
      >
        <View style={[styles.progress, {width: `${progress}%`}]} />
      </View>
    </View>
  );
};

export default ProgressBar;
