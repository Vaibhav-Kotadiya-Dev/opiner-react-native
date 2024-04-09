import {Alert} from 'react-native';
import fs from 'react-native-fs';

import {saveVideo} from 'screens/upload/utils';
import {trackRecordedQuestion} from 'utils/LocalStorage';
import {Question} from 'network/data/Question';
import {push} from 'NavigationService';
import {reportToRaygun} from 'utils/Raygun';

const onDelete = (
  question?: Partial<Question>,
  path?: string,
  askConfirmation: boolean = true,
  dismiss?: () => void,
) => {
  if (!question || !path) {
    return;
  }
  const trash = () => {
    dismiss?.();
    trackRecordedQuestion(null);
    fs.unlink(path).catch(e =>
      reportToRaygun(e, 'Deleting response - Unlinking file path'),
    );
  };
  if (!askConfirmation) {
    trash();
    return;
  }
  Alert.alert(
    'Delete response?',
    `Are you sure you want to delete your response for ${question?.title}? Your response will be lost.`,
    [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: trash,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
  );
};

const onUpload = (
  question?: Partial<Question>,
  path?: string,
  dismiss?: () => void,
) => {
  if (!path || !question) {
    return;
  }
  dismiss?.();
  push('RESPONSE_PREVIEW_SCREEN', {
    question,
    videoUri: path,
  });
};

const onSave = (
  question?: Partial<Question>,
  path?: string,
  dismiss?: () => void,
) => {
  if (!path || !question) {
    return;
  }
  saveVideo(path, '', parseInt(String(question.id), 10), false).then(
    success => success && onDelete(question, path, false, dismiss),
  );
};

export {onDelete, onUpload, onSave};
