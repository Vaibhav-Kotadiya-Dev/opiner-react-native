import React from 'react';
import {StatusBar} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import BaseModal from './Base';
import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import {PromptModalProps} from './ModalService';
import {statusColors} from 'theme/colors';
import CTAButton from 'components/cta-button';
import {View} from 'react-native-animatable';

export const ModalHeader = ({
  title,
  description,
  iconProps,
}: Pick<PromptModalProps, 'iconProps' | 'title' | 'description'>) => {
  const {theme} = useThemeContext();
  return (
    <>
      {iconProps && (
        <FontAwesomeIcon
          size={rs(48)}
          color={theme.colors.white}
          {...iconProps}
          style={[styles.icon, iconProps.style]}
        />
      )}
      <View style={styles.modalTitleContainer}>
        {title !== undefined && (
          <AppText
            size="h2"
            style={[styles.modalTitle, {color: theme.colors.white}]}>
            {title}
          </AppText>
        )}
      </View>
      {description !== undefined && (
        <AppText
          size="h3"
          style={[
            styles.modalText,
            {color: theme.colors.white},
            title === undefined && {marginTop: rs(16)},
          ]}>
          {description}
        </AppText>
      )}
    </>
  );
};

export const ModalActions = ({
  primaryAction,
  secondaryAction,
  type,
}: Pick<PromptModalProps, 'primaryAction' | 'secondaryAction' | 'type'>) => (
  <>
    {primaryAction !== undefined && (
      <CTAButton {...primaryAction} type={type} />
    )}
    {secondaryAction !== undefined && (
      <CTAButton {...secondaryAction} type={type} />
    )}
  </>
);

const PromptModal = ({
  title,
  children = null,
  description,
  primaryAction,
  secondaryAction,
  iconProps,
  type = 'info',
  ...props
}: PromptModalProps) => {
  return (
    <BaseModal {...props}>
      <StatusBar
        backgroundColor={statusColors[type]}
        barStyle="light-content"
      />
      <View
        style={[
          styles.centeredView,
          {backgroundColor: statusColors[type]},
          {paddingBottom: rs(36)},
        ]}>
        <View style={styles.promptModalContainer}>
          <View animation="fadeInUp" delay={100} duration={900} easing="ease-in-out">
            <ModalHeader {...{title, description, iconProps}} />
            {children}
          </View>
        </View>
        <ModalActions {...{primaryAction, secondaryAction, type}} />
      </View>
    </BaseModal>
  );
};

export default PromptModal;
