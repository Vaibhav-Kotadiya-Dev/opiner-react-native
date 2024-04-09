import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {
  updateProfile,
  UpdateProfileParamType,
} from 'network/methods/updateProfile';
import {updateUserProfile} from 'store/profile/actions';
import {useNavigation} from '@react-navigation/native';

const useUpdateUserProfile = () => {
  const [isBusy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleUpdateProfile = async (params: UpdateProfileParamType) => {
    setBusy(true);
    try {
      const response = await updateProfile(params);
      if (response.status === 200) {
        dispatch(updateUserProfile(params.data));
        if (params.shouldGoBackAfterUpdate) {
          params.onBack?.();
          navigation.goBack();
        }
      }
      setBusy(false);
    } catch (err) {
      setBusy(false);
    }
  };

  return {isBusy, handleUpdateProfile};
};

export default useUpdateUserProfile;
