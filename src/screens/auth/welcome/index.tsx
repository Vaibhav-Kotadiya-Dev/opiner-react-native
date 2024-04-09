import React from 'react';
import {Linking} from 'react-native';
import {faTvRetro} from '@fortawesome/pro-solid-svg-icons';
import {faUpRightFromSquare} from '@fortawesome/pro-solid-svg-icons';

import authStyles from '../styles';
import AppText from 'components/app-text';
import CTAButton from 'components/cta-button';
import {getForceDevMode} from 'network/OpinerApi';
import useThemeContext from 'hooks/useThemeContext';
import {useAuthNavigation} from 'hooks/useNavigationHooks';
import {OPINER_WORKS} from 'appConstants';
import {Container} from 'components/index';

const WelcomeScreen = () => {
  const {theme} = useThemeContext();
  const navigation = useAuthNavigation();
  const isDevMode = getForceDevMode();

  return (
    <Container
      style={[isDevMode && {backgroundColor: theme.colors.devModeBackground}]}>
      <CTAButton
        title="How Opiner works"
        onPress={() => Linking.openURL(OPINER_WORKS)}
        iconProps={{icon: faTvRetro}}
        iconRightProps={{icon: faUpRightFromSquare, color: theme.colors.link}}
      />
      <AppText
        size="h3"
        style={[
          authStyles.welcomeTitle,
          {backgroundColor: theme.colors.secondaryBackground},
        ]}>
        Your account
      </AppText>
      <CTAButton
        title="Create new account"
        onPress={() => {
          navigation.navigate('REGISTER');
        }}
      />
      <CTAButton
        title="Sign in"
        onPress={() => {
          navigation.navigate('LOGIN');
        }}
      />
    </Container>
  );
};

export default WelcomeScreen;
