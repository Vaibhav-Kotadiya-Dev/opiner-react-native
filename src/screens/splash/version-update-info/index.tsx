import React, {ReactElement} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import QuoteSwiper from '../quote-swiper';

interface Props {
  version?: string;
}

const VersionUpdateInfo = ({version}: Props): ReactElement => (
  <View style={styles.container}>
    <Text style={styles.title}>Update Required</Text>
    <Text style={styles.subtitle}>
      A new version of the Opiner app is available.{'\n'}Please update to
      continue.{' '}
    </Text>
    {version && <Text style={styles.version}>( {version} )</Text>}
    <QuoteSwiper />
  </View>
);

export default VersionUpdateInfo;
