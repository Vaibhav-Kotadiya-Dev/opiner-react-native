import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

import convertToProxyURL from 'utils/convert';
import styles from './styles';
import {getVideoUrl, Question} from 'network/data/Question';
import {useFocusEffect} from '@react-navigation/native';
import OpinerContent from 'network/methods/OpinerContent';

export interface PreviewProps {
  imageSrc?: string;
  token?: string;
  isDisabled?: boolean;
  onPress?: () => void;
  question: Question;
  isInTimeline?: boolean;
  isInFocus?: boolean;
}

const Preview = ({
  token,
  isDisabled,
  onPress,
  question,
  isInTimeline,
  isInFocus,
}: PreviewProps): ReactElement => {
  const [isVideoReady, setVideoReady] = useState(false);
  const videoURL = getVideoUrl(question);
  const imageURL = OpinerContent.getCDNImageURL(question.cdnThumbUrlLarge);
  const playerRef = useRef<Video>(null);
  const showThumbImage = !isVideoReady;
  const [paused, setPaused] = useState(!isInFocus);

  useFocusEffect(
    useCallback(() => {
      if (isInFocus && paused) {
        setPaused(false);
      }
      return () => {
        if (!paused) {
          setPaused(true);
        }
      };
    }, [isInFocus, paused]),
  );

  useEffect(() => {
    if (isInFocus) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [isInFocus]);

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.container}>
      {showThumbImage && (
        <FastImage
          style={[styles.preview, isInTimeline && {transform: [{scale: 1.2}]}]}
          source={{
            uri: imageURL,
            headers: {Authorization: `Bearer ${token}`},
          }}
        />
      )}
      <Video
        ref={playerRef}
        resizeMode="cover"
        source={{
          uri: convertToProxyURL(videoURL),
          headers: {Authorization: `Bearer ${token}`},
        }}
        controls={false}
        muted
        paused={paused}
        playInBackground={false}
        playWhenInactive={false}
        onProgress={data => {
          if (!isVideoReady) {
            setVideoReady(true);
          }
          if (data.currentTime > Math.min(5, data.seekableDuration * 0.1)) {
            playerRef.current?.seek(0);
          }
        }}
        progressUpdateInterval={3000}
        onEnd={() => playerRef.current?.seek(0)}
        onPlaybackStalled={() => setVideoReady(false)}
        style={[
          styles.preview,
          showThumbImage && styles.hidden,
          isInTimeline && {transform: [{scale: 1.2}]},
        ]}
      />
    </TouchableOpacity>
  );
};

export default Preview;
