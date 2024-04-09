import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import tailwindColors from 'theme/tailwindColors';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', paddingStart: rs(12)},
  title: {paddingStart: rs(4)},
});

interface IconCountProps {
  icon: IconDefinition;
  count: number;
  style?: StyleProp<ViewStyle>;
}

const IconCount = ({icon, count, style}: IconCountProps) => {
  const {theme} = useThemeContext();

  return (
    <View style={[styles.container, style]}>
      <FontAwesomeIcon
        icon={icon}
        size={rs(14)}
        color={theme.colors.text}
        secondaryColor={tailwindColors.gray[400]}
      />
      <AppText style={styles.title}>{count}</AppText>
    </View>
  );
};

export default IconCount;
