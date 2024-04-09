import React from 'react';
import {ScrollView, Alert, Linking} from 'react-native';
import {faSignOut} from '@fortawesome/pro-regular-svg-icons';

import accountScreenStyles from './styles';
import ProfileImage from 'screens/account/components/ProfileImage';
import ThemedButton from 'components/themed-button';
import AccountInfo from './components/Info';
import AccountStatusPrompt from './components/AccountStatusPrompt';
import useLogout from 'hooks/useLogout';
import {Container} from 'components';
import {UserStatus} from 'network/data/User';
import {rs} from 'utils/ResponsiveScreen';
import CTAButton from 'components/cta-button';
import useUser from 'hooks/useUser';
import AppText from 'components/app-text';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import OpinerContent from 'network/methods/OpinerContent';
import {faEnvelope} from '@fortawesome/pro-solid-svg-icons';
import AppFooter from 'components/footer/AppFooter';
import {OPINER_WORKS} from 'appConstants';

const getGreetingByTime = (): string => {
  const today = new Date();
  const curHour = today.getHours();

  if (curHour < 12) {
    return 'Good morning';
  } else if (curHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

const AccountScreen = () => {
  const {logout, isLoggingOut} = useLogout();
  const {user} = useUser(true);
  const navigation = useMainNavigation();

  const handleLogoutPressed = (): void => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Yes', onPress: logout},
      {text: 'Cancel'},
    ]);
  };

  if (!user) {
    return null;
  }

  return (
    <Container hideBottomInset>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={accountScreenStyles.scrollView}>
        <ProfileImage
          source={OpinerContent.getCDNImageURL(user.cdnThumbUrlMedium)}
          onPress={() => navigation.navigate('EDIT_PROFILE_IMAGE')}
        />
        <AppText size="h2" style={accountScreenStyles.greeting}>
          {getGreetingByTime()} {user.firstName}!
        </AppText>
        {user.userStatus === UserStatus.Paused && <AccountStatusPrompt />}
        <AccountInfo />
        <ThemedButton
          type="tertiary"
          title="Sign out"
          onPress={handleLogoutPressed}
          isBusy={isLoggingOut}
          iconLeft={faSignOut}
          containerStyle={{margin: rs(30)}}
        />

        <CTAButton
          title="How Opiner works"
          onPress={() => Linking.openURL(OPINER_WORKS)}
          withTopBorder
        />
        <AppFooter />
      </ScrollView>
    </Container>
  );
};
export default AccountScreen;
