import React, {ReactElement} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';
import {INFO} from 'assets/colors';

interface TinyLabelProps {
  children: string;
  left?: boolean;
  onPress?: () => void;
}

const TinyLabel = ({children, left, onPress}: TinyLabelProps): ReactElement => (
  <TouchableOpacity
    activeOpacity={0.85}
    disabled={!onPress}
    style={[
      styles.container,
      left ? {left: 16, backgroundColor: INFO} : {right: 16},
    ]}
    onPress={onPress}>
    <Text style={styles.title}>{children && children.toUpperCase()}</Text>
  </TouchableOpacity>
);

export default TinyLabel;
