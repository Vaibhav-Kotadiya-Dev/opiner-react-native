import {createRef, RefObject, useCallback, useEffect, useRef} from 'react';

import {useMainNavigation} from './useNavigationHooks';
import {InputRefMethods} from 'screens/auth/components/input/utils';
import {alertBeforeGoingBackFromUpdate} from 'screens/account/update/utils';
import {Keyboard} from 'react-native';

const useInput = <T extends string, V>(defaultValue: V, orderOfInputs: T[]) => {
  const input = useRef<V>(defaultValue);
  const hasUnsavedChangesRef = useRef<boolean>(false);
  const navigation = useMainNavigation();
  const touchedKeys = useRef<Set<T>>(new Set());

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        Keyboard.dismiss();
        if (!hasUnsavedChangesRef.current) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        alertBeforeGoingBackFromUpdate(() =>
          navigation.dispatch(e.data.action),
        );
      }),
    [navigation],
  );

  const onInput = useCallback(
    (prop: T) => (value: string) => {
      input.current = {
        ...input.current,
        [prop]: value,
      };
      touchedKeys.current.add(prop);
      hasUnsavedChangesRef.current = true;
    },
    [],
  );

  const references = useRef<Record<T, RefObject<InputRefMethods>>>(
    orderOfInputs.reduce(
      (acc, name) => ({
        ...acc,
        [name]: createRef(),
      }),
      {} as Record<T, RefObject<InputRefMethods>>,
    ),
  );

  const focusNextInput = useCallback(
    (nextInputProp: T) => () => {
      references.current[nextInputProp].current?.focus();
      // Force blur other inputs
      const otherInputs = orderOfInputs.filter(key => key !== nextInputProp);
      otherInputs.forEach(key => {
        references.current[key].current?.blur();
      });
    },
    [orderOfInputs],
  );

  const resetHasUnsavedChanges = () => (hasUnsavedChangesRef.current = false);

  const clearInputs = () => {
    orderOfInputs.forEach(key => {
      references.current[key].current?.clear();
      input.current = {
        ...input.current,
        [key]: '',
      };
    });
  };

  return {
    input,
    onInput,
    references,
    focusNextInput,
    hasUnsavedChangesRef,
    resetHasUnsavedChanges,
    clearInputs,
    touchedKeys,
  };
};

export default useInput;
