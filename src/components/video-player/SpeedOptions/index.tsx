import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import SpeedOption from './Option';
import VideoControlButton from '../VideoControls/ControlButton';
import useThemeContext from 'hooks/useThemeContext';

const options = [0.8, 1, 1.2, 1.5, 2];

interface SpeedOptionsProps {
  selected: number;
  onSelect: (speed: number) => void;
}

const SpeedOptions = ({onSelect, selected}: SpeedOptionsProps) => {
  const [isVisible, setVisible] = useState(false);
  const {theme} = useThemeContext();

  const handleClose = () => setVisible(false);

  return (
    <>
      <VideoControlButton
        isAtEnd
        title={`${selected}x`}
        onPress={() => setVisible(true)}
      />
      <Modal
        onRequestClose={handleClose}
        transparent
        visible={isVisible}
        animationType="fade"
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={handleClose}
            activeOpacity={1}
          />
          <View
            style={[
              styles.modal,
              {
                backgroundColor: theme.colors.inputBackground,
              },
            ]}
          >
            {options.map((option, index) => (
              <SpeedOption
                key={option + index.toString()}
                onPress={() => {
                  onSelect(option);
                  handleClose();
                }}
                isSelected={selected === option}
                title={option === 1 ? 'Normal' : option.toString() + 'x'}
              />
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SpeedOptions;
