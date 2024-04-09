import React, {useCallback, useMemo} from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import {getQuestionDeadline} from 'screens/timeline/utils';
import Font from 'assets/fonts';
import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import useThemeContext from 'hooks/useThemeContext';
import {updateQuestion} from 'store/all_questions/actions';
import {Question, ResponseStatus} from 'network/data/Question';
import useDeadlineTimer from '../countdown/useDeadlineTimer';

interface QuestionTimerTextProps {
  question: Question;
}

const TimerText = ({children}: {children: React.ReactNode}) => {
  const {theme} = useThemeContext();
  return (
    <AppText
      size="h2"
      style={[
        {
          fontFamily: Font.MonoBold,
          color: theme.colors.text,
          marginVertical: rs(4),
        },
      ]}>
      {children}
    </AppText>
  );
};

const DeadlineTimer = ({
  deadline,
  question,
  which,
}: {
  deadline: string;
  question: Question;
  which: 'optIn' | 'response' | null;
}) => {
  const dispatch = useDispatch();

  const handleTimerExpire = useCallback(() => {
    // Update local state to hide timers
    dispatch(
      updateQuestion({
        ...question,
        currentResponse: {
          ...question.currentResponse,
          responseStatus:
            which === 'optIn'
              ? ResponseStatus.AwaitingOptInOutExpired
              : ResponseStatus.AwaitingResponseExpired,
        },
      }),
    );
  }, [dispatch, question, which]);
  const expiresOn = useMemo(() => moment(deadline), [deadline]);
  const {days, hours, minutes, seconds} = useDeadlineTimer(
    expiresOn,
    handleTimerExpire,
  );

  return (
    <TimerText>
      {days}d {hours}h {minutes}m {seconds}s
    </TimerText>
  );
};

const QuestionTimerText = ({question}: QuestionTimerTextProps) => {
  const {deadline, which} = getQuestionDeadline(question);

  if (!deadline) {
    return (
      <TimerText>{moment(question.created).format('DD MMMM YYYY')}</TimerText>
    );
  }

  return <DeadlineTimer {...{question, deadline, which}} />;
};

export default QuestionTimerText;
