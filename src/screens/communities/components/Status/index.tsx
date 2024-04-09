import React from 'react';
import {StyleSheet, View} from 'react-native';
import {faCalendar, faVideo} from '@fortawesome/pro-duotone-svg-icons';
import {faCommentQuestion} from '@fortawesome/pro-solid-svg-icons';

import CommunityStatusPill from './Pill';
import {rs} from 'utils/ResponsiveScreen';
import IconCount from 'screens/communities/components/IconCount';
import {CommunityResponseStatusType} from 'network/data/Community';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(16),
  },
});

interface CommunityStatusProps {
  status: CommunityResponseStatusType;
  days?: number;
  questions?: number;
  responses?: number;
}

const CommunityStatus = ({
  status,
  days,
  questions,
  responses,
}: CommunityStatusProps) => {
  return (
    <View style={styles.container}>
      <CommunityStatusPill status={status} />
      {days !== undefined && <IconCount icon={faCalendar} count={days} />}
      {questions !== undefined && (
        <IconCount icon={faCommentQuestion} count={questions} />
      )}
      {responses !== undefined && (
        <IconCount icon={faVideo} count={responses} />
      )}
    </View>
  );
};

export default CommunityStatus;
