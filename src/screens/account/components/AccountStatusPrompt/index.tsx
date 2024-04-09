import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight, faToggleOff} from '@fortawesome/pro-solid-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import PromptMessage from 'components/prompt-message';
import {useMainNavigation} from 'hooks/useNavigationHooks';

const styles = StyleSheet.create({
  title: {fontWeight: '600'},
});

interface AccountStatusPromptProps {}

const AccountStatusPrompt = ({}: AccountStatusPromptProps) => {
  const {theme} = useThemeContext();
  const {danger: textColor} = theme.colors.prompt.text;
  const navigation = useMainNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ACCOUNT_MANAGEMENT')}>
      <PromptMessage
        title="Account paused"
        description={
          <>
            You wont receive new questions until you unpause your account{' '}
            <FontAwesomeIcon
              icon={faArrowRight}
              size={rs(14)}
              color={textColor}
            />
          </>
        }
        type="danger"
        iconProps={{icon: faToggleOff}}
        titleStyle={styles.title}
      />
    </TouchableOpacity>
  );
};

export default AccountStatusPrompt;
