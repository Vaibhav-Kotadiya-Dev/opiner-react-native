import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import tailwindColors from 'theme/tailwindColors';

const styles = StyleSheet.create({
  container: {paddingHorizontal: rs(8), alignItems: 'center'},
  title: {paddingTop: rs(4), fontSize: rs(20), fontWeight: '500'},
});

interface StatItemProps {
  icon: IconDefinition;
  count: number | string;
}

const StatItem = ({icon, count}: StatItemProps) => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon
        icon={icon}
        size={rs(16)}
        color={tailwindColors.pink[500]}
        secondaryColor={tailwindColors.pink[500] + '80'}
      />
      <AppText size="h4" style={styles.title}>
        {count}
      </AppText>
    </View>
  );
};

export default StatItem;
