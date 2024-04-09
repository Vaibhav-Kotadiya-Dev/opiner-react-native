import React from 'react';
import {ScrollView, View} from 'react-native';

import styles from './styles';
import useQuotes from './hooks/useQuotes';
import AppText from 'components/app-text';
import ThemedButton from 'components/themed-button';

import {faArrowsRotate} from '@fortawesome/pro-duotone-svg-icons';

const QuoteSwiper = () => {
  const {quotes, currentIndex, refresh} = useQuotes();

  if (!quotes.length) {
    return null;
  }
  const {quoteText, author, authorIs} = quotes[currentIndex];
  return (
    <View animation="fadeInUp" key={`quote_${author}`} style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <AppText size="h4" style={styles.title}>
          Food for thought
        </AppText>
        <AppText size="default" style={styles.description}>
          “{quoteText}”
        </AppText>
        <AppText size="h3" style={styles.author}>
          {author}
        </AppText>
        <AppText size="h4" style={styles.authorInfo}>
          {authorIs}
        </AppText>
        <ThemedButton
          iconLeft={faArrowsRotate}
          type="hollow"
          title="Quote"
          onPress={refresh}
          noSpaceWithIcon
        />
      </ScrollView>
    </View>
  );
};

export default QuoteSwiper;
