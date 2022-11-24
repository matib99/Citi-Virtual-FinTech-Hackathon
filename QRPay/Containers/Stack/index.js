import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaymentPage} from '../PaymentPage';
import {Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const UnknownPage = () => <Text>Page not found</Text>;
const TransferPage = ({route}) => <Text>Transfer: {route.params.userID}</Text>;

export const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Payment" component={PaymentPage} />
      <Stack.Screen name="Transfer" component={TransferPage} />
      <Stack.Screen name="Unknown" component={UnknownPage} />
    </Stack.Navigator>
  );
};
