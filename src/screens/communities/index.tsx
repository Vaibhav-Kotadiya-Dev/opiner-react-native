import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {faMagnifyingGlass} from '@fortawesome/pro-solid-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import {getUserCommunities} from 'store/community/actions';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import communitySearchStyles from './styles';
import ThemedButton from 'components/themed-button';
import Container from 'components/container/Container';
import useCommunitySearch from 'hooks/useCommunitySearch';
import CommunitySearchInput from './components/SearchInput';

const CommunitiesSearchScreen = () => {
  const {code, loading, performSearch, error, setError} = useCommunitySearch();

  const dispatch = useDispatch();
  const navigation = useMainNavigation();

  useEffect(() => {
    dispatch(getUserCommunities());
  }, [dispatch]);

  return (
    <Container withSafeArea={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={communitySearchStyles.full}
        keyboardShouldPersistTaps="handled">
        <View
          style={[
            communitySearchStyles.fullCenter,
            {marginTop: -rs(100), paddingHorizontal: rs(30)},
          ]}>
          <CommunitySearchInput
            onChange={c => {
              setError('');
              code.current = c;
            }}
            error={error}
            onSubmitEditing={() => performSearch(code.current)}
          />

          <ThemedButton
            iconLeft={faMagnifyingGlass}
            iconSize={26}
            title="Search"
            onPress={() => performSearch(code.current)}
            isBusy={loading}
          />
          <ThemedButton
            isAtBottom
            title="Cancel"
            type="secondary"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.reset({
                  routes: [
                    {
                      name: 'Main',
                    },
                  ],
                  index: 0,
                });
              }
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default CommunitiesSearchScreen;
