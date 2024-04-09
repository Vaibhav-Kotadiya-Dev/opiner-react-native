import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Platform, StyleProp, View, ViewStyle} from 'react-native';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/pro-regular-svg-icons';

import useThemeContext from 'hooks/useThemeContext';
import {rs} from 'utils/ResponsiveScreen';
import dropDownInputStyles from './styles';
import InputLabel, {InputLabelProps} from 'screens/auth/components/input/Label';
import {statusColors} from 'theme/colors';

interface DropdownInputProps extends InputLabelProps {
  options: ItemType<string | number>[];
  defaultValue?: ValueType;
  placeholder?: string;
  onChange?: (value: any) => void;
  onFocus?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  zIndex?: number;
  error?: string;
}

export interface DropdownRefMethods {
  focus: () => void;
  blur: () => void;
}

export const defaultDropDownZIndex = 1000;

const DropdownInputInner: ForwardRefRenderFunction<
  DropdownRefMethods,
  DropdownInputProps
> = (
  {
    label,
    defaultValue,
    onChange,
    options,
    showCompulsory,
    placeholder,
    containerStyle,
    onFocus,
    zIndex,
    error,
  }: DropdownInputProps,
  ref,
) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ValueType | null>(defaultValue || null);
  const [items, setItems] = useState(options);
  const [isFocused, setIsFocused] = useState(false);
  const {theme} = useThemeContext();

  useImperativeHandle(ref, () => ({
    focus: () => {
      setIsFocused(true);
    },
    blur: () => {
      setIsFocused(false);
      setOpen(false);
    },
    open,
  }));

  useEffect(() => {
    if (options && !items.length) {
      setItems(options);
    }
  }, [items.length, options.length]);

  const zIndexVal = open ? defaultDropDownZIndex * 2 : zIndex;

  return (
    <View
      style={[
        dropDownInputStyles.wrapper,
        Platform.OS === 'ios' && {zIndex: zIndexVal || defaultDropDownZIndex},
        containerStyle,
      ]}>
      <InputLabel label={label} showCompulsory={showCompulsory} />
      <InputLabel label={error} textColor={statusColors.danger} />
      <DropDownPicker
        items={items}
        value={value}
        setValue={setValue}
        multiple={false}
        open={open}
        setOpen={setOpen}
        // eslint-disable-next-line react-native/no-inline-styles
        disabledItemLabelStyle={{
          color: theme.colors.text + '80',
          textTransform: 'uppercase',
        }}
        listChildContainerStyle={{paddingLeft: rs(24)}}
        onSelectItem={item => onChange?.(item.value)}
        listMode="SCROLLVIEW"
        scrollViewProps={{nestedScrollEnabled: true}}
        placeholder={placeholder}
        onOpen={onFocus ? onFocus : () => setIsFocused(true)}
        onClose={() => setIsFocused(false)}
        style={[
          dropDownInputStyles.container,
          {
            borderColor: isFocused
              ? theme.colors.accent
              : theme.colors.inputBorder,
            backgroundColor: theme.colors.inputBackground,
            zIndex: zIndexVal || defaultDropDownZIndex,
          },
        ]}
        dropDownContainerStyle={[
          dropDownInputStyles.dropDownContainer,
          {
            borderColor: theme.colors.inputBorder,
            backgroundColor: theme.colors.inputBackground,
          },
        ]}
        textStyle={[dropDownInputStyles.text, {color: theme.colors.text}]}
        listItemLabelStyle={[
          dropDownInputStyles.text,
          {color: theme.colors.text},
        ]}
        placeholderStyle={[
          dropDownInputStyles.text,
          {color: theme.colors.helperText},
        ]}
        theme={theme.name === 'Light' ? 'LIGHT' : 'DARK'}
        ArrowDownIconComponent={() => (
          <FontAwesomeIcon
            icon={faChevronDown}
            size={rs(20)}
            color={theme.colors.inputBorder}
          />
        )}
        ArrowUpIconComponent={() => (
          <FontAwesomeIcon
            icon={faChevronUp}
            size={rs(20)}
            color={theme.colors.inputBorder}
          />
        )}
        TickIconComponent={() => (
          <FontAwesomeIcon
            icon={faCheck}
            size={rs(14)}
            color={theme.colors.accent}
          />
        )}
        props={{activeOpacity: 0.85}}
      />
    </View>
  );
};

const DropdownInput = forwardRef(DropdownInputInner);

export default DropdownInput;
