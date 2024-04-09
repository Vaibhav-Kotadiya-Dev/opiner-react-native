import React from 'react';
import {
  TouchableOpacityProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import tabBarButtonStyles from './styles';
import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import tailwindColors from 'theme/tailwindColors';
import useThemeContext from 'hooks/useThemeContext';

interface TabBarButtonProps extends TouchableOpacityProps {
  isFocused?: boolean;
  badge?: number | string;
  icon: IconDefinition;
  title: string;
  badgeColor?: string;
}

const TabBarButton = ({
  isFocused,
  onPress,
  badge,
  icon,
  title,
  badgeColor,
}: TabBarButtonProps) => {
  const {theme} = useThemeContext();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          tabBarButtonStyles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderTopColor: isFocused
              ? theme.colors.accent
              : theme.colors.cardBorder,
            marginTop: -1,
          },
        ]}>
        <View style={tabBarButtonStyles.iconContainer}>
          <FontAwesomeIcon
            color={isFocused ? theme.colors.accent : tailwindColors.slate[500]}
            icon={icon}
            size={rs(20)}
          />
        </View>
        <AppText
          size="extraSmall"
          style={[
            tabBarButtonStyles.label,
            {
              color: isFocused
                ? theme.colors.accent
                : tailwindColors.slate[500],
            },
          ]}>
          {title}
        </AppText>
        {badge && (
          <View
            style={[
              tabBarButtonStyles.badge,
              {backgroundColor: badgeColor || tailwindColors.red[600]},
            ]}>
            <AppText size="extraSmall" style={tabBarButtonStyles.badgeText}>
              {badge}
            </AppText>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TabBarButton;
