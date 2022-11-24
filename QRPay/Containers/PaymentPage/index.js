import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
// import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// import {Card, Text, Button} from 'react-native-paper';

import {PaymentCard} from './Components';
import {API_URL, PAYMENT_STATUS} from './const';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export const PaymentPage = ({navigation, route}) => {
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.LOADING);
  const [transaction, setTransaction] = useState(null);
  const [deniedMessage, setDeniedMessage] = useState('');

  useEffect(() => {
    setPaymentStatus(PAYMENT_STATUS.LOADING);
    axios
      .get(`${API_URL}/${route.params.transactionID}`)
      .then(res => {
        const data = res.data;
        const newTransaction = {
          id: route.params.transactionID,
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
  }, [route.params.transactionID]);

  const verify = (onSuccess, onFailure, onCancel) => {
    rnBiometrics
      .simplePrompt({
        promptMessage: 'Confirm payment',
      })
      .then(resultObject => {
        const {success} = resultObject;
        if (success) {
          onSuccess();
        } else {
          onCancel();
        }
      })
      .catch(() => {
        onFailure();
      });
  };
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
