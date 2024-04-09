import {
  faCircleCheck,
  faExclamationTriangle,
  faStopwatch,
} from '@fortawesome/pro-regular-svg-icons';
import {faTrash} from '@fortawesome/pro-solid-svg-icons';

import ModalService, {
  ConfirmationModalProps,
  ModalType,
  PromptModalProps,
} from 'components/modal/ModalService';
import {baseColors} from 'theme/colors';

const recordingTimeoutPrompt: Partial<PromptModalProps> = {
  visible: true,
  type: 'warning',
  iconProps: {
    icon: faStopwatch,
  },
  title: 'Recording ended',
  description: 'Maximum duration reached (3 minutes).',
  primaryAction: {
    title: 'Review response',
    onPress: () => ModalService.dismiss(ModalType.PromptModal),
  },
};

const recordingStoppedPrompt: Partial<PromptModalProps> = {
  visible: true,
  iconProps: {
    icon: faCircleCheck,
  },
  title: 'Recording stopped',
  primaryAction: {
    title: 'Review response',
    onPress: () => ModalService.dismiss(ModalType.PromptModal),
  },
};

const deleteRecordingConfirmation: Partial<ConfirmationModalProps> = {
  visible: true,
  iconProps: {
    icon: faExclamationTriangle,
    color: baseColors.red,
  },
  textColor: baseColors.red,
  title: 'Delete recording',
  description: 'Your previous recording will be lost if you continue.',
  secondaryAction: {
    title: 'Cancel',
    type: 'secondary',
    onPress: () => ModalService.dismiss(ModalType.ConfirmationModal),
  },
};

export {
  recordingTimeoutPrompt,
  recordingStoppedPrompt,
  deleteRecordingConfirmation,
};
