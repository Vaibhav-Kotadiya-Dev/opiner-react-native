import React, {ReactNode} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';
import {faChevronRight} from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import useThemeContext from 'hooks/useThemeContext';
import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: rs(32),
  },
  content: {flex: 1},
});

interface AccountDetailSectionProps extends TouchableHighlightProps {
  children?: ReactNode;
}

const AccountDetailSection = ({
  children,
  style,
  ...rest
}: AccountDetailSectionProps) => {
  const {theme} = useThemeContext();
  return (
    <TouchableHighlight
      underlayColor={
        theme.name === 'Dark'
          ? tailwindColors.slate[700]
          : tailwindColors.slate[50]
      }
      activeOpacity={0.85}
      {...rest}
      style={[
        styles.container,
        {backgroundColor: theme.colors.cardBackground},
        style,
      ]}
    >
      <>
        <View style={styles.content}>{children}</View>
        <FontAwesomeIcon
          icon={faChevronRight}
          color={theme.colors.text}
          size={rs(18)}
        />
      </>
    </TouchableHighlight>
  );
};

export default AccountDetailSection;
