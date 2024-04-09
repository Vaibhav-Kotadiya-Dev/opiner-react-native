import {faHome} from '@fortawesome/pro-solid-svg-icons';
import {faCircleCheck, faEye} from '@fortawesome/pro-regular-svg-icons';

import ModalService, {
  ModalType,
  PromptModalProps,
  ConfirmationModalProps,
} from 'components/modal/ModalService';
import {Question} from 'network/data/Question';
import {trackVideoStatus} from 'network/OpinerApi';
import {payMeModal} from 'components/modal/utils';
import {DonationItem} from 'screens/donation/hooks/useDonation';
import {resetTo} from 'NavigationService';
import {statusColors} from 'theme/colors';

const showPayMeConfirmation = ({
  question,
  onPick,
  payMeItem,
}: {
  question: Question;
  onPick: (item: DonationItem) => void;
  payMeItem: DonationItem;
}) => {
  ModalService.setModalContent({
    // PAY ME CONFIRMATION MODAL
    content: {
      ...payMeModal,
      description: payMeModal.description
        ?.toString()
        .replace('%amount%', question.price?.toString() || ''),
      primaryAction: {
        ...payMeModal.primaryAction!,
        title: 'Continue',
        onPress: () => {
          trackVideoStatus({
            questionId: question.id,
            description: 'Pay me confirmation button pressed',
          });
          ModalService.dismiss(ModalType.ConfirmationModal);
          onPick(payMeItem);
        },
      },
      secondaryAction: {
        ...payMeModal.secondaryAction!,
        onPress: () => ModalService.dismiss(ModalType.ConfirmationModal),
      },
    },
    type: ModalType.ConfirmationModal,
  });
};

const showOptPromptModal = (type: 'optIn' | 'optOut') => {
  const content: Partial<PromptModalProps> = {
    visible: true,
    iconProps: {
      icon: faCircleCheck,
    },
    title: 'Opt out confirmed',
    secondaryAction: {
      title: 'Home',
      iconProps: {
        icon: faHome,
      },
      onPress: () => {
        resetTo('MAIN_SCREEN');
        ModalService.dismiss(ModalType.PromptModal);
      },
    },
  };
  if (type === 'optIn') {
    content.title = 'Opt in confirmed';
    content.primaryAction = {
      title: 'Respond now',
      onPress: () => {
        ModalService.dismiss(ModalType.PromptModal);
      },
    };
  }
  ModalService.setModalContent({
    type: ModalType.PromptModal,
    content,
  });
};

const showUsageRightsModal = ({
  onContinue,
  onOptOut,
}: {
  onContinue: () => void;
  onOptOut: () => void;
}) => {
  const content: Partial<ConfirmationModalProps> = {
    visible: true,
    title: 'Usage rights',
    iconProps: {
      icon: faEye,
      color: statusColors.warning,
    },
    description:
      "Parts of your response may be used publicly, including on social media. Click 'opt out' if you do not wish to proceed.",
    primaryAction: {
      title: 'Continue',
      type: 'warning',
      onPress: () => {
        ModalService.dismiss(ModalType.ConfirmationModal);
        onContinue();
      },
    },
    secondaryAction: {
      title: 'Opt out',
      type: 'secondary',
      onPress: () => {
        ModalService.dismiss(ModalType.ConfirmationModal);
        onOptOut();
      },
    },
    textColor: statusColors.warning,
  };
  ModalService.setModalContent({
    type: ModalType.ConfirmationModal,
    content,
  });
};

export {showOptPromptModal, showUsageRightsModal, showPayMeConfirmation};
