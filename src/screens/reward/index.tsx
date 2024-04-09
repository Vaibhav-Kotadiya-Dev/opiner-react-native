import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {faCoin} from '@fortawesome/pro-solid-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import {Container} from 'components/index';
import ThemedButton from 'components/themed-button';
import {MainStackParam} from 'navigators/StackParams';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import {showPayMeConfirmation} from 'screens/question-details/components/VideoActions/helpers';
import CTAButton from 'components/cta-button';
import useThemeContext from 'hooks/useThemeContext';
import Toast from 'utils/Toast';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  buttonContainer: {
    marginHorizontal: rs(30),
  },
  firstCTAButton: {
    borderTopWidth: 1,
  },
});

const RewardSelectionScreen = () => {
  const route =
    useRoute<RouteProp<MainStackParam, 'REWARD_SELECTION_SCREEN'>>();
  const navigation = useMainNavigation();
  const {question} = route.params;
  const {theme} = useThemeContext();

  return (
    <Container>
      <View style={styles.content}>
        {Boolean(question.price) && (
          <CTAButton
            title={`Pay me (£${question.price})`}
            onPress={() => {
              showPayMeConfirmation({
                question,
                onPick: () => {
                  Toast.show({
                    message: 'Payment selected',
                    iconProps: {
                      icon: faCoin,
                    },
                  });
                  navigation.navigate('RECORD_VIDEO_SCREEN', {
                    question,
                    donationId: 1,
                  });
                },
                // @ts-expect-error TODO: retrieve pay me item details
                payMeItem: {id: 1},
                withDonationOption: false,
              });
            }}
            style={[
              styles.firstCTAButton,
              {borderTopColor: theme.colors.border},
            ]}
          />
        )}
        {Boolean(question.donation) && (
          <CTAButton
            title={`Make a donation (£${question.donation})`}
            onPress={() =>
              navigation.navigate('DONATION_SELECTION_SCREEN', {
                question,
              })
            }
          />
        )}
        <ThemedButton
          title="Cancel"
          type="secondary"
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.goBack()}
        />
      </View>
    </Container>
  );
};

export default RewardSelectionScreen;
