import React from 'react';
import {View} from 'react-native';
import {faPeople} from '@fortawesome/pro-duotone-svg-icons';
import {
  faSquareCheck,
  faSquareEllipsis,
  faWarning,
  faBell,
  faSquare,
} from '@fortawesome/pro-solid-svg-icons';

import {statusColors} from 'theme/colors';
import CTAButton from 'components/cta-button';
import useCommunities from 'hooks/useCommunities';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import useUserPermissions from 'hooks/useNotificationPermission';
import {
  getHasPaymentInfo,
  getProfessionalProfileCompletionStatus,
  isAccountInfoValid,
} from 'utils/UserValidation';
import useUser from 'hooks/useUser';

interface AccountInfoProps {}

const AccountInfo = ({}: AccountInfoProps) => {
  const navigation = useMainNavigation();
  const {user} = useUser();

  const {hasLibraryPermission, hasNotificationPermission} =
    useUserPermissions();
  const communities = useCommunities();

  if (!user) {
    return null;
  }

  const showNotificationWarning =
    !hasLibraryPermission || !hasNotificationPermission;
  const showCommunityWarning = communities.length === 0;
  const showAccountWarning = !isAccountInfoValid(user);
  const hasPaymentInfo = getHasPaymentInfo(user);
  const profileCompletion = getProfessionalProfileCompletionStatus(user);

  return (
    <View>
      <CTAButton
        iconProps={{
          icon: showNotificationWarning ? faWarning : faBell,
          color: showNotificationWarning
            ? statusColors.warning
            : statusColors.info,
        }}
        title="Notifications and backups"
        onPress={() => navigation.navigate('ACCOUNT_MANAGEMENT')}
      />
      <CTAButton
        onPress={() => navigation.navigate('UPDATE_ACCOUNT_INFORMATION')}
        title="Account information"
        iconProps={{
          icon: showAccountWarning ? faWarning : faSquareCheck,
          color: showAccountWarning ? statusColors.warning : statusColors.info,
        }}
      />
      <CTAButton
        onPress={() => navigation.navigate('USER_COMMUNITIES')}
        iconProps={{
          icon: showCommunityWarning ? faWarning : faPeople,
          color: showCommunityWarning
            ? statusColors.warning
            : statusColors.info,
        }}
        title={`Communities (${communities.length})`}
      />
      <CTAButton
        onPress={() => navigation.navigate('UPDATE_PROFESSIONAL_INFORMATION')}
        iconProps={{
          icon:
            profileCompletion === 'complete'
              ? faSquareCheck
              : profileCompletion === 'empty'
              ? faSquare
              : faSquareEllipsis,
          color: statusColors.info,
        }}
        title="Profile"
      />
      <CTAButton
        onPress={() => navigation.navigate('UPDATE_PAYMENT_INFORMATION')}
        iconProps={{
          icon: hasPaymentInfo ? faSquareCheck : faSquare,
          color: statusColors.info,
        }}
        title="Payment information"
      />
    </View>
  );
};

export default AccountInfo;
