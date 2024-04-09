import React from 'react';
import {View} from 'react-native';
import {
  faBackward,
  faClosedCaptioning,
  faClosedCaptioningSlash,
  faFastBackward,
  faForward,
  faPause,
  faPlay,
} from '@fortawesome/pro-solid-svg-icons';

import styles from './styles';
import VideoTimers from '../VideoTimers';
import VideoControlButton from './ControlButton';
import useVideoProgress from '../hooks/useVideoProgress';

import {baseColors} from 'theme/colors';
import {getSpeedIcon} from '../SpeedOptions/options';
import SpeedPickerOptions from '../SpeedOptions/SpeedPicker';
import {SpeedToggleProps} from '../hooks/useSpeedToggle';
import useThemeContext from 'hooks/useThemeContext';

interface VideoControlsProps {
  isLoading: boolean;
  onSpeedChange: () => void;
  isPaused: boolean;
  onSeek: (to: number) => void;
  onTogglePaused: () => void;
  responderName?: string;
  speedToggleProps: SpeedToggleProps;
  hasClosedCaptions?: boolean;
  toggleClosedCaptions?: () => void;
  captionsDisabledByUser?: boolean;
}

const VideoControls = ({
  isLoading,
  isPaused,
  onSpeedChange,
  onSeek,
  onTogglePaused,
  speedToggleProps,
  hasClosedCaptions,
  captionsDisabledByUser,
  toggleClosedCaptions
}: VideoControlsProps) => {
  const {progress} = useVideoProgress();

  const handlePlay = () => {
    const hasEnded =
      Math.floor(progress.currentTime) ===
      Math.floor(progress.seekableDuration);
    if (hasEnded) {
      onSeek(0);
    }
    onTogglePaused();
  };

  const {handleSpeedChange, speedPickerViewRef, speed, showSpeedOptions} =
    speedToggleProps;

  return (
    <>
      <SpeedPickerOptions
        containerRef={speedPickerViewRef}
        visible={showSpeedOptions}
        onSelect={handleSpeedChange}
        speed={speed}
      />
      {!isPaused && (
        <View style={styles.timersContainer}>
          <VideoTimers progress={progress} />
        </View>
      )}
      <View pointerEvents="box-none" style={styles.container}>
        <View style={styles.controls}>
          <VideoControlButton
            disabled={isLoading || isPaused}
            icon={faFastBackward}
            onPress={() => onSeek(0)}
          />
          <VideoControlButton
            disabled={isLoading || isPaused}
            icon={faBackward}
            onPress={() =>
              onSeek(
                progress.currentTime -
                  Math.min(progress.seekableDuration * 0.1, 5),
              )
            }
          />
          <VideoControlButton
            disabled={isLoading}
            isBusy={isLoading}
            onPress={handlePlay}
            icon={isPaused ? faPlay : faPause}
            style={{backgroundColor: baseColors.green}}
          />
          <VideoControlButton
            disabled={isLoading || isPaused}
            icon={faForward}
            onPress={() =>
              onSeek(
                progress.currentTime +
                  Math.min(progress.seekableDuration * 0.1, 5),
              )
            }
          />
          <VideoControlButton
            disabled={isLoading || isPaused || !hasClosedCaptions}
            icon={captionsDisabledByUser ? faClosedCaptioningSlash : faClosedCaptioning}
            onPress={toggleClosedCaptions}
          />
          <VideoControlButton
            icon={getSpeedIcon(speed)}
            isAtEnd
            onPress={onSpeedChange}
          />
        </View>
      </View>
    </>
  );
};

export default VideoControls;
