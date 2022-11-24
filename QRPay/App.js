import * as React from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {PaymentPage} from './Containers/PaymentPage';
import {MyStack} from './Containers/Stack';
import {Link, NavigationContainer, useRoute} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';

const linking = {
  prefixes: ['qrpay://'],
  config: {
    screens: {
      Payment: 'payment/:transactionID',
      Transfer: 'transfer/:userID',
      User: 'user',
      Unknown: '*',
      // Profile: 'user',
    },
  },
};

enableScreens(true);

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer linking={linking}>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
