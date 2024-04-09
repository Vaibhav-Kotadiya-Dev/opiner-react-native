import React from 'react';
import {StyleSheet, View} from 'react-native';

import * as Animatable from 'react-native-animatable';
import tailwindColors from 'theme/tailwindColors';
import useThemeContext from 'hooks/useThemeContext';

import {rs} from 'utils/ResponsiveScreen';
import {Question, ResponseStatus} from 'network/data/Question';

const {red, amber} = tailwindColors;

const styles = StyleSheet.create({
  container: {
    height: rs(32),
    width: rs(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseContainer: {
    height: rs(32),
    width: rs(32),
    borderRadius: rs(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: rs(20),
    width: rs(20),
    borderRadius: rs(20),
    position: 'absolute',
  },
});

interface PulseDotProps {
  question: Question;
}

const PulseDot = ({question}: PulseDotProps) => {
  const {theme} = useThemeContext();
  const showPill = [
    ResponseStatus.AwaitingOptInOut,
    ResponseStatus.OptedIn,
  ].includes(question.currentResponse.responseStatus);

  if (!showPill) {
    return <View />;
  }

  const color =
    question.currentResponse.responseStatus === ResponseStatus.AwaitingOptInOut
      ? amber[300]
      : question.currentResponse.responseStatus === ResponseStatus.OptedIn
      ? red[600]
      : theme.colors.transparent;

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="zoomIn"
        easing="ease-in-out-back"
        iterationCount="infinite"
        duration={1000}
        delay={600}
        style={[
          styles.pulseContainer,
          {
            backgroundColor:
              color === theme.colors.transparent ? color : color + '40',
          },
        ]}
      />
      <View style={[styles.dot, {backgroundColor: color}]} />
    </View>
  );
};

export default PulseDot;
