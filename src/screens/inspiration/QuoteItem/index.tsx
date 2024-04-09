import React, {useRef} from 'react';
import {Animated, Linking, Text, View} from 'react-native';

import styles, {quoteCardWidth} from './styles';
import {Button} from 'components';
import {IQuote} from 'utils/Types';
import {faLink} from '@fortawesome/pro-solid-svg-icons';
import {rs} from 'utils/ResponsiveScreen';

interface QuoteItemProps {
  item: IQuote;
  index: number;
  scrollX: Animated.Value;
}

const QuoteItem = ({item, index, scrollX}: QuoteItemProps) => {
  const {quoteText, author, authorIs, link} = item;
  const inputRange = [
    (index - 1) * quoteCardWidth,
    index * quoteCardWidth,
    (index + 1) * quoteCardWidth,
  ];
  const rotate = useRef(
    scrollX.interpolate({
      inputRange,
      outputRange: ['4deg', '0deg', '-4deg'],
      extrapolate: 'clamp',
    }),
  ).current;
  const translateY = useRef(
    scrollX.interpolate({
      inputRange,
      outputRange: [0, -rs(12), 0],
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.container, {transform: [{rotate}, {translateY}]}]}>
      <View style={styles.quoteWrapper}>
        <Text style={styles.quote}>{quoteText}</Text>
      </View>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.authorIs}>{authorIs}</Text>
      {link && (
        <Button
          title="More"
          icon={faLink}
          size="small"
          onPress={() => Linking.openURL(link)}
        />
      )}
    </Animated.View>
  );
};

export default QuoteItem;
