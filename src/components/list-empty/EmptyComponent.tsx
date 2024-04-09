import React, {ReactElement} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

interface Props {
  title: string;
  description?: Array<string> | string;
}

const EmptyComponent = ({title, description}: Props): ReactElement => {
  const descriptions = Array.isArray(description) ? description : [description];
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {descriptions.map((desc, index) => (
          <Text key={index} style={styles.description}>
            {desc}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default EmptyComponent;
