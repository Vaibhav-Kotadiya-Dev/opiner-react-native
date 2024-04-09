import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';

import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import {AppTextProps} from 'components/app-text/utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {marginRight: rs(16)},
});

export interface IconTitleProps {
  iconProps?: Partial<Props>;
  title: string | ReactNode;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  textProps?: Partial<AppTextProps>;
}

const IconTitle = ({
  title,
  iconProps,
  titleStyle,
  style,
  children,
}: IconTitleProps) => {
  const {theme} = useThemeContext();

  return (
    <View style={[styles.container, style]}>
      {iconProps?.icon && (
        <FontAwesomeIcon
          color={theme.colors.text}
          secondaryColor={theme.colors.text + '70'}
          size={rs(24)}
          {...iconProps}
          icon={iconProps?.icon}
          style={[styles.icon, iconProps?.style]}
        />
      )}
      <AppText
        size="h3"
        style={[
          {color: theme.colors.text},
          !!children && {
            marginRight: rs(8),
          },
          titleStyle,
        ]}
      >
        {title}
      </AppText>
      {children}
    </View>
  );
};

export default IconTitle;
