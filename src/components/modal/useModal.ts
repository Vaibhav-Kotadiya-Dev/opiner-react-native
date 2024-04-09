import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

import {Constant} from 'screens/upload/utils';
import ModalService, {
  defaultModalProps,
  IModalProps,
  ModalType,
} from './ModalService';

const useModal = () => {
  const [modals, setModals] = useState<Map<ModalType, IModalProps>>(new Map());
  useEffect(() => {
    const handleModal = ({
      type,
      content,
    }: {
      type: ModalType;
      content?: IModalProps;
    }) => {
      setModals(existing => {
        existing.set(type, content);
        return new Map(existing.entries());
      });
    };
    ModalService.on(handleModal);
    return () => {
      ModalService.off(handleModal);
    };
  }, []);

  useEffect(() => {
    if (Constant.isIOS) {
      return;
    }
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (modals.size > 0) {
        let handled: boolean = false;
        const keys = modals.keys();
        for (const key of keys) {
          if (modals.get(key)?.visible) {
            handled = true;
            ModalService.setModalContent({
              type: key,
              content: {visible: false},
            });
          }
        }
        return handled;
      }
      return false;
    });
    return () => sub.remove();
  }, [modals]);

  return {
    modals,
    getContent: function getContent<T>(type: ModalType) {
      return (modals.get(type) || defaultModalProps) as T;
    },
  };
};

export default useModal;
