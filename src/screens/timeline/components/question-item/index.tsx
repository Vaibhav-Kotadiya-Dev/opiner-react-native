import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {faChevronRight} from '@fortawesome/pro-solid-svg-icons';
import FastImage from 'react-native-fast-image';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import TimelineRespondersList from '../RespondersList';
import {getUnifiedResponses} from 'screens/timeline/utils';
import {Question} from 'network/data/Question';
import ResponseStatusPill from 'components/question/response-status-pill';
import QuestionTimerText from 'components/question/button-timer-title/QuestionTimerText';
import OpinerContent from 'network/methods/OpinerContent';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(30),
    paddingTop: rs(18),
    paddingBottom: rs(32),
    borderBottomWidth: 1,
  },
  content: {flex: 1},
  contentInner: {flexDirection: 'row'},
  title: {marginTop: rs(6), marginBottom: rs(12)},
  communityTitle: {
    lineHeight: undefined,
    fontWeight: '700',
  },
  image: {
    width: rs(98),
    height: rs(98),
    marginRight: rs(20),
  },
});

interface QuestionItemProps {
  token: string;
  question: Question;
  onPress: () => void;
  isInFocus: boolean;
}

const QuestionItem = ({token, question, onPress}: QuestionItemProps) => {
  const {theme} = useThemeContext();
  if (!question) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.container, {borderBottomColor: theme.colors.border}]}
      onPress={onPress}>
      <View style={styles.content}>
        <AppText
          size="small"
          style={[styles.communityTitle, {color: theme.colors.secondaryText}]}>
          {question.companyName} / {question.communityName}
        </AppText>
        <AppText size="h2" style={[styles.title, {color: theme.colors.link}]}>
          {question.title}
        </AppText>
        <View style={styles.contentInner}>
          <FastImage
            style={styles.image}
            source={{
              uri: OpinerContent.getCDNImageURL(question.cdnThumbUrlMedium),
            }}
          />
          <View>
            <ResponseStatusPill question={question} />
            <QuestionTimerText question={question} />
            <TimelineRespondersList
              question={question}
              onPress={(_: number) => onPress()}
              responses={getUnifiedResponses(question)}
            />
          </View>
        </View>
      </View>
      <FontAwesomeIcon icon={faChevronRight} color="#9C9C9C" />
    </TouchableOpacity>
  );
};

export default memo(
  QuestionItem,
  (prev, next) =>
    prev.question.currentResponse.responseStatus ===
      next.question.currentResponse.responseStatus &&
    prev.isInFocus === next.isInFocus,
);
