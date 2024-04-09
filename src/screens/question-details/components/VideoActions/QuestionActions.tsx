import React from 'react';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/core';

import {hasPassedDeadline} from 'screens/timeline/utils';
import {Question, ResponseStatus} from 'network/data/Question';
import ModalService, {
  ModalType,
  ConfirmationModalProps,
} from 'components/modal/ModalService';
import {formatTime} from 'utils/Time';
import {
  optInConfirmationModal,
  optOutConfirmationModal,
} from 'components/modal/utils';
import {MainStackParam} from 'navigators/StackParams';
import {trackVideoStatus} from 'network/OpinerApi';
import ThemedButton from 'components/themed-button';
import {showOptPromptModal, showUsageRightsModal} from './helpers';
import {OptInOut} from 'hooks/useOptInOut';
import {rs} from 'utils/ResponsiveScreen';

interface QuestionActionsProps {
  question: Question;
  handleOpt: (action: OptInOut) => void;
}

const QuestionActions = ({question, handleOpt}: QuestionActionsProps) => {
  const navigation = useNavigation<NavigationProp<MainStackParam>>();

  const handlePayMeOrDonation = () => {
    navigation.navigate('REWARD_SELECTION_SCREEN', {
      question,
    });
  };

  const needsOptIn =
    question.currentResponse.responseStatus === ResponseStatus.AwaitingOptInOut;
  const needsResponse =
    question.currentResponse.responseStatus === ResponseStatus.OptedIn;

  if (hasPassedDeadline(question) || (!needsOptIn && !needsResponse)) {
    return null;
  }

  const handleOptOut = () => {
    trackVideoStatus({
      questionId: question.id,
      description: 'Opt out button pressed',
    });
    const content: Partial<ConfirmationModalProps> = {
      ...optOutConfirmationModal,
    };
    content.description = 'You are skipping this question.';
    content.primaryAction!.onPress = async () => {
      trackVideoStatus({
        questionId: question.id,
        description: 'Opt out confirmation button pressed',
      });
      handleOpt('opt_out');
      ModalService.dismiss(ModalType.ConfirmationModal);
      showOptPromptModal('optOut');
    };
    ModalService.setModalContent({
      type: ModalType.ConfirmationModal,
      content,
    });
  };

  const handleOptIn = () => {
    trackVideoStatus({
      questionId: question.id,
      description: 'Opt in button pressed',
    });
    const content: Partial<ConfirmationModalProps> = {
      ...optInConfirmationModal,
    };
    content.description = (
      <>
        You are opting in.{'\n'}
        Response deadline:{' '}
        {formatTime(question.currentResponse.responseDeadline)}.
      </>
    );
    content.primaryAction!.onPress = () => {
      ModalService.dismiss(ModalType.ConfirmationModal);
      trackVideoStatus({
        questionId: question.id,
        description: 'Opt in confirmation button pressed',
      });
      handleOpt('opt_in');
      showOptPromptModal('optIn');
    };
    ModalService.setModalContent({
      type: ModalType.ConfirmationModal,
      content,
    });
  };

  return (
    <View style={{paddingHorizontal: rs(30)}}>
      {needsOptIn && !hasPassedDeadline(question, true) && (
        <ThemedButton
          title="Opt in"
          onPress={() => {
            if (question.socialMediaConsentRequired) {
              showUsageRightsModal({
                onContinue: handleOptIn,
                onOptOut: handleOptOut,
              });
            } else {
              handleOptIn();
            }
          }}
        />
      )}
      {needsResponse && (
        <ThemedButton
          title="Respond"
          onPress={() => {
            trackVideoStatus({
              questionId: question.id,
              description: 'Record response button pressed',
            });
            // Doesn't have a reward option
            if (!question.donation && !question.price) {
              navigation.navigate('RECORD_VIDEO_SCREEN', {
                question,
              });
            } else {
              handlePayMeOrDonation();
            }
          }}
        />
      )}
      {!hasPassedDeadline(question, true) && (
        <ThemedButton onPress={handleOptOut} title="Opt out" type="secondary" />
      )}
    </View>
  );
};

export default QuestionActions;
