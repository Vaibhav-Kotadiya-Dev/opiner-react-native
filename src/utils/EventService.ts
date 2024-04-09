import {EventEmitter} from 'events';
import {OnProgressData} from 'react-native-video';

export const EventType = {
  VideoProgress: 'video-progress',
  VideoStatusUpdate: 'video-status-update',
};

const eventEmitter = new EventEmitter();

const emitVideoProgressEvent = (progress: OnProgressData) => {
  eventEmitter.emit(EventType.VideoProgress, progress);
};

const emitVideoStatusUpdateEvent = () => {
  eventEmitter.emit(EventType.VideoStatusUpdate);
};

export {eventEmitter, emitVideoProgressEvent, emitVideoStatusUpdateEvent};
