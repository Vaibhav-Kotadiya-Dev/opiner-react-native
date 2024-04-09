import IUser, {IUserPaymentDetails} from 'network/data/User';
import {EMAIL_REGEX} from 'appConstants';
import ModalService, {ModalType} from 'components/modal/ModalService';

export type AccountInfoError = Partial<Record<keyof IUser, string>>;

export const getAccountInfoValidationResult = (
  input: Partial<IUser>,
): AccountInfoError => {
  const {firstName, locationId, timeZoneId, email} = input;
  const errors: AccountInfoError = {};

  if (!firstName) {
    errors.firstName = 'First name is required';
  }
  if (!locationId) {
    errors.locationId = 'Country is required';
  }
  if (!timeZoneId) {
    errors.timeZoneId = 'Time zone is required';
  }
  if (!email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Email is invalid';
  }
  return errors;
};

export const getPaymentInfoValidationResult = (
  input: Partial<IUserPaymentDetails>,
): AccountInfoError => {
  const {accountName, accountNumberRedacted, bankName, sortCodeRedacted} =
    input;
  const errors: AccountInfoError = {};

  if (!bankName) {
    errors.bankName = 'Bank name is required';
  }
  if (!sortCodeRedacted) {
    errors.sortCodeRedacted = 'Sort code is required';
  } else if (sortCodeRedacted.includes('**')) {
    errors.sortCodeRedacted = 'Sort code is invalid';
  } else if (sortCodeRedacted.length < 6) {
    errors.sortCodeRedacted =
      'Your sort code must be 6 characters long and in the format 99-99-99';
  }
  if (!accountName) {
    errors.accountName = 'Account name is required';
  }
  if (!accountNumberRedacted) {
    errors.accountNumberRedacted = 'Account number is required';
  } else if (accountNumberRedacted.includes('**')) {
    errors.accountNumberRedacted = 'Account number is invalid';
  } else if (accountNumberRedacted.length < 8) {
    errors.accountNumberRedacted =
      'Your account number must be 8 characters long and numeric';
  }
  return errors;
};

export const getHelpSupportValidationResult = (input: {
  subject: string;
  body: string;
}): string | null => {
  const {subject, body} = input;
  const errors: string[] = [];
  if (!subject) {
    errors.push('Subject is required');
  }
  if (!body) {
    errors.push('Body is required');
  }
  return errors.length ? errors.join('\n') : null;
};

export const alertBeforeGoingBackFromUpdate = (onDiscard?: () => void) => {
  const dismissModal = () => ModalService.dismiss(ModalType.ConfirmationModal);

  ModalService.setModalContent({
    type: ModalType.ConfirmationModal,
    content: {
      visible: true,
      title: 'Unsaved changes',
      description:
        'You have unsaved changes. If you continue these will be lost.',
      onClose: dismissModal,
      primaryAction: {
        title: 'Continue',
        type: 'danger',
        onPress: () => {
          onDiscard?.();
          dismissModal();
        },
      },
      secondaryAction: {
        title: 'Back',
        type: 'secondary',
        onPress: dismissModal,
      },
    },
  });
};
