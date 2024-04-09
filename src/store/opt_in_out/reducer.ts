import {Question} from '../../network/data/Question';
import {Action} from '../ActionInterface';
import {OPT_IN} from './actions';
import {CLEAR, FAILED, SUCCESS} from '../../appConstants';
import {NetworkDataState} from '../NetworkDataState';

export interface OptInOutState extends NetworkDataState {
  readonly data: Question[];
}

const initState: OptInOutState = {
  data: null,
  loading: false,
  error: 'Data is empty',
};

const optInOut = (
  state: OptInOutState = initState,
  action: Action,
): OptInOutState => {
  let newState: OptInOutState = null;
  switch (action.type) {
    case OPT_IN:
      newState = {
        ...state,
        loading: true,
      };
      break;
    case `${OPT_IN}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: action.response,
        error: '',
      };
      break;
    case `${OPT_IN}${FAILED}`:
      newState = {
        ...state,
        loading: false,
        error: action.response,
      };
      break;
    case `${OPT_IN}${CLEAR}`:
      newState = initState;
      break;
  }
  return newState || state;
};

export default optInOut;
