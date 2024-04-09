import React from 'react';
import {TouchableOpacity} from 'react-native';
import {faChevronLeft} from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styles from './styles';
import BaseModal from './Base';
import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import ThemedButton from 'components/themed-button';
import {ConfirmationModalProps} from './ModalService';
import { View } from 'react-native-animatable';

export const ModalHeader = ({
  title,
  description,
  onBack,
  iconProps,
  textColor,
}: Pick<
  ConfirmationModalProps,
  'iconProps' | 'title' | 'description' | 'onClose' | 'onBack' | 'textColor'
>) => {
  const {theme} = useThemeContext();
  return (
    <>
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          style={{paddingHorizontal: rs(4), paddingTop: rs(8)}}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={rs(16)}
            color={theme.colors.modalIcon}
          />
        </TouchableOpacity>
      )}
      {iconProps && (
        <FontAwesomeIcon
          size={rs(48)}
          color={theme.colors.text}
          {...iconProps}
          style={[styles.icon, iconProps.style]}
        />
      )}
      <View style={styles.modalTitleContainer}>
        {title !== undefined && (
          <AppText
            size="h2"
            style={[styles.modalTitle, !!textColor && {color: textColor}]}
          >
            {title}
          </AppText>
        )}
      </View>
      {description !== undefined && (
        <AppText
          size="h3"
          style={[
            styles.modalText,
            title === undefined && {marginTop: rs(16)},
            !!textColor && {color: textColor},
          ]}
        >
          {description}
        </AppText>
      )}
    </>
  );
};

export const ModalActions = ({
  primaryAction,
  secondaryAction,
}: Pick<ConfirmationModalProps, 'primaryAction' | 'secondaryAction'>) => (
  <>
    {primaryAction !== undefined && <ThemedButton {...primaryAction} />}
    {secondaryAction !== undefined && <ThemedButton {...secondaryAction} />}
  </>
);

const ConfirmationModal = ({
  title,
  children = null,
  description,
  modalStyle,
  primaryAction,
  secondaryAction,
  onClose,
  onBack,
  isFullscreen = true,
  iconProps,
  textColor,
  ...props
}: ConfirmationModalProps) => {
  const {theme} = useThemeContext();
  const {modalBackground} = theme.colors;
  const {top, bottom} = useSafeAreaInsets();

  return (
    <BaseModal {...props}>
      <View
        style={[
          styles.centeredView,
          styles.paddedView,
          isFullscreen && {backgroundColor: modalBackground},
        ]}
      >
        <View
          style={[
            styles.modalView,
            isFullscreen && styles.fullScreenModalView,
            isFullscreen && {
              paddingTop: Math.max(rs(16), top),
              paddingBottom: Math.max(rs(16), bottom),
            },
            {
              backgroundColor: modalBackground,
            },
            modalStyle,
          ]}
        >
          <View animation="fadeInUp" duration={250} easing="ease-in-out">
            <ModalHeader
              {...{title, description, onClose, onBack, iconProps, textColor}}
            />
            {children}
            <ModalActions {...{primaryAction, secondaryAction}} />
          </View>
        </View>
      </View>
    </BaseModal>
  );
};

export default ConfirmationModal;
