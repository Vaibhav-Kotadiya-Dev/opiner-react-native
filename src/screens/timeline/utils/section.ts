import {getIsActiveQuestion} from 'components/question/response-status-pill/utils';
import {Question, ResponseStatus} from 'network/data/Question';

const makeTimelineSection = (data: Question[]) => {
  const merged = data.reduce(
    (acc, current) => {
      if (getIsActiveQuestion(current)) {
        acc[0].data.push(current);
      } else {
        acc[1].data.push(current);
      }
      return acc;
    },
    [
      {
        title: 'Open questions',
        data: [],
      },
      {
        title: 'Closed questions',
        data: [],
      },
    ] as {title: 'Open questions' | 'Closed questions'; data: Question[]}[],
  );
  if (!merged[1]) {
    return merged;
  }
  merged[1].data.sort((first, second) => {
    /**
     * Put questions with status of Review Pending (newest to oldest) at the top of the Closed Questiona list
     * Order remaining closed questions newest to oldest
     */
    const isFirstComplete =
      first.currentResponse.responseStatus === ResponseStatus.Complete;
    const isSecondComplete =
      second.currentResponse.responseStatus === ResponseStatus.Complete;

    if (isFirstComplete && isSecondComplete) {
      return second.id - first.id;
    }
    if (isFirstComplete && !isSecondComplete) {
      return -1;
    }
    if (!isFirstComplete && isSecondComplete) {
      return 1;
    }
    return second.id - first.id;
  });
  return merged;
};

export default makeTimelineSection;
