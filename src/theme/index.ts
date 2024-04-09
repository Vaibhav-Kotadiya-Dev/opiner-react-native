import {DarkColors, LightColors, ThemeColors} from './colors';

export type ThemeNameType = 'Light' | 'Dark';

export interface ITheme {
  name: ThemeNameType;
  colors: ThemeColors;
}

export const AppThemes: {Dark: ITheme; Light: ITheme} = {
  Dark: {name: 'Dark', colors: DarkColors},
  Light: {name: 'Light', colors: LightColors},
};

export const DefaultAppTheme = AppThemes.Light;
