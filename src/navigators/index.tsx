import React, {useEffect, useRef} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  faHandWave,
  faHome,
  faPlusCircle,
} from '@fortawesome/pro-solid-svg-icons';

import {
  AuthStackParamList,
  MainStackParam,
  RootStackParam,
} from './StackParams';
import SplashScreen from 'screens/splash';
import UploadScreen from 'screens/upload';
import LoginScreen from 'screens/auth/login';
import VideoRecordScreen from 'screens/record';
import RegisterScreen from 'screens/auth/register';
import useThemeContext from 'hooks/useThemeContext';
import CommunitiesSearchScreen from 'screens/communities';
import ResponsePreviewScreen from 'screens/record/preview';
import QuestionDetailsScreen from 'screens/question-details';
import CommunityDetailsScreen from 'screens/communities/details';
import AccountManagementScreen from 'screens/account/update/AccountManagement';
import UpdatePaymentInformationScreen from 'screens/account/update/PaymentInformation';
import UpdateAccountInformationScreen from 'screens/account/update/AccountInformation';
import UserCommunitiesScreen from 'screens/account/update/UserCommunities';
import UpdateProfessionalInformationScreen from 'screens/account/update/ProfessionalInformation';
import WelcomeScreen from 'screens/auth/welcome';
import TimelineScreen from 'screens/timeline';
import AccountScreen from 'screens/account';
import RewardSelectionScreen from 'screens/reward';
import DonationSelectScreen from 'screens/donation/DonationSelectScreen';
import EditProfileImageScreen from 'screens/account/components/ProfileImage/EditProfileImage';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import {HeaderLeftButton, useHeaderProps} from './header';
import {getHeaderTitleByQuestion} from 'screens/timeline/utils';
import {resetTo} from 'NavigationService';
import useUser from 'hooks/useUser';
import Toast from 'utils/Toast';

const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = () => {
  const headerProps = useHeaderProps(true);
  return (
    <AuthStack.Navigator screenOptions={headerProps}>
      <AuthStack.Screen
        name="WELCOME"
        component={WelcomeScreen}
        options={{title: 'Welcome'}}
      />
      <AuthStack.Screen
        name="REGISTER"
        component={RegisterScreen}
        options={{title: 'Sign up'}}
      />
      <AuthStack.Screen
        name="LOGIN"
        component={LoginScreen}
        options={{title: 'Sign in'}}
      />
      <AuthStack.Screen
        name="COMMUNITIES"
        component={CommunitiesSearchScreen}
      />
      <AuthStack.Screen
        name="COMMUNITY_DETAILS"
        component={CommunityDetailsScreen}
        options={{title: 'Community'}}
      />
    </AuthStack.Navigator>
  );
};

const headerHomeButton = () => (
  <HeaderLeftButton icon={faHome} onPress={() => resetTo('MAIN_SCREEN')} />
);

