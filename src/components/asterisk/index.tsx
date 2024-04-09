import React from 'react';
import {faAsterisk} from '@fortawesome/pro-solid-svg-icons';

import useThemeContext from 'hooks/useThemeContext';

import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';
import {rs} from 'utils/ResponsiveScreen';
import {getThemedTextColor} from 'components/app-text/styles';

const Asterisk = (props: Partial<Props>) => {
  const {theme} = useThemeContext();

  return (
    <FontAwesomeIcon
      icon={faAsterisk}
      size={rs(12)}
      color={getThemedTextColor('helper', theme.name === 'Dark')}
      {...props}
    />
  );
};

export default Asterisk;
