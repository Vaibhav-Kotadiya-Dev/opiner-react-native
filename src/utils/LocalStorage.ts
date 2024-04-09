import AsyncStorage from '@react-native-async-storage/async-storage';

import {Question} from 'network/data/Question';
import {reportToRaygun} from './Raygun';

export enum StorageKeys {
  HasRunOnce = 'HasRunOnce',
  PendingUpload = 'PendingUpload',
  LastVideoSize = 'LastVideoSize',
}

const memoryCache = new Map<StorageKeys, any>();

function setValue<T>(key: StorageKeys, value: T) {
  memoryCache.set(key, value);
  AsyncStorage.setItem(key, JSON.stringify(value));
}

function getValue<T>(key: StorageKeys, defaultValue?: T) {
  if (!memoryCache.has(key) && defaultValue !== undefined) {
    return defaultValue;
  }
  return memoryCache.get(key) as T;
}

const tryParse = (value: any) => {
  try {
    return JSON.parse(value); // if parsing fails return raw value
  } catch {
    return value;
  }
};

const loadAsync = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    for (const [key, value] of values) {
      memoryCache.set(key as StorageKeys, tryParse(value));
    }
    return Array.from(memoryCache.entries());
  } catch (exp) {
    reportToRaygun(exp, 'Storage read error');
    // Logger.error(`Storage read error ${exp.message}`);
  }
  return undefined;
};

interface IVideoStat {
  startedOn: number;
  stoppedOn?: number;
  progress: number;
  duration: number;
  lastPlayed: number;
}

const kVideoStatPrefix = 'vstat__';
const _makeVideoKey = (question: Question) => {
  // special key for tracking stats, we are tracking each item separately
  return (kVideoStatPrefix + question.id) as StorageKeys;
};

const getVideoStatus = (question: Question) => {
  const defaultItem: IVideoStat = {
    lastPlayed: Date.now(),
    progress: 0,
    duration: -1,
    startedOn: Date.now(),
  };
  if (!question.id) {
    console.log('Tried to get video stat without id.');
    return defaultItem;
  }
  return getValue<IVideoStat>(_makeVideoKey(question), defaultItem);
};

const setVideoStatus = (question: Question, status: Partial<IVideoStat>) => {
  if (!question.id) {
    console.log('Tried to set video stat without id.');
    return;
  }
  const existing = getVideoStatus(question);
  setValue<IVideoStat>(_makeVideoKey(question), {
    ...existing,
    ...status,
  });
};

const getVideoHistory = (): Array<IVideoStat & {trackingId: string}> => {
  return Array.from(memoryCache.entries())
    .filter(item => item[0].startsWith(kVideoStatPrefix))
    .map(item => ({
      ...item[1],
      trackingId: item[0],
    }));
};

const trackRecordedQuestion = (question: Question | null) =>
  setValue(StorageKeys.PendingUpload, question);

const getTrackedQuestion = (): Question => getValue(StorageKeys.PendingUpload);

export {
  setValue,
  getValue,
  loadAsync,
  setVideoStatus,
  getVideoStatus,
  getVideoHistory,
  getTrackedQuestion,
  trackRecordedQuestion,
};
