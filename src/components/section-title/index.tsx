import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';

import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  container: {
    paddingVertical: rs(16),
    paddingHorizontal: rs(30),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(6),
  },
  title: {flex: 1},
});

interface SectionTitleProps {
  title: string;
  iconProps?: Props;
  onPress?: () => void;
  rightComponent?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SectionTitle = ({
  title,
  iconProps,
  onPress,
  rightComponent,
  style,
}: SectionTitleProps) => {
  const {theme} = useThemeContext();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {backgroundColor: theme.colors.secondaryBackground},
          style,
        ]}>
        <AppText size="h2" style={styles.title}>
          {title}
        </AppText>
        {rightComponent
          ? rightComponent
          : iconProps?.icon && (
              <FontAwesomeIcon
                size={rs(18)}
                color={theme.colors.text}
                {...iconProps}
              />
            )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SectionTitle;
