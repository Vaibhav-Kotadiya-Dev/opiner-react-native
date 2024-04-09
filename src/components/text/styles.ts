import {StyleSheet} from 'react-native';
import {MAIN_WHITE, SCREEN_BACKGROUND} from 'assets/colors';
import Font from 'assets/fonts';

const textStyles = StyleSheet.create({
  regular: {
    color: MAIN_WHITE,
    fontFamily: Font.Regular,
    fontSize: 18,
    lineHeight: 22,
  },
  h1: {
    color: MAIN_WHITE,
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 8,
    fontFamily: Font.Bold,
  },
  h2: {
    color: MAIN_WHITE,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: Font.Regular,
  },
  h3: {
    color: MAIN_WHITE,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Font.Bold,
  },
  h4: {
    color: MAIN_WHITE,
    fontSize: 20,
    fontFamily: Font.Bold,
  },
  h5: {
    color: MAIN_WHITE,
    fontSize: 18,
    fontFamily: Font.Bold,
  },
  h6: {
    color: MAIN_WHITE,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: Font.Bold,
  },
  paragraph: {
    color: MAIN_WHITE,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 1.389,
    fontFamily: Font.Regular,
  },
  smallParagraph: {
    color: MAIN_WHITE,
    textAlign: 'center',
    fontSize: 1,
    lineHeight: 1.786,
    fontFamily: Font.Regular,
  },
  time: {
    color: MAIN_WHITE,
    fontSize: 18,
    lineHeight: 1.167,
    fontFamily: Font.Bold,
  },
  tableData: {
    color: MAIN_WHITE,
    fontSize: 18,
    lineHeight: 1.167,
    fontFamily: Font.Regular,
  },
  tinyLabel: {
    color: SCREEN_BACKGROUND,
    fontFamily: Font.Bold,
  },
});

export default textStyles;
