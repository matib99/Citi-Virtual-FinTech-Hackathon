import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

// import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// import {Card, Text, Button} from 'react-native-paper';

import {TransferCard} from './Components';
import {API_URL, PAYMENT_STATUS} from '../PaymentPage/const';
import {verify} from '../../utils/verification';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransferPage = ({navigation, route}) => {
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.AWAITING);
  const [deniedMessage, setDeniedMessage] = useState('');
  const transferTo = route && route.params ? route.params.userID : null;

  const onAccept = async amount => {
    setPaymentStatus(PAYMENT_STATUS.PROCESSING);
    const username = await AsyncStorage.getItem('username');

    axios
      .post(`${API_URL}/user/${transferTo}`, {
        token: username,
        amount: amount,
      })
      .then(res => {
        const data = res.data;
        console.log(data);
        setPaymentStatus(PAYMENT_STATUS.ACCEPTED);
      })
      .catch(err => {
        const errorMessage = err.response.data.error;
        setDeniedMessage(errorMessage);
        setPaymentStatus(PAYMENT_STATUS.DENIED);
      });
  };
  const onDecline = () => {
    setPaymentStatus(PAYMENT_STATUS.CANCELED);
  };

  return (
    <View style={styles.transferPageContainer}>
      <TransferCard
        transferTo={transferTo}
        onAccept={amount =>
          verify(
            () => onAccept(amount),
            () => alert('Verification failed'),
            () => alert('Verification canceled'),
          )
        }
        onDecline={onDecline}
        status={paymentStatus}
        deniedMessage={deniedMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transferPageContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  title: {
    // textAlign: 'center',
  },
  titleText: {
    marginTop: 4,
    fontSize: 30,
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
    fontSize: 80,
    fontWeight: '700',
  },
  actions: {
    marginTop: 16,
    justifyContent: 'space-around',
  },
});
