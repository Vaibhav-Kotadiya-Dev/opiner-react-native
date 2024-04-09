import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ACCESS_TOKEN} from 'appConstants';
import {AppState} from 'store/rootReducer';
import {GET_USER_PROFILE} from 'store/profile/actions';

let tokenCache = '';

const useUser = (forceLoad: boolean = false) => {
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (token || !forceLoad) {
      return;
    }
    if (tokenCache) {
      setToken(tokenCache);
      return;
    }
    AsyncStorage.getItem(ACCESS_TOKEN).then(x => {
      if (x) {
        tokenCache = x;
        setToken(x);
      }
    });
  }, []);

  useEffect(() => {
    if (!user?.id || !forceLoad) {
      return;
    }
    dispatch({type: GET_USER_PROFILE});
  }, [user?.id]);

  return {user, token};
};

export default useUser;
