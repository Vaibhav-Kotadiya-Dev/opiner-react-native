import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OnProgressData} from 'react-native-video';
import moment from 'moment';

import {padZero} from 'utils';
import VideoTimer from './VideoTimer';
import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: rs(30),
  },
});

interface VideoTimersProps {
  progress: OnProgressData;
  isExpiring?: boolean;
}

export const formatVideoProgressTime = (seconds: number) => {
  const duration = moment.duration(seconds, 'seconds');
  const formatted = `${Math.max(0, duration.get('minutes'))}:${padZero(
    Math.max(0, duration.get('seconds')),
  )}`;

  return formatted;
};

const VideoTimers = ({progress, isExpiring}: VideoTimersProps) => {
  return (
    <View style={styles.container}>
      <VideoTimer time={formatVideoProgressTime(progress.currentTime)} />
      <VideoTimer
        style={[isExpiring && {backgroundColor: Color.Primary.Red + 'AA'}]}
        time={formatVideoProgressTime(progress.seekableDuration)}
      />
    </View>
  );
};

export default VideoTimers;
