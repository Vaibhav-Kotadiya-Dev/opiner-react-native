import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/pro-solid-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import {AppState as ReduxAppState} from '../../store/rootReducer';
import {GET_USER_PROFILE} from 'store/profile/actions';
import {baseColors} from 'theme/colors';
import useThemeContext from 'hooks/useThemeContext';
import OpinerContent from 'network/methods/OpinerContent';
import useUserPermissions from 'hooks/useNotificationPermission';
import useCommunities from 'hooks/useCommunities';
import {isUserInfoValid} from 'utils/UserValidation';

const styles = StyleSheet.create({
  image: {
    height: rs(42),
    width: rs(42),
    borderRadius: rs(21),
  },
  badge: {
    position: 'absolute',
    right: rs(18),
    top: 0,
    height: rs(16),
    minWidth: rs(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rs(24),
    backgroundColor: baseColors.orange,
    borderWidth: 2,
    borderColor: 'white',
  },
  container: {
    paddingHorizontal: rs(24),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ProfileIconButton = () => {
  const user = useSelector((state: ReduxAppState) => state.userProfile?.data);
  const navigation = useMainNavigation();
  const dispatch = useDispatch();
  const [hasImageError, setHasImageError] = useState(false);
  const {theme} = useThemeContext();
  const {hasNotificationPermission} = useUserPermissions();
  const communities = useCommunities();

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    dispatch({type: GET_USER_PROFILE});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const hasUser = user?.id;
  // TODO - Determine this using user.hasThumb once available
  const userProfileImage = hasUser
    ? OpinerContent.getCDNImageURL(user.cdnThumbUrlSmall)
    : undefined;

  const showBadge =
    user &&
    (!hasNotificationPermission ||
      !userProfileImage ||
      !communities.length ||
      !isUserInfoValid(user));

  return (
    <TouchableOpacity
      key={userProfileImage}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('ACCOUNT_SCREEN')}
      style={styles.container}
      hitSlop={{top: 16, bottom: 16, right: 16, left: 16}}>
      {userProfileImage && !hasImageError ? (
        <FastImage
          style={styles.image}
          source={{uri: userProfileImage}}
          onError={() => setHasImageError(true)}
          onLoadEnd={() => setHasImageError(false)}
        />
      ) : (
        <View
          style={[
            styles.image,
            styles.iconContainer,
            {backgroundColor: theme.colors.border},
          ]}>
          <FontAwesomeIcon
            icon={faUser}
            size={rs(24)}
            color={theme.colors.secondaryText}
          />
        </View>
      )}
      {showBadge && <View style={styles.badge} />}
    </TouchableOpacity>
  );
};

export default ProfileIconButton;
