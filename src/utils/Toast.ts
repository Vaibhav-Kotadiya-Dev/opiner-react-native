import {showMessage} from 'react-native-flash-message';

import {CustomFlashMessageType} from 'components/prompt-message/CustomFlashMessage';

const show = (props: CustomFlashMessageType) => {
  showMessage({
    duration: 3500,
    ...props,
  });
};

const Toast = {show};

export default Toast;
