import Color from 'assets/colors';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'disabled';
export type ButtonSize = 'large' | 'small';

const getButtonColor = (type: ButtonType) => {
  switch (type) {
    case 'secondary':
      return Color.Primary.Grey;
    case 'danger':
      return Color.Primary.Red;
    case 'success':
      return Color.Primary.Green;
    case 'disabled':
      return Color.Secondary.Disabled;
    case 'primary':
    default:
      return Color.Primary.Blue;
  }
};

const getUnderlayColor = (type: ButtonType) => {
  switch (type) {
    case 'secondary':
      return Color.Primary.Grey;
    case 'danger':
      return Color.Primary.Red;
    case 'success':
      return Color.Primary.Green;
    case 'disabled':
      return Color.Background.Light;
    case 'primary':
    default:
      return Color.Primary.Blue;
  }
};

export {getButtonColor, getUnderlayColor};
