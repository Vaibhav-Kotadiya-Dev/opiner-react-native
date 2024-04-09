import React from 'react';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {faPlusCircle} from '@fortawesome/pro-solid-svg-icons';

import SectionTitle from 'components/section-title';
import {Container} from 'components/index';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import useCommunities from 'hooks/useCommunities';
import CTAButton from 'components/cta-button';
import OpinerContent from 'network/methods/OpinerContent';

const UserCommunitiesScreen = () => {
  const route = useRoute();
  const isSignUpFlow = route.name === 'COMMUNITIES';
  const navigation = useMainNavigation();
  const communities = useCommunities();

  return (
    <Container>
      <ScrollView>
        <CTAButton
          title="Join a community"
          iconProps={{icon: faPlusCircle}}
          onPress={() => navigation.navigate('COMMUNITIES_SCREEN')}
        />
        <SectionTitle title="Memberships" />
        {communities.map((community, index) => {
          const {communityName, companyName, id, cdnLogoUrl} = community;
          const logoUrl = OpinerContent.getCDNImageURL(cdnLogoUrl);
          return (
            <CTAButton
              key={id + index.toString()}
              title={communityName}
              subtitle={companyName}
              imageUrl={logoUrl}
              onPress={() =>
                navigation.navigate('COMMUNITY_DETAILS', {
                  community: community,
                  isSignUpFlow,
                })
              }
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default UserCommunitiesScreen;
