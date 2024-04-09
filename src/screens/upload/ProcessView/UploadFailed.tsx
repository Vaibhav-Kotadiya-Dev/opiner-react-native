import React, {ReactElement} from 'react';
import {View, SafeAreaView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFaceFrownSlight} from '@fortawesome/pro-solid-svg-icons';

import styles, {statusTextColor} from './styles';
import tailwindColors from 'theme/tailwindColors';
import AppText from 'components/app-text';
import NoteView from 'components/notes';
import ThemedButton from 'components/themed-button';
import openEmailClient from 'utils/openEmailClient';
import {resetTo} from 'NavigationService';



const UploadFailed = ({}: {
  compressedURL?: string;
  questionId: number;
}): ReactElement | null => {
  return (
    <SafeAreaView style={[styles.container, styles.errorContainer]}>
      <View style={styles.paddedContainer}>
        <View style={styles.container}>
          <View>
            <FontAwesomeIcon
              size={24}
              color={tailwindColors.red[500]}
              style={styles.successIcon}
              icon={faFaceFrownSlight}
            />
            <AppText
              size="h1"
              style={[styles.title, {color: tailwindColors.red[500]}]}>
              Something has gone wrong
            </AppText>
            <AppText style={styles.description}>
              Sorry, we have encountered a problem and your response was not
              uploaded to the server.
            </AppText>
            <NoteView notes={notes} color={statusTextColor} />
          </View>
          {/* <ThemedButton
            title={'Save to device'}
            onPress={() => {
              trackVideoStatus({
                questionId,
                description: 'Save response to device pressed: Upload Failed',
              });
              if (compressedURL) {
                saveVideo(compressedURL, 'phone', questionId, true);
              }
            }}
          />

          <ThemedButton
            type="hollow"
            size="small"
            textStyle={{color: statusTextColor}}
            title="Email Support"
            onPress={() =>
              openEmailClient({subject: 'Video upload failed', body: ''})
            }
          />
          <ThemedButton
            type="hollow"
            size="small"
            textStyle={{color: statusTextColor}}
            title="Return Home"
            onPress={() => resetTo('MAIN_SCREEN')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadFailed;
