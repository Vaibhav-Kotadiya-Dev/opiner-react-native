import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import IUser from 'network/data/User';
import useInput from 'hooks/useInput';
import updateAccountStyles from './styles';
import ThemedButton from 'components/themed-button';
import SectionTitle from 'components/section-title';
import Input from 'screens/auth/components/input/Input';
import useUpdateUserProfile from 'hooks/useUpdateUserProfile';
import {rs} from 'utils/ResponsiveScreen';
import {Container} from 'components/index';
import {AppState} from 'store/rootReducer';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import {defaultDropDownZIndex} from 'components/dropdown-picker';
import AppText from 'components/app-text';

const orderOfInputs: (keyof IUser)[] = [
  'biography',
  'userCompanyName',
  'jobTitle',
  'opinerMiniBio',
  'website',
  'linkedIn',
];

const UpdateProfessionalInformationScreen = () => {
  const navigation = useMainNavigation();
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const {input, onInput, references, focusNextInput, resetHasUnsavedChanges} =
    useInput(_.pick(user, orderOfInputs), orderOfInputs);
  const {handleUpdateProfile, isBusy} = useUpdateUserProfile();

  const handleSubmit = async () => {
    await handleUpdateProfile({
      method: 'saveprofessional',
      data: input.current,
      shouldGoBackAfterUpdate: true,
      onBack: resetHasUnsavedChanges,
    });
  };

  return (
    <Container withSafeArea={false}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <SectionTitle title="Personal profile" />
        <View
          style={[updateAccountStyles.paddedContainer, {paddingBottom: rs(0)}]}>
          <AppText size="h3" style={{paddingBottom: rs(30)}}>
            Your personal biography is not displayed publicly. It is for client
            reference only.
          </AppText>
          <Input
            ref={references.current.biography}
            label="Personal biography"
            returnKeyType="go"
            onChange={onInput('biography')}
            autoCapitalize="sentences"
            multiline
            inputStyle={updateAccountStyles.multilineInput}
            containerStyle={{zIndex: defaultDropDownZIndex}}
            onFocus={focusNextInput('biography')}
            characterLimit={400}
            defaultValue={input.current.biography}
            onSubmitEditing={focusNextInput('userCompanyName')}
          />
        </View>
        <SectionTitle title="Professional profile" />
        <View style={updateAccountStyles.paddedContainer}>
          <AppText size="h3" style={{paddingBottom: rs(30)}}>
            Professional profile information, if supplied, is displayed
            alongside your response videos.
          </AppText>
          <Input
            ref={references.current.userCompanyName}
            label="Company or Organisation"
            returnKeyType="next"
            autoCapitalize="words"
            defaultValue={input.current.userCompanyName}
            onChange={onInput('userCompanyName')}
            onFocus={focusNextInput('userCompanyName')}
            onSubmitEditing={focusNextInput('jobTitle')}
          />
          <Input
            ref={references.current.jobTitle}
            label="Job title or role"
            returnKeyType="next"
            autoCapitalize="words"
            defaultValue={input.current.jobTitle}
            onChange={onInput('jobTitle')}
            onFocus={focusNextInput('jobTitle')}
            onSubmitEditing={focusNextInput('opinerMiniBio')}
          />
          <Input
            ref={references.current.opinerMiniBio}
            label="Professional biography"
            returnKeyType="next"
            multiline
            autoCapitalize="sentences"
            inputStyle={updateAccountStyles.multilineInput}
            defaultValue={input.current.opinerMiniBio}
            onChange={onInput('opinerMiniBio')}
            onFocus={focusNextInput('opinerMiniBio')}
            onSubmitEditing={focusNextInput('website')}
            characterLimit={400}
          />
          <Input
            ref={references.current.website}
            label="Website"
            returnKeyType="next"
            placeholder="https://www.yourwebsite.com"
            defaultValue={input.current.website}
            onChange={onInput('website')}
            onFocus={focusNextInput('website')}
            onSubmitEditing={focusNextInput('linkedIn')}
            helper="Full URL to your website."
          />
          <Input
            ref={references.current.linkedIn}
            label="LinkedIn"
            returnKeyType="next"
            placeholder="https://www.linkedin.com/in/username/"
            defaultValue={input.current.linkedIn}
            onChange={onInput('linkedIn')}
            onFocus={focusNextInput('linkedIn')}
            onSubmitEditing={handleSubmit}
            helper="Full URL required."
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

export default UpdateProfessionalInformationScreen;
