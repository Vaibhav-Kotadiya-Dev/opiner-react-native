import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import * as Animatable from 'react-native-animatable';
import useThemeContext from 'hooks/useThemeContext';

import {rs} from 'utils/ResponsiveScreen';

import {faSpinnerThird} from '@fortawesome/pro-duotone-svg-icons';
import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';

interface SpinnerProps {
  iconProps?: Partial<Props>;
  style?: StyleProp<ViewStyle>;
}

const Spinner = ({iconProps: {size, ...rest} = {}, style}: SpinnerProps) => {
  const {theme} = useThemeContext();
  const spinnerSize = size || rs(12);

  return (
    <Animatable.View
      animation="rotate"
      easing="linear"
      iterationCount="infinite"
      style={[{height: spinnerSize, width: spinnerSize}, style]}
      duration={1000}
    >
      <FontAwesomeIcon
        icon={faSpinnerThird}
        size={spinnerSize}
        color={theme.colors.text}
        {...rest}
      />
    </Animatable.View>
  );
};

export default Spinner;
