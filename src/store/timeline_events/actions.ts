import {ACTIONS_PACKAGE, CLEAR} from '../../appConstants';
import {Action} from '../ActionInterface';

const GET_TIMELINE_EVENTS = `${ACTIONS_PACKAGE}.GET_TIMELINE_EVENTS`;

const getTimelineEvents = (id: number): Action => ({
  type: GET_TIMELINE_EVENTS,
  payload: {
    id,
  },
});

const clearTimelineEvents = (): Action => ({
  type: `${GET_TIMELINE_EVENTS}${CLEAR}`,
});

export {GET_TIMELINE_EVENTS, getTimelineEvents, clearTimelineEvents};
