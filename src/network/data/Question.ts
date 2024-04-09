import moment from 'moment';

import {getConfig} from '../OpinerApi';
import {QuestionStatus} from 'utils/VideoStateStore';
import OpinerContent from 'network/methods/OpinerContent';

export interface Question {
  id: number;
  title: string;
  questionStatus: number;
  isResponded: boolean;
  emoji: string;
  audienceId: number;
  videoId: number;
  videoAddress?: string;
  questionPreviewUrl: string;
  responsePreviewUrl?: string;
  creationDate: string;
  currentResponse: QuestionResponse;
  deadline: string;
  timeline: Timeline[];
  keyIdentifier: string;
  responses: QuestionResponse[];
  created: string;
  localQuestionStatus?: QuestionStatus;
  socialMediaConsentRequired?: boolean;
  price?: number;
  animationImageKey?: string;
  donation?: number;
  showOtherResponses?: boolean;
  companyName: string;
  companyLogoUrl?: string;
  modified?: string;
  communityContactEmail?: string;
  communityContactName?: string;
  questionLinks?: QuestionLink[];
  communityId: number;
  communityName: string;
  cdnVttUrl?: string;
  uniqueUrl: string;
  cdnThumbUrlTiny: string;
  cdnThumbUrlSmall: string;
  cdnThumbUrlMedium: string;
  cdnThumbUrlLarge: string;
  cdnThumbUrl: string;
}

export interface QuestionLink {
  created: string;
  id: number;
  isChanged: boolean;
  keyIdentifier: any;
  linkText: string;
  linkUrl: string;
  modified: string;
  questionId: number;
}

export enum ResponseStatus {
  Unknown = -3,
  AwaitingOptInOutExpired = -2,
  AwaitingResponseExpired = -1,
  Rejected = 0,
  AwaitingOptInOut = 1,
  OptedOut = 2,
  OptedIn = 3,
  Complete = 4,
  Approved,
  PaidToUser,
  PaidToCharity,
  UnpaidComplete,
}

export interface QuestionResponse {
  id: number;
  userId: number;
  videoAddress: string;
  responseStatus: ResponseStatus;
  questionIsNew: boolean;
  userFirstName: string;
  userLastName: string;
  userPaidToCharityName: string;
  userAddress: string;
  optInDeadline: string;
  responseDeadline: string;
  questionTitle: string;
  hasThumb: boolean;
  userFullName: string;
  timeZoneName: string;
  userLocationName: string;
  vtt?: string;
  cdnVttUrl?: string;
  timeZoneOffset: {
    ticks: number;
    days: number;
    hours: number;
    milliseconds: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMilliseconds: number;
    totalMinutes: number;
    totalSeconds: number;
  };
  pillStatus: string;
  animationImageKey?: string;
  thumbnailOrUserUrl?: string;
  modified?: string;
  linkedIn?: string;
  instagram?: string;
  twitter?: string;
  userProfession?: string;
  userCompany?: string;
  userBiography?: string;
  isLiked: boolean;
  questionVideoAddress: string;
  cdnThumbUrlTiny: string;
  cdnThumbUrlSmall: string;
  cdnThumbUrlMedium: string;
  cdnThumbUrlLarge: string;
  cdnThumbUrl: string;
}

export interface Timeline {
  questionId: number;
  senderUserId: number;
  recipientUserId: number;
  timelineStatus: number;
  message: string;
  isNew: boolean;
  timelineEventId: number;
  eventName: string;
  icon: string;
  senderPreferredName: string;
  id: number;
  isChanged: boolean;
  created: string;
  modified: string;
  keyIdentifier: any;
}

export function getVideoUrl(question: Question): string {
  if (!question) {
    return '';
  }
  return `${getConfig().OPINER_BASE_URL}question/getVideo/${question.id}/${
    question.videoAddress
  }${question.modified ? '?d=' + question.modified : ''}`;
}

export function getThumbnailUrl(question: Question): string {
  const url = `${getConfig().OPINER_BASE_URL}question/getthumb/${question.id}/${
    question.videoAddress
  }${question.modified ? '?d=' + question.modified : ''}`;
  return url;
}

export function getAnimationUrl(question: Question): string | undefined {
  if (
    !question.animationImageKey ||
    question.animationImageKey.startsWith('000000')
  ) {
    return undefined;
  }

  const url = `${getConfig().OPINER_BASE_URL}question/getanimation/${
    question.id
  }/${question.animationImageKey}${
    question.modified ? '?d=' + question.modified : ''
  }`;
  return url;
}

