import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {faSun, faMoon} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {rs} from 'utils/ResponsiveScreen';
import Color from 'assets/colors';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: rs(24),
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ThemeToggleButton = () => {
  const {theme, onThemeToggle} = useThemeContext();
  const {top} = useSafeAreaInsets();

  if (!__DEV__) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onThemeToggle}
      style={[
        styles.button,
        {marginTop: top, backgroundColor: theme.colors.accent},
      ]}>
      <FontAwesomeIcon
        icon={theme.name === 'Dark' ? faSun : faMoon}
        size={rs(20)}
        color={Color.White}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
