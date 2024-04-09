import React from 'react';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faInstagramSquare,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import {IconProp} from '@fortawesome/fontawesome-svg-core';
import accountScreenStyles from 'screens/account/styles';
import useThemeContext from 'hooks/useThemeContext';
import IUser from 'network/data/User';

const socialIcons: Record<string, IconProp> = {
  linkedIn: faLinkedin,
  instagram: faInstagramSquare,
  twitter: faTwitter,
};

interface UserSocialLinksProps {
  iconColor?: string;
  user?: IUser;
}

const UserSocialLinks = ({iconColor, user}: UserSocialLinksProps) => {
  const {theme} = useThemeContext();

  return (
    <View style={accountScreenStyles.row}>
      {Object.keys(socialIcons).map((iconKey, index) => {
        // @ts-ignore
        if (!user?.[iconKey]) {
          return null;
        }
        return (
          <FontAwesomeIcon
            key={index}
            icon={socialIcons[iconKey]}
            color={iconColor || theme.colors.text}
            style={accountScreenStyles.socialIcon}
          />
        );
      })}
    </View>
  );
};

export default UserSocialLinks;
