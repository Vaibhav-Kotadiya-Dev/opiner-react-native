import {call, put} from 'redux-saga/effects';
import {GET_TIMELINE_EVENTS} from './actions';
import {Action} from '../ActionInterface';
import {SUCCESS} from '../../appConstants';
import {opinerGetTimelineEvents} from '../../network/OpinerApi';
import {convertPropertyTime} from 'utils/Time';
import {reportToRaygun} from 'utils/Raygun';

export function* getTimelineEvents(action: Action) {
  try {
    if (!action.payload) {
      return;
    }
    const id: number = action.payload.id;
    const timeline: any = yield call(opinerGetTimelineEvents, id);
    // Convert time values to local
    let timelineFormatted = convertPropertyTime(timeline);
    if (Array.isArray(timeline.timeline)) {
      timelineFormatted.timeline = timeline.timeline.map((timelineItem: any) =>
        convertPropertyTime(timelineItem),
      );
    }
    if (timeline.currentResponse) {
      timelineFormatted.currentResponse = convertPropertyTime(
        timeline.currentResponse,
      );
    }
    if (timeline.responses) {
      timelineFormatted.responses = timeline.responses.map((response: any) =>
        convertPropertyTime(response),
      );
    }
    const actionTimeline: Action = {
      type: `${GET_TIMELINE_EVENTS}${SUCCESS}`,
      payload: action.payload,
      response: timelineFormatted,
    };
    yield put(actionTimeline);
  } catch (e) {
    reportToRaygun(e, 'Getting timeline events and converting timezone');
    const actionTimeline: Action = {
      type: `${GET_TIMELINE_EVENTS}`,
      payload: action.payload,
      response: e.message,
    };
    yield put(actionTimeline);
  }
}
