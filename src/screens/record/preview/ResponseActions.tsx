import React, {useState} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  faShare,
  faHeart as faHeartFilled,
  faHeartCirclePlus,
  faHeartCircleMinus,
} from '@fortawesome/pro-solid-svg-icons';
import {faHeart} from '@fortawesome/pro-regular-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import {statusColors} from 'theme/colors';
import ThemedButton from 'components/themed-button';
import {updateQuestion} from 'store/all_questions/actions';
import {Question, QuestionResponse, getShareUrl} from 'network/data/Question';
import {likeResponse, unlikeResponse} from 'network/methods/likeResponse';
import useVideoProgress from 'components/video-player/hooks/useVideoProgress';
import Toast from 'utils/Toast';
import {Constant} from 'screens/upload/utils';

const styles = StyleSheet.create({
  container: {padding: rs(30)},
  buttons: {flexDirection: 'row', alignItems: 'center'},
  full: {flex: 1},
  likeButton: {marginRight: rs(24)},
});

interface ResponseUserDetailsProps {
  response: QuestionResponse;
  question: Question;
}

const ResponseActions = ({response, question}: ResponseUserDetailsProps) => {
  const [isBusy, setBusy] = useState(false);
  const {progress} = useVideoProgress();
  const dispatch = useDispatch();

  if (!response) {
    return null;
  }

  const handleLike = async () => {
    const isLikeAction = !response.isLiked;
    try {
      setBusy(true);
      if (isLikeAction) {
        await likeResponse({
          id: response.id,
          timestamp:
            parseInt(progress.currentTime.toFixed(0), 10) !== 0
              ? progress.currentTime.toFixed(2)
              : undefined,
        });
        Toast.show({
          message: 'Liked',
          iconProps: {
            icon: faHeartCirclePlus,
          },
        });
      } else {
        await unlikeResponse({id: response.id});
        Toast.show({
          message: 'Like Removed',
          iconProps: {
            icon: faHeartCircleMinus,
          },
        });
      }
      dispatch(
        updateQuestion({
          ...question,
          responses: question.responses.map(r => {
            if (r.id === response.id) {
              r.isLiked = isLikeAction;
            }
            return r;
          }),
        }),
      );
    } catch (error) {
      console.log({error});
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <ThemedButton
          containerStyle={[styles.full, styles.likeButton]}
          title={response.isLiked ? 'Liked' : 'Like'}
          iconLeft={response.isLiked ? faHeartFilled : faHeart}
          type="tertiary"
          leftIconColor={response.isLiked ? statusColors.danger : undefined}
          onPress={handleLike}
          isBusy={isBusy}
        />
        <ThemedButton
          containerStyle={styles.full}
          title="Share"
          iconLeft={faShare}
          type="tertiary"
          onPress={() => {
            if (!question.uniqueUrl) {
              return;
            }
            const shareUrl = getShareUrl(
              response.videoAddress,
              progress.currentTime,
              question.uniqueUrl,
            );
            Share.share({
              message:
                'Check out this response on Opiner: ' + Constant.isIOS
                  ? ''
                  : shareUrl,
              url: shareUrl,
            });
          }}
        />
      </View>
    </View>
  );
};

export default ResponseActions;
