export const PRIMARY_COLOR: string = 'rgb(50, 144, 255)';
export const MAIN_BLUE: string = 'rgb(50, 144, 255)';
export const LIGHT_BLUE: string = 'rgb(108, 175, 255)';
export const DIRTY_BLUE: string = 'rgb(49, 133, 233)';
export const DEEP_BLUE: string = 'rgb(23, 129, 251)';
export const MAIN_WHITE: string = 'rgb(255, 255, 255)';
export const PROCESSING_YELLOW: string = 'rgb(255, 251, 0)';
export const POSITIVE_GREEN: string = 'rgb(91, 255, 0)';
export const LIGHT_GREEN: string = 'rgb(130, 209, 65)';
export const GRASS_GREEN: string = 'rgb(72, 201, 0)';
export const WARNING_RED: string = '#D33425';
export const GUNSHIP_GREY: string = 'rgb(81, 81, 81)';
export const TRANSPARENT_GREY: string = 'rgba(51, 51, 51, 0.13)';
export const LIGHT_GREY: string = 'rgb(151, 151, 151)';
export const BACKGROUND_GREY: string = 'rgb(248, 248, 248)';
export const DIM_GREY: string = 'rgba(67, 68, 71, 0.7)';
export const BLACK: string = 'rgb(0, 0, 0)';
export const SPLASH_GREY: string = '#2c2c2c';
export const CURRENT_TIME: string = 'rgba(255, 255, 255, 0.25)';
export const PRIMARY_VIOLET: string = 'rgb(135, 34, 240)';
export const YELLOW_ORANGE: string = '#eeb003';
export const VIDEO_BACKGROUND_BLACK = '#2C2C2C';
export const VIDEO_BUTTON_BLACK = '#242424';

/**
 * New color values for v4 designs
 */
export const WHITE: string = '#FFFFFF';
export const SCREEN_BACKGROUND: string = '#212121';
export const TILE_BACKGROUND: string = '#2B2B2B';
export const ACTIVE_TILE_BACKGROUND: string = '#414141';
export const INFO: string = '#00A2BA';
export const WARNING: string = '#FFC300';
export const DANGER: string = '#FF3D2C';
export const SUCCESS: string = '#02A93F';
export const ORANGE: string = '#E37D4F';
export const PURPLE: string = '#5E58C7';
export const PINK: string = '#C75980';
export const BUTTON_PRIMARY: string = '#AFAFAF';
export const BUTTON_PRIMARY_ACTIVE: string = '#D2D2D2';
export const BUTTON_PRIMARY_DISABLED: string = '#4C4C4C';
export const BUTTON_SECONDARY: string = '#212121';
export const BUTTON_SECONDARY_ACTIVE: string = '#323232';
export const TRANSPARENT_WHITE = (opacity: number): string =>
  `rgba(255, 255, 255, ${opacity})`;
export const INPUT_BORDER: string = '#979797';
export const INPUT_BACKGROUND: string = 'rgba(43, 43, 43, 0.34)';
export const BUTTON_BORDER = (opacity: number): string =>
  `rgba(216, 216, 216, ${opacity})`;
export const TAB_INACTIVE_TITLE: string = '#AFAFAF';
export const TRANSPARENT: string = 'transparent';
export const DEV_MODE_BACKGROUND: string = '#BD10E0';
export const TRANSPARENT_RED = (opacity: number): string =>
  `rgba(255, 0, 0, ${opacity})`;

const Primary = {
  Blue: '#3087E6',
  Green: '#7ED321',
  Red: '#FF0000',
  Yellow: '#F7A006',
  Purple: '#5C5DC4',
  Pink: '#F43198',
  Grey: '#424242',
};

const Secondary = {
  Grey: '#D8D8D8',
  TabInactive: '#999999',
  Disabled: '#5D5D5D',
};

const Background = {
  Default: '#1A1A1A',
  Light: '#343434',
  DevMode: '#302533',
  Red: '#FF0102',
  Liver: '#4F0000',
};

const Color = {
  White: '#FFFFFF',
  Black: '#000000',
  Primary,
  Background,
  Secondary,
  Transparent: 'transparent',
  LightBlack: '#424242',
  Red: '#FF0000',
  Blue: '#3087E6',
  Green: '#7ED321',
  Orange: '#F7A006',
  Pink: '#F43198',
  Purple: '#5C5DC4',
  LightGray: '#696969',
  Gray: '#999999',
  DimmedGray: '#4A4A4A',
  ModalBackground: '#343434',
  DonationCardBackground: '#494949',
};

export default Color;
