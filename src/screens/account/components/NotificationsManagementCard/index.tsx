import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import RedirectItem from 'components/redirect-item';
import {statusColors} from 'theme/colors';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  transparentBorder: {borderColor: 'transparent'},
});

const NotificationsManagementCard = ({
  isActive,
  icon,
  title,
  description,
  buttonTitle,
  onPress,
}: {
  isActive?: boolean;
  icon: IconProp;
  title: string;
  description: string;
  buttonTitle: string;
  onPress?: () => void;
}) => {
  const {theme} = useThemeContext();
  return (
    <View>
      <RedirectItem
        iconProps={{
          icon,
          color: isActive ? statusColors.info : statusColors.warning,
          size: rs(24),
        }}
        title={`${title} ${isActive ? 'enabled' : 'disabled'}`}
        isSmall
        iconRightProps={{color: 'transparent'}}
        style={styles.transparentBorder}
        titleStyle={{color: theme.colors.text}}
      />
      <AppText size="h3" style={{paddingHorizontal: rs(30)}}>
        {description}
      </AppText>
      <RedirectItem
        title={buttonTitle}
        onPress={onPress ? onPress : () => Linking.openSettings()}
        style={styles.transparentBorder}
      />
    </View>
  );
};
export default NotificationsManagementCard;
