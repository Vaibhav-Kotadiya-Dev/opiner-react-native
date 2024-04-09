import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {faHeart} from '@fortawesome/pro-regular-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import {Container} from 'components/index';
import ThemedButton from 'components/themed-button';
import {MainStackParam} from 'navigators/StackParams';
import DonationCard from './components/card/DonationCard';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import useDonation, {DonationItem} from './hooks/useDonation';
import Toast from 'utils/Toast';
import ModalService, {
  ConfirmationModalProps,
  ModalType,
} from 'components/modal/ModalService';
import {faHeart as faHeartSolid} from '@fortawesome/pro-solid-svg-icons';

const DonationSelectScreen = () => {
  const route =
    useRoute<RouteProp<MainStackParam, 'REWARD_SELECTION_SCREEN'>>();
  const {question} = route.params;
  const {donationList, isFetching, fetchDonationList} = useDonation(
    question?.currentResponse?.id,
  );
  const navigation = useMainNavigation();
  const donations = donationList.filter(donation => donation.id !== 1);
  const [selectedDonation, setSelectedDonation] = useState<DonationItem>();

  useEffect(() => {
    if (!donationList.length) {
      fetchDonationList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationList.length]);

  useEffect(() => {
    const hasSingleOption = donations.length === 1;
    if (hasSingleOption) {
      setSelectedDonation(donations[0]);
    }
  }, [donations]);

  const confirmDonation = () => {
    if (!selectedDonation) {
      Toast.show({
        message: 'No cause selected!',
        description: 'Please select a cause.',
        type: 'warning',
      });
      return;
    }
    const content: Partial<ConfirmationModalProps> = {
      visible: true,
      title: 'Donation',
      iconProps: {
        icon: faHeart,
      },
      description: `£${question.donation} will be donated to ${selectedDonation.charityName}, on your behalf, for your response.`,
      primaryAction: {
        title: 'Continue',
        onPress: () => {
          ModalService.dismiss(ModalType.ConfirmationModal);
          Toast.show({
            message: 'Donation selected',
            iconProps: {
              icon: faHeartSolid,
            },
          });
          navigation.navigate('RECORD_VIDEO_SCREEN', {
            question,
            donationId: selectedDonation.id,
          });
        },
      },
      secondaryAction: {
        title: 'Cancel',
        type: 'secondary',
        onPress: () => {
          ModalService.dismiss(ModalType.ConfirmationModal);
        },
      },
    };
    ModalService.setModalContent({
      content,
      type: ModalType.ConfirmationModal,
    });
  };

  return (
    <Container>
      <FlatList
        data={donations}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          isFetching ? (
            <ActivityIndicator style={{marginBottom: rs(16)}} />
          ) : null
        }
        ListFooterComponent={
          <View style={{paddingHorizontal: rs(30)}}>
            <ThemedButton
              title="Continue"
              onPress={() => {
                confirmDonation();
              }}
            />
            <ThemedButton
              title="Cancel"
              type="secondary"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        }
        renderItem={({item}: {item: DonationItem}) => (
          <DonationCard
            key={`charity_${item.id}`}
            charity={item}
            onPick={() => {
              setSelectedDonation(item);
            }}
            isSelected={selectedDonation?.id === item.id}
          />
        )}
      />
    </Container>
  );
};

export default DonationSelectScreen;
