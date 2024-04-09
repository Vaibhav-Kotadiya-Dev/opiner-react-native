import React from 'react';
import {faCircle, faStop} from '@fortawesome/pro-solid-svg-icons';

import ThemedButton from 'components/themed-button';
import tailwindColors from 'theme/tailwindColors';

export type RecordingState =
  | 'initial'
  | 'recording'
  | 'paused'
  | 'stopped'
  | 'timeout'
  | 'reviewing';

interface RecordButtonProps {
  onStartRecording?: () => void;
  onPauseRecording?: () => void;
  enabled: boolean;
  status: RecordingState;
}

const RecordButton = ({
  onStartRecording,
  status = 'initial',
  enabled = true,
  onPauseRecording,
}: RecordButtonProps) => {
  const isRecording = status === 'recording';
  const isPaused = status === 'paused';

  return (
    <ThemedButton
      title={isPaused ? 'Please wait...' : isRecording ? 'Stop' : 'Record'}
      textStyle={{color: tailwindColors.white}}
      type="danger"
      disabled={!enabled}
      onPress={() => {
        if (!enabled) {
          return;
        }
        if (isRecording) {
          onPauseRecording?.();
        } else {
          onStartRecording?.();
        }
      }}
      iconLeft={isRecording ? faStop : isPaused ? undefined : faCircle}
      isBusy={isPaused}
    />
  );
};

export default RecordButton;
