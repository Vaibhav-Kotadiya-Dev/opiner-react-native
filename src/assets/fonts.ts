import {Platform} from 'react-native';

const Font: {
  Regular: string;
  Bold: string;
  SemiBold: string;
  Heavy: string;
  Light: string;
  Medium: string;
  MonoRegular: string;
  MonoMedium: string;
  MonoBold: string;
} = Platform.select({
  ios: {
    Regular: 'SFProDisplay-Regular',
    Bold: 'SFProDisplay-Bold',
    SemiBold: 'SFProDisplay-SemiBold',
    Heavy: 'SFProDisplay-Heavy',
    Light: 'SFProDisplay-Light',
    Medium: 'SFProDisplay-Medium',
    MonoRegular: 'SFMono-Regular',
    MonoMedium: 'SFMono-Medium',
    MonoBold: 'SFMono-Bold',
  },
  default: {
    Regular: 'Roboto-Regular',
    Bold: 'Roboto-Bold',
    SemiBold: 'Roboto-Medium',
    Heavy: 'Roboto-Black',
    Light: 'Roboto-Light',
    Medium: 'Roboto-Medium',
    MonoRegular: 'Roboto-Regular',
    MonoMedium: 'Roboto-Medium',
    MonoBold: 'Roboto-Bold',
  },
});

export default Font;
