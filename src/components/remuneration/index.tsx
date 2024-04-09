import React from 'react';
import {View} from 'react-native';
import {faCoin, faHandHeart} from '@fortawesome/pro-regular-svg-icons';

import styles from './styles';
import RemunerationItem from './Item';
import {ResponseStatusText} from 'screens/timeline/utils';

interface RemunerationProps {
  donation?: number;
  paid?: number;
  status: ResponseStatusText;
}

const Remuneration = ({donation, paid, status}: RemunerationProps) => {
  if (!donation && !paid) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      {Boolean(paid) && paid !== undefined && status !== 'Donated' && (
        <RemunerationItem
          icon={faCoin}
          type="light"
          amount={paid}
          position={donation ? 'start' : undefined}
          active={status === 'Paid'}
        />
      )}
      {Boolean(donation) && donation !== undefined && status !== 'Paid' && (
        <RemunerationItem
          icon={faHandHeart}
          type="dark"
          amount={donation}
          position={paid ? 'end' : undefined}
          active={status === 'Donated'}
        />
      )}
    </View>
  );
};

export default Remuneration;
