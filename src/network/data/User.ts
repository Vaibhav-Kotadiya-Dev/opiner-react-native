import {ICommunity} from './Community';

export enum UserStatus {
  Paused = -3,
  Deleted = -2,
  Disabled = -1,
  Unverified,
  WaitingList,
  Normal,
  Retired,
  OnHold,
}

export const defaultUser: IUser = {
  id: 1,
  firstName: '',
  lastName: '',
  questionsReceived: 0,
  responsesProvided: 0,
  earningsToDate: 0,
  userNewsCopy: 'text',
  userAddress: '',
  donations: 0,
};

export interface IUserPaymentDetails {
  accountName: string;
  accountNumberRedacted: string;
  bankName: string;
  bankAddress: string;
  sortCodeRedacted: string;
  sortCode: string;
  accountNumber: string;
  payPalEmail?: string;
}

export default interface IUser extends IUserPaymentDetails {
  address: string;
  age: number;
  ageish: string;
  appVersion: string;
  approvalDate: string;
  audiencePrimary: any;
  audienceSliceXml: any;
  auidiencePrimary: number;
  authKey: string;
  biography: string;
  birthMonth: number;
  birthYear: number;
  companyId: number;
  companyName: string;
  userCompanyName: string;
  countryId: number;
  created: string;
  dateOfBirth: string;
  departmentTitle: string;
  donations: number;
  earningsToDate: number;
  email: string;
  firstName: string;
  frustrateMe1: string;
  fullName: string;
  genderId: number;
  hasBankDetails: boolean;
  hasProfessionalInfo: boolean;
  hasProfile: boolean;
  hasThreeByThree: boolean;
  id: number;
  instagram: string;
  isBrainTrust: boolean;
  isChanged: boolean;
  isStreet: boolean;
  isVisionary: boolean;
  jobTitle: string;
  keyIdentifier: number;
  knowMostAbout1: string;
  lastLogin: string;
  lastName: string;
  learnOpiner: string;
  leftBrainWeight: number;
  linkedIn: string;
  locationId: number;
  locationName: string;
  mobile: string;
  modified: string;
  notes: string;
  opinerBio: string;
  opinerMiniBio: string;
  os: string;
  osVersion: string;
  preferredName: string;
  profession: string;
  professionalEmail: string;
  professionalPhone: string;
  professionalWebsite: string;
  questionOptInCount: number;
  questionsReceived: number;
  responderCompanyList: any[];
  responseId: number;
  responseStatus: number;
  responseVideoAddress: string;
  responsesProvided: number;
  responsesRejected: number;
  sectorExperience1: string;
  sectorExperience2: string;
  sectorExperience3: string;
  showInTalentPool: boolean;
  skill1: string;
  skill2: string;
  skill3: string;
  termsDate: null;
  thinkAreAwesome1: string;
  thumb: string;
  timeZoneId: number;
  titleId: number;
  twitter: string;
  userAddress: string;
  userDepartmentId: number;
  userNewsCopy: string;
  userStatus: UserStatus;
  userType: number;
  website: string;
  emailAlert: boolean;
  newsletterSubscription: boolean;
  responderCommunityList: Partial<ICommunity>[];

  // Privacy settings
  privacyBiography: boolean;
  privacyJobTitle: boolean;
  privacySocialMedia: boolean;
  privacyUserCompanyName: boolean;

  // User profile image
  cdnThumbUrlTiny: string | null;
  cdnThumbUrlSmall: string | null;
  cdnThumbUrlMedium: string | null;
  cdnThumbUrlLarge: string | null;
  cdnThumbUrl: string | null;
}
