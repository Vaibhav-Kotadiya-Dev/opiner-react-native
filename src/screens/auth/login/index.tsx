import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';

import authStyles from '../styles';
import AppText from 'components/app-text';
import ThemedButton from 'components/themed-button';
import Input from '../components/input/Input';
import useAuth from '../components/hooks/useAuth';
import useThemeContext from 'hooks/useThemeContext';
import PromptMessage from 'components/prompt-message';
import useKeyboardVisibility from 'hooks/useKeyboardVisibility';

import {getForceDevMode} from 'network/OpinerApi';
import {useAuthNavigation} from 'hooks/useNavigationHooks';
import {Container} from 'components/index';

interface LoginScreenProps {}

const LoginScreen = ({}: LoginScreenProps) => {
  const {keyboardHeight} = useKeyboardVisibility();
  const isDevMode = getForceDevMode();
  const {
    handleTitlePress,
    updateState,
    isBusy,
    handleLogin,
    handleForgotPassword,
    error,
    passwordRef,
    emailRef,
    handleClear,
    setAuthError,
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
        {isDevMode ? (
          <React.Fragment>
            <AppText size="h1" style={authStyles.title}>
              Valmorification mode
            </AppText>
            <FastImage
              source={require('assets/imgs/dev-mode.png')}
              style={authStyles.devModeImage}
            />
          </React.Fragment>
        ) : null}
        <View style={authStyles.content}>
          <Input
            label="Email"
            returnKeyType="next"
            keyboardType="email-address"
            ref={emailRef}
            error={error.email}
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
            onSubmitEditing={handleLogin}
            onChange={(value: string) => updateState('password', value)}
          />
          <View style={authStyles.linksContainer}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleForgotPassword}>
              <AppText
                size="small"
                style={[authStyles.link, {color: theme.colors.link}]}>
                Forgotten your password?
              </AppText>
            </TouchableOpacity>
          </View>
          <ThemedButton isBusy={isBusy} title="Submit" onPress={handleLogin} />
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

export default LoginScreen;
