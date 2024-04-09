import {ACTIONS_PACKAGE, CLEAR} from '../../appConstants';
import {Action} from '../ActionInterface';

import {ProcessingType, ProcessingStatus} from 'utils/VideoStateStore';

const SET_VIDEO_STATUS = `${ACTIONS_PACKAGE}.SET_VIDEO_STATUS`;

const setVideoStatus = ({
  status,
  action,
}: {
  action: ProcessingType;
  status: ProcessingStatus;
}): Action => ({
  type: SET_VIDEO_STATUS,
  payload: {
    status,
    action,
  },
});

const clearVideos = (): Action => ({
  type: `${SET_VIDEO_STATUS}${CLEAR}`,
});

export {SET_VIDEO_STATUS, setVideoStatus, clearVideos};
