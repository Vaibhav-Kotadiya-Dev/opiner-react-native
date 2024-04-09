import {Alert, Platform} from 'react-native';
import axios, {CancelTokenSource} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventEmitter from 'events';

import {ACCESS_TOKEN} from '../../appConstants';
import {getConfig, trackVideoStatus} from 'network/OpinerApi';
import {notifyUploadSuccess} from 'store/all_questions/sagas';
import {Question} from 'network/data/Question';
import {fixPath} from 'screens/record/preview/Compress';

export interface UploadData {
  progress: number;
  error: string;
}
export type UploadEvents = 'success' | 'failed' | 'progress' | 'cancelled';
export type UploadCallback = (data: UploadData) => void;

const Constant = {
  isIOS: Platform.OS === 'ios',
  getEndpoint: (id: number) =>
    `${getConfig().OPINER_BASE_URL}response/post/${id}`,
};

export const getCustomUploadId = (questionId: number) =>
  `response-${questionId}`;

class Upload {
  private static uploads: Record<string, CancelTokenSource> = {};
  private static _manager: EventEmitter = new EventEmitter();

  static track(uploadId: string, abort: CancelTokenSource) {
    Upload.uploads[uploadId] = abort;
  }

  public static addListener(
    event: UploadEvents,
    uploadId: string,
    callback: UploadCallback,
  ) {
    const targetEvent = `${event}-${uploadId}`;
    Upload._manager.addListener(targetEvent, callback);
    return {
      remove: () => {
        Upload._manager.removeListener(targetEvent, callback);
        delete Upload.uploads[uploadId];
      },
    };
  }

  public static emit(event: UploadEvents, uploadId: string, data: UploadData) {
    const targetEvent = `${event}-${uploadId}`;
    Upload._manager.emit(targetEvent, data);
  }

  public static cancelUpload(uploadId: string) {
    Upload.emit('cancelled', uploadId, {progress: 0, error: 'Cancelled'});
    Upload.uploads[uploadId]?.cancel('Cancel upload');
  }
}

export const uploadVideo = async (
  videoURI: string | null,
  question: Question,
) => {
  if (!videoURI) {
    Alert.alert('Video URI is missing.');
    return;
  }
  const questionId = question.id;
  const token = await AsyncStorage.getItem(ACCESS_TOKEN);
  const uploadId = getCustomUploadId(questionId);
  const formData = new FormData();
  formData.append('files', {
    uri: fixPath(videoURI),
    name: 'Response.mp4',
    type: 'video/mp4',
  });
  const abort = axios.CancelToken.source();
  Upload.track(uploadId, abort);
  try {
    const response = await axios.post(
      Constant.getEndpoint(questionId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        cancelToken: abort.token,
        onUploadProgress: progressEvent => {
          Upload.emit('progress', uploadId, {
            progress: (progressEvent.loaded / progressEvent.total) * 100,
            error: '',
          });
        },
      },
    );
    Upload.emit('success', uploadId, {progress: 100, error: ''});
    notifyUploadSuccess(question);
    trackVideoStatus({
      description: `Upload success - uploadVideo (${response.status})`,
      questionId: question.id,
    });
  } catch (error) {
    Upload.emit('failed', uploadId, {
      progress: 0,
      error: (error as Error).message,
    });
  }
};

export default Upload;
