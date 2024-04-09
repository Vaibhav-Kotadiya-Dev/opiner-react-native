import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import tailwindColors from 'theme/tailwindColors';
import Spinner from 'components/spinner/Spinner';

import InfoItem, {InfoItemProps} from '../InfoItem';
import {rs} from 'utils/ResponsiveScreen';
import {faEye, faEyeSlash} from '@fortawesome/pro-solid-svg-icons';

const textColor = '#ffffff';
const {green, red} = tailwindColors;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(12),
  },
  icon: {
    padding: rs(12),
    marginRight: rs(12),
    borderRadius: 2,
    height: rs(48),
    width: rs(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {marginTop: 0, flex: 1},
});

interface PrivacyControlItemProps extends InfoItemProps {
  defaultActive?: boolean;
  onToggle?: (newState: boolean) => void;
  disabled?: boolean;
  isBusy?: boolean;
}

const PrivacyControlItem = ({
  onToggle,
  disabled,
  defaultActive: isActive,
  isBusy,
  ...props
}: PrivacyControlItemProps) => {
  if (!props.value || props.value === 'None' || props.value === '') {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.icon,
          !disabled && {backgroundColor: isActive ? green[700] : red[600]},
        ]}
        disabled={disabled}
        onPress={() => {
          onToggle?.(!isActive);
        }}
      >
        {isBusy ? (
          <Spinner iconProps={{size: rs(20), color: tailwindColors.white}} />
        ) : (
          <FontAwesomeIcon
            icon={isActive ? faEye : faEyeSlash}
            color={tailwindColors.white}
            size={rs(20)}
          />
        )}
      </TouchableOpacity>
      <InfoItem
        {...props}
        labelStyle={{color: textColor}}
        valueStyle={{color: textColor}}
        style={styles.info}
        textProps={{numberOfLines: 6, adjustsFontSizeToFit: false}}
      />
    </View>
  );
};

export default PrivacyControlItem;
