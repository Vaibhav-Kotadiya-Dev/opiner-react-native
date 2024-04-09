import React from 'react';

import inputStyles from './styles';
import AppText from 'components/app-text';
import Asterisk from 'components/asterisk';
import useThemeContext from 'hooks/useThemeContext';

export interface InputLabelProps {
  label?: string;
  showCompulsory?: boolean;
  textColor?: string;
}

const InputLabel = ({
  label: title,
  showCompulsory,
  textColor,
}: InputLabelProps) => {
  const {theme} = useThemeContext();
  if (!title) {
    return null;
  }
  return (
    <AppText
      size="h4"
      style={[inputStyles.label, {color: textColor || theme.colors.text}]}
    >
      {title}
      {showCompulsory ? ' ' : ''}
      {showCompulsory && <Asterisk color={theme.colors.text} />}
    </AppText>
  );
};

export default InputLabel;
