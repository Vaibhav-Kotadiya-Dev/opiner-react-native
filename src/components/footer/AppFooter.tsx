import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {faCopyright} from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChampagneGlass,
  faFaceSmileTongue,
  faTeddyBear,
} from '@fortawesome/pro-solid-svg-icons';
import {getBuildNumber, getVersion} from 'react-native-device-info';

import useTheme from 'hooks/useTheme';
import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';

const footerStyles = StyleSheet.create({
  footer: {
    marginTop: rs(18),
    marginBottom: rs(42),
    alignSelf: 'center',
    textAlign: 'center',
  },
  versionText: {
    lineHeight: undefined,
    fontWeight: '500',
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(12),
  },
});

interface AppFooterProps {
  style?: StyleProp<ViewStyle>;
}

const AppFooter = ({style}: AppFooterProps) => {
  const {theme} = useTheme();
  const version = `v${getVersion()} (${getBuildNumber()})`;
  return (
    <View style={[footerStyles.footer, style]}>
      <View style={footerStyles.iconsContainer}>
        <FontAwesomeIcon
          icon={faChampagneGlass}
          size={rs(18)}
          color={theme.colors.mutedText}
        />
        <FontAwesomeIcon
          icon={faTeddyBear}
          size={rs(18)}
          color={theme.colors.mutedText}
          style={{marginHorizontal: rs(4)}}
        />
        <FontAwesomeIcon
          icon={faFaceSmileTongue}
          size={rs(18)}
          color={theme.colors.mutedText}
        />
      </View>
      <AppText
        size="extraSmall"
        style={[footerStyles.versionText, {color: theme.colors.mutedText}]}>
        Collaboration app {version}{' '}
        <FontAwesomeIcon
          icon={faCopyright}
          size={rs(10)}
          color={theme.colors.mutedText}
        />{' '}
        Opiner Ltd, {new Date().getFullYear()}
        {'\n'}
      </AppText>
    </View>
  );
};

export default AppFooter;
