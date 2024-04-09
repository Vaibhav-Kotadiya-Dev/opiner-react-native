import {Timeline} from '../../network/data/Question';
import {Action} from '../ActionInterface';
import {GET_TIMELINE_EVENTS} from './actions';
import {CLEAR, FAILED, SUCCESS} from '../../appConstants';
import {NetworkDataState} from '../NetworkDataState';

export interface TimelineEventsState extends NetworkDataState {
  readonly data: {
    [id: number]: {
      timeline: Timeline[];
    };
  };
}

const initState: TimelineEventsState = {
  data: {},
  loading: false,
  error: 'Data is empty',
};

const timelineEvents = (
  state: TimelineEventsState = initState,
  action: Action,
) => {
  let newState: TimelineEventsState | null = null;
  switch (action.type) {
    case GET_TIMELINE_EVENTS:
      newState = {
        ...state,
        loading: true,
      };
      break;
    case `${GET_TIMELINE_EVENTS}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.id]: action.response,
        },
      };
      break;
    case `${GET_TIMELINE_EVENTS}${FAILED}`:
      newState = {
        ...state,
        loading: false,
        error: action.response,
      };
      break;
    case `${GET_TIMELINE_EVENTS}${CLEAR}`:
      newState = initState;
      break;
  }
  return newState || state;
};

export default timelineEvents;
