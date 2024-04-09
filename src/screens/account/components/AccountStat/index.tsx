import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {
  faCalendar,
  faCommentQuestion,
  faHandHoldingDollar,
  faSackDollar,
  faVideoPlus,
} from '@fortawesome/pro-duotone-svg-icons';

import Card from 'components/card';
import StatItem from '../StatItem';
import {AppState} from 'store/rootReducer';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(12),
  },
});

interface AccountStatProps {}

const AccountStat = ({}: AccountStatProps) => {
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  if (!user) {
    return null;
  }
  const {
    questionsReceived,
    responsesProvided,
    donations,
    earningsToDate,
    created,
  } = user;
  const joinedDays = moment().diff(moment(created), 'days');

  return (
    <Card withBorder style={styles.container}>
      <StatItem icon={faCalendar} count={joinedDays} />
      <StatItem icon={faCommentQuestion} count={questionsReceived} />
      <StatItem icon={faVideoPlus} count={responsesProvided} />
      <StatItem icon={faSackDollar} count={`£${donations}`} />
      <StatItem icon={faHandHoldingDollar} count={`£${earningsToDate}`} />
    </Card>
  );
};

export default AccountStat;
