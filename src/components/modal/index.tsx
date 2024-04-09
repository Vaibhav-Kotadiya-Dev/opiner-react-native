import React from 'react';

import ConfirmationModal from './ConfirmationModal';
import {
  ConfirmationModalProps,
  ModalType,
  PromptModalProps,
} from './ModalService';
import useModal from './useModal';
import PromptModal from './PromptModal';

const InAppModal = () => {
  const {getContent} = useModal();
  const confirmationModalProps = getContent<ConfirmationModalProps>(
    ModalType.ConfirmationModal,
  );
  const promptModalProps = getContent<PromptModalProps>(ModalType.PromptModal);
  return (
    <>
      <ConfirmationModal {...confirmationModalProps} />
      <PromptModal {...promptModalProps} />
    </>
  );
};

export default InAppModal;
