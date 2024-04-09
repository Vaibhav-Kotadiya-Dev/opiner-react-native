import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  // faBookSkull,
  faCog,
  // faSuitcaseMedical,
} from '@fortawesome/pro-solid-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes, faWarning} from '@fortawesome/pro-solid-svg-icons';

import Card from 'components/card';
import IconTitle from 'components/icon-title';
import useThemeContext from 'hooks/useThemeContext';
import AccountDetailSection from '../DetailSection';
import accountScreenStyles from 'screens/account/styles';
import {rs} from 'utils/ResponsiveScreen';
import useUserPermissions from 'hooks/useNotificationPermission';
import tailwindColors from 'theme/tailwindColors';

import {useMainNavigation} from 'hooks/useNavigationHooks';
import {AppState} from 'store/rootReducer';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  statusInfo: {
    fontWeight: 'normal',
    fontSize: rs(16),
    marginTop: rs(6),
  },
  statusInfoIcon: {marginBottom: -2},
});

const StatusInfo = ({
  isActive,
  title,
  icon,
  enabledText,
  disabledText,
}: {
  isActive?: boolean;
  title?: string;
  icon?: IconDefinition;
  enabledText?: string;
  disabledText?: string;
}) => {
  const {theme} = useThemeContext();
  return (
    <IconTitle
      iconProps={{icon, size: rs(16)}}
      titleStyle={[
        styles.statusInfo,
        {
          color: isActive ? theme.colors.text : tailwindColors.red[500],
        },
      ]}
      title={
        <>
          <FontAwesomeIcon
            icon={isActive ? faCheck : faTimes}
            color={isActive ? theme.colors.text : tailwindColors.red[500]}
            style={styles.statusInfoIcon}
          />
          {isActive
            ? ` ${enabledText || `${title || ''} active`}`
            : ` ${disabledText || `${title || ''} not enabled`}`}
        </>
      }
    />
  );
};

interface AccountManagementProps {}

const AccountManagement = ({}: AccountManagementProps) => {
  const {
    hasNotificationPermission: isPushNotificationsEnabled,
  } = useUserPermissions();
  const navigation = useMainNavigation();
  const {data: user} = useSelector((state: AppState) => state.userProfile);

  return (
    <Card withBorder style={accountScreenStyles.card}>
      <AccountDetailSection
        onPress={() => navigation.navigate('ACCOUNT_MANAGEMENT')}
      ></AccountDetailSection>
    </Card>
  );
};

export default AccountManagement;
