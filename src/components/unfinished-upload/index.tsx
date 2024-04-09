import React from 'react';
import {View} from 'react-native';

import styles from './styles';
import AppText from 'components/app-text';
import useThemeContext from 'hooks/useThemeContext';
import ThemedButton from 'components/themed-button';
import useUnfinishedCheck from './useUnfinishedCheck';

import {useSelector} from 'react-redux';
import {faSave, faTrash, faUpload} from '@fortawesome/pro-solid-svg-icons';
import {onUpload, onSave, onDelete} from './utils';
import {AppState} from 'store/rootReducer';
import {hasUploadCompleted, isUploading} from 'screens/upload/utils/video';

const UnfinishedUpload = () => {
  const {question, path, dismiss} = useUnfinishedCheck();
  const {theme} = useThemeContext();

  const uploadState = useSelector(
    (state: AppState) => state.uploadResponseState,
  );

  if (
    // no data
    !question ||
    !path ||
    hasUploadCompleted(uploadState) ||
    isUploading(uploadState)
  ) {
    return null;
  }

  return (
    <View
      animation="wobble"
      style={[styles.box, {backgroundColor: theme.colors.cardBackground}]}
    >
      <AppText size="h2" style={styles.title}>
        Unfinished upload found
      </AppText>
      <AppText size="small" style={styles.description}>
        Looks like there is an unfinished upload of your response for{' '}
        <AppText style={styles.mediumText}>{question?.title}</AppText>. Would
        you like to try uploading again?
      </AppText>
      <View style={styles.buttons}>
        <View style={styles.upload}>
          <ThemedButton
            onPress={() => onUpload(question, path, dismiss)}
            size="small"
            title="Upload"
            iconLeft={faUpload}
          />
        </View>
        <View style={styles.save}>
          <ThemedButton
            onPress={() => onSave(question, path, dismiss)}
            type="secondary"
            size="small"
            title="Save"
            iconLeft={faSave}
          />
        </View>
        <ThemedButton
          onPress={() => onDelete(question, path, true, dismiss)}
          style={styles.delete}
          type="hollow"
          title=""
          noSpaceWithIcon
          iconLeft={faTrash}
        />
      </View>
    </View>
  );
};

export default UnfinishedUpload;
