import React, {ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';

import styles from './styles';
import AppText from 'components/app-text';

export interface ResponderItemProps
  extends Pick<TouchableOpacityProps, 'onPress' | 'disabled'> {
  name?: ReactNode;
  imageSource: Source | number;
  size?: 'large' | 'small';
}

const ResponderItem = ({
  imageSource,
  onPress,
  name,
  disabled,
  size = 'small',
}: ResponderItemProps) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    disabled={disabled}
    style={[styles.container, size === 'large' && styles.largeContainer]}
  >
    <FastImage style={styles.image} source={imageSource} />
    <View style={styles.overlay}>
      <AppText
        size="small"
        numberOfLines={1}
        adjustsFontSizeToFit
        style={styles.name}
      >
        {name}
      </AppText>
    </View>
  </TouchableOpacity>
);

export default ResponderItem;
