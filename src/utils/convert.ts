import {NativeModules, Platform} from 'react-native';
import convertToProxyURL from 'react-native-video-cache';

export default (url: string) =>
  Platform.OS === 'android'
    ? NativeModules.VideoCache.convert(url)
    : convertToProxyURL(url);

export const convertAsync = NativeModules.VideoCache.convertAsync;
