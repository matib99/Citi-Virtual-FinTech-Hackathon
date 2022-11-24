import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {verify} from '../../utils/verification';

import {PaymentCard} from './Components';
import {API_URL, PAYMENT_STATUS} from './const';

export const PaymentPage = ({navigation, route}) => {
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.LOADING);
  const [transaction, setTransaction] = useState(null);
  const [deniedMessage, setDeniedMessage] = useState('');

  const transactionID =
    route && route.params ? route.params.transactionID : null;

  useEffect(() => {
    if (!transactionID) return;
    setPaymentStatus(PAYMENT_STATUS.LOADING);
    axios
      .get(`${API_URL}/${transactionID}`)
      .then(res => {
        const data = res.data;
        const newTransaction = {
          id: transactionID,
          storeName: data.name,
          amount: data.amount,
          completed: data.completed,
        };
        setTransaction(newTransaction);
        setPaymentStatus(PAYMENT_STATUS.AWAITING);
      })
      .catch(err => {
        alert(`axios error ${err}`);
      });
  }, [transactionID]);

  const onAccept = () => {
    setPaymentStatus(PAYMENT_STATUS.PROCESSING);
    axios
      .post(`${API_URL}/${transaction.id}`, {
        token: 'asdfasdfa',
      })
      .then(res => {
        const data = res.data;
        if (data.completed) {
          setPaymentStatus(PAYMENT_STATUS.ACCEPTED);
        } else {
          setDeniedMessage(data.message);
          setPaymentStatus(PAYMENT_STATUS.DENIED);
        }
      })
      .catch(err => {
        alert(`axios error ${err}`);
      });
  };
  const onDecline = () => {
    setPaymentStatus(PAYMENT_STATUS.CANCELED);
  };

  return (
    <View style={styles.paymentPageContainer}>
      <PaymentCard
        transaction={transaction}
        onAccept={() =>
          verify(
            onAccept,
            () => alert('Verification failed'),
            () => alert('Verification canceled'),
          )
        }
        deniedMessage={deniedMessage}
        onDecline={onDecline}
        status={paymentStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentPageContainer: {
    flex: 1,
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
