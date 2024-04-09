import {Dimensions, StyleSheet} from 'react-native';

import {rs} from 'utils/ResponsiveScreen';

const deviceWidth = Dimensions.get('screen').width;
const rowInputSpacing = rs(16);
const rowInputWidth = (deviceWidth - rowInputSpacing - rs(60)) / 2;

const updateAccountStyles = StyleSheet.create({
  title: {textAlign: 'center'},
  scrollContent: {
    backgroundColor: '#F0F4F5',
  },
  helperText: {marginBottom: rs(12)},
  errorMessage: {marginBottom: 0, marginTop: 0},
  rowInput: {width: rowInputWidth},
  rowInputSeparator: {width: rowInputSpacing},
  rowInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  multilineInput: {
    minHeight: rs(90),
    textAlignVertical: 'top',
  },
  paddedContainer: {
    paddingHorizontal: rs(30),
    paddingVertical: rs(16),
  },
  sectionTitle: {zIndex: 1, marginHorizontal: -rs(30), marginBottom: rs(16)},
});

export default updateAccountStyles;
