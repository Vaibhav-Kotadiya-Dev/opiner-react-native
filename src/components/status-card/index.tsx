import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  faCalendar,
  faCommentQuestion,
  faUser,
} from '@fortawesome/pro-duotone-svg-icons';
import moment from 'moment';

import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import AppText from 'components/app-text';
import {getThemedTextColor} from 'components/app-text/styles';
import tailwindColors from 'theme/tailwindColors';
import IconTitle from 'components/icon-title';
import CommunityStatusPill from 'screens/communities/components/Status/Pill';
import {CommunityResponseStatusType} from 'network/data/Community';
import {UserStatusTextType} from 'screens/account/helpers';
import {StatusPillProps} from 'components/status-pill';

const styles = StyleSheet.create({
  container: {borderRadius: 6, padding: rs(16)},
  item: {marginBottom: rs(12)},
  title: {fontSize: rs(16), lineHeight: rs(24), fontWeight: '600'},
});

interface ActiveStatusCardProps {
  joined: string;
  questionsCount?: number;
  responsesCount?: number;
  status: CommunityResponseStatusType | UserStatusTextType;
  pillProps?: Partial<StatusPillProps>;
}

const StatusCard = ({
  joined,
  questionsCount,
  responsesCount,
  status,
  pillProps,
}: ActiveStatusCardProps) => {
  const {theme} = useThemeContext();
  return (
    <View style={{marginVertical: rs(12)}}>
      <IconTitle
        titleStyle={styles.title}
        title="Status"
        iconProps={{icon: faUser}}
        style={styles.item}
      >
        <CommunityStatusPill
          {...pillProps}
          status={status as CommunityResponseStatusType}
          size="small"
        />
      </IconTitle>
      <IconTitle
        title="Joined"
        iconProps={{icon: faCalendar}}
        titleStyle={styles.title}
        style={styles.item}
      >
        <AppText>{moment(joined).format('DD MMM YYYY')} </AppText>
        <AppText
          style={{
            color: getThemedTextColor('muted', theme.name === 'Dark'),
          }}
        >
          ({moment(joined).fromNow()})
        </AppText>
      </IconTitle>
      <IconTitle
        titleStyle={styles.title}
        title="Questions"
        iconProps={{
          icon: faCommentQuestion,
          color: tailwindColors.slate[400],
          secondaryColor: theme.colors.text,
        }}
        style={styles.item}
      >
        <AppText>{questionsCount} </AppText>
      </IconTitle>
      <IconTitle
        titleStyle={styles.title}
        title="Responses"
        iconProps={{icon: faCalendar}}
      >
        <AppText>{responsesCount} </AppText>
      </IconTitle>
    </View>
  );
};

export default StatusCard;
