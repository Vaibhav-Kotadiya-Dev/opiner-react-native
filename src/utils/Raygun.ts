import Raygun, {RaygunClientOptions} from 'raygun4reactnative';
import CodePush from 'react-native-code-push';
import deviceInfoModule from 'react-native-device-info';

export const initRaygun = async () => {
  if (__DEV__) {
    return;
  }
  const info = await CodePush.getUpdateMetadata();
  const options: RaygunClientOptions = {
    apiKey: 'H3eyCzHKzn1mlIcVHkoScQ',
    enableCrashReporting: true,
    version: `${deviceInfoModule.getVersion()} ${
      info?.label || '0'
    } b${deviceInfoModule.getBuildNumber()}`,
  };
  Raygun.init(options);
};

export const reportToRaygun = (error: Error | any, info?: string) => {
  console.log('Error report', {error, info});
  return;
  // let customInfo: ManualCrashReportDetails | undefined;
  // if (info) {
  //   customInfo = {customData: {info, isDevMode: __DEV__}};
  // }
  // Raygun.sendError(error, customInfo);
};

export default Raygun;
