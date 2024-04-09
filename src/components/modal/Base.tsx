import React, {useRef} from 'react';
import {ModalProps, StyleSheet} from 'react-native';

import {View} from 'react-native';
import {kModalAnimationDuration} from './ModalService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 22,
    backgroundColor: '#00000088',
  },
});

function BaseModal<T extends ModalProps>({
  children,
  visible,
  animation = 'fadeInUp',
  ...props
}: T & {
  animation?: string;
  children?: any;
}) {
  const modalRef = useRef<View>(null);
  // const [shown, setShown] = useState<boolean>(Boolean(visible));
  // useEffect(() => {
  //   if (!visible) {
  //     const method =
  //       modalRef.current?.[
  //         animation === 'fadeInUp' ? 'fadeOutDown' : 'slideOutRight'
  //       ];
  //     method?.(kModalAnimationDuration).then(() => setShown(false));
  //   } else {
  //     setShown(true);
  //     modalRef.current?.fadeInUp?.();
  //   }
  // }, [visible, animation]);

  if (!visible) {
    return null;
  }

  return (
    <View
      // @ts-ignore
      ref={modalRef}
      animation={animation}
      duration={kModalAnimationDuration}
      style={styles.modal}
      {...props}
    >
      <View style={[styles.container]}>{children}</View>
    </View>
  );
}

export default BaseModal;
