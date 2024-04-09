const PACKAGE: string = 'app.opiner';
const ACTIONS_PACKAGE: string = `${PACKAGE}.actions`;
const SCREENS_PACKAGE: string = `${PACKAGE}.screens`;

const ACTIVE_OPACITY: number = 0.8;

const SUCCESS: string = '_SUCCESS';
const FAILED: string = '_FAILED';
const CLEAR: string = '_CLEAR';
const EMAIL_REGEX: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL: string = 'EMAIL';
const PASSWORD: string = 'PASSWORD';
const ACCESS_TOKEN: string = 'ACCESS_TOKEN';
const NOTIFICATION_CHANNEL_ID = 'Opiner';
const UNDEF_ID = '00000000-0000-0000-0000-000000000000';
const THEME_STORAGE_KEY = 'OPINER_THEME';
const HAS_ASKED_LIBRARY_PERMISSION = 'HAS_ASKED_LIBRARY_PERMISSION';

export {
  PACKAGE,
  ACTIONS_PACKAGE,
  SCREENS_PACKAGE,
  ACTIVE_OPACITY,
  SUCCESS,
  FAILED,
  CLEAR,
  EMAIL_REGEX,
  EMAIL,
  PASSWORD,
  ACCESS_TOKEN,
  NOTIFICATION_CHANNEL_ID,
  UNDEF_ID,
  THEME_STORAGE_KEY,
  OPINER_TERMS_URL,
  OPINER_LEARN_MORE,
  OPINER_WORKS,
  HAS_ASKED_LIBRARY_PERMISSION,
};
