import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {faEye, faEyeSlash} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import inputStyles from './styles';
import InputLabel from './Label';
import {rs} from 'utils/ResponsiveScreen';
import HelperText from 'components/helper-text';
import useThemeContext from 'hooks/useThemeContext';
import {InputComponentType, InputProps} from './utils';
import {statusColors} from 'theme/colors';

const InputInner: InputComponentType = (
  {
    label,
    onChange,
    style,
    isPassword,
    inputStyle,
    left,
    right,
    showCompulsory,
    helper,
    containerStyle,
    characterLimit,
    defaultValue,
    error,
    defaultPasswordVisible = false,
    ...rest
  }: InputProps,
  ref,
) => {
  const [isVisible, setVisible] = useState(!isPassword || defaultPasswordVisible);
  const [isFocused, setFocused] = useState(false);
  const {theme} = useThemeContext();
  const inputRef = useRef<TextInput>(null);
  const [forceValue, setForceValue] = useState(defaultValue);
  const characterCount = forceValue ? forceValue.length : 0;
  const remainingCharacters = (characterLimit || 0) - characterCount;

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
      setFocused(true);
    },
    clear: () => {
      inputRef.current?.clear();
    },
    blur: () => {
      setFocused(false);
      inputRef.current?.blur();
    },
  }));

  return (
    <View style={[inputStyles.container, containerStyle]}>
      <InputLabel label={label} showCompulsory={showCompulsory} />
      <InputLabel label={error} textColor={statusColors.danger} />
      <View
        style={[
          inputStyles.inputContainer,
          {
            borderColor: error ? statusColors.danger : theme.colors.inputBorder,
            backgroundColor: theme.colors.inputBackground,
          },
          isFocused && {borderColor: theme.colors.accent},
          style,
        ]}>
        {Boolean(left) && left}
        <TextInput
          ref={inputRef}
          onChangeText={value => {
            if (characterLimit) {
              if (value.length > characterLimit) {
                return;
              }
              setForceValue(value);
            }
            onChange?.(value);
          }}
          value={characterLimit ? forceValue : undefined}
          placeholderTextColor={theme.colors.helperText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize="none"
          secureTextEntry={!isVisible}
          {...rest}
          defaultValue={defaultValue === 'None' ? undefined : defaultValue}
          style={[
            inputStyles.input,
            {
              color: theme.colors.text,
              paddingLeft: left ? rs(12) : undefined,
              paddingRight: right ? rs(12) : undefined,
            },
            inputStyle,
          ]}
        />
        {isPassword && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setVisible(!isVisible)}
            hitSlop={{top: rs(5), bottom: rs(5), left: rs(5), right: rs(5)}}>
            <FontAwesomeIcon
              icon={isVisible ? faEyeSlash : faEye}
              color={theme.colors.text}
              size={rs(18)}
            />
          </TouchableOpacity>
        )}
        {Boolean(right) && right}
      </View>
      {(Boolean(helper) || characterLimit) && (
        <HelperText
          size="extraSmall"
          style={[
            {color: theme.colors.secondaryText, lineHeight: rs(16)},
            Boolean(characterLimit) &&
              remainingCharacters === 0 && {color: statusColors.danger},
          ]}
          containerStyle={{marginVertical: rs(8)}}>
          {helper || ''}
          {Boolean(helper) && Boolean(characterLimit) && ' '}
          {characterLimit
            ? characterCount === 0
              ? `${characterLimit} character limit.`
              : remainingCharacters === 0
              ? 'Character limit reached.'
              : `${remainingCharacters} characters remaining.`
            : ''}
        </HelperText>
      )}
    </View>
  );
};

const Input = forwardRef(InputInner);

export default Input;
