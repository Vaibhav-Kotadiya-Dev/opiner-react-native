import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/pro-regular-svg-icons';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rs(16),
    paddingVertical: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginEnd: rs(16),
  },
});

interface SpeedOptionProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
}

const SpeedOption = ({title, onPress, isSelected}: SpeedOptionProps) => {
  const {theme} = useThemeContext();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.container}>
      <FontAwesomeIcon
        size={rs(16)}
        icon={faCheck}
        style={styles.icon}
        color={isSelected ? theme.colors.text : theme.colors.transparent}
      />
      <AppText>{title}</AppText>
    </TouchableOpacity>
  );
};

export default SpeedOption;
