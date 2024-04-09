import React from 'react';
import {
  faBell,
  faClapperboard,
  faTriangleExclamation,
} from '@fortawesome/pro-solid-svg-icons';

import {Container} from 'components/index';
import SectionTitle from 'components/section-title';
import useUserPermissions from 'hooks/useNotificationPermission';
import NotificationsManagementCard from '../components/NotificationsManagementCard';
import {Constant} from 'screens/upload/utils';

const AccountManagementScreen = () => {
  const {
    hasNotificationPermission,
    hasLibraryPermission,
    hasAskedLibraryPermission,
    requestLibraryPermission,
  } = useUserPermissions();
  return (
    <Container withSafeArea={false}>
      <SectionTitle title="Notifications" iconProps={{icon: faBell}} />
      <NotificationsManagementCard
        icon={hasNotificationPermission ? faBell : faTriangleExclamation}
        isActive={hasNotificationPermission}
        title="Notifications"
        description="Questions and responses are time sensitive. To avoid missing opt in and responses deadlines it is recommended you enable notifications."
        buttonTitle="Manage notification settings"
      />
      <SectionTitle title="Backups" />
      <NotificationsManagementCard
        icon={hasLibraryPermission ? faClapperboard : faTriangleExclamation}
        title="Photo library access"
        isActive={hasLibraryPermission}
        description="As an extra layer of protection against data loss your response video can be saved to your devices photo library."
        buttonTitle="Manage photo library access"
        onPress={
          !Constant.isIOS || hasAskedLibraryPermission
            ? undefined
            : requestLibraryPermission
        }
      />
    </Container>
  );
};

export default AccountManagementScreen;
