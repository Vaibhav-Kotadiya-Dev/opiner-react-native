import React, {ReactElement, ReactNode} from 'react';
import {Text, TextProps} from 'react-native';

import styles from './styles';

interface Props extends TextProps {
  children: ReactNode;
}

export const RegularText = ({children, style}: Props): ReactElement => (
  <Text style={[styles.regular, style]}>{children}</Text>
);

export const TitleText = ({children, style}: Props): ReactElement => (
  <Text style={[styles.h1, style]}>{children}</Text>
);

export const MediumText = ({children, style}: Props): ReactElement => (
  <Text style={[styles.h6, style]}>{children}</Text>
);
