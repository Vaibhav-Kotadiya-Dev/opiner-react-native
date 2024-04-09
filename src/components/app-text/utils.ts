import {ReactNode} from 'react';
import {TextProps} from 'react-native';

export type TextSize =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'base'
  | 'small'
  | 'extraSmall'
  | 'default';

export interface AppTextProps extends TextProps {
  size?: TextSize;
  children?: ReactNode;
}
