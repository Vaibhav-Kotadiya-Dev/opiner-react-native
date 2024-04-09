import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import {rs} from 'utils/ResponsiveScreen';

const accountScreenStyles = StyleSheet.create({
  scrollView: {padding: rs(0)},
  name: {
    textAlign: 'center',
    flex: 1,
    marginLeft: rs(-40),
  },
  info: {
    fontSize: rs(16),
    lineHeight: rs(24),
    fontFamily: Font.Medium,
    color: 'white',
    textAlign: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  footer: {textAlign: 'center'},
  card: {backgroundColor: 'transparent', padding: 0},
  sectionTopBorder: {borderTopWidth: 1},
  socialIcon: {
    height: rs(14),
    width: rs(14),
    alignSelf: 'flex-start',
    marginRight: rs(6),
    marginTop: rs(4),
  },
  greeting: {
    textAlign: 'center',
    paddingHorizontal: rs(30),
    marginBottom: rs(16),
    fontSize: rs(24),
  },
});

export default accountScreenStyles;
