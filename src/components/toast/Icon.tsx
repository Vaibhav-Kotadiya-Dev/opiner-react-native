import React from 'react';
import {Icon} from 'react-native-flash-message';
import {
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';

interface ToastIconProps {
  type: Icon;
}

const getIconByType = (type: Icon) => {
  switch (type) {
    case 'danger':
      return faExclamationTriangle;
    case 'success':
      return faCheck;
    case 'warning':
      return faExclamationTriangle;
    default:
      return faInfoCircle;
  }
};

const getIconColorByType = (type: Icon) => {
  switch (type) {
    case 'danger':
      return Color.Primary.Red;
    case 'success':
      return Color.Primary.Green;
    case 'warning':
      return Color.Primary.Yellow;
    default:
      return Color.Primary.Blue;
  }
};

const ToastIcon = ({type}: ToastIconProps) => {
  return (
    <FontAwesomeIcon
      size={rs(24)}
      icon={getIconByType(type)}
      color={getIconColorByType(type)}
      style={{marginRight: rs(16)}}
    />
  );
};

export default ToastIcon;
