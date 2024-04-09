import {useRef} from 'react';
import {useFocusEffect} from '@react-navigation/core';

import {IVideoPlayerRef} from 'components/video-player';

const useAutoVideoPause = () => {
  const playerRef = useRef<IVideoPlayerRef>(null);

  useFocusEffect(() => {
    return () => {
      playerRef.current?.pause();
    };
  });
  return playerRef;
};

export default useAutoVideoPause;
