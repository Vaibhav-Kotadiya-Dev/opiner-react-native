import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {reportToRaygun} from 'utils/Raygun';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    height: '80%',
    alignSelf: 'center',
  },
});

interface CharityLogoProps {
  imageUrl: string;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const CharityLogo = ({imageUrl, style, containerStyle}: CharityLogoProps) => {
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const unmounted = useRef(false);

  useEffect(() => {
    try {
      Image.getSize(
        imageUrl,
        (width, height) => {
          const calculated = width / height;
          if (!isNaN(calculated) && !unmounted.current) {
            setAspectRatio(calculated);
          }
        },
        () => false,
      );
      return () => {
        unmounted.current = true;
      };
    } catch (error) {
      reportToRaygun(error, 'Failed while getting image size of charity image');
    }
  }, [imageUrl]);

  return (
    <View style={[styles.container, containerStyle]}>
      <FastImage
        style={[styles.logo, style, {aspectRatio}]}
        resizeMode="contain"
        source={{uri: imageUrl}}
      />
    </View>
  );
};

export default CharityLogo;
