import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {
  getResponseUserThumb,
  Question,
  QuestionResponse,
} from 'network/data/Question';
import TimelineResponderItem from './Item';
import AppText from 'components/app-text';
import OpinerContent from 'network/methods/OpinerContent';
import {UNDEF_ID} from 'appConstants';

const styles = StyleSheet.create({
  list: {},
  content: {
    alignItems: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  additional: {
    marginLeft: 8,
  },
});

interface ResponderListProps {
  question: Question;
  responses: Array<QuestionResponse>;
  onPress: (index: number) => void;
}

const TimelineRespondersList = ({responses, question}: ResponderListProps) => {
  const totalResponses = responses.length;
  return (
    <FlatList
      data={responses.splice(0, 3)}
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item.id + index.toString()}
      // @ts-ignore
      CellRendererComponent={({children, index, style, ...props}) => {
        const cellStyle = [style, {zIndex: index}];
        return (
          // @ts-ignore
          <View style={cellStyle} index={index} {...props}>
            {children}
          </View>
        );
      }}
      renderItem={({item, index}) => {
        const src = OpinerContent.getCDNImageURL(item.cdnThumbUrlTiny);
        if (index === 2 && totalResponses > 3) {
          return (
            <View style={styles.row}>
              <TimelineResponderItem imageSource={{uri: src}} index={index} />
              <AppText size="small" style={styles.additional}>
                +{totalResponses - 3}
              </AppText>
            </View>
          );
        }
        return <TimelineResponderItem imageSource={{uri: src}} index={index} />;
      }}
    />
  );
};

export default TimelineRespondersList;
