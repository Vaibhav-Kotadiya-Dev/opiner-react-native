import {EventEmitter} from 'events';
import {ReactNode} from 'react';
import {ModalProps, StyleProp, ViewStyle} from 'react-native';

import {ThemedButtonProps} from 'components/themed-button';
import {Props} from '@fortawesome/react-native-fontawesome';
import {CTAButtonProps} from 'components/cta-button/helpers';

const modalEmitter = new EventEmitter();
export const kModalAnimationDuration = 300;

export enum ModalEvents {
  SetContent = 'ShowAppModal',
}

export enum ModalType {
  ConfirmationModal = 'ConfirmationModal',
  PromptModal = 'PromptModal',
}

export interface ConfirmationModalProps {
  visible?: boolean;
  children?: ReactNode;
  title?: string;
  description?: string | ReactNode;
  iconProps?: Props;
  primaryAction?: ThemedButtonProps;
  secondaryAction?: ThemedButtonProps;
  modalStyle?: StyleProp<ViewStyle>;
  animation?: string;
  onClose?: () => void;
  onBack?: (_?: any) => void;
  isFullscreen?: boolean;
  textColor?: string;
}

export interface PromptModalProps
  extends Pick<
    ConfirmationModalProps,
    'iconProps' | 'title' | 'visible' | 'description' | 'children'
  > {
  primaryAction?: CTAButtonProps;
  secondaryAction?: CTAButtonProps;
  type?: 'info' | 'warning' | 'danger' | 'success';
}

export const defaultModalProps: ModalProps = {
  visible: false,
};
export type IModalProps = undefined | ConfirmationModalProps | PromptModalProps;

interface Args {
  type: ModalType;
  content: IModalProps;
}
const setModalContent = ({type, content}: Args) => {
  modalEmitter.emit(ModalEvents.SetContent, {
    type,
    content,
  });
};

export default {
  setModalContent,
  dismiss: (type: ModalType): Promise<void> => {
    setModalContent({type, content: {}});
    return new Promise(res => setTimeout(res, 0));
  },
  on: (callback: (arg: Args) => void) =>
    modalEmitter.addListener(ModalEvents.SetContent, callback),
  off: (callback: (arg: Args) => void) =>
    modalEmitter.removeListener(ModalEvents.SetContent, callback),
};
