export interface ICommunity {
  communityName: string;
  communityStatus: number;
  companyId: number;
  companyName: string;
  contactEmail: string;
  contactName: string;
  created: string;
  details: string | null;
  donationOffered: boolean;
  howItWorks: string | null;
  id: number;
  isChanged: boolean;
  keyIdentifier: string | null;
  link: string | null;
  linkResponderCommunityStatus: number;
  memberCount: number;
  modified: string;
  paymentOffered: boolean;
  questionCount: number;
  responseCount: number;
  responseVisibility: string | null;
  rewardOffered: boolean;
  signupCode: string;
  terms: string | null;
  url: string;
  userId: number;
  userTermsDate: string | null;
  welcome: string | null;
  whyJoin: string | null;
  rewards: string | null;
  termsUrl: string | undefined;
  cdnLogoUrl: string | null;
  cdnHeaderUrl: string | null;
  cdnBackgroundImageUrl: string | null;
}

export type CommunityResponseStatusType =
  | 'Pending review'
  | 'Paused'
  | 'Active'
  | 'None'
  | 'Deleted';
