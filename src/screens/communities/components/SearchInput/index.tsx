import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {faTimes} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import Input from 'screens/auth/components/input/Input';
import {InputProps} from 'screens/auth/components/input/utils';

const styles = StyleSheet.create({
  input: {},
  container: {flex: 1, justifyContent: 'center'},
});

export interface CommunitySearchInputProps extends InputProps {}

const CommunitySearchInput = ({
  onChange,
  error,
  ...rest
}: CommunitySearchInputProps) => {
  const {theme} = useThemeContext();
  const inputRef = useRef<TextInput>(null);
  const [input, setInput] = useState('');

  return (
    <Input
      ref={inputRef}
      value={input}
      label="Community ID"
      error={error}
      inputStyle={[styles.input, {color: theme.colors.text}]}
      right={
        input.length ? (
          <TouchableOpacity
            onPress={() => {
              onChange?.('');
              inputRef.current?.clear();
              setInput('');
            }}>
            <FontAwesomeIcon
              icon={faTimes}
              color={theme.colors.text}
              size={rs(16)}
            />
          </TouchableOpacity>
        ) : null
      }
      returnKeyType="go"
      {...rest}
      onChangeText={value => {
        onChange?.(value);
        setInput(value);
      }}
    />
  );
};

export default CommunitySearchInput;
