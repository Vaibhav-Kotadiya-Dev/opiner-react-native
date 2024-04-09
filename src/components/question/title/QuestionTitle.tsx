import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {TitleText} from 'components/text/StyledText';
import {rs} from 'utils/ResponsiveScreen';
import {Question} from 'network/data/Question';
import {getHasResponses} from 'screens/timeline/utils';
import {CURRENT_RESPONSE_IMAGE_SIZE} from 'screens/timeline/components/RespondersList/styles';

interface QuestionTitleProps {
  question: Question;
  bottomSpace?: number;
}

const QuestionTitle = ({question, bottomSpace}: QuestionTitleProps) => {
  const bottom = getHasResponses(question)
    ? CURRENT_RESPONSE_IMAGE_SIZE + rs(20)
    : rs(20);

  return (
    <View style={[styles.container, {bottom: bottomSpace || bottom}]}>
      {question.companyLogoUrl && (
        <FastImage
          source={{uri: question.companyLogoUrl}}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <TitleText style={styles.title}>{question.title}</TitleText>
    </View>
  );
};

export default QuestionTitle;
