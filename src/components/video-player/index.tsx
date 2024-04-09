import React, {
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Video, {VideoProperties} from 'react-native-video';
import FastImage from 'react-native-fast-image';

import convertToProxyURL from 'utils/convert';
import VideoControls from './VideoControls';
import {rs, wp} from 'utils/ResponsiveScreen';
import useSpeedToggle from './hooks/useSpeedToggle';
import {emitVideoProgressEvent} from 'utils/EventService';
import {Question, QuestionResponse} from 'network/data/Question';
import QuestionVideoOverlay from 'components/question/video-overlay';
import {Constant} from 'screens/upload/utils';

export const playerSize = wp(100) - rs(32);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: playerSize,
    maxHeight: playerSize,
  },
  player: {
    height: '100%',
    width: '100%',
  },
  hideDisplay: {display: 'none'},
  full: {flex: 1},
});

export interface VideoPlayerProps extends Partial<VideoProperties> {
  videoURL: string;
  captionsUrl?: string;
  fallbackImageURL?: string;
  children?: ReactElement | null;
  question?: Question;
  onUserDidInteract?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  responseDetails?: QuestionResponse;
}

export interface IVideoPlayerRef {
  pause: () => void;
  isPaused: () => boolean;
}

const VideoPlayer = (
  {
    videoURL,
    captionsUrl,
    fallbackImageURL,
    paused: orgPaused,
    children,
    question,
    onUserDidInteract,
    containerStyle,
    responseDetails,
    ...rest
  }: VideoPlayerProps,
  ref: React.Ref<IVideoPlayerRef>,
) => {
  const [isLoading, setLoading] = useState(Boolean(videoURL));
  const [paused, setPaused] = useState(Boolean(orgPaused));
  const [isWaitingPlay, setIsWaitingPlay] = useState(true);
  const speedProps = useSpeedToggle();
  const [showCaptions, setShowCaptions] = useState(!!captionsUrl);

  useEffect(() => {
    setPaused(Boolean(orgPaused));
    return () => {
      setPaused(true);
    };
  }, [orgPaused]);

  const playerRef = useRef<Video>(null);
  const wasEnded = useRef(false);

  useImperativeHandle(
    ref,
    () => ({
      pause: () => setPaused(true),
      isPaused: () => paused,
    }),
    [paused],
  );

  return (
    <>
      <View style={styles.full}>
        <View style={[styles.container, containerStyle]}>
          {Boolean(isWaitingPlay) && Boolean(fallbackImageURL) && (
            <FastImage source={{uri: fallbackImageURL}} style={styles.player} />
          )}
          <Video
            ref={playerRef}
            {...rest}
            rate={speedProps.speed}
            paused={paused}
            resizeMode="cover"
            source={{
              uri: videoURL.startsWith('http')
                ? convertToProxyURL(videoURL)
                : videoURL,
            }}
            minLoadRetryCount={10}
            onError={() => {
              setLoading(false);
              setPaused(true);
            }}
            controls={false}
            playInBackground={false}
            playWhenInactive={false}
            // @android
            // @ts-ignore
            subtitleStyle={{paddingBottom: 50}}
            onProgress={data => {
              if (isLoading) {
                setLoading(false);
              }
              if (isWaitingPlay) {
                setIsWaitingPlay(false);
                setLoading(false);
              }
              /**
               * Uncomment the  following lines if we're re-enabling the need to watch
               * 10 seconds of the video before the opt-in button is enabled
               * The event is handled in VideoActions component
               */
              // if (question) {
              //   const {progress: savedProgress} = getVideoStatus(question);
              //   if (
              //     savedProgress === 0 &&
              //     data.currentTime > Math.min(data.seekableDuration * 0.1, 10)
              //   ) {
              //     setVideoStatus(question, {progress: data.currentTime});
              //     emitVideoStatusUpdateEvent();
              //   }
              // }
              emitVideoProgressEvent(data);
            }}
            progressUpdateInterval={60}
            onBuffer={() => setLoading(true)}
            onEnd={() => {
              setPaused(true);
              wasEnded.current = true;
            }}
            style={[
              rest.style,
              styles.player,
              isWaitingPlay && styles.hideDisplay,
            ]}
            selectedTextTrack={
              captionsUrl
                ? {
                    type: showCaptions
                      ? Constant.isIOS
                        ? 'title'
                        : 'index'
                      : 'disabled',
                    value: Constant.isIOS ? 'Captions' : 0,
                  }
                : undefined
            }
            textTracks={
              captionsUrl
                ? [
                    {
                      type: 'text/vtt',
                      language: 'en',
                      title: 'Captions',
                      uri: captionsUrl,
                    },
                  ]
                : undefined
            }
          />
          {question !== undefined && Boolean(paused) && !responseDetails && (
            <QuestionVideoOverlay question={question} />
          )}
        </View>
        <VideoControls
          isPaused={paused}
          isLoading={isLoading && !paused}
          onTogglePaused={() => {
            if (wasEnded.current && paused) {
              wasEnded.current = false;
              playerRef.current?.seek(0, 5);
            }
            setPaused(!paused);
            onUserDidInteract?.();
          }}
          onSeek={(to: number) => {
            playerRef.current?.seek(to, 5);
            onUserDidInteract?.();
          }}
          onSpeedChange={() => {
            speedProps.handleToggle();
            onUserDidInteract?.();
          }}
          hasClosedCaptions={Boolean(captionsUrl)}
          responderName={
            !paused && responseDetails !== undefined
              ? responseDetails.userFirstName
              : undefined
          }
          speedToggleProps={speedProps}
          toggleClosedCaptions={() => setShowCaptions(!showCaptions)}
          captionsDisabledByUser={!showCaptions}
        />
      </View>
      {children}
    </>
  );
};

export default forwardRef(VideoPlayer);
