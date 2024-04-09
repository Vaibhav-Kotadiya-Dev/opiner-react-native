import React from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import {
  hideMessage,
  Message,
  MessageComponentProps,
} from 'react-native-flash-message';

import PromptMessage, {
  PromptMessageProps,
  PromptMessageType,
} from 'components/prompt-message';
import {Constant} from 'screens/upload/utils';
import {baseColors, statusColors} from 'theme/colors';

export interface CustomFlashMessageType
  extends Message,
    Omit<PromptMessageProps, 'title' | 'type' | 'description'> {
  type?: PromptMessageType;
}

interface CustomFlashMessageProps
  extends MessageComponentProps,
    Pick<PromptMessageProps, 'hideIcon'> {
  message: CustomFlashMessageType;
}

const CustomFlashMessage = (props: CustomFlashMessageProps) => {
  const {message, description, style, ...rest} = props.message;
  const backgroundColor =
    rest.type === 'default'
      ? baseColors.blue
      : statusColors[rest.type || 'info'];

  return (
    <SafeAreaView style={{backgroundColor}}>
      {!Constant.isIOS && (
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle="light-content"
          animated={false}
        />
      )}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          hideMessage();
        }}>
        <PromptMessage
          title={message}
          description={description}
          style={style}
          {...rest}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomFlashMessage;
