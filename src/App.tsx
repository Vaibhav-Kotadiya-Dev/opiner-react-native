import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import codePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from 'navigators';
import {persistor, store} from './store/configureStore';
import {setTopLevelNavigator} from './NavigationService';
import InAppModal from 'components/modal';
import ConnectionStatus from 'components/connection-status';
import ThemeProvider from 'context/ThemeContext';
import CustomFlashMessage from 'components/prompt-message/CustomFlashMessage';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider>
            <NavigationContainer
              //@ts-ignore
              ref={navigationRef => setTopLevelNavigator(navigationRef)}
              linking={{
                prefixes: [''],
                config: {
                  screens: {
                    Main: {
                      path: '/:id',
                      parse: {id: Number},
                    },
                  },
                },
              }}
            >
              <RootNavigator />
              <InAppModal />
            </NavigationContainer>
            <FlashMessage
              floating
              icon="auto"
              position="top"
              duration={1500}
              // @ts-ignore
              MessageComponent={CustomFlashMessage}
            />
            <ConnectionStatus />
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default codePush({
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
})(App);
