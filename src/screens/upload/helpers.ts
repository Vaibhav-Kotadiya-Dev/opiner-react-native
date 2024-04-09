import {
  faFaceAstonished,
  faPartyHorn,
} from '@fortawesome/pro-regular-svg-icons';
import {faHome} from '@fortawesome/pro-solid-svg-icons';

import {resetTo} from 'NavigationService';
import ModalService, {
  ModalType,
  PromptModalProps,
} from 'components/modal/ModalService';

const submitSuccessPrompt: Partial<PromptModalProps> = {
  visible: true,
  type: 'success',
  iconProps: {
    icon: faPartyHorn,
  },
  title: 'Success',
  description: 'Your response has been received and will reviewed shortly.',
  primaryAction: {
    title: 'Review status',
    iconProps: {
      icon: faHome,
    },
    onPress: () => {
      ModalService.dismiss(ModalType.PromptModal);
      resetTo('MAIN_SCREEN');
    },
  },
};

const submitFailurePrompt: Partial<PromptModalProps> = {
  visible: true,
  type: 'danger',
  iconProps: {
    icon: faFaceAstonished,
  },
  title: 'Something has gone wrong',
  description: `A member of our support team will email you to resolve this matter.${'\n\n'}We are sorry for the inconvenience.`,
  primaryAction: {
    title: 'Home',
    iconProps: {
      icon: faHome,
    },
    onPress: () => {
      ModalService.dismiss(ModalType.PromptModal);
      resetTo('MAIN_SCREEN');
    },
  },
};

export {submitFailurePrompt, submitSuccessPrompt};
