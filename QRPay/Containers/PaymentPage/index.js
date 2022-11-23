import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
// import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// import {Card, Text, Button} from 'react-native-paper';

import {PaymentCard} from './Components';
import {API_URL, PAYMENT_STATUS} from './const';

export const PaymentPage = ({transactionID}) => {
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.LOADING);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    setPaymentStatus(PAYMENT_STATUS.LOADING);
    if (transactionID) {
      setTimeout(() => {
        setPaymentStatus(PAYMENT_STATUS.AWAITING);
      }, 1000);
    }
  }, [transactionID]);

  const onAccept = () => {
    setPaymentStatus(PAYMENT_STATUS.PROCESSING);
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setPaymentStatus(PAYMENT_STATUS.DENIED);
      } else {
        setPaymentStatus(PAYMENT_STATUS.ACCEPTED);
      }
    }, 1000);
  };
  const onDecline = () => {
    setPaymentStatus(PAYMENT_STATUS.CANCELED);
  };

  return (
    <View style={styles.paymentPageContainer}>
      <PaymentCard
        storeName="Test Shop"
        amount={123}
        onAccept={onAccept}
        onDecline={onDecline}
        status={paymentStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentPageContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    textAlign: 'center',
    justifyContent: 'center',
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
