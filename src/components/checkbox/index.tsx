import React, {ReactNode, useState} from 'react';
import {TouchableOpacity, View, StyleProp, ViewStyle} from 'react-native';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import {baseColors, statusColors} from 'theme/colors';
import InputLabel from 'screens/auth/components/input/Label';

interface CheckboxProps {
  title?: ReactNode;
  defaultValue?: boolean;
  forcedValue?: boolean;
  onToggle?: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  error?: string;
}

const Checkbox = ({
  title,
  defaultValue,
  forcedValue,
  onToggle,
  style,
  error,
}: CheckboxProps) => {
  const [isActive, setActive] = useState(defaultValue ?? false);
  const {theme} = useThemeContext();

  const active = forcedValue ?? isActive;

  const handleToggle = () => {
    setActive(!active);
    onToggle?.(!active);
  };

  return (
    <>
      {Boolean(error?.length) && (
        <View style={styles.error}>
          <InputLabel label={error} textColor={statusColors.danger} />
        </View>
      )}
      <View style={[styles.container, style]}>
        <TouchableOpacity
          onPress={handleToggle}
          activeOpacity={0.85}
          style={[
            styles.checkbox,
            {
              borderColor: theme.colors.inputBorder,
            },
          ]}
        >
          <View
            style={[
              styles.checkBoxInner,
              {
                borderColor: isActive
                  ? baseColors.yellow
                  : theme.colors.transparent,
              },
            ]}
          >
            <FontAwesomeIcon
              icon={faCheck}
              size={rs(18)}
              color={isActive ? theme.colors.text : theme.colors.transparent}
            />
          </View>
        </TouchableOpacity>
        <AppText size="small" style={styles.title}>
          {title}
        </AppText>
      </View>
    </>
  );
};

export default Checkbox;
