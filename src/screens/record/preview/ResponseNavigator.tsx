import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  QuestionResponse,
  getResponseImage,
  getResponseUserThumb,
} from 'network/data/Question';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight, faArrowLeft} from '@fortawesome/pro-solid-svg-icons';

import {baseColors} from 'theme/colors';
import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import OpinerContent from 'network/methods/OpinerContent';

const styles = StyleSheet.create({
  container: {paddingHorizontal: rs(30)},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {justifyContent: 'space-between'},
  image: {
    height: rs(46),
    width: rs(46),
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: rs(8),
  },
  blueText: {
    color: baseColors.blue,
  },
  rightButton: {alignItems: 'flex-end'},
  rightText: {textAlign: 'right'},
});

const ResponseButton = ({
  response,
  onPress,
  isNext,
}: {
  response?: QuestionResponse;
  onPress?: () => void;
  isNext?: boolean;
}) => {
  if (!response) {
    if (isNext) {
      return null;
    }
    return <View />;
  }
  const {userFirstName} = response;
  const uri = OpinerContent.getCDNImageURL(response.cdnThumbUrlSmall);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={isNext && styles.rightButton}>
      <View style={styles.row}>
        {!isNext && (
          <FontAwesomeIcon
            size={rs(18)}
            icon={faArrowLeft}
            color={baseColors.blue}
            style={{marginRight: rs(6)}}
          />
        )}
        <AppText size="h2" style={styles.blueText}>
          {isNext ? 'Next' : 'Previous'}
        </AppText>
        {isNext && (
          <FontAwesomeIcon
            size={rs(18)}
            icon={faArrowRight}
            color={baseColors.blue}
            style={{marginLeft: rs(6)}}
          />
        )}
      </View>
      <FastImage source={{uri}} style={styles.image} />
      <AppText size="h3" style={[styles.blueText, isNext && styles.rightText]}>
        {userFirstName}
      </AppText>
    </TouchableOpacity>
  );
};

interface ResponseNavigatorProps {
  previous?: QuestionResponse;
  next?: QuestionResponse;
  onSelect: (isPrev: boolean) => void;
}

const ResponseNavigator = ({
  previous,
  next,
  onSelect,
}: ResponseNavigatorProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.space]}>
        <ResponseButton response={previous} onPress={() => onSelect(true)} />
        <ResponseButton
          response={next}
          isNext
          onPress={() => onSelect(false)}
        />
      </View>
    </View>
  );
};

export default ResponseNavigator;
