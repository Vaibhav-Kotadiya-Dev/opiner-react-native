import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {faChevronLeft} from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';

import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';

interface BackButtonProps extends Partial<Props> {
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const BackButton = ({onPress, containerStyle, ...rest}: BackButtonProps) => {
  const {theme} = useThemeContext();

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        color={theme.colors.text}
        size={rs(16)}
        {...rest}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
