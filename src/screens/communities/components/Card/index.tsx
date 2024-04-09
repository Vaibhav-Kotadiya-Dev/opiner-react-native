import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';

import CommunityImage from '../Image';
import CommunityStatus from '../Status';
import AppText from 'components/app-text';
import communityCardStyles from './styles';
import {ICommunity} from 'network/data/Community';
import useThemeContext from 'hooks/useThemeContext';
import {
  getCommunityStatus,
  getUserHasJoinedCommunity,
} from 'screens/communities/utils';
import {rs} from 'utils/ResponsiveScreen';

interface CommunityCardProps extends TouchableOpacityProps {
  community: ICommunity;
}

const CommunityCard = ({community, style, ...rest}: CommunityCardProps) => {
  const {theme} = useThemeContext();
  const {
    details,
    linkResponderCommunityStatus,
    questionCount,
    responseCount,
    created,
  } = community;

  const status = getCommunityStatus(linkResponderCommunityStatus);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      {...rest}
      style={[
        communityCardStyles.container,
        {backgroundColor: theme.colors.cardBackground},
        style,
      ]}>
      <CommunityImage style={communityCardStyles.image} community={community} />
      <View style={communityCardStyles.descriptionContainer}>
        <View style={communityCardStyles.descriptionRow}>
          <View style={communityCardStyles.descriptionView}>
            {Boolean(details) && (
              <AppText style={communityCardStyles.description}>
                {details}
              </AppText>
            )}
            {getUserHasJoinedCommunity(community) && (
              <CommunityStatus
                status={status}
                days={moment().diff(moment(created), 'days')}
                questions={questionCount}
                responses={responseCount}
              />
            )}
          </View>
          <FontAwesomeIcon
            icon={faChevronRight}
            color={theme.colors.text}
            style={{marginTop: rs(16)}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityCard;
