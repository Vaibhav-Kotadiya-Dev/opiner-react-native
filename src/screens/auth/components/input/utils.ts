import {ForwardRefRenderFunction, ReactNode} from 'react';
import {TextInputProps, StyleProp, ViewStyle, TextStyle} from 'react-native';

import {InputLabelProps} from './Label';

export interface InputProps extends TextInputProps, InputLabelProps {
  onChange?: (value: any) => void;
  left?: ReactNode;
  right?: ReactNode;
  isPassword?: boolean;
  helper?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  characterLimit?: number;
  error?: string;
  defaultPasswordVisible?: boolean;
}

export interface InputRefMethods {
  focus: () => void;
  clear: () => void;
  blur: () => void;
}

export type InputComponentType = ForwardRefRenderFunction<
  InputRefMethods,
  InputProps
>;
