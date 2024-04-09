import React, {ReactNode, ReactElement} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

interface GradientViewProps {
  theme: LinearGradientProps;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const GradientView = ({
  theme,
  style,
  children,
}: GradientViewProps): ReactElement => (
  <LinearGradient {...theme} style={style}>
    {children}
  </LinearGradient>
);

export default GradientView;
