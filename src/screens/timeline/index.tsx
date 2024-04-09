import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Linking, RefreshControl, SectionList, ViewToken} from 'react-native';
import {useDispatch} from 'react-redux';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import ContentLoader from 'react-native-easy-content-loader';
import {faLock, faLockOpen} from '@fortawesome/pro-solid-svg-icons';

import styles from './styles';
import useTimeline from './hooks/useTimeline';
import {Question, ResponseStatus} from 'network/data/Question';
import {changeQuestionStatus} from 'network/OpinerApi';
import {Container} from 'components';
import {SET_QUESTION_DETAILS} from 'store/question_details/actions';
import {GET_ALL_QUESTIONS} from 'store/all_questions/actions';
import {push} from '../../NavigationService';
import {showLocalNotification} from 'utils/NotificationService';
import {MainStackParam} from 'navigators/StackParams';
import useThemeContext from 'hooks/useThemeContext';
import QuestionItem from './components/question-item';
import SectionTitle from 'components/section-title';
import {GET_USER_PROFILE} from 'store/profile/actions';
import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import makeTimelineSection from './utils/section';

const usedNotification: {[key: string]: boolean} = {};

const shouldNavigate = (
  info: FirebaseMessagingTypes.RemoteMessage,
): boolean => {
  if (info && info.data && info.data.Id) {
    const {
      data: {Id, Type},
    } = info;
    return !usedNotification[Id + Type];
  }
  return false;
};

const handleLinking = (data: Array<Question>, ID: string, Type: string) => {
  const question = data.find(q => q.id === Number(ID));
  if (question) {
    usedNotification[ID + Type] = true;
    push('QUESTION_DETAILS_SCREEN', {question});
  }
};

export const handleNavigation = (
  data: Question[],
  info: FirebaseMessagingTypes.RemoteMessage | null,
) => {
  if (info && info.data && shouldNavigate(info)) {
    const {Id, Type} = info.data;
    handleLinking(data, Id, Type);
  }
};

interface TimelineScreenProps {
  navigation: NavigationProp<MainStackParam>;
  route: RouteProp<MainStackParam, 'MAIN_SCREEN'>;
}

const handled: {
  [key: number]: boolean;
} = {}; // temporary workaround to prevent navigation once handled

const TimelineScreen = ({navigation, route}: TimelineScreenProps) => {
  const [isUserRefresh, setIsUserRefresh] = useState(false);
  const {questions, token} = useTimeline(true, () => setIsUserRefresh(false));
  const {data, loading} = questions;
  const dispatch = useDispatch();
  const listRef = useRef<SectionList>(null);
  const {theme} = useThemeContext();

  useEffect(() => {
    dispatch({type: GET_USER_PROFILE});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = useCallback(
    (item: Question) => {
      dispatch({
        type: SET_QUESTION_DETAILS,
        payload: {question: item},
      });
      let pillStatus = item.currentResponse.pillStatus;
      if (
        item.currentResponse.responseStatus === ResponseStatus.AwaitingOptInOut
      ) {
        changeQuestionStatus(item.id);
        pillStatus = 'Active';
      }
      navigation.navigate('QUESTION_DETAILS_SCREEN', {
        question: {
          ...item,
          currentResponse: {
            ...item.currentResponse,
            pillStatus,
          },
        },
      });
    },
    [dispatch, navigation],
  );

  useEffect(() => {
    const qid = route.params?.questionId;
    if (!qid || handled[qid]) {
      return;
    }
    const question = data.find(q => q.id === qid);
    if (question) {
      handled[qid] = true;
      handlePress(question);
    }
  }, [route.params?.questionId, navigation, data, handlePress]);

  useEffect(() => {
    if (!data.length) {
      return;
    }
    Linking.addEventListener('url', e => {
      /**
       * opiner://questionId
       */
      if (e.url && e.url.includes('opiner')) {
        const id = e.url.split('://')[1];
        handleLinking(data, id, '');
      }
    });
    Linking.getInitialURL().then(url => {
      if (url && url.includes('opiner')) {
        const id = url.split('.app/')[1];
        handleLinking(data, id, '');
      }
    });

    messaging()
      .getInitialNotification()
      .then(info => {
        handleNavigation(data, info);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      dispatch({type: GET_ALL_QUESTIONS});
      if (remoteMessage.notification) {
        const messageData = remoteMessage.data || {};
        showLocalNotification({
          message: remoteMessage.notification.body || '',
          title: remoteMessage.notification.title,
          userInfo: {...messageData, list: data},
        });
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const isBusy = loading && !data.length;
  const [viewableIndex, setViewableIndex] = useState<number | undefined>();

  const onViewableItemsChanged = useRef(
    (info: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
      const activeIndex = info.viewableItems[0]?.index;
      setViewableIndex(
        typeof activeIndex === 'number' ? activeIndex : undefined,
      );
    },
  ).current;

  const viewabilityConfigRef = useRef({itemVisiblePercentThreshold: 50});

  const sections = useMemo(() => makeTimelineSection(data), [data]);

  return (
    <Container hideBottomInset showDevModeBackground>
      {/* @ts-expect-error - Old component type mismatch */}
      <ContentLoader
        active={isBusy}
        loading={isBusy}
        avatar
        aShape="square"
        aSize={rs(98)}
        avatarStyles={{
          marginRight: rs(20),
        }}
        listSize={10}
        pRows={2}
        titleStyles={{height: rs(24), marginBottom: rs(2)}}
        primaryColor={theme.colors.contentLoaderPrimary}
        secondaryColor={theme.colors.contentLoaderSecondary}
        animationDuration={1000}
        paragraphStyles={{marginBottom: rs(2)}}
        pHeight={[24, 30]}
        pWidth={['70%', 30]}
        containerStyles={{paddingVertical: rs(18), paddingHorizontal: rs(24)}}>
        <SectionList
          ref={listRef}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          sections={sections}
          removeClippedSubviews
          viewabilityConfig={viewabilityConfigRef.current}
          onViewableItemsChanged={onViewableItemsChanged}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          refreshControl={
            <RefreshControl
              refreshing={loading && isUserRefresh}
              tintColor={theme.colors.text}
              onRefresh={() => {
                setIsUserRefresh(true);
                dispatch({type: GET_ALL_QUESTIONS});
              }}
            />
          }
          keyExtractor={(item, index) => `${item?.id}_${index}`}
          renderItem={({item, index}) => {
            return (
              <QuestionItem
                token={token!}
                question={item}
                onPress={() => handlePress(item)}
                isInFocus={index === viewableIndex}
              />
            );
          }}
          renderSectionFooter={({section: {data: sectionData, title}}) => {
            if (!sectionData.length) {
              return (
                <AppText style={styles.sectionEmptyText}>
                  No {title === 'Open questions' ? 'open' : 'closed'} questions.
                </AppText>
              );
            }
            return null;
          }}
          renderSectionHeader={({section: {title}}) => (
            <SectionTitle
              title={title}
              iconProps={{
                icon: title === 'Open questions' ? faLockOpen : faLock,
              }}
            />
          )}
        />
      </ContentLoader>
    </Container>
  );
};

export default TimelineScreen;
