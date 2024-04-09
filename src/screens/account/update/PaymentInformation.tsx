import React, {useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import HelperText from 'components/helper-text';
import IUser from 'network/data/User';
import useInput from 'hooks/useInput';
import useUpdateUserProfile from 'hooks/useUpdateUserProfile';
import SectionTitle from 'components/section-title';
import updateAccountStyles from './styles';
import Input from 'screens/auth/components/input/Input';
import ThemedButton from 'components/themed-button';
import {AppState} from 'store/rootReducer';
import {Container} from 'components/index';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import {AccountInfoError, getPaymentInfoValidationResult} from './utils';
import AppText from 'components/app-text';

const orderOfInputs: (keyof IUser)[] = [
  'accountName',
  'bankName',
  'accountNumberRedacted',
  'sortCodeRedacted',
  'payPalEmail',
];

const UpdatePaymentInformationScreen = () => {
  const navigation = useMainNavigation();
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const {
    input,
    onInput,
    references,
    focusNextInput,
    resetHasUnsavedChanges,
    clearInputs,
    touchedKeys,
  } = useInput(_.pick(user, orderOfInputs), orderOfInputs);
  const [error, setError] = useState<AccountInfoError>({});

  const {handleUpdateProfile, isBusy} = useUpdateUserProfile();

  const handleSubmit = async () => {
    // If the form was cleared, skip validation
    const hasChanged = touchedKeys.current.size > 0;
    if (!hasChanged) {
      return;
    }
    await handleUpdateProfile({
      method: 'savebankdetails',
      data: {
        ...input.current,
        payPalEmail: input.current.payPalEmail?.trim(),
        sortCode: input.current.sortCodeRedacted,
        accountNumber: input.current.accountNumberRedacted,
        sortCodeRedacted: input.current.sortCodeRedacted
          ? '**-**-'.concat(input.current.sortCodeRedacted.slice(-2))
          : undefined,
        accountNumberRedacted: input.current.accountNumberRedacted
          ? '****'.concat(input.current.accountNumberRedacted.slice(-4))
          : undefined,
      },
      shouldGoBackAfterUpdate: true,
      onBack: resetHasUnsavedChanges,
    });
  };

  return (
    <Container withSafeArea={false}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <AppText size="h3" style={updateAccountStyles.paddedContainer}>
          Payment details (bank or PayPal) are only required if you are in a
          community that offers payments as an incentive and you wish to be paid
          for your response.
        </AppText>
        <SectionTitle title="Bank details (UK only)" />
        <View style={updateAccountStyles.paddedContainer}>
          <Input
            ref={references.current.accountName}
            error={error.accountName}
            label="Account Name"
            returnKeyType="next"
            defaultValue={input.current.accountName}
            onChange={onInput('accountName')}
            onFocus={focusNextInput('accountName')}
            onSubmitEditing={focusNextInput('bankName')}
          />
          <Input
            ref={references.current.bankName}
            error={error.bankName}
            label="Bank Name"
            returnKeyType="next"
            autoCapitalize="words"
            defaultValue={input.current.bankName}
            onChange={onInput('bankName')}
            onFocus={focusNextInput('bankName')}
            onSubmitEditing={focusNextInput('accountNumberRedacted')}
          />
          <Input
            ref={references.current.accountNumberRedacted}
            error={error.accountNumberRedacted}
            label="Account Number"
            returnKeyType="go"
            defaultValue={input.current.accountNumberRedacted}
            keyboardType="numbers-and-punctuation"
            placeholder="12345678"
            onChange={onInput('accountNumberRedacted')}
            onFocus={focusNextInput('accountNumberRedacted')}
            onSubmitEditing={focusNextInput('sortCodeRedacted')}
          />
          <Input
            ref={references.current.sortCodeRedacted}
            error={error.sortCodeRedacted}
            label="Sort Code"
            returnKeyType="next"
            defaultValue={input.current.sortCodeRedacted}
            placeholder="00-00-00"
            keyboardType="numbers-and-punctuation"
            onChange={onInput('sortCodeRedacted')}
            onFocus={focusNextInput('sortCodeRedacted')}
            onSubmitEditing={focusNextInput('email')}
          />
        </View>
        <SectionTitle title="PayPal" />
        <View style={updateAccountStyles.paddedContainer}>
          <Input
            ref={references.current.payPalEmail}
            label="Email"
            returnKeyType="go"
            onChange={onInput('payPalEmail')}
            onFocus={focusNextInput('payPalEmail')}
            onSubmitEditing={handleSubmit}
            defaultValue={input.current.payPalEmail}
            helper="Email address for account"
          />
          <ThemedButton title="Save" isBusy={isBusy} onPress={handleSubmit} />
          <ThemedButton
            title="Back"
            type="secondary"
            onPress={navigation.goBack}
          />
          <ThemedButton
            title="Clear form data"
            type="tertiary"
            onPress={clearInputs}
          />
          <HelperText withIcon style={updateAccountStyles.helperText}>
            All information is encrypted.{'\n'}UK banks only at this time.
          </HelperText>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default UpdatePaymentInformationScreen;
