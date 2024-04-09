import {RefObject, useRef, useState} from 'react';
import {View as AnimatableView} from 'react-native-animatable';

export interface SpeedToggleProps {
  speed: number;
  handleSpeedChange: (selectedSpeed: number) => void;
  showSpeedOptions: boolean;
  handleToggle: () => void;
  speedPickerViewRef: RefObject<AnimatableView>;
}

const useSpeedToggle = (): SpeedToggleProps => {
  const [speed, setSpeed] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const speedPickerViewRef = useRef<AnimatableView>(null);

  const handleToggle = () => {
    if (!showSpeedOptions) {
      setShowSpeedOptions(true);
      speedPickerViewRef.current?.fadeIn?.(300);
    } else {
      speedPickerViewRef.current?.fadeOut?.(300).then(() => {
        setShowSpeedOptions(!showSpeedOptions);
      });
    }
  };

  const handleSpeedChange = (selectedSpeed: number) => {
    setSpeed(selectedSpeed);
    handleToggle();
  };

  return {
    speed,
    handleSpeedChange,
    showSpeedOptions,
    handleToggle,
    speedPickerViewRef,
  };
};

export default useSpeedToggle;
