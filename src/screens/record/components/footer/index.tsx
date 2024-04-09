import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Moment} from 'moment';

import {TitleText} from 'components/text/StyledText';
import {VideoTimeConfig} from 'utils';
import {rs} from 'utils/ResponsiveScreen';
import {TimedOutView} from 'components/mask';
import useTimer from 'hooks/useTimer';
import Color from 'assets/colors';
import AppText from 'components/app-text';
import RecordingTimer from 'components/video-player/VideoTimers/RecordingTimer';
import tailwindColors from 'theme/tailwindColors';

const styles = StyleSheet.create({
  countdownContainer: {
    position: 'absolute',
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdown: {fontSize: rs(90)},
  footer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  recording: {
    backgroundColor: Color.Primary.Red,
    width: 32,
    height: 32,
    borderRadius: 32,
    bottom: 16,
    left: 16,
  },
  ready: {
    fontSize: rs(42),
    lineHeight: rs(48),
    color: tailwindColors.white,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export const CountDown = ({
  countdown,
  isRecording,
}: {
  countdown: number;
  isRecording?: boolean;
}) => {
  return (
    <View style={styles.countdownContainer}>
      {countdown > 0 && (
        <TitleText style={styles.countdown}>{countdown}</TitleText>
      )}
      {countdown === -1 && !isRecording && (
        <AppText size="h1" style={styles.ready}>
          Ready?
        </AppText>
      )}
    </View>
  );
};

const Timer = ({
  expiresOn,
  onExpire,
}: {
  expiresOn?: Moment;
  onExpire: () => void;
}) => {
  const {minutes, seconds, ms} = useTimer(expiresOn, onExpire);
  const isExpiring = minutes === 0 && seconds <= 30;
  const isLessThan10 = minutes === 0 && seconds <= 10;
  const seekableDuration = minutes * 60 + seconds + ms / 1000;
  const currentTime = Math.max(
    0,
    expiresOn ? VideoTimeConfig.seconds - seekableDuration : 0,
  );
  return (
    <RecordingTimer
      isExpiring={isExpiring}
      isLessThan10={isLessThan10}
      progress={{
        currentTime,
        playableDuration: 0,
        seekableDuration,
      }}
    />
  );
};

const Footer = ({
  countdown,
  expiresOn,
  onExpire,
  isRecording,
  timedOut,
  reviewing,
  exitTimedOut,
}: {
  countdown: number;
  expiresOn: Moment;
  onExpire: () => void;
  isRecording?: boolean;
  timedOut?: boolean;
  reviewing?: boolean;
  exitTimedOut?: () => void;
}) => {
  return (
    <View
      style={[styles.footer, !isRecording && styles.overlay]}
      pointerEvents={reviewing ? 'none' : 'auto'}
    >
      {!timedOut && !reviewing ? (
        <>
          <CountDown isRecording={isRecording} countdown={countdown} />
          <Timer onExpire={onExpire} expiresOn={expiresOn} />
        </>
      ) : (
        <TimedOutView onPress={exitTimedOut} visible={timedOut} />
      )}
    </View>
  );
};

export default Footer;