const MainStack = createStackNavigator<MainStackParam>();
const MainNavigator = () => {
  const navigation = useMainNavigation();
  const route = useRoute<RouteProp<RootStackParam, 'Main'>>();
  const headerProps = useHeaderProps();
  const {theme} = useThemeContext();
  const {user} = useUser(true);
  const hasShownWelcome = useRef(false);

  useEffect(() => {
    if (
      hasShownWelcome.current ||
      !route.params ||
      !route.params.isSignIn ||
      !user ||
      !user.id
    ) {
      return;
    }
    Toast.show({
      message: `Welcome back ${user.firstName}`,
      iconProps: {icon: faHandWave},
    });
    hasShownWelcome.current = true;
  }, [user, route.params]);

  const transparentHeader = [
    headerProps.headerStyle,
    {
      backgroundColor: theme.colors.background,
      borderBottomWidth: 0,
    },
  ];

  return (
    <MainStack.Navigator screenOptions={headerProps}>
      <MainStack.Screen
        name={'MAIN_SCREEN'}
        component={TimelineScreen}
        options={{
          title: 'Timeline',
          animationTypeForReplace: 'pop',
          headerLeft: ({}) => (
            <HeaderLeftButton
              icon={faPlusCircle}
              onPress={() => navigation.navigate('COMMUNITIES_SCREEN')}
            />
          ),
        }}
      />
      {/* ------------ Question/Response Screens ------------ */}
      <MainStack.Screen
        name={'QUESTION_DETAILS_SCREEN'}
        component={QuestionDetailsScreen}
        options={({route}) => ({
          title: getHeaderTitleByQuestion(route.params.question),
          headerStyle: transparentHeader,
        })}
      />
      <MainStack.Screen
        name="REWARD_SELECTION_SCREEN"
        component={RewardSelectionScreen}
        options={{
          title: 'Select reward',
          headerStyle: transparentHeader,
        }}
      />
      <MainStack.Screen
        name="DONATION_SELECTION_SCREEN"
        component={DonationSelectScreen}
        options={{title: 'Select cause'}}
      />
      <MainStack.Screen
        name={'RECORD_VIDEO_SCREEN'}
        component={VideoRecordScreen}
        options={{
          title: 'Record response',
          headerLeft: headerHomeButton,
        }}
      />
      <MainStack.Screen
        name={'RESPONSE_PREVIEW_SCREEN'}
        component={ResponsePreviewScreen}
        options={{title: 'Response'}}
      />
      <MainStack.Screen
        name={'UPLOADING_SCREEN'}
        component={UploadScreen}
        options={{title: 'Submitting'}}
      />
      {/* ------------ Community Screens ------------ */}
      <MainStack.Screen
        name={'COMMUNITIES_SCREEN'}
        component={CommunitiesSearchScreen}
        options={{
          title: 'Community search',
          headerLeft: () => null,
          headerRight: undefined,
          headerStyle: transparentHeader,
        }}
      />
      <MainStack.Screen
        name="COMMUNITY_DETAILS"
        component={CommunityDetailsScreen}
        options={{title: 'Community'}}
      />
      <MainStack.Screen
        name={'USER_COMMUNITIES'}
        component={UserCommunitiesScreen}
        options={{title: 'Communities'}}
      />
      {/* ------------ Account Screens ------------ */}
      <MainStack.Screen
        name={'ACCOUNT_SCREEN'}
        component={AccountScreen}
        options={{
          title: 'Account',
          headerLeft: headerHomeButton,
          headerRight: undefined,
        }}
      />
      <MainStack.Screen
        name={'ACCOUNT_MANAGEMENT'}
        component={AccountManagementScreen}
        options={{title: 'Notifications'}}
      />
      <MainStack.Screen
        name={'UPDATE_ACCOUNT_INFORMATION'}
        component={UpdateAccountInformationScreen}
        options={{title: 'Account'}}
      />
      <MainStack.Screen
        name={'UPDATE_PROFESSIONAL_INFORMATION'}
        component={UpdateProfessionalInformationScreen}
        options={{title: 'Profile'}}
      />
      <MainStack.Screen
        name={'UPDATE_PAYMENT_INFORMATION'}
        component={UpdatePaymentInformationScreen}
        options={{title: 'Payment'}}
      />
      <MainStack.Screen
        name="EDIT_PROFILE_IMAGE"
        component={EditProfileImageScreen}
        options={{title: 'Photo'}}
      />
    </MainStack.Navigator>
  );
};

const RootStack = createStackNavigator<RootStackParam>();

const RootNavigator = () => {
  const {theme} = useThemeContext();
  return (
    <>
      <StatusBar
        barStyle={theme.name === 'Dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.secondaryBackground}
      />
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="SPLASH_SCREEN" component={SplashScreen} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Main" component={MainNavigator} />
      </RootStack.Navigator>
    </>
  );
};

export {RootNavigator};
