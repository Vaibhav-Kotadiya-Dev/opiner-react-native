import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import {rs} from 'utils/ResponsiveScreen';
import {ICommunity} from 'network/data/Community';
import AppText from 'components/app-text';
import AspectRatioPreservedImage from 'components/question/video-overlay/AspectRatioPreservedImage';
import useThemeContext from 'hooks/useThemeContext';
import OpinerContent from 'network/methods/OpinerContent';

const styles = StyleSheet.create({
  background: {height: rs(165)},
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0003',
  },
  logo: {
    maxWidth: '70%',
    height: '30%',
    marginVertical: rs(4),
  },
  title: {fontSize: rs(24), lineHeight: undefined, marginTop: rs(4)},
});

interface CommunityImageProps extends Pick<FastImageProps, 'style'> {
  community: ICommunity;
}

const CommunityImage = ({community, style}: CommunityImageProps) => {
  const {theme} = useThemeContext();
  const {communityName, companyName, cdnLogoUrl, cdnBackgroundImageUrl} =
    community;

  return (
    <FastImage
      style={[styles.background, style]}
      resizeMode="cover"
      source={{
        uri: OpinerContent.getCDNImageURL(cdnBackgroundImageUrl),
      }}>
      <View style={styles.overlay}>
        {cdnLogoUrl && (
          <AspectRatioPreservedImage
            uri={OpinerContent.getCDNImageURL(cdnLogoUrl)}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
        <AppText size="h3" style={{color: theme.colors.white}}>
          {companyName}
        </AppText>
        <AppText size="h2" style={[styles.title, {color: theme.colors.white}]}>
          {communityName}
        </AppText>
      </View>
    </FastImage>
  );
};

export default CommunityImage;
