import {StyleSheet, ViewStyle, TextStyle, Dimensions} from 'react-native';
import {INFO, WHITE} from 'assets/colors';
import Font from 'assets/fonts';

interface Style {
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  version: TextStyle;
}

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: INFO,
    paddingHorizontal: 16,
    paddingTop: height / 4,
  },
  title: {
    fontSize: 28,
    fontFamily: Font.Bold,
    color: WHITE,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: Font.Bold,
    color: WHITE,
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 12,
  },
  version: {
    fontSize: 15,
    fontFamily: Font.Regular,
    color: WHITE,
    textAlign: 'center',
    marginBottom: 72,
  },
});

export default styles;
