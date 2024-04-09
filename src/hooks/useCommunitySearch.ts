import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Keyboard, LayoutAnimation} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {faCircleArrowRight} from '@fortawesome/pro-regular-svg-icons';

import Toast from 'utils/Toast';
import {AppState} from 'store/rootReducer';
import {ICommunity} from 'network/data/Community';
import {getCommunity, resetCommunitySearch} from 'store/community/actions';
import ModalService, {ModalType} from 'components/modal/ModalService';
import {useMainNavigation} from './useNavigationHooks';

interface ICommunitySearchState {
  loading: boolean;
  communities: ICommunity[];
  code: MutableRefObject<string | undefined>;
  performSearch: (query?: string) => void;
  resetSearch: () => void;
  error: string;
  setError: (error: string) => void;
}

const useCommunitySearch = (): ICommunitySearchState => {
  const community = useSelector((state: AppState) => state.communityState);
  const dispatch = useDispatch();
  const code = useRef<string>();
  const wasSearching = useRef<boolean>(false);
  const navigation = useMainNavigation();
  const [error, setError] = useState('');

  useEffect(() => {
    if (wasSearching.current && !community.loading) {
      wasSearching.current = false;
      const communityInfo = community.data[0];
      if (communityInfo) {
        ModalService.setModalContent({
          type: ModalType.PromptModal,
          content: {
            visible: true,
            title: 'Community found',
            description: communityInfo.communityName,
            iconProps: {icon: faCircleArrowRight},
            primaryAction: {
              title: 'Continue',
              onPress: () => {
                navigation.navigate('COMMUNITY_DETAILS', {
                  community: community.data[0],
                  isSignUpFlow: false,
                });
                ModalService.dismiss(ModalType.PromptModal);
              },
            },
          },
        });
        return;
      }
      setError('No community found for this ID.');
      Toast.show({
        type: 'danger',
        message: 'No matching community',
        hideIcon: true,
      });
    }
  }, [community.data, community.loading, navigation]);

  const performSearch = async (invitationCode?: string) => {
    setError('');
    Keyboard.dismiss();
    wasSearching.current = true;
    if (!invitationCode?.trim()) {
      Toast.show({
        type: 'warning',
        message: 'Please enter an invitation code',
      });
      return;
    }
    dispatch(getCommunity(invitationCode));
  };

  const resetSearch = () => {
    code.current = '';
    setError('');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(resetCommunitySearch());
  };

  return {
    code,
    communities: community.data ?? [],
    loading: community.loading && wasSearching.current,
    performSearch,
    resetSearch,
    error,
    setError,
  };
};

export default useCommunitySearch;
