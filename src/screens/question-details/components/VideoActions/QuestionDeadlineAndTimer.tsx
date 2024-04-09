import React from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';

import {rs} from 'utils/ResponsiveScreen';
import ResponseStatusPill from 'components/question/response-status-pill';
import SectionTitle from 'components/section-title';
import QuestionTimerText from 'components/question/button-timer-title/QuestionTimerText';
import AppText from 'components/app-text';
import {getQuestionDeadline} from 'screens/timeline/utils';
import {Question} from 'network/data/Question';

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(30),
    paddingVertical: rs(16),
  },
  date: {
    fontWeight: '500',
  },
  statusContainer: {marginBottom: 1},
});

interface QuestionDeadlineAndTimerProps {
  question: Question;
}

const QuestionDeadlineAndTimer = ({
  question,
}: QuestionDeadlineAndTimerProps) => {
  const {deadline} = getQuestionDeadline(question);
  return (
    <>
      <SectionTitle
        title="Status"
        rightComponent={
          <ResponseStatusPill style={{marginTop: rs(0)}} question={question} />
        }
        style={styles.statusContainer}
      />
      {deadline && (
        <View style={styles.timerContainer}>
          <QuestionTimerText question={question} />
          <AppText size="extraSmall" style={styles.date}>
            {moment(deadline).format('HH:mm, D MMMM YYYY')}
          </AppText>
        </View>
      )}
    </>
  );
};

export default QuestionDeadlineAndTimer;
