import React from 'react';
import {Linking, ScrollView, View} from 'react-native';
import {faUpRightFromSquare} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import authStyles from '../styles';
import {rs} from 'utils/ResponsiveScreen';
import Input from '../components/input/Input';
import useAuth from '../components/hooks/useAuth';
import {getForceDevMode} from 'network/OpinerApi';
import useKeyboardVisibility from 'hooks/useKeyboardVisibility';
import useThemeContext from 'hooks/useThemeContext';
import PromptMessage from 'components/prompt-message';
import AppText from 'components/app-text';
import ThemedButton from 'components/themed-button';
import {useAuthNavigation} from 'hooks/useNavigationHooks';
import Checkbox from 'components/checkbox';
import {OPINER_TERMS_URL} from 'appConstants';
import {Container} from 'components/index';

interface RegisterScreenProps {}

const RegisterScreen = ({}: RegisterScreenProps) => {
  const {keyboardHeight} = useKeyboardVisibility();
  const isDevMode = getForceDevMode();
  const {
    handleTitlePress,
    updateState,
    isBusy,
    handleSignUp,
    emailRef,
    passwordRef,
    firstNameRef,
    handleClear,
    error,
    setAuthError,
    lastNameRef,
    remoteError,
    setRemoteError,
  } = useAuth();

  const {theme} = useThemeContext();
  const navigation = useAuthNavigation();

  return (
    <Container
      style={[
        {backgroundColor: theme.colors.background},
        isDevMode && {backgroundColor: theme.colors.devModeBackground},
      ]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          authStyles.scrollView,
          {paddingBottom: keyboardHeight},
        ]}>
        <View style={authStyles.content}>
          <Input
            label="First name"
            returnKeyType="next"
            autoComplete="name"
            ref={firstNameRef}
            error={error.firstName}
            autoCapitalize="words"
            onSubmitEditing={() => lastNameRef.current?.focus()}
            onChange={(value: string) => updateState('firstName', value)}
          />
          <Input
            label="Family name"
            returnKeyType="next"
            autoComplete="name-family"
            ref={lastNameRef}
            error={error.lastName}
            autoCapitalize="words"
            onChange={(value: string) => updateState('lastName', value)}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <Input
            label="Email"
            returnKeyType="next"
            ref={emailRef}
            error={error.email}
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current?.focus()}
            onChange={(value: string) => updateState('email', value)}
          />
          <Input
            isPassword
            defaultPasswordVisible
            label="Password"
            returnKeyType="go"
            ref={passwordRef}
            error={error.password}
            onSubmitEditing={handleSignUp}
            onChange={(value: string) => updateState('password', value)}
          />
          <AppText size="extraSmall" style={{marginTop: -rs(12)}}>
            At least 8 characters including a lower-case letter, an upper-case
            letter, and a number.
          </AppText>
          <Checkbox
            title="I am over 18 years of age"
            onToggle={value => updateState('above18', value)}
            error={error.above18}
          />
          <Checkbox
            title={
              <>
                Agree to{' '}
                <AppText
                  onPress={() => Linking.openURL(OPINER_TERMS_URL).catch()}
                  style={[
                    // eslint-disable-next-line react-native/no-inline-styles
                    {textDecorationLine: 'underline', color: theme.colors.link},
                  ]}>
                  Opiner T&C
                </AppText>
                {'  '}
                <FontAwesomeIcon
                  icon={faUpRightFromSquare}
                  size={rs(16)}
                  color={theme.colors.link}
                />
              </>
            }
            error={error.agreeToTerms}
            onToggle={value => updateState('agreeToTerms', value)}
          />
          <ThemedButton isBusy={isBusy} title="Submit" onPress={handleSignUp} />
          <ThemedButton
            isAtBottom
            type="secondary"
            title="Cancel"
            onPress={() => {
              handleClear();
              setAuthError({});
              setRemoteError(undefined);
              navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default RegisterScreen;
