import {NavigationContainerRef, StackActions} from '@react-navigation/core';
import {reportToRaygun} from 'utils/Raygun';

let topLevelNavigator: NavigationContainerRef | null;

const setTopLevelNavigator = (
  navigationRef: NavigationContainerRef | null,
): void => {
  topLevelNavigator = navigationRef;
};

const pop = (n?: number) => topLevelNavigator?.dispatch(StackActions.pop(n));

const push = (routeName: string, params?: object) =>
  topLevelNavigator?.dispatch(StackActions.push(routeName, params));

const resetTo = (routeName: string, params?: object) => {
  if (!topLevelNavigator) {
    reportToRaygun(
      new Error('NavigationService.resetTo: topLevelNavigator is null'),
    );
  }
  topLevelNavigator?.reset({
    index: 0,
    routes: [{name: routeName, params}],
  });
};
export {topLevelNavigator, setTopLevelNavigator, pop, push, resetTo};
