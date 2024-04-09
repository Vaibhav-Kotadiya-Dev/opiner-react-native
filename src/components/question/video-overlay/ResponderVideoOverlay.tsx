import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationPin} from '@fortawesome/pro-solid-svg-icons';
import {
  faInstagramSquare,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import tailwindColors from 'theme/tailwindColors';
import {QuestionResponse} from 'network/data/Question';
import ResponderSocialLink from './ResponderSocialLink';

const {white} = tailwindColors;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: rs(16),
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  name: {
    textAlign: 'center',
    fontSize: rs(36),
    lineHeight: rs(40),
    color: white,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    color: white,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(8),
  },
  profession: {fontWeight: '700', color: white},
  company: {fontWeight: '500', color: white},
  biography: {color: white},
});

interface ResponderVideoOverlayProps {
  response: QuestionResponse;
}

const ResponderVideoOverlay = ({response}: ResponderVideoOverlayProps) => {
  const {
    userFirstName,
    userLocationName,
    userProfession,
    userCompany,
    userBiography,
  } = response;
  return (
    <View style={styles.container}>
      <View>
        <AppText size="h1" style={styles.name}>
          {userFirstName}
        </AppText>
        <View style={styles.locationContainer}>
          <FontAwesomeIcon icon={faLocationPin} color={white} />
          <AppText size="h3" style={styles.location}>
            {' '}
            {userLocationName}
          </AppText>
        </View>
      </View>
      <View>
        {(Boolean(userProfession) || Boolean(userCompany)) && (
          <AppText style={styles.profession}>
            {userProfession}
            {Boolean(userCompany) && (
              <AppText style={styles.company}>
                {userProfession ? `, ${userCompany}` : ''}
              </AppText>
            )}
          </AppText>
        )}
        {Boolean(userBiography) && (
          <AppText style={styles.biography}>{userBiography} </AppText>
        )}
        <View style={styles.links}>
          <ResponderSocialLink icon={faLinkedin} link={response.linkedIn} />
          <ResponderSocialLink icon={faTwitter} link={response.twitter} />
          <ResponderSocialLink
            icon={faInstagramSquare}
            link={response.instagram}
          />
        </View>
      </View>
    </View>
  );
};

export default ResponderVideoOverlay;
