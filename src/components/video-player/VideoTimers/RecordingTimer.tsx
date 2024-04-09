import React from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {OnProgressData} from 'react-native-video';

import {rs} from 'utils/ResponsiveScreen';
import {padZero} from 'utils';
import VideoTimer from './VideoTimer';
import {baseColors} from 'theme/colors';

export const videoTimerHeight = rs(32);

const styles = StyleSheet.create({
  timer: {alignSelf: 'flex-end', margin: rs(30)},
});

const formatProgressTime = (seconds: number) => {
  const duration = moment.duration(seconds, 'seconds');
  const formatted = `${Math.max(0, duration.get('minutes'))}:${padZero(
    Math.max(0, duration.get('seconds')),
  )}`;

  return formatted;
};

interface RecordingTimerProps {
  isExpiring?: boolean;
  progress: OnProgressData;
  isLessThan10?: boolean;
}

const RecordingTimer = ({
  isExpiring,
  progress,
  isLessThan10,
}: RecordingTimerProps) => {
  const backgroundColor = isLessThan10
    ? baseColors.red
    : isExpiring
    ? baseColors.orange
    : undefined;
  return (
    <VideoTimer
      time={formatProgressTime(progress.seekableDuration)}
      style={[styles.timer, !!backgroundColor && {backgroundColor}]}
    />
  );
};

export default RecordingTimer;
