import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

export const formatNumberDigits = (value: number) =>
  value.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

interface TimerItemProps {
  value: number;
  label: string;
}

const TimeItem = ({value, label}: TimerItemProps) => (
  <View style={styles.container}>
    <Text style={styles.value}>{formatNumberDigits(value)}</Text>
    <Text style={styles.label}>
      {label.toUpperCase()}
      {value > 1 && 'S'}
    </Text>
  </View>
);

export default TimeItem;
