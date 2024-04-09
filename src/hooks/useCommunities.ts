import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AppState} from 'store/rootReducer';
import {getUserCommunities} from 'store/community/actions';
import {LinkResponderCommunityStatus} from 'screens/communities/utils';

const useCommunities = () => {
  const {userCommunities: userAllCommunities} = useSelector(
    (state: AppState) => state.communityState,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCommunities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userCommunities = Array.isArray(userAllCommunities)
    ? userAllCommunities.filter(
        item =>
          item.linkResponderCommunityStatus !==
          LinkResponderCommunityStatus.Deleted,
      )
    : [];

  return userCommunities;
};

export default useCommunities;
