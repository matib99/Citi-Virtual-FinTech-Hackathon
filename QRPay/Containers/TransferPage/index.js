import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

// import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// import {Card, Text, Button} from 'react-native-paper';

import {TransferCard} from './Components';
import {PAYMENT_STATUS} from '../PaymentPage/const';
import {verify} from '../../utils/verification';

export const TransferPage = ({navigation, route}) => {
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.AWAITING);

  const transferTo = route && route.params ? route.params.userID : null;

  const onAccept = amount => {
    setPaymentStatus(PAYMENT_STATUS.PROCESSING);
    alert(amount);
    // axios bla bla
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
