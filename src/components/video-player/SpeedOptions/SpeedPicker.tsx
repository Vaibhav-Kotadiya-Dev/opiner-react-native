import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {View as AnimatableView} from 'react-native-animatable';

import {baseColors} from 'theme/colors';
import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import {speedOptions} from './options';
import {videoControlButtonHeight} from '../VideoControls/ControlButton';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: videoControlButtonHeight,
    right: 0,
    paddingVertical: rs(12),
    zIndex: 1000,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(24),
    paddingVertical: rs(12),
  },
  title: {paddingHorizontal: rs(12)},
});

interface SpeedPickerOptionsProps {
  visible?: boolean;
  containerRef?: React.LegacyRef<AnimatableView>;
  onSelect?: (speed: number) => void;
  speed: number;
}

const SpeedPickerOptions = ({
  visible,
  containerRef: speedPickerViewRef,
  onSelect,
  speed,
}: SpeedPickerOptionsProps) => {
  const {theme} = useThemeContext();
  if (!visible) {
    return null;
  }
  return (
    <AnimatableView
      // @ts-ignore
      ref={speedPickerViewRef}
      style={[
        styles.container,
        {
          backgroundColor:
            theme.name === 'Light' ? baseColors.darkGrey : baseColors.text,
        },
      ]}
      animation="fadeIn"
      duration={300}
    >
      {speedOptions.map((option, index) => {
        const isSelected = speed === option.value;
        const accentColor = isSelected
          ? theme.colors.mutedText
          : theme.colors.white;
        return (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            activeOpacity={0.85}
            onPress={() => onSelect && onSelect(option.value)}
          >
            <FontAwesomeIcon
              icon={option.icon}
              color={accentColor}
              size={rs(26)}
            />
            <AppText style={[styles.title, {color: accentColor}]} size="h3">
              {option.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </AnimatableView>
  );
};

export default SpeedPickerOptions;
