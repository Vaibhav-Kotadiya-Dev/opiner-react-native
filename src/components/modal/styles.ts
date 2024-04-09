import {StyleSheet} from 'react-native';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {rs} from 'utils/ResponsiveScreen';
import {minCTAButtonHeight} from 'components/cta-button/styles';

const styles = StyleSheet.create({
  centeredView: {flex: 1},
  paddedView: {
    padding: rs(14),
    justifyContent: 'center',
  },
  modalView: {
    width: '100%',
    padding: rs(16),
    borderRadius: 8,
  },
  fullScreenModalView: {
    borderRadius: 0,
    flex: 1,
    justifyContent: 'center',
  },
  modalTitleContainer: {
    marginBottom: rs(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    flex: 1,
    fontSize: rs(24),
  },
  modalText: {
    marginBottom: rs(36),
    textAlign: 'center',
  },
  alertBox: {
    borderRadius: 6,
    padding: rs(16),
    width: '100%',
  },
  alertIcon: {
    height: rs(44),
    width: rs(44),
    backgroundColor: Color.DimmedGray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    marginLeft: rs(14),
    fontSize: rs(16),
    color: '#fff',
    flex: 1,
    fontFamily: Font.Regular,
  },
  iconView: {
    width: rs(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    marginRight: rs(40),
    fontWeight: 'bold',
    fontSize: rs(16),
    color: '#fff',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: rs(18),
  },
  promptModalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: rs(72),
    marginTop: minCTAButtonHeight * 2,
    paddingHorizontal: rs(30),
  },
});

export default styles;
