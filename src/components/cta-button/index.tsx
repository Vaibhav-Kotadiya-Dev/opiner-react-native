import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {faAngleRight} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import useThemeContext from 'hooks/useThemeContext';
import {CTAButtonProps, getCTAButtonStyles} from './helpers';
import AspectRatioPreservedImage from 'components/question/video-overlay/AspectRatioPreservedImage';

const CTAButton = ({
  title,
  onPress,
  iconProps,
  type = 'primary',
  subtitle,
  imageUrl,
  iconRightProps,
  style,
  withTopBorder,
  titleStyle,
  fallbackImageUrl,
}: CTAButtonProps) => {
  const {theme} = useThemeContext();
  const {
    backgroundColor,
    chevronColor,
    color,
    subtitleColor,
    borderColor,
  } = getCTAButtonStyles(type, theme);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        withTopBorder && styles.topBorder,
        {backgroundColor, borderColor},
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {iconProps?.icon && (
        <FontAwesomeIcon
          color={color}
          size={rs(24)}
          style={styles.icon}
          {...iconProps}
        />
      )}
      {imageUrl && (
        <AspectRatioPreservedImage
          uri={imageUrl}
          style={styles.image}
          fallbackUri={fallbackImageUrl}
          resizeMode="contain"
        />
      )}
      <View style={styles.content}>
        <AppText style={[styles.title, {color}, titleStyle]} size="h3">
          {title}
        </AppText>
        {Boolean(subtitle) && (
          <AppText
            size="small"
            style={[styles.subtitle, {color: subtitleColor}]}
          >
            {subtitle}
          </AppText>
        )}
      </View>
      <FontAwesomeIcon
        icon={faAngleRight}
        color={chevronColor}
        size={rs(20)}
        {...iconRightProps}
      />
    </TouchableOpacity>
  );
};

export default CTAButton;
