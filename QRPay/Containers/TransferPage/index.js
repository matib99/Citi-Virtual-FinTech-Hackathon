import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
// import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// import {Card, Text, Button} from 'react-native-paper';

import {PaymentCard} from './Components';
import {API_URL, PAYMENT_STATUS} from './const';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

// rnBiometrics.isSensorAvailable().then(resultObject => {
//   const {available, biometryType} = resultObject;

//   if (available && biometryType === BiometryTypes.TouchID) {
//     console.log('TouchID is supported');
//   } else if (available && biometryType === BiometryTypes.FaceID) {
//     console.log('FaceID is supported');
//   } else if (available && biometryType === BiometryTypes.Biometrics) {
//     console.log('Biometrics is supported');
//   } else {
//     console.log('Biometrics not supported');
//   }
// })

export const TransferPage = ({navigation, route}) => {
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.LOADING);
  const [transactionID, setTransactionID] = useState(null);

  useEffect(() => {
    setTransactionID(route.params.transactionID);
    setPaymentStatus(PAYMENT_STATUS.LOADING);
    if (route.params.transactionID) {
      setTimeout(() => {
        setPaymentStatus(PAYMENT_STATUS.AWAITING);
      }, 1000);
    }
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
        onAccept={() =>
          verify(
            onAccept,
            () => alert('Verification failed'),
            () => alert('Verification canceled'),
          )
        }
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
