import {useCallback, useEffect, useState} from 'react';
import {Keyboard, LayoutAnimation} from 'react-native';

/**
 * Get the visibility of the device's touch keyboard.
 * This is similar to the useKeyboardVisibility hook, but listens to
 * 'keyboardWillShow' instead of 'keyboardDidShow'
 * and also takes an argument for layout animation
 */
const useKeyboardVisibility = (shouldAnimate = false) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const animate = useCallback(() => {
    if (shouldAnimate) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [shouldAnimate]);

  useEffect(() => {
    const keyboardDidShowHandler = Keyboard.addListener(
      'keyboardWillShow',
      event => {
        animate();
        setKeyboardVisible(true);
        setKeyboardHeight(event.endCoordinates.height);
      },
    );
    const keyboardDidHideHandler = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      },
    );

    return () => {
      animate();
      keyboardDidHideHandler.remove();
      keyboardDidShowHandler.remove();
    };
  }, [animate]);

  return {isKeyboardVisible, keyboardHeight};
};

export default useKeyboardVisibility;