export function getResponseImage(
  response: QuestionResponse,
): string | undefined {
  return `${getConfig().OPINER_BASE_URL}response/getthumb/${response.id}/${
    response.videoAddress
  }${response.modified ? '?d=' + response.modified : ''}`;
}

export function getResponseUserThumb(
  response: QuestionResponse,
): string | undefined {
  return `${getConfig().OPINER_BASE_URL}account/getthumb/${response.userId}/${
    response.userAddress
  }${response.modified ? '?d=' + response.modified : ''}`;
}

export function getResponseVideo(response: QuestionResponse): string {
  return `${getConfig().OPINER_BASE_URL}response/getvideo/${response.id}/${
    response.videoAddress
  }${response.modified ? '?d=' + response.modified : ''}`;
}

export function getCaptionUrl(cdnVttUrl?: string): string | undefined {
  if (!cdnVttUrl) {
    return undefined;
  }
  return OpinerContent.getCDNImageURL(cdnVttUrl);
}

export function setMarkedQuestion(question: Question): any {
  return `${getConfig().OPINER_BASE_URL}response/markviewed${question.id}`;
}

export function getTimeline(question: Question) {
  if (!question) {
    return false;
  }
  return `${getConfig().OPINER_BASE_URL}question/get/${question.id}`;
}

export function getStatus(uri: number): string {
  switch (uri) {
    case 0: {
      return 'CANCELLED';
    }
    case 1: {
      return 'ACTIVE';
    }
    case 2: {
      return 'ACTIVE';
    }
    case 3: {
      return 'ACTIVE';
    }
    case 4: {
      return 'PAID';
    }
    default:
      return '';
  }
}

export function isResponded(question: Question): boolean {
  return question.questionStatus === 4;
}

export function getResponseStatus(question: Question) {
  const uri = question.currentResponse.responseStatus;
  switch (uri) {
    case ResponseStatus.AwaitingOptInOut: {
      return 'AwaitingOptInOut';
    }
    case ResponseStatus.OptedIn: {
      return 'OptedIn';
    }
    default:
      return moment(question.created).format('DD MMMM YYYY').toUpperCase();
  }
}

export function getButtonTitle(question: Question) {
  switch (question.currentResponse.responseStatus) {
    case ResponseStatus.AwaitingOptInOut: {
      return 'In or Out?';
    }
    case ResponseStatus.OptedIn: {
      return 'Record Response';
    }
    default:
      return 'Activity';
  }
}

export const defaultQuestion: Question = {
  // @ts-ignore
  currentResponse: {},
  keyIdentifier: '',
  isResponded: true,
  audienceId: 0,
  title: 'Saving',
  deadline: 'oct-10-2019',
  questionStatus: 1,
  emoji: 'brain',
  videoId: 1,
  creationDate: 'oct-01-2019',
  questionPreviewUrl:
    'https://www.shitpostbot.com/img/sourceimages/rzulta-morda-59c269560c321.png',
  responsePreviewUrl:
    'https://vignette.wikia.nocookie.net/masseffect/images/0/06/Morda.jpg/revision/latest?cb=20170414035652',
  timeline: [],
};

export const respondedQuestion: Question = {
  // @ts-ignore
  currentResponse: {},
  keyIdentifier: '',
  isResponded: true,
  title: 'Pensions',
  deadline: 'oct-10-2019',
  questionStatus: 5,
  audienceId: 1,
  emoji: 'heart',
  videoId: 1,
  creationDate: 'oct-01-2019',
  questionPreviewUrl:
    'https://www.shitpostbot.com/img/sourceimages/rzulta-morda-59c269560c321.png',
  responsePreviewUrl:
    'https://vignette.wikia.nocookie.net/masseffect/images/0/06/Morda.jpg/revision/latest?cb=20170414035652',
  timeline: [],
};

export const defaultQuestions: Question[] = [
  defaultQuestion,
  respondedQuestion,
];

export const getShareUrl = (
  videoId: string,
  duration: number,
  uniqueUrl: string,
) => {
  return `${getConfig().ASSETS_URL}wonderwall/view/${uniqueUrl}/${videoId}${
    duration ? `?startPos=${duration}` : ''
  }`;
};
