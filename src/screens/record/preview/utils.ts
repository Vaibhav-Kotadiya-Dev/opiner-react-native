import {resetTo, topLevelNavigator} from '../../../NavigationService';
import {Question} from 'network/data/Question';
import {removeItem} from 'utils/VideoStateStore';

const handleSubmit = (question: any, videoUri: string): void => {
  resetTo('UPLOADING_SCREEN', {question, videoUri});
};

const handleTimeLine = (questionId?: number): void => {
  resetTo('MAIN_SCREEN', {
    screen: 'TimelineTab',
    params: {
      questionId,
    },
  });
};

const handleRedo = (question: Question): void => {
  removeItem(question.id);
  topLevelNavigator?.reset({
    routes: [
      {
        name: 'MAIN_SCREEN',
      },
      {
        name: 'RECORD_VIDEO_SCREEN',
        params: {question},
      },
    ],
    index: 1,
  });
};
export {handleSubmit, handleTimeLine, handleRedo};
