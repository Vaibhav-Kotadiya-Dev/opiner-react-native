import {useEffect, useRef, useState} from 'react';
import {Keyboard, LayoutAnimation, Linking, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import {EMAIL, EMAIL_REGEX, PASSWORD} from 'appConstants';
import {resetTo} from 'NavigationService';
import {AppState} from 'store/rootReducer';
import {getUserProfile} from 'store/profile/actions';
import {signIn, signUp} from 'store/authentication/actions';
import {forceSetDevMode, getForceDevMode} from 'network/OpinerApi';
import ModalService, {
  ModalType,
  PromptModalProps,
} from 'components/modal/ModalService';
import {faCircleCheck, faSearch} from '@fortawesome/pro-regular-svg-icons';
import {faHome} from '@fortawesome/pro-solid-svg-icons';
import Toast from 'utils/Toast';

interface IInputState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  rememberMe: boolean;
  agreeToTerms: boolean;
  above18: boolean;
}

type AuthError = Partial<Record<keyof IInputState, string>>;

const getValidationResult = (
  input: IInputState,
  isRegistration?: boolean,
): AuthError => {
  const {email, password, firstName, agreeToTerms, above18, lastName} = input;
  const errors: AuthError = {};

  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Email not valid';
  }
  if (!password) {
    errors.password = 'Password not valid';
  }
  if (!isRegistration) {
    return errors;
  }
  if (!firstName) {
    errors.firstName = 'Name required';
  }
  if (!lastName) {
    errors.lastName = 'Family name required';
  }
  if (!above18) {
    errors.above18 = 'Over 18 declaration required';
  }
  if (!agreeToTerms) {
    errors.agreeToTerms = 'Terms of Service agreement required';
  }
  return errors;
};

const useAuth = () => {
  const [state, setState] = useState<IInputState>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rememberMe: false,
    agreeToTerms: false,
    above18: false,
  });
  const [pressCount, setPressCount] = useState(0);
  const [authError, setAuthError] = useState<AuthError>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [remoteError, setRemoteError] = useState<string>();

  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);

  const dispatch = useDispatch();
  const authState = useSelector(
    (appState: AppState) => appState.authentication,
  );

  const {email, password, firstName, lastName, above18, agreeToTerms} = state;
  const updateState = (key: keyof IInputState, value: string | boolean) => {
    setState({...state, [key]: value});
  };
  const isSignUp = useRef(false);
  const didNavigateAway = useRef(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    const handleLoginSuccess = () => {
      setAuthError({});
      if (getForceDevMode()) {
        AsyncStorage.setItem('isDevMode', 'true');
      }
      dispatch(getUserProfile());
      if (isSignUp.current) {
        // Animate signup success, then resetTo('MAIN_SCREEN'); and
        const content: Partial<PromptModalProps> = {
          visible: true,
          title: `Welcome ${firstName}!`,
          description:
            'Your account has been created. Now you need to join a community.',
          iconProps: {
            icon: faCircleCheck,
          },
          type: 'success',
          primaryAction: {
            title: 'Search for community',
            iconProps: {
              icon: faSearch,
            },
            onPress: () => {
              resetTo('COMMUNITIES');
              ModalService.dismiss(ModalType.PromptModal);
            },
          },
          secondaryAction: {
            title: 'Home',
            iconProps: {
              icon: faHome,
            },
            onPress: () => {
              resetTo('MAIN_SCREEN');
              ModalService.dismiss(ModalType.PromptModal);
            },
          },
        };
        ModalService.setModalContent({type: ModalType.PromptModal, content});
        return;
      }
      resetTo('Main', {isSignIn: !isSignUp.current});
    };

    const {data, loading} = authState;
    if (data && !loading && !didNavigateAway.current) {
      didNavigateAway.current = true;
      handleLoginSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, isFocused]);

  useEffect(() => {
    if (authState.error) {
      setRemoteError(authState.error);
    }
  }, [authState.error]);

  const handleLogin = async () => {
    Keyboard.dismiss();
    isSignUp.current = false;
    const validationMessage = getValidationResult(state, false);
    if (Object.keys(validationMessage).length) {
      Toast.show({
        message: 'Check form data',
        type: 'danger',
        hideIcon: true,
      });
      setAuthError(validationMessage);
      return;
    }
    await AsyncStorage.multiSet([
      [EMAIL, email],
      [PASSWORD, password],
    ]);
    dispatch(signIn(email, password));
  };

  const handleTitlePress = () => {
    if (pressCount === 9) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      forceSetDevMode(true);
      setPressCount(0);
    } else {
      setPressCount(pressCount + 1);
    }
  };

  const handleSignUp = async () => {
    Keyboard.dismiss();
    const validationMessage = getValidationResult(state, true);
    if (Object.keys(validationMessage).length) {
      Toast.show({
        message: 'Check form data',
        type: 'danger',
        hideIcon: true,
      });
      setAuthError(validationMessage);
      return;
    }
    isSignUp.current = true;
    await AsyncStorage.multiSet([
      [EMAIL, email],
      [PASSWORD, password],
    ]);
    dispatch(
      signUp({
        email,
        password,
        firstName,
        lastName,
        agreeTerms: agreeToTerms,
        over18: above18,
      }),
    );
  };

  const handleForgotPassword = () => {
    setAuthError({});
    isSignUp.current = false;
  };

  const handleClear = () => {
    emailRef.current?.clear();
    passwordRef.current?.clear();
    firstNameRef.current?.clear();
    lastNameRef.current?.clear();
    setState({...state, email: '', password: '', firstName: '', lastName: ''});
  };

  return {
    handleTitlePress,
    updateState,
    isBusy: authState.loading,
    error: authError,
    handleLogin,
    handleSignUp,
    handleForgotPassword,
    handleClear,
    emailRef,
    passwordRef,
    lastNameRef,
    firstNameRef,
    inputState: state,
    setAuthError,
    showSuccessModal,
    setShowSuccessModal,
    remoteError,
    setRemoteError,
  };
};

export default useAuth;
