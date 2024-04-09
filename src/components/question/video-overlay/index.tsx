import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import {Question} from 'network/data/Question';
import tailwindColors from 'theme/tailwindColors';
import useThemeContext from 'hooks/useThemeContext';

const {white} = tailwindColors;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    padding: rs(16),
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  label: {
    textAlign: 'center',
    marginBottom: rs(16),
  },
  title: {
    textAlign: 'center',
  },
  transparent: {opacity: 0},
  incentiveText: {textAlign: 'center', color: white},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: rs(40),
  },
  logo: {height: rs(40)},
  timer: {
    position: 'absolute',
    top: rs(30),
    right: rs(30),
  },
});

interface QuestionVideoOverlayProps {
  question: Question;
}

const QuestionVideoOverlay = ({question}: QuestionVideoOverlayProps) => {
  const {theme} = useThemeContext();
  const {title, communityName} = question;

  return (
    <LinearGradient
      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.60)']}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      style={styles.container}>
      <AppText size="h3" style={[styles.label, {color: theme.colors.white}]}>
        {communityName}
      </AppText>
      <AppText size="h1" style={[styles.title, {color: theme.colors.white}]}>
        {title}
      </AppText>
    </LinearGradient>
  );
};

export default QuestionVideoOverlay;
