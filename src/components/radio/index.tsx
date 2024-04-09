import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import AppText from 'components/app-text';
import useThemeContext from 'hooks/useThemeContext';
import {baseColors} from 'theme/colors';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(14),
  },
  radio: {
    padding: rs(4),
    borderRadius: rs(24),
    overflow: 'hidden',
  },
  outerCircle: {
    height: rs(40),
    width: rs(40),
    borderRadius: rs(20),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  innerCircle: {
    height: rs(24),
    width: rs(24),
    borderRadius: rs(12),
    overflow: 'hidden',
  },
  title: {
    marginLeft: rs(12),
  },
});

interface RadioButtonProps {
  title?: string;
  active?: boolean;
  onPress?: () => void;
}

const RadioButton = ({title, active, onPress}: RadioButtonProps) => {
  const {theme} = useThemeContext();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.container}>
      <View
        style={[
          styles.radio,
          active && {
            backgroundColor: baseColors.yellow,
            borderRadius: rs(24),
          },
        ]}>
        <View
          style={[
            styles.outerCircle,
            {
              borderColor: theme.colors.text,
              backgroundColor: theme.colors.inputBackground,
            },
          ]}>
          <View
            style={[
              styles.innerCircle,
              active && {
                backgroundColor: theme.colors.text,
                borderRadius: rs(12),
              },
            ]}
          />
        </View>
      </View>
      <AppText size="h4" style={styles.title}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default RadioButton;
