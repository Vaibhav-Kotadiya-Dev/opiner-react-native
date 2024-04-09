import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {
  faExclamationTriangle,
  faFaceGrinStars,
  faFaceSmile,
  faOctagonExclamation,
  faThumbsUp,
} from '@fortawesome/pro-solid-svg-icons';

import {Question, ResponseStatus} from 'network/data/Question';
import {hasPassedDeadline} from 'screens/timeline/utils';
import {baseColors} from 'theme/colors';
import tailwindColors from 'theme/tailwindColors';

export type ResponseStatusText =
  | 'Rejected' // 0
  | 'Opt In Required' // 1
  | 'Response Required' // 3
  | 'Review Pending' // 4
  | 'Approved' // 5
  | 'Approved: Paid' // 6
  | 'Approved: Donation' // 7
  | 'Processing Payment'
  | 'Processing Donation'
  | 'Opted Out'
  | 'Deadline Passed'
  | 'Completed';

interface IQuestionStatusPillContent {
  text: ResponseStatusText;
  backgroundColor: string;
  textColor: string;
  icon: IconProp;
  iconColor: string;
  showBusy: boolean;
}

const {amber, red, blue, pink, green, white} = tailwindColors;

export const getQuestionStatusPillContent = (
  question: Question,
  // theme: ITheme,
): IQuestionStatusPillContent | null => {
  const {responseStatus, pillStatus} = question.currentResponse;
  let content: IQuestionStatusPillContent = {
    // @ts-ignore
    text: pillStatus,
    backgroundColor: baseColors.darkGrey,
    textColor: white,
    icon: faThumbsUp,
    iconColor: pink[500],
    showBusy: false,
  };

  if (pillStatus === 'Expired') {
    content.icon = faOctagonExclamation;
    if (
      hasPassedDeadline(question, true) &&
      responseStatus === ResponseStatus.AwaitingOptInOutExpired
    ) {
      content.text = 'Deadline Passed';
      content.iconColor = amber[500];
    }

    if (
      hasPassedDeadline(question) &&
      responseStatus === ResponseStatus.AwaitingResponseExpired
    ) {
      content.text = 'Deadline Passed';
      content.iconColor = red[600];
    }

    return content;
  }

  switch (responseStatus) {
    case ResponseStatus.AwaitingOptInOutExpired:
      content.text = 'Deadline Passed';
      content.icon = faOctagonExclamation;
      content.iconColor = amber[500];
      break;
    case ResponseStatus.AwaitingResponseExpired:
      content.text = 'Deadline Passed';
      content.icon = faOctagonExclamation;
      content.iconColor = red[600];
      break;
    case ResponseStatus.Rejected:
      content.text = 'Rejected';
      content.icon = faOctagonExclamation;
      content.iconColor = red[500];
      break;
    case ResponseStatus.AwaitingOptInOut:
      content = {
        ...content,
        text: 'Opt In Required',
        icon: faExclamationTriangle,
        backgroundColor: baseColors.orange,
        iconColor: amber[300],
      };
      break;
    case ResponseStatus.OptedOut:
      content.text = 'Opted Out';
      content.iconColor = blue[500];
      break;
    case ResponseStatus.OptedIn:
      content = {
        ...content,
        text: 'Response Required',
        icon: faExclamationTriangle,
        backgroundColor: baseColors.red,
        iconColor: red[300],
      };
      break;
    case ResponseStatus.Complete:
      content.text = 'Review Pending';
      content.backgroundColor = baseColors.blue;
      content.showBusy = true;
      break;
    case ResponseStatus.Approved:
      content.text = 'Approved';
      content.backgroundColor = baseColors.green;
      break;
    case ResponseStatus.PaidToUser:
      if (!question.price) {
        content.text = 'Completed';
      } else {
        content.text = 'Approved: Paid';
        content.icon = faFaceSmile;
        content.iconColor = green[500];
        content.backgroundColor = baseColors.green;
      }
      break;
    case ResponseStatus.PaidToCharity:
      if (!question.donation) {
        content.text = 'Completed';
      } else {
        content.text = 'Approved: Donation';
        content.icon = faFaceGrinStars;
        content.backgroundColor = baseColors.green;
      }
      break;
    default:
      return null;
  }

  return content;
};

export const getIsActiveQuestion = (question: Question) => {
  return ['Opt In Required', 'Response Required'].includes(
    getQuestionStatusPillContent(question)?.text || '',
  );
};
