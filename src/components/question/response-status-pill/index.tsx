import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import {Question} from 'network/data/Question';
import {getQuestionStatusPillContent} from './utils';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: rs(12),
    paddingVertical: rs(4),
    alignSelf: 'flex-start',
  },
  title: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

interface ResponseStatusPillProps {
  question: Question;
  style?: StyleProp<ViewStyle>;
}

const ResponseStatusPill = ({question, style}: ResponseStatusPillProps) => {
  const content = getQuestionStatusPillContent(question);

  if (!content) {
    return null;
  }

  const {text, textColor, backgroundColor} = content;

  return (
    <View style={[styles.container, {backgroundColor}, style]}>
      <AppText size="extraSmall" style={[styles.title, {color: textColor}]}>
        {text}
      </AppText>
    </View>
  );
};

export default ResponseStatusPill;
