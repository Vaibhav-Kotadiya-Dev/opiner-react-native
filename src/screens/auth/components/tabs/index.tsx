import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {faArrowRightToBracket} from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faUserCheck} from '@fortawesome/pro-solid-svg-icons';

import AppText from 'components/app-text';
import authStyles from 'screens/auth/styles';
import tailwindColors from 'theme/tailwindColors';
import {rs, wp} from 'utils/ResponsiveScreen';
import {useAuthNavigation} from 'hooks/useNavigationHooks';

const AuthTab = ({
  onPress,
  title,
  icon,
  isDisabled,
}: {
  onPress?: () => void;
  title: string;
  icon: IconProp;
  isDisabled?: boolean;
}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
    style={{padding: rs(16)}}
  >
    <FontAwesomeIcon
      color={isDisabled ? tailwindColors.gray[500] : tailwindColors.green[500]}
      size={24}
      icon={icon}
      style={authStyles.icon}
    />
    <AppText
      size="h1"
      style={[
        authStyles.title,
        isDisabled && {color: tailwindColors.gray[500]},
      ]}
    >
      {title}
    </AppText>
  </TouchableOpacity>
);

interface AuthTabsProps {
  activeTab: 'signIn' | 'signUp';
  onActiveTabPress?: () => void;
  onNavigate?: () => void;
}

const AuthTabs = ({activeTab, onActiveTabPress, onNavigate}: AuthTabsProps) => {
  const navigation = useAuthNavigation();
  return (
    <View style={authStyles.tabContainer}>
      <AuthTab
        title="Sign in"
        icon={faArrowRightToBracket}
        isDisabled={activeTab !== 'signIn'}
        onPress={() => {
          if (activeTab === 'signUp') {
            navigation.navigate('LOGIN');
            onNavigate?.();
          } else {
            onActiveTabPress?.();
          }
        }}
      />
      <View style={{width: wp(16)}} />
      <AuthTab
        title="Sign up"
        icon={faUserCheck}
        isDisabled={activeTab !== 'signUp'}
        onPress={() => {
          if (activeTab === 'signIn') {
            navigation.navigate('REGISTER');
            onNavigate?.();
          } else {
            onActiveTabPress?.();
          }
        }}
      />
    </View>
  );
};

export default AuthTabs;
