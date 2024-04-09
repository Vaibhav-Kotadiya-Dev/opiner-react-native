import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  AuthStackParamList,
  MainStackParam,
  RootStackParam,
} from 'navigators/StackParams';

export const useMainNavigation = () =>
  useNavigation<StackNavigationProp<MainStackParam>>();

export const useAuthNavigation = () =>
  useNavigation<StackNavigationProp<AuthStackParamList>>();

export const useRootNavigation = () =>
  useNavigation<StackNavigationProp<RootStackParam>>();
