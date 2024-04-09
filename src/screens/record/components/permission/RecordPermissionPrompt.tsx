import React from 'react';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {
  faVideoSlash,
  faMicrophoneSlash,
} from '@fortawesome/pro-solid-svg-icons';
import {faArrowRight} from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import PromptMessage from 'components/prompt-message';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  container: {zIndex: 999, margin: rs(16)},
  bold: {fontWeight: '700'},
  semiBold: {fontWeight: '600'},
});

const RecordPermissionPrompt = ({onPress}: {onPress?: () => void}) => {
  const {theme} = useThemeContext();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (onPress) {
          return onPress();
        }
        Linking.openSettings();
      }}>
      <PromptMessage
        title="Camera & microphone"
        description={
          <>
            Access to your device's camera and microphone required to record
            response.{'\n'}Open{' '}
            <AppText
              size="small"
              style={[styles.bold, {color: theme.colors.prompt.text.danger}]}>
              Settings
            </AppText>{' '}
            to enable{' '}
            <FontAwesomeIcon
              icon={faArrowRight}
              size={rs(14)}
              color={theme.colors.prompt.text.danger}
            />
          </>
        }
        type="danger"
        iconProps={{icon: faVideoSlash}}
        secondIcon={faMicrophoneSlash}
        titleStyle={styles.semiBold}
      />
    </TouchableOpacity>
  );
};

export default RecordPermissionPrompt;
