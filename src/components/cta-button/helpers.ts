import {Props} from '@fortawesome/react-native-fontawesome';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

import {statusColors} from 'theme/colors';
import {ITheme} from 'theme/index';

export interface CTAButtonProps {
  title: string;
  onPress?: (something?: any) => void;
  iconProps?: Props;
  type?: CTAButtonType;
  subtitle?: string;
  imageUrl?: string;
  iconRightProps?: Partial<Props>;
  style?: StyleProp<ViewStyle>;
  withTopBorder?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  fallbackImageUrl?: string | null;
}

export type CTAButtonType =
  | 'primary'
  | 'warning'
  | 'success'
  | 'info'
  | 'danger';

const borderColorMap = {
  primary: 'rgba(255, 255, 255, 0.1)',
  ...statusColors,
};

export const getCTAButtonStyles = (
  type: CTAButtonType,
  theme: ITheme,
): {
  backgroundColor: string;
  color: string;
  chevronColor: string;
  subtitleColor: string;
  borderColor: string;
} => {
  const backgroundColorMap = {
    primary: theme.colors.background,
    warning: '#E66626',
    success: '#006C32',
    info: '#00509D',
    danger: '#BF1B0F',
  };

  const buttonStyles = {
    backgroundColor: backgroundColorMap[type],
    color: theme.colors.white,
    chevronColor: 'rgba(255, 255, 255, 0.4)',
    subtitleColor: theme.colors.white,
    borderColor: borderColorMap[type],
  };

  if (type === 'primary') {
    buttonStyles.color = theme.colors.link;
    buttonStyles.subtitleColor = theme.colors.secondaryText;
    buttonStyles.chevronColor = '#9c9c9c';
    buttonStyles.borderColor = theme.colors.border;
  }

  return buttonStyles;
};
