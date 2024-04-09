import {StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';
import {TRANSPARENT_WHITE} from 'assets/colors';

const authStyles = StyleSheet.create({
  safeArea: {flex: 1},
  scrollView: {
    justifyContent: 'center',
  },
  linkContainer: {
    paddingHorizontal: rs(4),
    paddingVertical: rs(28),
  },
  content: {
    paddingHorizontal: rs(30),
    paddingTop: rs(16),
  },
  title: {
    textAlign: 'center',
    fontSize: rs(26),
  },
  link: {
    fontSize: rs(18),
    padding: rs(6),
  },
  linksContainer: {
    flexDirection: 'row',
    marginBottom: rs(12),
    display: 'flex',
  },
  devModeImage: {
    width: rs(76),
    height: rs(76),
    borderRadius: rs(38),
    overflow: 'hidden',
    borderWidth: rs(2),
    alignSelf: 'center',
    marginTop: rs(12),
    borderColor: TRANSPARENT_WHITE(0.8),
  },
  logo: {
    height: rs(130),
    width: rs(115),
    alignSelf: 'center',
    marginBottom: rs(76),
  },
  errorMessage: {marginBottom: rs(0)},
  icon: {alignSelf: 'center', marginBottom: rs(8)},
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: rs(100),
    padding: rs(18),
    marginBottom: rs(18),
  },
  properties: {
    paddingHorizontal: rs(20),
    paddingVertical: rs(32),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F5',
    justifyContent: 'space-between',
  },
  arrowRight: {
    width: rs(12),
    height: rs(18),
    alignSelf: 'flex-end',
  },
  propertyTitle: {
    color: 'black',
    fontSize: rs(18),
    marginHorizontal: 20,
  },
  propertiesIcon: {width: rs(28), height: rs(28)},
  welcomeTitle: {paddingHorizontal: rs(30), paddingVertical: rs(16)},
});

export default authStyles;
