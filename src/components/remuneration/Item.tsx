import React from 'react';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconDefinition} from '@fortawesome/pro-solid-svg-icons';

import styles from './styles';
import Color from 'assets/colors';
import {RegularText} from 'components/text/StyledText';

interface RemunerationItemProps {
  icon: IconDefinition;
  amount: number;
  type: 'light' | 'dark';
  position?: 'start' | 'end';
  active: boolean;
}

const RemunerationItem = ({
  icon,
  amount,
  type,
  position,
  active,
}: RemunerationItemProps) => {
  const accentColor =
    type === 'dark'
      ? active
        ? Color.Primary.Green
        : Color.White
      : Color.Primary.Grey;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            type === 'dark'
              ? Color.Primary.Grey
              : active
              ? Color.Primary.Green
              : Color.Secondary.Grey,
        },
        position === 'end' && !active && styles.leftStraight,
        position === 'start' && !active && styles.rightStraight,
      ]}
    >
      <FontAwesomeIcon icon={icon} color={accentColor} />
      <RegularText style={[styles.title, {color: accentColor}]}>
        £{amount.toFixed(2)}
      </RegularText>
    </View>
  );
};

export default RemunerationItem;
