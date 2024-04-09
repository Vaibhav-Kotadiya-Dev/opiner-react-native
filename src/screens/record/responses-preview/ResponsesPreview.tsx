import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import _ from 'lodash';

import {
  getCaptionUrl,
  getResponseImage,
  getResponseUserThumb,
  getResponseVideo,
  Question,
  QuestionResponse,
} from 'network/data/Question';
import {Container} from 'components';
import VideoPlayer from 'components/video-player';
import useThemeContext from 'hooks/useThemeContext';
import ResponseNavigator from '../preview/ResponseNavigator';
import ResponseActions from '../preview/ResponseActions';
import {getUnifiedResponses} from 'screens/timeline/utils';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import useQuestions from 'hooks/useQuestions';
import OpinerContent from 'network/methods/OpinerContent';

const QuestionResponsesPreview = ({
  question: questionProp,
  response: initialResponse,
}: {
  question: Question;
  response: QuestionResponse;
}) => {
  const {theme} = useThemeContext();
  const navigation = useMainNavigation();
  const {entities} = useQuestions();
  const question = entities[questionProp.id];
  const allResponses = getUnifiedResponses(question);
  const [responseIndex, setResponseIndex] = useState(
    _.findIndex(allResponses, item => item.id === initialResponse.id),
  );

  const response = allResponses[responseIndex];

  if (!response) {
    return null;
  }

  const responseImage = OpinerContent.getCDNImageURL(response.cdnThumbUrlLarge);

  useEffect(() => {
    navigation.setOptions({
      title: response?.userFirstName,
    });
  }, [response?.userFirstName]);

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: theme.colors.background}}>
        <VideoPlayer
          key="preview"
          responseDetails={response}
          fallbackImageURL={responseImage}
          controls
          resizeMode="cover"
          playInBackground
          playWhenInactive
          ignoreSilentSwitch="ignore"
          paused
          captionsUrl={getCaptionUrl(response.cdnVttUrl)}
          videoURL={getResponseVideo(response)}>
          <>
            <ResponseActions question={question} response={response} />
            <ResponseNavigator
              previous={allResponses[responseIndex - 1]}
              next={allResponses[responseIndex + 1]}
              onSelect={(isPrev: boolean) => {
                setResponseIndex(
                  isPrev ? responseIndex - 1 : responseIndex + 1,
                );
              }}
            />
          </>
        </VideoPlayer>
      </ScrollView>
    </Container>
  );
};

export default QuestionResponsesPreview;
