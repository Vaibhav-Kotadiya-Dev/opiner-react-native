import React, {useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {faEnvelope} from '@fortawesome/pro-solid-svg-icons';
import {faCheck} from '@fortawesome/pro-regular-svg-icons';

import useInput from 'hooks/useInput';
import IUser, {UserStatus} from 'network/data/User';
import useUpdateUserProfile from 'hooks/useUpdateUserProfile';
import updateAccountStyles from './styles';
import HelperText from 'components/helper-text';
import ThemedButton from 'components/themed-button';
import DropdownInput, {defaultDropDownZIndex} from 'components/dropdown-picker';
import Input from 'screens/auth/components/input/Input';
import Toast from 'utils/Toast';
import useCountriesList from 'hooks/useCountriesList';
import SectionTitle from 'components/section-title';
import {AppState} from 'store/rootReducer';
import {Container} from 'components/index';
import {AccountInfoError, getAccountInfoValidationResult} from './utils';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import {resendConfirmationEmail} from 'network/OpinerApi';
import {birthMonthOptions, birthYearOptions, timezoneOptions} from '../utils';
import {rs} from 'utils/ResponsiveScreen';

const orderOfInputs: (keyof IUser)[] = [
  'firstName',
  'lastName',
  'email',
  'birthMonth',
  'birthYear',
  'genderId',
  'locationId',
  'address',
  'timeZoneId',
];

const UpdateAccountInformationScreen = () => {
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const navigation = useMainNavigation();
  const [error, setError] = useState<AccountInfoError>({});
  const {countriesList} = useCountriesList();
  const [hasResentEmail, setHasResentEmail] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {input, onInput, references, focusNextInput, resetHasUnsavedChanges} =
    useInput(_.pick(user, orderOfInputs), orderOfInputs);

  const {handleUpdateProfile, isBusy} = useUpdateUserProfile();

  const handleSubmit = async () => {
    const validationResult = getAccountInfoValidationResult(input.current);
    if (Object.keys(validationResult).length) {
      setError(validationResult);
      Toast.show({
        message: 'Check form data',
        type: 'danger',
        hideIcon: true,
      });
      return;
    } else {
      setError({});
    }
    await handleUpdateProfile({
      method: 'saveprofile',
      data: input.current,
      shouldGoBackAfterUpdate: true,
      onBack: resetHasUnsavedChanges,
    });
  };

  const handleResendConfirmationEmail = async () => {
    try {
      setIsSending(true);
      const response = await resendConfirmationEmail();
      if (response.status === 200) {
        Toast.show({
          message: 'Email sent',
          type: 'success',
          description:
            'We have sent a link to your email to confirm your email address. Please check your email.',
        });
        setHasResentEmail(true);
      }
      setIsSending(false);
    } catch (err: any) {
      setIsSending(false);
    }
  };

  if (!user) {
    return null;
  }

  const isUserUnverified = user.userStatus === UserStatus.Unverified;

  return (
    <Container withSafeArea={false}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View
          style={[updateAccountStyles.paddedContainer, {paddingTop: rs(0)}]}>
          <HelperText withIcon style={updateAccountStyles.helperText}>
            Items marked * are required.
          </HelperText>
          <Input
            ref={references.current.firstName}
            error={error.firstName}
            label="First name"
            showCompulsory
            autoCapitalize="words"
            autoComplete="name"
            returnKeyType="next"
            onChange={onInput('firstName')}
            onFocus={focusNextInput('firstName')}
            onSubmitEditing={focusNextInput('lastName')}
            defaultValue={input.current.firstName}
          />
          <Input
            ref={references.current.lastName}
            error={error.lastName}
            label="Family name"
            autoCapitalize="words"
            autoComplete="name-family"
            returnKeyType="next"
            onChange={onInput('lastName')}
            onFocus={focusNextInput('lastName')}
            onSubmitEditing={focusNextInput('email')}
            defaultValue={input.current.lastName}
          />
          <Input
            ref={references.current.email}
            error={
              error.email ||
              (isUserUnverified && !hasResentEmail ? 'Email unverified' : '')
            }
            label="Email address"
            showCompulsory
            autoComplete="email"
            returnKeyType="go"
            onChange={onInput('email')}
            onFocus={focusNextInput('email')}
            onSubmitEditing={focusNextInput('birthMonth')}
            defaultValue={input.current.email}
            editable={true}
            containerStyle={isUserUnverified ? {marginBottom: 0} : undefined}
          />
          {isUserUnverified && (
            <ThemedButton
              type="secondary"
              isBusy={isSending}
              disabled={hasResentEmail}
              title={
                hasResentEmail ? 'Email Sent' : 'Resend confirmation email'
              }
              iconLeft={
                isSending ? undefined : hasResentEmail ? faCheck : faEnvelope
              }
              onPress={handleResendConfirmationEmail}
            />
          )}
          <View
            style={[
              updateAccountStyles.rowInputContainer,
              {zIndex: defaultDropDownZIndex + 2},
            ]}>
            <DropdownInput
              ref={references.current.birthMonth}
              error={error.birthMonth}
              label="Month of birth"
              placeholder="Birth month"
              options={birthMonthOptions}
              onChange={value => {
                onInput('birthMonth')(value);
                focusNextInput('birthYear')();
              }}
              defaultValue={input.current.birthMonth}
              containerStyle={updateAccountStyles.rowInput}
              onFocus={focusNextInput('birthMonth')}
              zIndex={defaultDropDownZIndex + 2}
            />
            <View style={updateAccountStyles.rowInputSeparator} />
            <DropdownInput
              ref={references.current.birthYear}
              error={error.birthYear}
              label="Year of birth"
              placeholder="Birth year"
              options={birthYearOptions}
              onChange={value => {
                onInput('birthYear')(value);
                focusNextInput('genderId')();
              }}
              defaultValue={input.current.birthYear}
              containerStyle={updateAccountStyles.rowInput}
              onFocus={focusNextInput('birthYear')}
              zIndex={defaultDropDownZIndex + 2}
            />
          </View>
          <DropdownInput
            ref={references.current.genderId}
            error={error.genderId}
            label="Gender"
            placeholder="Select your gender"
            options={[
              {label: 'Male', value: 1},
              {label: 'Female', value: 2},
              {label: 'Other', value: 3},
            ]}
            onChange={value => {
              onInput('genderId')(value);
              focusNextInput('locationId')();
            }}
            onFocus={focusNextInput('genderId')}
            defaultValue={input.current.genderId}
            zIndex={defaultDropDownZIndex + 1}
          />
          <SectionTitle
            title="Location"
            style={updateAccountStyles.sectionTitle}
          />
          <DropdownInput
            ref={references.current.locationId}
            error={error.locationId}
            label="Country"
            showCompulsory
            placeholder="Select your country"
            options={countriesList}
            onChange={value => {
              onInput('locationId')(value);
              focusNextInput('address')();
            }}
            onFocus={focusNextInput('locationId')}
            defaultValue={input.current.locationId}
            zIndex={1001}
          />
          <Input
            ref={references.current.address}
            error={error.address}
            label="Area"
            placeholder="State, region or town"
            helper="Example: Victoria or Newcastle"
            autoCapitalize="words"
            autoComplete="street-address"
            returnKeyType="next"
            onChange={onInput('address')}
            onFocus={focusNextInput('address')}
            onSubmitEditing={focusNextInput('timeZoneId')}
            defaultValue={input.current.address}
          />
          <DropdownInput
            ref={references.current.timeZoneId}
            label="Timezone"
            placeholder="Select your timezone"
            options={timezoneOptions}
            onChange={value => {
              onInput('timeZoneId')(value);
              focusNextInput('email')();
            }}
            onFocus={focusNextInput('timeZoneId')}
            defaultValue={input.current.timeZoneId}
          />
          <ThemedButton title="Save" isBusy={isBusy} onPress={handleSubmit} />
          <ThemedButton
            title="Back"
            type="secondary"
            onPress={navigation.goBack}
          />
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default UpdateAccountInformationScreen;
