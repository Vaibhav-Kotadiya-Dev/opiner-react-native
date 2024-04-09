import {faExclamation, faStopwatch} from '@fortawesome/pro-solid-svg-icons';

import ModalService, {ConfirmationModalProps, ModalType} from './ModalService';
import {
  faCoin,
  faFaceSmile,
  faHandWave,
} from '@fortawesome/pro-regular-svg-icons';

/**
 * Definition for default modal props with static content. These should be used after setting the
 * dynamic props like onPress.
 */
const optInConfirmationModal: Partial<ConfirmationModalProps> = {
  visible: true,
  primaryAction: {
    title: 'Confirm opt in',
    onPress: () => {
      ModalService.dismiss(ModalType.ConfirmationModal);
    },
    type: 'primary',
  },
  title: 'Opt in',
  description:
    "Please confirm you wish to respond to %companyName%'s question.\nWe'll need your response by %time%",
  secondaryAction: {
    title: 'Cancel',
    type: 'secondary',
    onPress: () => ModalService.dismiss(ModalType.ConfirmationModal),
  },
  iconProps: {
    icon: faFaceSmile,
  },
};

const optOutConfirmationModal: Partial<ConfirmationModalProps> = {
  visible: true,
  primaryAction: {
    title: 'Confirm opt out',
    onPress: () => {
      ModalService.dismiss(ModalType.ConfirmationModal);
    },
  },
  title: 'Opt out',
  iconProps: {
    icon: faHandWave,
  },
  description: "Confirm you're not answering this question.",
  secondaryAction: {
    title: 'Cancel',
    type: 'secondary',
    onPress: () => ModalService.dismiss(ModalType.ConfirmationModal),
  },
  onClose: () => ModalService.dismiss(ModalType.ConfirmationModal),
};

const discardRecordingModal: Partial<ConfirmationModalProps> = {
  visible: true,
  primaryAction: {
    title: 'Continue',
    onPress: () => {
      ModalService.dismiss(ModalType.ConfirmationModal);
    },
  },
  title: 'Delete Response?',
  iconProps: {
    color: 'red',
    icon: faExclamation,
  },
  description: 'Your existing recording will be lost if you continue.',
  secondaryAction: {
    title: 'Back',
    type: 'secondary',
    onPress: () => ModalService.dismiss(ModalType.ConfirmationModal),
  },
  onClose: () => ModalService.dismiss(ModalType.ConfirmationModal),
};

const timeUpModal: Partial<ConfirmationModalProps> = {
  visible: true,
  primaryAction: {
    title: 'Review',
    onPress: () => {
      ModalService.dismiss(ModalType.ConfirmationModal);
    },
    type: 'primary',
  },
  title: "Time's up",
  iconProps: {
    color: 'blue',
    icon: faStopwatch,
  },
  description: 'Response have a maximum length of 3 minutes',
  secondaryAction: {
    title: 'Cancel',
    type: 'secondary',
    onPress: () => ModalService.dismiss(ModalType.ConfirmationModal),
  },
};

const baseDonationModal: Partial<ConfirmationModalProps> = {
  visible: true,
  primaryAction: {
    title: 'Confirm',
    type: 'primary',
    onPress: () => {
      ModalService.dismiss(ModalType.ConfirmationModal);
    },
  },
  secondaryAction: {
    title: 'Back',
    type: 'secondary',
    onPress: () => {
      ModalService.dismiss(ModalType.ConfirmationModal);
    },
  },
};

const payMeModal: Partial<ConfirmationModalProps> = {
  ...baseDonationModal,
  title: 'Payment',
  iconProps: {
    ...baseDonationModal.iconProps!,
    icon: faCoin,
  },
  description: 'You will be paid £%amount% for your response.',
};

export {
  optInConfirmationModal,
  optOutConfirmationModal,
  discardRecordingModal,
  timeUpModal,
  payMeModal,
};
