import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import Expander from 'components/expander';
import {GET_TIMELINE_EVENTS} from 'store/timeline_events/actions';
import {Question, Timeline} from 'network/data/Question';
import {AppState} from 'store/rootReducer';
import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';

const styles = StyleSheet.create({
  label: {fontWeight: '500'},
});

const EventLogItem = ({
  event,
  isLastItem,
}: {
  event: Timeline;
  isLastItem: boolean;
}) => {
  return (
    <View style={{marginBottom: isLastItem ? rs(0) : rs(20)}}>
      <AppText size="extraSmall" style={styles.label}>
        {moment(event.created).format('HH:mm, D MMMM YYYY')}
      </AppText>
      <AppText size="h3">{event.message}</AppText>
    </View>
  );
};

interface QuestionEventLogProps {
  question: Question;
}

const QuestionEventLog = ({question}: QuestionEventLogProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_TIMELINE_EVENTS,
      payload: {id: question.id},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timelineState = useSelector(
    (state: AppState) => state.timelineEventsState,
  );
  const timeline = timelineState.data[question.id]?.timeline || [];
  return (
    <Expander title="Event log">
      {timeline.map((event, index) => (
        <EventLogItem
          key={index + event.created.toString()}
          event={event}
          isLastItem={index === timeline.length - 1}
        />
      ))}
    </Expander>
  );
};

export default QuestionEventLog;
