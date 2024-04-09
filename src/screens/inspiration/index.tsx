import React, {useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Font from 'assets/fonts';
import Color from 'assets/colors';
import {IQuote} from 'utils/Types';
import QuoteItem from './QuoteItem';
import {Container} from 'components';
import {rs, wp} from 'utils/ResponsiveScreen';
import {quoteCardWidth} from './QuoteItem/styles';
import {RegularText} from 'components/text/StyledText';
import useQuotes from 'screens/splash/quote-swiper/hooks/useQuotes';

const styles = StyleSheet.create({
  list: {height: '100%', paddingTop: rs(48)},
  content: {alignItems: 'center'},
  busyView: {flex: 1, justifyContent: 'center'},
  busyText: {
    textAlign: 'center',
    marginVertical: rs(24),
    fontFamily: Font.SemiBold,
  },
});

interface InspirationScreenProps {}

const InspirationScreen = ({}: InspirationScreenProps) => {
  const {quotes, isLoading} = useQuotes(10);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(quoteCardWidth)).current;

  const onScroll = useRef(
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {useNativeDriver: false},
    ),
  ).current;

  return (
    <Container hideBottomInset>
      {isLoading ? (
        <View style={styles.busyView}>
          <RegularText style={styles.busyText}>
            Fetching inspirations...
          </RegularText>
          <ActivityIndicator size="large" color={Color.White} />
        </View>
      ) : (
        <Carousel
          loop
          horizontal
          data={quotes}
          sliderWidth={wp(100)}
          itemWidth={quoteCardWidth}
          onScroll={onScroll}
          containerCustomStyle={styles.list}
          contentContainerCustomStyle={styles.content}
          inactiveSlideScale={1}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={({item, index}: {item: IQuote; index: number}) => (
            <QuoteItem item={item} index={index} scrollX={scrollX} />
          )}
          onSnapToItem={(slideIndex: number) => setActiveIndex(slideIndex)}
          getItemLayout={(_, index: number) => ({
            length: quoteCardWidth,
            offset: quoteCardWidth * index,
            index,
          })}
        />
      )}
      <Pagination
        activeDotIndex={activeIndex}
        dotColor={Color.White}
        inactiveDotScale={0.9}
        dotsLength={quotes.length}
        inactiveDotColor={Color.Secondary.TabInactive}
      />
    </Container>
  );
};

export default InspirationScreen;
