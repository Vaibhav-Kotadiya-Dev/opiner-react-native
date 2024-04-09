import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {FontAwesomeIcon, Props} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/pro-solid-svg-icons';

import promptMessageStyles from './styles';
import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {baseColors, statusColors} from 'theme/colors';

export type PromptMessageType =
  | 'default'
  | 'info'
  | 'success'
  | 'danger'
  | 'warning';

const getIcon = (type: PromptMessageType) => {
  switch (type) {
    default:
      return faBell;
  }
};

export interface PromptMessageProps {
  type?: PromptMessageType;
  title: string;
  description?: ReactNode;
  iconProps?: Partial<Props>;
  hideIcon?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  secondIcon?: IconProp;
}

const background = {
  ...statusColors,
  default: baseColors.blue,
};

const PromptMessage = ({
  type = 'default',
  title,
  description,
  iconProps,
  hideIcon,
  style,
  titleStyle,
}: PromptMessageProps) => {
  const {
    theme: {
      colors: {white, cardBorder},
    },
  } = useThemeContext();
  return (
    <View
      style={[
        promptMessageStyles.container,
        {backgroundColor: background[type]},
        type === 'default' && {
          borderColor: cardBorder,
        },
        style,
      ]}>
      <View style={promptMessageStyles.content}>
        {!hideIcon && (
          <FontAwesomeIcon
            icon={iconProps?.icon || getIcon(type)}
            size={iconProps?.size || rs(16)}
            color={iconProps?.color || white}
            style={iconProps?.style || promptMessageStyles.icon}
          />
        )}
        <AppText
          size="h3"
          style={[promptMessageStyles.title, {color: white}, titleStyle]}>
          {description || title}
        </AppText>
      </View>
    </View>
  );
};

export default PromptMessage;
