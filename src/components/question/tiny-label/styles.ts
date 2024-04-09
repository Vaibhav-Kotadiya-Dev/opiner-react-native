import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

import {TRANSPARENT_WHITE, SCREEN_BACKGROUND} from 'assets/colors';
import Font from 'assets/fonts';

interface Style {
  container: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    position: 'absolute',
    top: 16,
    borderRadius: 12,
    backgroundColor: TRANSPARENT_WHITE(0.8),
  },
  title: {
    marginVertical: 2,
    marginHorizontal: 4,
    textAlign: 'center',
    fontFamily: Font.Bold,
    fontSize: 12,
    color: SCREEN_BACKGROUND,
  },
});

export default styles;
