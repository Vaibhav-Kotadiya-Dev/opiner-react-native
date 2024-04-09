import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {faStopwatch} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Question, ResponseStatus} from 'network/data/Question';
import useDeadlineTimer from '../countdown/useDeadlineTimer';
import {
  showOptInDeadlineTimer,
  showResponseDeadlineTimer,
} from 'screens/timeline/utils';
import Font from 'assets/fonts';
import AppText from 'components/app-text';
import {buttonColors} from 'components/themed-button/styles';
import {useDispatch} from 'react-redux';
import {updateQuestion} from 'store/all_questions/actions';

const styles = StyleSheet.create({
  icon: {opacity: 0.8},
  text: {opacity: 0.8, fontFamily: Font.MonoRegular},
});

interface ButtonTimerTitleProps {
  question: Question;
}

const ButtonTimerTitle = ({question}: ButtonTimerTitleProps) => {
  const showOptInTimer = showOptInDeadlineTimer(question);
  const showResponseTimer = showResponseDeadlineTimer(question);
  const deadline = showResponseTimer
    ? question.currentResponse.responseDeadline
    : showOptInTimer
    ? question.currentResponse.optInDeadline
    : null;

  const dispatch = useDispatch();

  const handleTimerExpire = useCallback(() => {
    // Update local state to hide timers
    dispatch(
      updateQuestion({
        ...question,
        currentResponse: {
          ...question.currentResponse,
          responseStatus: showOptInTimer
            ? ResponseStatus.AwaitingOptInOutExpired
            : ResponseStatus.AwaitingResponseExpired,
        },
      }),
    );
  }, [dispatch, question, showOptInTimer]);
  const expiresOn = useMemo(() => moment(deadline), [deadline]);

  const {days, hours, minutes, seconds} = useDeadlineTimer(
    expiresOn,
    handleTimerExpire,
  );

  if (!deadline) {
    return null;
  }

  return (
    <>
      {showResponseTimer ? 'Respond' : 'Opt in'}{' '}
      <FontAwesomeIcon
        icon={faStopwatch}
        style={styles.text}
        color={buttonColors.default.text.primary}
      />{' '}
      <AppText
        style={[
          styles.text,
          {
            fontFamily: Font.MonoRegular,
            color: buttonColors.default.text.primary,
          },
        ]}>
        {days}d {hours}h {minutes}m {seconds}s
      </AppText>
    </>
  );
};

export default ButtonTimerTitle;
