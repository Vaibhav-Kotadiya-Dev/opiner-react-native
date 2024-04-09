import IUser, {UserStatus} from 'network/data/User';

const accountMandatoryFields: Array<keyof IUser> = [
  'firstName',
  'email',
  'locationId',
];

const isAccountInfoValid = (user: IUser): boolean => {
  return (
    accountMandatoryFields.every(field => !!user[field]) &&
    user.userStatus !== UserStatus.Unverified &&
    user.locationId !== 9 // Not specified option
  );
};

const getHasPaymentInfo = (user: IUser): boolean => {
  // Either bank account or paypal email is required
  return !!user.bankName || !!user.payPalEmail;
};

const isUserInfoValid = (user: IUser): boolean => {
  return isAccountInfoValid(user);
};

const getProfessionalProfileCompletionStatus = (
  user: IUser,
): 'incomplete' | 'complete' | 'empty' => {
  const profileFields: Array<keyof IUser> = [
    'biography',
    'userCompanyName',
    'jobTitle',
    'opinerMiniBio',
    'website',
    'linkedIn',
  ];

  const hasProfileInfo = profileFields.some(field => !!user[field]);

  if (!hasProfileInfo) {
    return 'empty';
  }

  const isComplete = profileFields.every(field => !!user[field]);

  return isComplete ? 'complete' : 'incomplete';
};

export {
  isAccountInfoValid,
  getHasPaymentInfo,
  isUserInfoValid,
  getProfessionalProfileCompletionStatus,
};
