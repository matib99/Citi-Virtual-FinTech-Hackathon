import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaymentPage} from '../PaymentPage';
import {Appbar, Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {TransferPage} from '../TransferPage';
import {UserPage} from '../UserPage';

const Stack = createNativeStackNavigator();

const UnknownPage = () => <Text>Page not found</Text>;
const MyHeader = ({navigation}) => (
  <Appbar.Header>
    {navigation.canGoBack() && (
      <Appbar.BackAction onPress={() => navigation.goBack()} />
    )}
    <Appbar.Content title="QRPay" />
    <Appbar.Action icon="qrcode" onPress={() => navigation.navigate('User')} />
  </Appbar.Header>
);

export const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        header: MyHeader,
      }}>
      <Stack.Screen name="User" component={UserPage} />
      <Stack.Screen name="Payment" component={PaymentPage} />
      <Stack.Screen name="Transfer" component={TransferPage} />
      <Stack.Screen name="Unknown" component={UnknownPage} />
    </Stack.Navigator>
  );
};
