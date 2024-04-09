import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {faLock} from '@fortawesome/pro-duotone-svg-icons';
import {faEye} from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Card from 'components/card';
import privacyCardStyles from './styles';
import AppText from 'components/app-text';
import {AppState} from 'store/rootReducer';
import IconTitle from 'components/icon-title';
import PrivacyControlItem from './Control';
import UserSocialLinks from '../SocialLinks';
import Asterisk from 'components/asterisk';
import tailwindColors from 'theme/tailwindColors';
import useUpdateUserProfile from 'hooks/useUpdateUserProfile';
import {getUserHasSocialLinks} from 'screens/account/helpers';

const textColor = '#ffffff';
type PrivacyUserKeyType =
  | 'privacyUserCompanyName'
  | 'privacyJobTitle'
  | 'privacyBiography'
  | 'privacySocialMedia';

const getPrivacyTextForKey = (key: PrivacyUserKeyType) => {
  switch (key) {
    case 'privacyUserCompanyName':
      return 'Company or Organisation';
    case 'privacyJobTitle':
      return 'Job Title or Role';
    case 'privacyBiography':
      return 'Biography';
    case 'privacySocialMedia':
      return 'Social Media Links';
    default:
      return '';
  }
};

interface AccountPrivacyProps {}

const AccountPrivacy = ({}: AccountPrivacyProps) => {
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const {handleUpdateProfile, isBusy} = useUpdateUserProfile();
  const updating = useRef<PrivacyUserKeyType>();
  const {
    privacyBiography,
    privacyJobTitle,
    privacySocialMedia,
    privacyUserCompanyName,
  } = user;

  const handleSubmit = async (key: PrivacyUserKeyType, value: boolean) => {
    updating.current = key;
    await handleUpdateProfile({
      method: 'saveprivacy',
      data: {
        ...{
          privacyBiography,
          privacyJobTitle,
          privacySocialMedia,
          privacyUserCompanyName,
        },
        [key]: value,
      },
      successMessageProps: {
        message: 'Privacy setting updated',
        description: `Your ${getPrivacyTextForKey(
          key,
        ).toLowerCase()} will now be ${
          value ? 'shared with' : 'hidden from'
        } client's communities.`,
      },
    });
  };

  return (
    <Card style={privacyCardStyles.card}>
      <IconTitle
        iconProps={{
          icon: faLock,
          color: textColor,
          secondaryColor: textColor + '70',
        }}
        titleStyle={{color: textColor}}
        title="Your Privacy"
      />
      <AppText size="h4" style={[{color: textColor}, privacyCardStyles.title]}>
        We take your privacy seriously and only ask for a small amount of
        personal information.
      </AppText>
      <AppText style={{color: textColor}}>
        <>
          We only share a subset of this information with client's communities.
          {'\n'}Visible information is listed below.{'\n'}Items with an asterisk{' '}
          <Asterisk color={textColor} /> must be visible.{'\n'}Other items can
          be made invisible by you.{'\n'}
          Click the eye icon <FontAwesomeIcon
            icon={faEye}
            color={textColor}
          />{' '}
          to toggle visibility.
        </>
      </AppText>
      <PrivacyControlItem
        disabled
        label={
          <>
            First name <Asterisk color={textColor} />
          </>
        }
        value={user.firstName}
        defaultActive
      />
      <PrivacyControlItem
        disabled
        label={
          <>
            Location <Asterisk color={textColor} />
          </>
        }
        value={user.locationName}
        defaultActive
      />
      <PrivacyControlItem
        defaultActive={privacyUserCompanyName}
        label="Company or Organisation"
        value={user.userCompanyName}
        isBusy={isBusy && updating.current === 'privacyUserCompanyName'}
        onToggle={(isActive: boolean) => {
          handleSubmit('privacyUserCompanyName', isActive);
        }}
      />
      <PrivacyControlItem
        defaultActive={privacyJobTitle}
        label="Job Title or Role"
        value={user.jobTitle}
        isBusy={isBusy && updating.current === 'privacyJobTitle'}
        onToggle={(isActive: boolean) => {
          handleSubmit('privacyJobTitle', isActive);
        }}
      />
      <PrivacyControlItem
        defaultActive={privacyBiography}
        label="Professional Biography"
        value={user.biography}
        isBusy={isBusy && updating.current === 'privacyBiography'}
        onToggle={(isActive: boolean) => {
          handleSubmit('privacyBiography', isActive);
        }}
      />
      {getUserHasSocialLinks(user) && (
        <PrivacyControlItem
          defaultActive={privacySocialMedia}
          label="Links"
          value={
            <UserSocialLinks user={user} iconColor={tailwindColors.white} />
          }
          isBusy={isBusy && updating.current === 'privacySocialMedia'}
          onToggle={(isActive: boolean) => {
            handleSubmit('privacySocialMedia', isActive);
          }}
        />
      )}
    </Card>
  );
};

export default AccountPrivacy;
