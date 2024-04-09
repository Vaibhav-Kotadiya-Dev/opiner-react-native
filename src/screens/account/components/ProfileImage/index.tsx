import React, {useState} from 'react';
import {View, ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCirclePlus, faUser} from '@fortawesome/pro-solid-svg-icons';

import {WHITE} from 'assets/colors';
import useThemeContext from 'hooks/useThemeContext';
import {baseColors} from 'theme/colors';
import {rs} from 'utils/ResponsiveScreen';
import {getProfileImageStyles, profileImageSize} from './styles';

const ProfileImage = ({
  source,
  onPress,
  hidePlusIcon,
  size,
}: {
  source?: string | null;
  onPress?: () => void;
  hidePlusIcon?: boolean;
  size?: number;
}) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {theme} = useThemeContext();

  const styles = getProfileImageStyles(size);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <View style={[styles.wrapper, {backgroundColor: theme.colors.border}]}>
          <View style={styles.container}>
            {error || !source ? (
              <FontAwesomeIcon
                icon={faUser}
                size={(size || profileImageSize) * 0.5}
                color={theme.colors.secondaryText}
                style={[
                  styles.background,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
              />
            ) : (
              <FastImage
                style={styles.background}
                source={{uri: source}}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => {
                  setLoading(false);
                }}
                onLoad={() => {
                  setError(false);
                }}
                onError={() => {
                  setError(true);
                  setLoading(false);
                }}
              />
            )}
            {isLoading && (
              <ActivityIndicator
                size="small"
                color={WHITE}
                style={styles.imageLoading}
              />
            )}
          </View>
        </View>
        {error && !hidePlusIcon && (
          <FontAwesomeIcon
            icon={faCirclePlus}
            size={rs(32)}
            color={baseColors.orange}
            style={styles.addImageButton}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileImage;
