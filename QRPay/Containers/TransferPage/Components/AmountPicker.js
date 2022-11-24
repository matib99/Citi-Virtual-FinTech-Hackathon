/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  Card,
  Text,
  Button,
  ActivityIndicator,
  Avatar,
  IconButton,
  TextInput,
} from 'react-native-paper';

const toDols = x =>
  x.toLocaleString('fullwide', {
    style: 'currency',
    currency: 'USD',
    notation: 'standard',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const AmountPicker = ({amount = 10.0, onAmountChange = () => {}}) => {
  return (
    <View style={styles.pickerView}>
      <IconButton
        icon="minus"
        size={36}
        onPress={() => {
          if (amount > 1) {
            onAmountChange(amount - 1);
          }
        }}
      />
      <TextInput
        style={styles.amount}
        mode="flat"
        // left={<TextInput.Affix text="$" />}
        value={toDols(amount)}
        onChangeText={text =>
          onAmountChange(parseFloat(text.replace(/[^\d.-]/g, '')))
        }
        keyboardType="numeric"
      />
      <IconButton
        icon="plus"
        size={36}
        onPress={() => {
          onAmountChange(amount + 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    // textAlign: 'center',
  },
  titleText: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: '600',
    // textAlign: 'center',
    color: Colors.black,
  },
  subtitleText: {
    fontSize: 16,
    marginTop: 4,
    // color: Colors.black,
  },
  amount: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 36,
    fontWeight: '600',
  },
  deniedMessage: {
    textAlign: 'left',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  actions: {
    marginTop: 16,
    justifyContent: 'space-around',
  },
  iconAccepted: {
    marginTop: 16,
    backgroundColor: 'green',
    alignSelf: 'center',
  },
  iconDenied: {
    marginTop: 16,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  iconCancelled: {
    marginTop: 16,
    backgroundColor: 'orange',
    alignSelf: 'center',
  },
});
