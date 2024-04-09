import React, {Fragment, ReactElement, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';

import TimelineScreen from '../screens/timeline';
import TabBarButton from 'components/tab-bar-button';
import CommunitiesSearchScreen from 'screens/communities';
import tailwindColors from 'theme/tailwindColors';
import useTimeline from 'screens/timeline/hooks/useTimeline';
import Color from 'assets/colors';
import {getForceDevMode, getConfig} from 'network/OpinerApi';
import {AppState} from 'store/rootReducer';
import {GET_USER_PROFILE} from 'store/profile/actions';
import {rs} from 'utils/ResponsiveScreen';
import AccountScreen from 'screens/account';
import useUserPermissions from 'hooks/useNotificationPermission';
import useThemeContext from 'hooks/useThemeContext';
import {
  faCommentsQuestionCheck,
  faUser,
  faUsers,
} from '@fortawesome/pro-solid-svg-icons';
import {ResponseStatus} from 'network/data/Question';

const Tab = createBottomTabNavigator();

const MainTabs = (): ReactElement => {
  const isDevMode = getForceDevMode();
  const dispatch = useDispatch();
  const {hasNotificationPermission: hasPermission} = useUserPermissions();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch({type: GET_USER_PROFILE});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const userProfileImage = user
    ? `${getConfig().OPINER_BASE_URL}account/getimage/${user?.id}/${
        user?.userAddress
      }`
    : null;
  const noImage = !userProfileImage;
  const {theme} = useThemeContext();
  const {questions} = useTimeline(false);

  const pendingCount = questions.data?.filter(
    question =>
      question.currentResponse.responseStatus ===
        ResponseStatus.AwaitingOptInOut ||
      question.currentResponse.responseStatus === ResponseStatus.OptedIn,
  ).length;

  return (
    <Fragment>
      <Tab.Navigator
        lazy={false}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: theme.colors.accent,
          labelStyle: {
            fontSize: rs(12),
          },
          style: {
            opacity: 0.95,
            borderTopWidth: 0,
            backgroundColor: isDevMode
              ? Color.Background.DevMode
              : theme.colors.background,
          },
        }}
      >
        <Tab.Screen
          options={({navigation}) => ({
            tabBarButton: ({onPress}) => (
              <TabBarButton
                badge={pendingCount || undefined}
                title="QUESTIONS"
                icon={faCommentsQuestionCheck}
                isFocused={navigation.isFocused() || activeTab === 0}
                onPress={(_: any) => {
                  setActiveTab(0);
                  onPress?.(_);
                }}
              />
            ),
          })}
          name="TimelineTab"
          component={TimelineScreen}
        />
        <Tab.Screen
          options={({navigation}) => ({
            tabBarButton: ({onPress}) => (
              <TabBarButton
                title="COMMUNITIES"
                icon={faUsers}
                isFocused={navigation.isFocused() || activeTab === 1}
                onPress={(_: any) => {
                  setActiveTab(1);
                  onPress?.(_);
                }}
              />
            ),
          })}
          name="CommunitiesTab"
          component={CommunitiesSearchScreen}
        />
        <Tab.Screen
          options={({navigation}) => ({
            tabBarButton: ({onPress}) => (
              <TabBarButton
                badge={noImage ? 1 : !hasPermission ? '!' : undefined}
                badgeColor={tailwindColors.amber[600]}
                title="ACCOUNT"
                icon={faUser}
                isFocused={navigation.isFocused() || activeTab === 2}
                onPress={(_: any) => {
                  setActiveTab(2);
                  onPress?.(_);
                }}
              />
            ),
          })}
          name="ProfileTab"
          component={AccountScreen}
        />
      </Tab.Navigator>
    </Fragment>
  );
};

export default MainTabs;
