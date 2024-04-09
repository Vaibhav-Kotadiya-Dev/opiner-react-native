import React from 'react';
import FastImage, {Source} from 'react-native-fast-image';

import styles from './styles';
import {rs} from 'utils/ResponsiveScreen';

interface ResponderItemProps {
  onPress?: () => void;
  imageSource: Source | number;
  index: number;
}

const TimelineResponderItem = ({imageSource, index}: ResponderItemProps) => (
  <FastImage
    style={[styles.image, index !== 0 && {marginLeft: rs(8)}]}
    source={imageSource}
  />
);

export default TimelineResponderItem;
