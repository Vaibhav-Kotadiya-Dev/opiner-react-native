import {TouchableOpacity} from 'react-native';
import {faChevronLeft} from '@fortawesome/pro-solid-svg-icons';
import {Props, FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Font from 'assets/fonts';
import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import ProfileIconButton from 'components/header/ProfileIconButton';
import {StackNavigationOptions} from '@react-navigation/stack';

const HeaderLeftIcon = ({iconProps}: {iconProps?: Partial<Props>}) => {
  const {theme} = useThemeContext();
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      color={theme.colors.link}
      size={rs(30)}
      {...iconProps}
      style={[{marginHorizontal: rs(24)}, iconProps?.style]}
    />
  );
};

const HeaderLeftButton = ({
  onPress,
  icon,
}: Partial<Pick<Props, 'icon'>> & {
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <HeaderLeftIcon iconProps={icon ? {icon} : undefined} />
    </TouchableOpacity>
  );
};

const useHeaderProps = (isAuth: boolean = false): StackNavigationOptions => {
  const {theme} = useThemeContext();
  const {top} = useSafeAreaInsets();
  return {
    headerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.secondaryBackground,
      shadowColor: 'transparent',
      height: rs(92) + top,
    },
    headerTitleStyle: {
      fontSize: rs(30),
      fontWeight: '700',
      fontFamily: Font.Bold,
      color: theme.colors.text,
    },
    headerTitleAlign: 'center',
    headerBackImage: () => <HeaderLeftIcon />,
    headerBackTitleVisible: false,
    headerRight: isAuth ? undefined : ProfileIconButton,
  };
};

export {HeaderLeftButton, HeaderLeftIcon, useHeaderProps};
