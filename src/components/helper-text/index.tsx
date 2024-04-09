import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';
import {faCircleInfo} from '@fortawesome/pro-solid-svg-icons';

import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import {AppTextProps} from 'components/app-text/utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: rs(16),
  },
  icon: {
    marginEnd: rs(8),
    minHeight: rs(22),
  },
  title: {
    flex: 1,
    fontWeight: '500',
    lineHeight: rs(20),
  },
});

interface HelperTextProps extends AppTextProps {
  withIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  iconProps?: Partial<Props>;
}

const HelperText = ({
  withIcon,
  style,
  containerStyle,
  iconProps,
  ...rest
}: HelperTextProps) => {
  const {theme} = useThemeContext();
  const textColor = theme.colors.secondaryText;

  return (
    <View style={[styles.container, containerStyle]}>
      {withIcon && (
        <FontAwesomeIcon
          icon={faCircleInfo}
          size={rs(18)}
          color={textColor}
          style={styles.icon}
          {...iconProps}
        />
      )}
      <AppText
        size="small"
        {...rest}
        style={[styles.title, {color: textColor}, style]}
      />
    </View>
  );
};

export default HelperText;
