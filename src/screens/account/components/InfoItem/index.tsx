import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

import AppText from 'components/app-text';
import {getThemedTextColor} from 'components/app-text/styles';
import useThemeContext from 'hooks/useThemeContext';
import {rs} from 'utils/ResponsiveScreen';
import {AppTextProps} from 'components/app-text/utils';

const styles = StyleSheet.create({
  container: {marginTop: rs(12)},
  label: {
    textTransform: 'uppercase',
    fontWeight: '600',
    marginRight: rs(6),
  },
  title: {
    fontSize: rs(16),
    lineHeight: rs(24),
  },
  labelContainer: {flexDirection: 'row', alignItems: 'center'},
});

export interface InfoItemProps {
  label: ReactNode;
  value?: ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  labelChildren?: ReactNode;
  showEmptyText?: boolean;
  textProps?: AppTextProps;
}

const InfoItem = ({
  label,
  value,
  children,
  style,
  labelStyle,
  valueStyle,
  labelChildren,
  showEmptyText,
  textProps,
}: InfoItemProps) => {
  const {theme} = useThemeContext();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <AppText size="extraSmall" style={[styles.label, labelStyle]}>
          {label}
        </AppText>
        {labelChildren}
      </View>
      {children ? (
        children
      ) : value || showEmptyText ? (
        <AppText
          size="extraSmall"
          {...textProps}
          style={[
            styles.title,
            !value && {
              color: getThemedTextColor('muted', theme.name === 'Dark'),
            },
            valueStyle,
          ]}>
          {value ? value : showEmptyText ? 'Not supplied' : null}
        </AppText>
      ) : null}
    </View>
  );
};

export default InfoItem;
