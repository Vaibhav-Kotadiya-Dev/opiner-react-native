import React, {ReactElement} from 'react';
import {View} from 'react-native';

import styles from './styles';
import Lottie from 'lottie-react-native';
import AppText from 'components/app-text';
import ThemedButton from 'components/themed-button';
import tailwindColors from 'theme/tailwindColors';

import {removeItem} from 'utils/VideoStateStore';
import {Container} from 'components';
import {handleTimeLine} from 'screens/record/preview/utils';
import {faCheckCircle} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const UploadSuccess = ({
  questionId,
}: {
  questionId: number;
}): ReactElement | null => {
  return (
    <Container>
      <Lottie
        style={styles.successLottie}
        autoPlay
        loop={false}
        source={require('assets/animations/confetti.json')}
      />
      <View style={styles.paddedContainer}>
        <View style={styles.container}>
          <View>
            <FontAwesomeIcon
              icon={faCheckCircle}
              size={32}
              style={styles.successIcon}
              color={tailwindColors.green[500]}
            />
            <AppText size="h1" style={styles.title}>
              Success
            </AppText>
            <AppText size="h4" style={styles.message}>
              Your response has been successfully uploaded.{'\n\n'}Thank you!
            </AppText>
          </View>
          <View animation="fadeInUp" duration={300} delay={1000}>
            <ThemedButton
              type="primary"
              title="Continue"
              onPress={() => {
                handleTimeLine(questionId);
                removeItem(questionId);
              }}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default UploadSuccess;
