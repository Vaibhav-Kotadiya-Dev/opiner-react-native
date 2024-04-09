import {Action} from '../ActionInterface';
import {NetworkDataState} from '../NetworkDataState';
import {SET_VIDEO_STATUS} from './actions';
import {ProcessingStatus, ProcessingType} from 'utils/VideoStateStore';

export interface UploadResponseState extends NetworkDataState {
  status: ProcessingStatus;
  action: ProcessingType;
}

const initState: UploadResponseState = {
  status: ProcessingStatus.None,
  action: ProcessingType.None,
  loading: false,
  error: undefined,
};

const uploadResponse = (
  state: UploadResponseState = initState,
  action: Action,
): UploadResponseState => {
  switch (action.type) {
    case SET_VIDEO_STATUS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
};

export default uploadResponse;
