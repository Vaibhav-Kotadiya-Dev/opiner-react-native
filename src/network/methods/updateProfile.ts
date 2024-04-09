import Toast from 'utils/Toast';
import IUser from 'network/data/User';
import {
  axiosClient,
  getConfig,
  getValidationErrorMessage,
} from 'network/OpinerApi';
import {CustomFlashMessageType} from 'components/prompt-message/CustomFlashMessage';
import {faCheckCircle} from '@fortawesome/pro-solid-svg-icons';

/**
  account/saveprofile - Pick<IUser, 'firstName' | 'lastName' | 'countryId' | 'timeZoneId'>
  account/savebankdetails - Pick<IUser, 'bankName' | 'accountNumber' | 'sortCode' | 'accountName' | 'payPalEmail'>
  account/savecommsmanagement - Pick<IUser, 'emailAlert' | 'newsletterSubscription'>
  account/savepersonal - Pick<IUser, 'genderId' | 'birthMonth' | 'birthYear' | 'opinerBio'>
  account/saveprofessional -  Pick<
      IUser,
      | 'companyName'
      | 'jobTitle'
      | 'biography'
      | 'website'
      | 'linkedIn'
      | 'twitter'
      | 'instagram'
    >
  account/saveprivacy - Pick<IUser, 'privacyJobTitle' | 'privacyUserCompanyName' | 'privacyBiography' | 'privacySocialMedia'>
 */

export type UpdateProfileAPIType =
  | 'saveprofile'
  | 'savebankdetails'
  | 'savecommsmanagement'
  | 'savepersonal'
  | 'saveprofessional'
  | 'saveprivacy'
  | 'pause'
  | 'resume'
  | 'delete';

export type UpdateProfileParamType = {
  method: UpdateProfileAPIType;
  data: Partial<IUser>;
  successMessageProps?: Partial<CustomFlashMessageType>;
  failedMessageProps?: Partial<CustomFlashMessageType>;
  shouldGoBackAfterUpdate?: boolean;
  onBack?: () => void;
  showToast?: boolean;
};

export const updateProfile = async ({
  method,
  data,
  successMessageProps,
  failedMessageProps,
  showToast = true,
}: UpdateProfileParamType): Promise<any> => {
  const url = `${getConfig().OPINER_BASE_URL}account/${method}`;
  const response = ['pause', 'resume', 'delete'].includes(method)
    ? await axiosClient.get(url)
    : await axiosClient.post(url, data);
  if (showToast) {
    if (response.status === 200) {
      Toast.show({
        message: 'Changes saved',
        iconProps: {
          icon: faCheckCircle,
        },
        ...successMessageProps,
      });
    } else {
      Toast.show({
        type: 'danger',
        message: 'Account update failed',
        description: getValidationErrorMessage(response),
        ...failedMessageProps,
      });
    }
  }
  return response;
};
