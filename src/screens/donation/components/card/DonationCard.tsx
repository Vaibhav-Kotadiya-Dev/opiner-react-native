import React from 'react';
import {View, StyleSheet, Linking, StyleProp, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {faUpRightFromSquare} from '@fortawesome/pro-solid-svg-icons';

import AppText from 'components/app-text';
import {rs} from 'utils/ResponsiveScreen';
import RadioButton from 'components/radio';
import {getConfig} from 'network/OpinerApi';
import useThemeContext from 'hooks/useThemeContext';
import SectionTitle from 'components/section-title';
import {DonationItem} from 'screens/donation/hooks/useDonation';
import CharityLogo from './CharityLogo';

const styles = StyleSheet.create({
  container: {marginBottom: rs(8)},
  content: {
    paddingHorizontal: rs(30),
    paddingVertical: rs(24),
  },
  image: {
    height: rs(126),
    padding: rs(16),
    borderRadius: 4,
  },
  description: {
    marginTop: rs(30),
    marginBottom: rs(4),
  },
  logo: {maxHeight: rs(64)},
  logoContainer: {justifyContent: 'center', alignItems: 'center'},
});

const DonationCard = ({
  charity,
  onPick,
  isSelected,
  style,
}: {
  charity: DonationItem;
  onPick?: () => void;
  style?: StyleProp<ViewStyle>;
  isSelected?: boolean;
}) => {
  const {theme} = useThemeContext();
  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        title={charity.charityName}
        iconProps={{
          icon: faUpRightFromSquare,
          color: theme.colors.link,
        }}
        onPress={() => Linking.openURL(charity.url).catch()}
      />
      <View style={styles.content}>
        <FastImage
          style={[styles.image, {backgroundColor: theme.colors.cardBorder}]}
          source={{
            uri: `${getConfig().OPINER_BASE_URL}charity/getbackgroundimage/${
              charity.id
            }`,
          }}>
          <CharityLogo
            imageUrl={`${getConfig().OPINER_BASE_URL}charity/getthumb/${
              charity.id
            }`}
            containerStyle={styles.logoContainer}
            style={styles.logo}
          />
        </FastImage>
        <AppText size="h3" style={styles.description}>
          {charity.description}
        </AppText>
        <RadioButton
          title="Donate to this cause"
          onPress={onPick}
          active={isSelected}
        />
      </View>
    </View>
  );
};

export default DonationCard;
