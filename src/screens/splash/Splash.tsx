import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';

import {Container} from 'components/index';
import AppFooter from 'components/footer/AppFooter';

const {width} = Dimensions.get('screen');

const splashStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: width * 0.7,
    aspectRatio: 4.16,
    maxWidth: 270,
    alignSelf: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: 48,
  },
});

interface SplashProps {
  onLoadEnd: () => void;
  onAnimationEnd: () => void;
}

const Splash = ({onLoadEnd, onAnimationEnd}: SplashProps) => {
  return (
    <Container withSafeArea={false} style={splashStyles.container}>
      <Animatable.View animation="fadeIn" onAnimationEnd={onAnimationEnd}>
        <FastImage
          source={require('assets/imgs/logo_v4.png')}
          onLoadEnd={onLoadEnd}
          style={splashStyles.image}
          resizeMode="contain"
        />
      </Animatable.View>
      <AppFooter style={splashStyles.footer} />
    </Container>
  );
};

export default Splash;
