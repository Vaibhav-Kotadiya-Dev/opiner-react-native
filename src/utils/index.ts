import Color, {TRANSPARENT_WHITE} from 'assets/colors';
import ModalService, {ModalType} from 'components/modal/ModalService';

const padZero = (numb: number): string | number =>
  numb > 9 ? numb : `0${numb}`;

const getBackground = (condition: boolean): string =>
  condition ? Color.Primary.Red : TRANSPARENT_WHITE(0);

const VideoTimeConfig = {
  minutes: 3,
  seconds: 181,
  max: 210,
};

const dismissConfirmationModal = () =>
  ModalService.dismiss(ModalType.ConfirmationModal);

const showConfirmationModal = ({
  title,
  description,
  buttonTitle,
  cancelButtonTitle,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  buttonTitle?: string;
  cancelButtonTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}) => {
  ModalService.setModalContent({
    type: ModalType.ConfirmationModal,
    content: {
      visible: true,
      title,
      description,
      primaryAction: {
        title: buttonTitle || 'Confirm',
        onPress: () => {
          onConfirm?.();
          dismissConfirmationModal();
        },
      },
      secondaryAction: {
        title: cancelButtonTitle || 'Back',
        onPress: onCancel || dismissConfirmationModal,
        type: 'secondary',
      },
      onClose: onCancel || dismissConfirmationModal,
    },
  });
};

export {
  VideoTimeConfig,
  padZero,
  getBackground,
  showConfirmationModal,
  dismissConfirmationModal,
};
