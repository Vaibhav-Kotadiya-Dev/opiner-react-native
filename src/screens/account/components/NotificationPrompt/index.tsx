import React from 'react';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight, faBellSlash} from '@fortawesome/pro-solid-svg-icons';

import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import PromptMessage from 'components/prompt-message';

const styles = StyleSheet.create({
  text: {fontWeight: '700'},
});

interface NotificationPromptProps {}

const NotificationPrompt = ({}: NotificationPromptProps) => {
  const {theme} = useThemeContext();
  const {danger: textColor} = theme.colors.prompt.text;

  return (
    <TouchableOpacity onPress={() => Linking.openSettings()}>
      <PromptMessage
        title="Push notifications disabled"
        description={
          <>
            Not having push notifications enabled may result in you missing
            question deadlines.{'\n'}Open{' '}
            <AppText size="small" style={[styles.text, {color: textColor}]}>
              Settings
            </AppText>{' '}
            on your device to enable{' '}
            <FontAwesomeIcon
              icon={faArrowRight}
              size={rs(14)}
              color={textColor}
            />
          </>
        }
        type="danger"
        iconProps={{icon: faBellSlash}}
        // eslint-disable-next-line react-native/no-inline-styles
        titleStyle={{fontWeight: '600'}}
      />
    </TouchableOpacity>
  );
};

export default NotificationPrompt;
