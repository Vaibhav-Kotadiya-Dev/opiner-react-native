import React, {ReactElement} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import styles from './styles';
import {Question, getVideoUrl} from 'network/data/Question';
import Preview, {PreviewProps} from 'components/preview/Preview';
import QuestionVideoOverlay from '../video-overlay';

interface VideoPreviewProps extends PreviewProps {
  isDetail?: boolean;
  question: Question;
  token: string;
  isInTimeline: boolean;
  onPreview: (url: string) => void;
  isInFocus?: boolean;
  style?: StyleProp<ViewStyle>;
}

const VideoPreview = ({
  question,
  token,
  onPreview,
  isInTimeline,
  isInFocus,
  style,
}: VideoPreviewProps): ReactElement => {
  return (
    <View style={[styles.container, style]}>
      <Preview
        token={token}
        question={question}
        isInFocus={isInFocus}
        isInTimeline={isInTimeline}
        onPress={() => onPreview(getVideoUrl(question))}
      />
      <QuestionVideoOverlay question={question} />
    </View>
  );
};

export default VideoPreview;
