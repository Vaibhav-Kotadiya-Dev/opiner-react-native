import React, {useMemo, useRef} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleCheck} from '@fortawesome/pro-regular-svg-icons';
import {
  faCommentQuestion,
  faUpRightFromSquare,
} from '@fortawesome/pro-solid-svg-icons';

import Toast from 'utils/Toast';
import AppText from 'components/app-text';
import Checkbox from 'components/checkbox';
import CommunityImage from '../components/Image';
import tailwindColors from 'theme/tailwindColors';
import RedirectItem from 'components/redirect-item';
import useThemeContext from 'hooks/useThemeContext';
import ThemedButton from 'components/themed-button';
import CommunityDetailSection from '../components/DetailSection';
import CommunityActiveStatusCard from '../components/ActiveStatusCard';
import {AuthStackParamList} from 'navigators/StackParams';
import {rs} from 'utils/ResponsiveScreen';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import {getCommunityTermsUrl, getUserHasJoinedCommunity} from '../utils';
import {joinCommunity} from 'store/community/actions';
import {AppState} from 'store/rootReducer';
import {Container} from 'components/index';
import {resetTo} from 'NavigationService';
import ModalService, {
  ModalType,
  PromptModalProps,
} from 'components/modal/ModalService';

const styles = StyleSheet.create({
  full: {flex: 1},
  content: {paddingBottom: rs(48)},
  backButton: {position: 'absolute', padding: rs(20)},
  description: {flex: 1, marginRight: rs(16)},
  linkButton: {
    alignSelf: 'center',
    paddingHorizontal: rs(16),
    paddingTop: rs(12),
  },
  contactRow: {flexDirection: 'row', alignItems: 'center', marginTop: rs(24)},
  contactLabel: {
    fontSize: rs(12),
    lineHeight: rs(16),
    color: tailwindColors.slate[400],
  },
  linkContainer: {
    marginHorizontal: -rs(23),
    borderTopWidth: rs(1),
  },
  link: {textDecorationLine: 'underline'},
  actions: {paddingHorizontal: rs(30)},
});

const CommunityDetailsScreen = () => {
  const {
    params: {community: incomingCommunity, isSignUpFlow},
  } = useRoute<RouteProp<AuthStackParamList, 'COMMUNITY_DETAILS'>>();
  const navigation = useMainNavigation();
  const {theme} = useThemeContext();
  const agreeToTerms = useRef(false);
  const communityState = useSelector((state: AppState) => state.communityState);

  const isUserCommunity = getUserHasJoinedCommunity(incomingCommunity);

  const stateCommunity = useMemo(() => {
    if (isUserCommunity) {
      return communityState.userCommunities.find(
        item => item.id === incomingCommunity.id,
      );
    }
    return communityState.data.find(item => item.id === incomingCommunity.id);
  }, [
    isUserCommunity,
    communityState.data,
    communityState.userCommunities,
    incomingCommunity.id,
  ]);

  const joining = communityState.loading;

  const community = {...incomingCommunity, ...stateCommunity};
  const {
    communityName,
    details,
    whyJoin,
    howItWorks,
    responseVisibility,
    rewardOffered,
    rewards,
    link,
    signupCode,
    termsUrl,
  } = community;

  const dispatch = useDispatch();

  const handleJoin = async () => {
    if (!agreeToTerms.current) {
      Toast.show({type: 'warning', message: 'You must agree to the terms'});
      return;
    }
    dispatch(joinCommunity(signupCode));
    if (isSignUpFlow) {
      Toast.show({
        message: 'New question',
        type: 'info',
        iconProps: {icon: faCommentQuestion},
      });
      resetTo('Main');
    } else {
      const content: Partial<PromptModalProps> = {
        visible: true,
        title: 'Community joined',
        iconProps: {icon: faCircleCheck},
        type: 'success',
        primaryAction: {
          title: 'Home',
          onPress: () => {
            ModalService.dismiss(ModalType.PromptModal);
            resetTo('Main');
          },
        },
      };
      ModalService.setModalContent({type: ModalType.PromptModal, content});
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.content}>
        <CommunityImage community={community} />
        <CommunityDetailSection title="About" details={details} />
        <CommunityDetailSection title="Why join?" details={whyJoin} />
        <CommunityDetailSection title="How this works" details={howItWorks} />
        <CommunityDetailSection
          title="Response access and usage"
          details={responseVisibility}
        />
        {rewardOffered && (
          <CommunityDetailSection
            title="Rewards"
            details={rewards || 'Offered'}
          />
        )}

        {!getUserHasJoinedCommunity(community) ? (
          <View style={styles.actions}>
            <Checkbox
              title={
                <>
                  Agree to{' '}
                  <AppText
                    onPress={() =>
                      Linking.openURL(getCommunityTermsUrl(community)).catch()
                    }
                    style={[styles.link, {color: theme.colors.link}]}>
                    {communityName} T&C
                  </AppText>
                  {'  '}
                  <FontAwesomeIcon
                    icon={faUpRightFromSquare}
                    size={rs(16)}
                    color={theme.colors.link}
                  />
                </>
              }
              onToggle={value => (agreeToTerms.current = value)}
            />
            <ThemedButton isBusy={joining} title="Join" onPress={handleJoin} />
            <ThemedButton
              type="secondary"
              title="Cancel"
              onPress={() => navigation.goBack()}
            />
          </View>
        ) : (
          <CommunityActiveStatusCard community={community} />
        )}
        <RedirectItem
          title="Learn More"
          onPress={link ? () => Linking.openURL(link).catch() : undefined}
          withTopBorder
        />
      </ScrollView>
    </Container>
  );
};

export default CommunityDetailsScreen;
