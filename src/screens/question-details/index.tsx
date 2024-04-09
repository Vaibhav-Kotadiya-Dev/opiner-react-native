import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useFocusEffect} from '@react-navigation/core';

import {AppState} from 'store/rootReducer';
import useOptInOut from 'hooks/useOptInOut';
import VideoPlayer from 'components/video-player';
import QuestionDetailsSection from './components/VideoActions';
import {MainStackParam} from 'navigators/StackParams';
import {GET_USER_PROFILE} from 'store/profile/actions';
import {setShouldRefresh} from 'screens/timeline/hooks/useTimeline';
import {
  getAnimationUrl,
  getCaptionUrl,
  getThumbnailUrl,
  getVideoUrl,
} from 'network/data/Question';
import useAutoVideoPause from 'hooks/useAutoVideoPause';
import {Container} from 'components/index';
import OpinerContent from 'network/methods/OpinerContent';

interface QuestionDetailsProps {
  route: RouteProp<MainStackParam, 'QUESTION_DETAILS_SCREEN'>;
}

const QuestionDetails = ({route}: QuestionDetailsProps) => {
  const dispatch = useDispatch();
  const {question: currentQuestion} = route.params;
  const [question, setQuestion] = useState(currentQuestion);
  const allQuestions = useSelector((state: AppState) => state.allQuestions);
  const {handleOpt} = useOptInOut(question);
  const playerRef = useAutoVideoPause();

  useFocusEffect(() => {
    setShouldRefresh(false);
    return () => {
      setShouldRefresh(true);
    };
  });

  useEffect(() => {
    dispatch({type: GET_USER_PROFILE});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const questionData = allQuestions.data.find(
      q => q.id === currentQuestion.id,
    );
    if (questionData) {
      setQuestion(questionData);
    }
  }, [allQuestions.data, currentQuestion.id]);

  return (
    <Container withSafeArea={false}>
      <ScrollView>
        <VideoPlayer
          ref={playerRef}
          videoURL={getVideoUrl(question)}
          paused
          captionsUrl={getCaptionUrl(question.cdnVttUrl)}
          question={question}
          fallbackImageURL={
            getAnimationUrl(question) ||
            OpinerContent.getCDNImageURL(question.cdnThumbUrlLarge)
          }
        />
        <QuestionDetailsSection
          question={question}
          handleOpt={handleOpt}
          showResponses
        />
      </ScrollView>
    </Container>
  );
};

export default QuestionDetails;
