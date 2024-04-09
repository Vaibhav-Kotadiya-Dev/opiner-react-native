import React, {useMemo} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {faEnvelope} from '@fortawesome/pro-solid-svg-icons';
import {faCircleCheck, faHandWave} from '@fortawesome/pro-regular-svg-icons';

import RedirectItem from 'components/redirect-item';
import openEmailClient from 'utils/openEmailClient';
import ThemedButton from 'components/themed-button';
import {
  leaveCommunity,
  LEAVE_COMMUNITY,
  pauseCommunity,
  resumeCommunity,
} from 'store/community/actions';
import {AppState} from 'store/rootReducer';
import {showConfirmationModal} from 'utils/index';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import {rs} from 'utils/ResponsiveScreen';
import {ICommunity} from 'network/data/Community';
import {OPINER_TERMS_URL} from 'appConstants';
import ModalService, {
  ConfirmationModalProps,
  ModalType,
} from 'components/modal/ModalService';
import AppText from 'components/app-text';
import {getCommunityTermsUrl} from 'screens/communities/utils';

const styles = StyleSheet.create({
  joined: {
    marginVertical: rs(16),
    marginHorizontal: rs(30),
  },
  buttons: {
    paddingHorizontal: rs(30),
  },
});

interface CommunityActiveStatusCardProps {
  community: ICommunity;
}

const CommunityActiveStatusCard = ({
  community: incomingCommunity,
}: CommunityActiveStatusCardProps) => {
  const dispatch = useDispatch();
  const {loading, action, data} = useSelector(
    (state: AppState) => state.communityState,
  );
  const stateCommunity = useMemo(
    () => data.find(item => item.id === incomingCommunity.id),
    [incomingCommunity.id, data],
  );
  const community = {...incomingCommunity, ...stateCommunity};
  const navigation = useMainNavigation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pause = () => {
    showConfirmationModal({
      title: `Pause ${community.communityName}`,
      description: `Your membership to ${community.communityName} will be put on hold. You will no longer receive new questions, but you will still be able to view any responses you have previously supplied.`,
      onConfirm: () => dispatch(pauseCommunity(community.id)),
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resume = () => {
    showConfirmationModal({
      title: `Resume ${community.communityName}`,
      description: `Please confirm you wish to resume your ${community.communityName} membership.`,
      onConfirm: () => dispatch(resumeCommunity(community.id)),
    });
  };
  const leave = () => {
    const content: Partial<ConfirmationModalProps> = {
      visible: true,
      iconProps: {icon: faHandWave},
      title: 'Leave community',
      description: `You are leaving ${
        community.communityName
      }.${'\n'}Your previous question and responses will no longer be accessible.`,
      primaryAction: {
        title: 'Confirm leave',
        type: 'danger',
        onPress: () => {
          dispatch(leaveCommunity(community.id));
          ModalService.setModalContent({
            type: ModalType.PromptModal,
            content: {
              visible: true,
              title: 'Community left',
              iconProps: {icon: faCircleCheck},
              type: 'info',
              primaryAction: {
                title: 'Your community memberships',
                onPress: () => {
                  ModalService.dismiss(ModalType.PromptModal);
                  navigation.goBack();
                },
              },
            },
          });
          ModalService.dismiss(ModalType.ConfirmationModal);
        },
      },
      secondaryAction: {
        title: 'Cancel',
        type: 'secondary',
        onPress: () => ModalService.dismiss(ModalType.ConfirmationModal),
      },
    };
    ModalService.setModalContent({
      type: ModalType.ConfirmationModal,
      content,
    });
  };

  return (
    <View>
      <View style={{paddingHorizontal: rs(30)}}>
        <ThemedButton
          iconLeft={faEnvelope}
          title="Community support"
          onPress={() =>
            openEmailClient({
              subject: `Support for ${community.communityName}`,
              body: '',
              to: community.contactEmail,
            })
          }
        />
        <ThemedButton
          isBusy={loading && action === LEAVE_COMMUNITY}
          title="Leave community"
          type="danger"
          onPress={leave}
        />
      </View>
      <RedirectItem
        title="Community T&C"
        withTopBorder
        onPress={() => {
          Linking.openURL(getCommunityTermsUrl(community)).catch();
        }}
      />
      <AppText size="small" style={styles.joined}>
        Joined {moment(community.created).format('DD MMM YYYY')}
      </AppText>
    </View>
  );
};

export default CommunityActiveStatusCard;
