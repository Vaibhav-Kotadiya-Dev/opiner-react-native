import React from 'react';
import {
  FlatList,
  FlatListProps,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/core';

import {getQuestionDeadline, getUnifiedResponses} from 'screens/timeline/utils';
import ResponderItem, {ResponderItemProps} from './Item';
import {rs} from 'utils/ResponsiveScreen';
import {AppState} from 'store/rootReducer';
import {
  getResponseVideo,
  Question,
  QuestionResponse,
} from 'network/data/Question';
import {MainStackParam} from 'navigators/StackParams';
import SectionTitle from 'components/section-title';
import useThemeContext from 'hooks/useThemeContext';
import OpinerContent from 'network/methods/OpinerContent';

const styles = StyleSheet.create({
  container: {flex: 1},
  full: {flex: 1},
  row: {flexDirection: 'row'},
});

const getResponseSections = (question: Question) => {
  const responses = getUnifiedResponses(question);

  if (!question.currentResponse) {
    // The logged in user does not have a response
    return {
      header: [],
      list: responses,
    };
  }

  return {
    header: responses.slice(0, 3),
    list: responses.slice(3),
  };
};

interface ResponderListProps {
  question: Question;
  flatlistProps?: Partial<FlatListProps<QuestionResponse>>;
  hideTitle?: boolean;
}

const RespondersList = ({
  question,
  flatlistProps,
  hideTitle,
}: ResponderListProps) => {
  const {theme} = useThemeContext();
  const navigation = useNavigation<NavigationProp<MainStackParam>>();
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const shouldShowStatus = !getQuestionDeadline(question).deadline;

  const sections = getResponseSections(question);

  if (!sections.header.length && !sections.list.length) {
    return null;
  }

  const getResponderItemProps = (
    item: QuestionResponse,
    index: number,
  ): ResponderItemProps => {
    const {userId, userFirstName} = item;
    const isCurrentUser = String(user?.id) === String(userId);
    const responseImage = OpinerContent.getCDNImageURL(
      index === 0 ? item.cdnThumbUrlMedium : item.cdnThumbUrlSmall,
    );
    return {
      imageSource: {uri: responseImage},
      name: isCurrentUser ? 'You' : userFirstName,
      onPress: () => {
        navigation.navigate('RESPONSE_PREVIEW_SCREEN', {
          question: question,
          videoUri: getResponseVideo(item),
          response: item,
        });
      },
    };
  };

  return (
    <ScrollView
      horizontal
      scrollEnabled={false}
      contentContainerStyle={[
        styles.container,
        {
          borderBottomColor: theme.colors.border,
        },
      ]}>
      <View style={styles.full}>
        {!hideTitle && <SectionTitle title="Responses" />}
        <FlatList
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          data={sections.list}
          scrollEnabled={false}
          contentContainerStyle={{paddingLeft: rs(30)}}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={
            sections.header.length ? (
              <View style={styles.row}>
                <ResponderItem
                  {...getResponderItemProps(sections.header[0], 0)}
                  size="large"
                />
                {sections.header.length > 1 && (
                  <View>
                    <ResponderItem
                      {...getResponderItemProps(sections.header[1], 1)}
                    />
                    {Boolean(sections.header[2]) && (
                      <ResponderItem
                        {...getResponderItemProps(sections.header[2], 2)}
                      />
                    )}
                  </View>
                )}
              </View>
            ) : undefined
          }
          renderItem={({item, index}) => {
            return <ResponderItem {...getResponderItemProps(item, index)} />;
          }}
          {...flatlistProps}
        />
      </View>
    </ScrollView>
  );
};

export default RespondersList;
