import React from 'react';
import {View} from 'react-native';
import {faCoin, faEye, faHeart} from '@fortawesome/pro-solid-svg-icons';

import RespondersList from '../RespondersList';
import {Question} from 'network/data/Question';
import {rs} from 'utils/ResponsiveScreen';
import QuestionLinks from './QuestionLinks';
import QuestionActions from './QuestionActions';
import Expander from 'components/expander';
import QuestionDeadlineAndTimer from './QuestionDeadlineAndTimer';
import IconTitle from 'components/icon-title';
import QuestionEventLog from '../QuestionEventLog';
import {OptInOut} from 'hooks/useOptInOut';
import useCommunities from 'hooks/useCommunities';
import CTAButton from 'components/cta-button';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import OpinerContent from 'network/methods/OpinerContent';

const QuestionCommunityCard = ({communityId}: {communityId: number}) => {
  const navigation = useMainNavigation();
  const userCommunities = useCommunities();
  const questionCommunity = userCommunities.find(c => c.id === communityId);
  if (!questionCommunity) {
    return null;
  }
  const {companyName, communityName, cdnLogoUrl} = questionCommunity;
  return (
    <CTAButton
      title={communityName}
      subtitle={companyName}
      imageUrl={OpinerContent.getCDNImageURL(cdnLogoUrl)}
      onPress={() =>
        navigation.navigate('COMMUNITY_DETAILS', {
          community: questionCommunity,
          isSignUpFlow: false,
        })
      }
    />
  );
};

interface QuestionDetailsSectionProps {
  question: Question;
  handleOpt: (action: OptInOut) => void;
  showResponses?: boolean;
}

const QuestionDetailsSection = ({
  question,
  handleOpt,
  showResponses,
}: QuestionDetailsSectionProps) => {
  return (
    <View style={{marginBottom: rs(24)}}>
      <QuestionDeadlineAndTimer question={question} />
      <QuestionLinks links={question.questionLinks} />
      <QuestionActions question={question} handleOpt={handleOpt} />
      {showResponses && question.responses && (
        <RespondersList question={question} />
      )}
      <Expander title="Incentives">
        <IconTitle
          iconProps={{icon: faEye}}
          title={'Peer response access'}
          style={{marginBottom: rs(16)}}
        />

        {!!question.price && (
          <IconTitle
            iconProps={{icon: faCoin}}
            title={`£${question.price} payment`}
            style={{marginBottom: rs(16)}}
          />
        )}
        {!!question.donation && (
          <IconTitle
            iconProps={{icon: faHeart}}
            title={`£${question.donation} donation`}
          />
        )}
      </Expander>
      <QuestionEventLog question={question} />
      {question.communityId && (
        <QuestionCommunityCard communityId={question.communityId} />
      )}
    </View>
  );
};

export default QuestionDetailsSection;
