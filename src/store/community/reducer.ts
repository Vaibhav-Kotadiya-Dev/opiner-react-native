import {CLEAR, FAILED, SUCCESS} from 'appConstants';
import {ICommunity} from 'network/data/Community';
import {LinkResponderCommunityStatus} from 'screens/communities/utils';
import {Action} from 'store/ActionInterface';
import {NetworkDataState} from 'store/NetworkDataState';
import Toast from 'utils/Toast';
import {
  JOIN_COMMUNITY,
  GET_COMMUNITY,
  PAUSE_COMMUNITY,
  LEAVE_COMMUNITY,
  RESET_COMMUNITY,
  GET_USER_COMMUNITIES,
  RESUME_COMMUNITY,
} from './actions';

export interface CommunityState extends NetworkDataState {
  readonly data: ICommunity[];
  action?: string;
  readonly userCommunities: ICommunity[];
}

const initState: CommunityState = {
  data: [],
  loading: false,
  error: 'Data is empty',
  userCommunities: [],
};

const communityReducer = (
  state: CommunityState = initState,
  action: Action<{code: string}>,
): CommunityState => {
  let newState: CommunityState = {...state};
  switch (action.type) {
    case JOIN_COMMUNITY:
    case GET_COMMUNITY:
    case PAUSE_COMMUNITY:
    case LEAVE_COMMUNITY:
    case GET_USER_COMMUNITIES:
      newState = {
        ...state,
        action: action.type,
        loading: true,
      };
      break;
    case `${JOIN_COMMUNITY}${FAILED}`:
    case `${GET_COMMUNITY}${FAILED}`:
    case `${PAUSE_COMMUNITY}${FAILED}`:
    case `${LEAVE_COMMUNITY}${FAILED}`:
    case `${GET_USER_COMMUNITIES}${FAILED}`:
      newState = {
        ...state,
        loading: false,
        error: action.response,
      };
      break;
    case `${GET_COMMUNITY}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: action.response,
        error: '',
      };
      break;
    case `${GET_USER_COMMUNITIES}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        userCommunities: action.response,
        error: '',
      };
      break;
    case `${JOIN_COMMUNITY}${SUCCESS}`:
      const alreadyWasAMember = state.userCommunities.find(
        item => item.id === action.response?.id,
      );
      newState = {
        ...state,
        loading: false,
        data: state.data.map(item => {
          if (item.id === action.response?.id) {
            item.linkResponderCommunityStatus =
              LinkResponderCommunityStatus.Pending;
          }
          return {...item};
        }),
        userCommunities: alreadyWasAMember
          ? state.userCommunities.map(item => {
              if (item.id === action.response?.id) {
                item.linkResponderCommunityStatus =
                  LinkResponderCommunityStatus.Pending;
              }
              return {...item};
            })
          : [
              ...state.userCommunities,
              {
                ...action.response,
                linkResponderCommunityStatus:
                  LinkResponderCommunityStatus.Pending,
              },
            ],
        error: '',
      };
      break;
    case `${PAUSE_COMMUNITY}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: state.data.map(item => {
          if (item.id === action.response?.id) {
            item.linkResponderCommunityStatus =
              LinkResponderCommunityStatus.Paused;
          }
          return {...item};
        }),
        userCommunities: state.userCommunities.map(item => {
          if (item.id === action.response?.id) {
            item.linkResponderCommunityStatus =
              LinkResponderCommunityStatus.Paused;
          }
          return {...item};
        }),
        error: '',
      };
      Toast.show({
        type: 'success',
        message: 'Community Paused',
        description: `Your ${
          action.response?.communityName || 'community'
        } membership has been paused.`,
      });
      break;
    case `${RESUME_COMMUNITY}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: state.data.map(item => {
          if (item.id === action.response?.id) {
            item.linkResponderCommunityStatus =
              LinkResponderCommunityStatus.Approved;
          }
          return {...item};
        }),
        userCommunities: state.userCommunities.map(item => {
          if (item.id === action.response?.id) {
            item.linkResponderCommunityStatus =
              LinkResponderCommunityStatus.Approved;
          }
          return {...item};
        }),
        error: '',
      };
      Toast.show({
        type: 'success',
        message: 'Community Resumed',
        description: `Your ${
          action.response?.communityName || 'community'
        } membership has been resumed.`,
      });
      break;
    case `${LEAVE_COMMUNITY}${SUCCESS}`:
      newState = {
        ...state,
        loading: false,
        data: state.data.map(item => {
          if (item.id === action.response?.id) {
            item.linkResponderCommunityStatus =
              LinkResponderCommunityStatus.Deleted;
          }
          return {...item};
        }),
        userCommunities: state.userCommunities.map(item => {
          if (item.id === action.response?.id) {
            item.linkResponderCommunityStatus =
              LinkResponderCommunityStatus.Deleted;
          }
          return {...item};
        }),
        error: '',
        action: `${LEAVE_COMMUNITY}${SUCCESS}`,
      };
      break;
    case `${GET_COMMUNITY}${CLEAR}`:
      newState = {...initState};
      break;
    case RESET_COMMUNITY:
      newState = {...initState, userCommunities: state.userCommunities};
      break;
  }
  return newState || state;
};

export default communityReducer;
