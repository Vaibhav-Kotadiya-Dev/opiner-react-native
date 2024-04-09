import tailwindColors from './tailwindColors';

import {PromptMessageType} from 'components/prompt-message';

const {
  gray,
  slate,
  white,
  amber,
  red,
  blue,
  green,
  stone,
  black,
  yellow,
  cyan,
} = tailwindColors;
const transparent = 'transparent';

interface ICommonColors {
  accent: string;
  helperText: string;
  transparent: string;
  white: string;
  black: string;
}

export interface ThemeColors extends ICommonColors {
  background: string;
  secondaryBackground: string;
  devModeBackground: string;
  text: string;
  inputBackground: string;
  inputBorder: string;
  prompt: {
    background: Record<PromptMessageType, string>;
    text: Record<PromptMessageType, string>;
  };
  mutedText: string;
  invitationInputBackground: string;
  invitationInputBorder: string;
  cardBackground: string;
  cardBorder: string;
  modalBackground: string;
  modalIcon: string;
  contentLoaderPrimary: string;
  contentLoaderSecondary: string;
  link: string;
  border: string;
  secondaryText: string;
}

export const baseColors = {
  red: '#D5281B',
  orange: '#F47738',
  green: '#007F3B',
  darkGrey: '#4C6272',
  blue: '#005EB8',
  yellow: '#FFF500',
  text: '#212B32',
};

export const statusColors = {
  warning: baseColors.orange,
  danger: baseColors.red,
  info: baseColors.blue,
  success: baseColors.green,
};

const CommonColors: ICommonColors = {
  transparent,
  white,
  black,
  accent: baseColors.blue,
  helperText: slate[400],
};

export const LightColors: ThemeColors = {
  ...CommonColors,
  background: '#F0F4F5',
  secondaryBackground: '#fff',
  devModeBackground: stone[200],
  text: baseColors.text,
  secondaryText: baseColors.darkGrey,
  mutedText: '#989898',
  inputBackground: white,
  inputBorder: baseColors.darkGrey,
  prompt: {
    background: {
      warning: baseColors.orange,
      danger: baseColors.red,
      info: baseColors.blue,
      success: baseColors.green,
      default: baseColors.blue,
    },
    text: {
      warning: red[700],
      danger: baseColors.red,
      info: blue[700],
      success: green[700],
      default: slate[700],
    },
  },
  invitationInputBackground: yellow[200],
  invitationInputBorder: yellow[500],
  cardBackground: slate[100],
  cardBorder: slate[200],
  modalBackground: gray[100],
  modalIcon: slate[400],
  contentLoaderPrimary: slate[300],
  contentLoaderSecondary: slate[400],
  link: baseColors.blue,
  border: '#E2E2E2',
};

export const DarkColors: ThemeColors = {
  ...CommonColors,
  secondaryBackground: slate[800],
  background: slate[900],
  devModeBackground: '#302533',
  text: slate[200],
  secondaryText: baseColors.darkGrey,
  mutedText: slate[600],
  inputBackground: slate[600],
  inputBorder: slate[400],
  prompt: {
    background: {
      warning: amber[600],
      danger: red[600],
      info: blue[600],
      success: green[600],
      default: slate[800],
    },
    text: {
      warning: red[200],
      danger: red[200],
      info: blue[200],
      success: green[200],
      default: white,
    },
  },
  invitationInputBackground: slate[700],
  invitationInputBorder: slate[700],
  cardBackground: slate[700] + '70',
  cardBorder: slate[700],
  modalBackground: slate[800],
  modalIcon: slate[500],
  contentLoaderPrimary: slate[800],
  contentLoaderSecondary: slate[700],
  link: cyan[300],
  border: slate[700],
};
