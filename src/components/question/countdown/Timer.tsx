import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

import Font from 'assets/fonts';
import {WHITE} from 'assets/colors';
import TimeItem from './TimeItem';
import useDeadlineTimer from './useDeadlineTimer';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: rs(16),
  },
  label: {
    fontFamily: Font.Bold,
    fontSize: rs(12),
    color: WHITE,
    textAlign: 'center',
  },
  timeView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

interface TimerProps {
  deadline: string;
  title: string;
}

const Timer = ({deadline, title}: TimerProps) => {
  const handleExpire = useCallback(() => false, []);
  const expiresOn = useMemo(() => moment(deadline), [deadline]);
  const {days, hours, minutes, seconds} = useDeadlineTimer(
    expiresOn,
    handleExpire,
  );
  const hasExpired = days <= 0 && hours <= 0 && minutes <= 0 && seconds < 1;
  if (hasExpired) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.timeView}>
        <TimeItem label="Day" value={days} />
        <TimeItem label="Hour" value={hours} />
        <TimeItem label="Minute" value={minutes} />
        <TimeItem label="Second" value={seconds} />
      </View>
    </View>
  );
};

export default Timer;
