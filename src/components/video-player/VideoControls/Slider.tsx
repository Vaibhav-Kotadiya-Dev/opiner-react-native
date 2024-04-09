import React from 'react';
import {Dimensions, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import Color from 'assets/colors';
import {rs, wp} from 'utils/ResponsiveScreen';
import {OnProgressData} from 'react-native-video';
import {baseColors} from 'theme/colors';

const screenWidth = Dimensions.get('screen').width;
export const videoSliderHeight = rs(48);

interface VideoSliderProps {
  progress: OnProgressData;
  onSeek: (to: number) => void;
}

const VideoSlider = ({progress, onSeek}: VideoSliderProps) => {
  return (
    <MultiSlider
      min={0}
      values={[progress.currentTime]}
      step={0.01}
      onValuesChangeFinish={values => onSeek(values[0])}
      max={progress.seekableDuration || 1}
      sliderLength={screenWidth - rs(64)}
      selectedStyle={{backgroundColor: baseColors.yellow}}
      trackStyle={{
        backgroundColor: Color.Primary.Grey,
        height: rs(6),
      }}
      containerStyle={{
        width: wp(68),
        height: videoSliderHeight,
        paddingHorizontal: rs(30),
      }}
      customMarker={() => <View />}
    />
  );
};

export default VideoSlider;
