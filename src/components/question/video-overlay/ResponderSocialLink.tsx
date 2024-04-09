import React from 'react';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

const styles = StyleSheet.create({
  container: {
    height: rs(32),
    width: rs(32),
    borderRadius: rs(32),
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(8),
  },
});

interface ResponderSocialLinkProps {
  icon: IconProp;
  link: string | undefined;
}

const ResponderSocialLink = ({icon, link}: ResponderSocialLinkProps) => {
  if (!link) {
    return null;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => Linking.openURL(link).catch()}>
      <FontAwesomeIcon icon={icon} size={rs(16)} color={tailwindColors.white} />
    </TouchableOpacity>
  );
};

export default ResponderSocialLink;
