import fs from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Question} from 'network/data/Question';
import {reportToRaygun} from './Raygun';

export enum ProcessingStatus {
  None = 0,
  Processing = 1,
  Failed = 2,
  Success = 3,
  Cancelled = 4,
}

export enum ProcessingType {
  None = 0,
  Compressing = 1,
  Uploading = 2,
}

export interface StatusItem {
  question: Question | null;
  path?: string | null;
  time?: number;
  status: ProcessingStatus;
  processType: ProcessingType;
}

export interface QuestionStatus {
  status: ProcessingStatus;
  time?: number;
  processType: ProcessingType;
}

const getItem = async (questionId: number): Promise<StatusItem> => {
  try {
    const item = await AsyncStorage.getItem(`video-${questionId}`);
    if (item) {
      return JSON.parse(item);
    }
  } catch {
    // ignore
  }
  return {
    question: null,
    status: ProcessingStatus.None,
    path: null,
    time: Date.now(),
    processType: ProcessingType.None,
  };
};

const saveStatus = async ({
  question,
  path,
  status,
  processType,
}: StatusItem): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(
      `video-${question!.id}`,
      JSON.stringify({
        question,
        path,
        time: Date.now(),
        status,
        processType,
      }),
    );
    return true;
  } catch (e) {
    reportToRaygun(e, 'Saving video status to local storage');
    console.log('Saving video status to local storage', e);
    // ignore
  }
  return false;
};

/**
 * Depending upon the return value of this, we will
 */
const getStatus = async (questionId: number): Promise<QuestionStatus> => {
  try {
    const detail = await getItem(questionId);
    if (detail) {
      return {
        time: detail.time!,
        status: detail.status,
        processType: detail.processType,
      };
    }
  } catch (e) {
    reportToRaygun(e, 'Getting video status');
    console.log('Getting video status', e);
    // ignore
  }
  return {
    time: -1,
    status: ProcessingStatus.None,
    processType: ProcessingType.None,
  };
};

const isWorking = async (questionId: number): Promise<boolean> => {
  const {status, processType} = await getStatus(questionId);
  return (
    status !== ProcessingStatus.None && processType !== ProcessingType.None
  );
};

const setFailed = ({
  path,
  question,
  processType,
}: {
  path: string;
  question: Question;
  processType: ProcessingType;
}): Promise<boolean> =>
  saveStatus({
    question,
    path,
    status: ProcessingStatus.Failed,
    processType,
  });

const setDone = ({
  path,
  question,
  processType,
}: {
  path: string;
  question: Question;
  processType: ProcessingType;
}): Promise<boolean> =>
  saveStatus({
    question,
    path,
    status: ProcessingStatus.Success,
    processType,
  });

const setProgress = async ({
  question,
  path,
  processType,
}: {
  question: Question;
  path: string | null;
  processType: ProcessingType;
}): Promise<boolean> =>
  saveStatus({
    question,
    path,
    processType,
    status: ProcessingStatus.Processing,
  });

const removeItem = async (questionId: number): Promise<boolean> => {
  try {
    const existing = await getItem(questionId);
    if (!existing || !existing.question) {
      return true;
    }
    const {path} = existing;
    if (!path) {
      return true;
    }
    fs.exists(path).then(has => {
      has && fs.unlink(path);
    });
    await AsyncStorage.removeItem(`video-${questionId}`);
    return true;
  } catch {
    // ignore
  }
  return false;
};

const getAllKeys = async () =>
  await AsyncStorage.getAllKeys().then(keys =>
    keys.filter(k => k.startsWith('video-')),
  );

const getAllItems = async () =>
  getAllKeys().then(keys => AsyncStorage.multiGet(keys));

const logAll = async () => getAllItems().then(console.log);

const removeAllVideos = async () => {
  const keys = await getAllKeys();
  if (!keys.length) {
    return;
  }
  return await AsyncStorage.multiRemove(keys);
};

const hasTimedOut = (time: number): boolean => Date.now() - time >= 300000; // 5 mins

// removeAllVideos();

export {
  setProgress,
  getStatus,
  isWorking,
  setFailed,
  setDone,
  removeItem,
  removeAllVideos,
  getAllItems,
  hasTimedOut,
  logAll,
  getItem,
};
