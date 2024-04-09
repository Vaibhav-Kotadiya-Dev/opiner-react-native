import {useEffect, useState} from 'react';
import {OnProgressData} from 'react-native-video';

import {eventEmitter, EventType} from 'utils/EventService';

const useVideoProgress = () => {
  const [progress, setProgress] = useState<OnProgressData>({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });

  useEffect(() => {
    const handleUpdate = (data: OnProgressData) => {
      setProgress(data);
    };

    eventEmitter.addListener(EventType.VideoProgress, handleUpdate);

    return () => {
      eventEmitter.removeListener(EventType.VideoProgress, handleUpdate);
    };
  }, []);

  return {progress};
};

export default useVideoProgress;
