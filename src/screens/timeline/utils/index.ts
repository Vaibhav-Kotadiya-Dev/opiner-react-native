import moment from 'moment';

import {Question, ResponseStatus} from 'network/data/Question';
import {UNDEF_ID} from 'appConstants';
import {
  faCheckCircle,
  faHandHeart,
  faSmile,
  faTimesCircle,
  IconDefinition,
} from '@fortawesome/pro-solid-svg-icons';
import Color from 'assets/colors';

const hasPassed = (value: any) => moment().isSameOrAfter(moment(value));

const hasPassedDeadline = (question: Question, isOptInDeadline = false) => {
  if (isOptInDeadline) {
    return (
      hasPassed(question.currentResponse.optInDeadline) &&
      question.currentResponse.responseStatus ===
        ResponseStatus.AwaitingOptInOutExpired
    );
  }
  return (
    hasPassed(question.currentResponse.responseDeadline) &&
    question.currentResponse.responseStatus ===
      ResponseStatus.AwaitingResponseExpired
  );
};

const getButtonTitle = (question: Question): string => {
  const {responseStatus, pillStatus} = question.currentResponse;
  let buttonTitle: string = 'Activity';
  if (
    (responseStatus === ResponseStatus.AwaitingOptInOut ||
      pillStatus === 'New') &&
    !hasPassedDeadline(question, true)
  ) {
    buttonTitle = 'In or Out?';
  } else if (
    responseStatus === ResponseStatus.OptedIn &&
    !hasPassedDeadline(question)
  ) {
    buttonTitle = 'Record Response';
  }
  return buttonTitle;
};

const isAudience = (question: Question) => {
  return question.audienceId === 2 || question.audienceId === 3;
};

const showOptInDeadlineTimer = (question: Question): boolean => {
  const {pillStatus, responseStatus} = question.currentResponse;
  return (
    (pillStatus === 'New' || pillStatus === 'Active') &&
    !hasPassedDeadline(question, true) &&
    responseStatus === ResponseStatus.AwaitingOptInOut
  );
};

const showResponseDeadlineTimer = (question: Question): boolean => {
  const {responseStatus} = question.currentResponse;
  return (
    responseStatus === ResponseStatus.OptedIn && !hasPassedDeadline(question)
  );
};

const showCreatedDate = (question: Question): boolean =>
  !showOptInDeadlineTimer(question) && !showResponseDeadlineTimer(question);

const getQuestionDeadline = (
  question: Question,
): {
  deadline: string | null;
  which: 'optIn' | 'response' | null;
} => {
  const showOptInTimer = showOptInDeadlineTimer(question);
  const showResponseTimer = showResponseDeadlineTimer(question);
  const deadline = showResponseTimer
    ? question.currentResponse.responseDeadline
    : showOptInTimer
    ? question.currentResponse.optInDeadline
    : null;
  return {
    deadline,
    which: showResponseTimer ? 'response' : showOptInTimer ? 'optIn' : null,
  };
};

export type ResponseStatusText =
  | 'Response Rejected'
  | 'Active'
  | 'Closed'
  | 'Response Pending Review'
  | 'Response Approved'
  | 'Paid'
  | 'Donated'
  | 'Opt In Deadline Passed'
  | 'Response Deadline Passed'
  | 'Opted In'
  | 'Expired'
  | 'New';

export const getTextByResponseStatus = (
  question: Question,
  fallbackText: ResponseStatusText = 'New',
): ResponseStatusText => {
  const {responseStatus, pillStatus: pillText} = question.currentResponse;

  switch (responseStatus) {
    case ResponseStatus.Rejected:
      return 'Response Rejected';
    case ResponseStatus.AwaitingOptInOut: // New
      return 'Active';
    case ResponseStatus.OptedOut:
      return 'Closed';
    case ResponseStatus.OptedIn: // Opted in
      return 'Opted In';
    case ResponseStatus.Complete:
      return 'Response Pending Review';
    case ResponseStatus.Approved:
      return 'Response Approved';
    case ResponseStatus.PaidToUser:
      return 'Paid';
    case ResponseStatus.PaidToCharity:
      return 'Donated';
    default:
      // @ts-ignore
      return pillText || fallbackText;
  }
};

export const getHeaderTitleByQuestion = (question: Question): string => {
  const {responseStatus} = question.currentResponse;
  switch (responseStatus) {
    case ResponseStatus.AwaitingOptInOut:
      return 'In or out?';
    case ResponseStatus.OptedIn:
      return 'Respond';
    default:
      return 'Question';
  }
};

const getTimelinePillStatus = (question: Question) => {
  let pillStatus: ResponseStatusText = getTextByResponseStatus(question);

  if (!['Active', 'Closed', 'Expired', 'New'].includes(pillStatus)) {
    return pillStatus;
  } else {
    // Has passed opt in deadline
    if (hasPassedDeadline(question, true)) {
      pillStatus = 'Opt In Deadline Passed';
    }

    // Has passed response deadline
    if (hasPassedDeadline(question)) {
      pillStatus = 'Response Deadline Passed';
    }
  }

  return pillStatus;
};

const getStatusIcon = (status: ResponseStatusText): IconDefinition | null => {
  const positiveStatus: ResponseStatusText[] = [
    'Response Pending Review',
    'Response Approved',
    'Opted In',
  ];
  const negativeStatus: ResponseStatusText[] = [
    'Response Rejected',
    'Opt In Deadline Passed',
    'Response Deadline Passed',
  ];
  if (status === 'Donated') {
    return faHandHeart;
  }
  if (status === 'Paid') {
    return faSmile;
  }
  if (positiveStatus.includes(status)) {
    return faCheckCircle;
  }
  if (negativeStatus.includes(status)) {
    return faTimesCircle;
  }
  return null;
};

const getStatusIconColor = (status: ResponseStatusText): string => {
  switch (status) {
    case 'Response Pending Review':
      return Color.Primary.Yellow;
    case 'Response Approved':
      return Color.Primary.Green;
    case 'Response Rejected':
      return Color.Primary.Red;
    case 'Opted In':
      return Color.Primary.Blue;
    case 'Opt In Deadline Passed':
      return Color.Primary.Yellow;
    case 'Response Deadline Passed':
      return Color.Primary.Red;
    case 'Donated':
      return Color.Primary.Pink;
    case 'Paid':
      return Color.Primary.Green;
    default:
      return Color.Primary.Blue;
  }
};

/**
 * Returns all the responses to the question including the current user's response (if has uploaded video)
 * @param question Question
 */
const getUnifiedResponses = (question: Question) => {
  let responses = [...(question.responses || [])];
  const {currentResponse} = question;

  if (!currentResponse || currentResponse.videoAddress === UNDEF_ID) {
    return responses;
  }
  responses.unshift(currentResponse);
  return responses;
};

const getHasResponses = (question?: Question) =>
  Boolean(question && getUnifiedResponses(question).length);

export {
  hasPassedDeadline,
  getButtonTitle,
  isAudience,
  showOptInDeadlineTimer,
  showResponseDeadlineTimer,
  showCreatedDate,
  getTimelinePillStatus,
  getUnifiedResponses,
  getHasResponses,
  getStatusIcon,
  getStatusIconColor,
  getQuestionDeadline,
};
