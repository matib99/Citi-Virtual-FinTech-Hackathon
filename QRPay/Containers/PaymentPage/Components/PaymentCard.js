/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, BackHandler} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  Card,
  Text,
  Button,
  ActivityIndicator,
  Avatar,
} from 'react-native-paper';
import {PAYMENT_STATUS} from '../const';

const statusToTitle = {
  [PAYMENT_STATUS.LOADING]: 'Loading transaction',
  [PAYMENT_STATUS.AWAITING]: 'New transaction',
  [PAYMENT_STATUS.PROCESSING]: 'Processing...',
  [PAYMENT_STATUS.CANCELED]: 'Transaction canceled',
  [PAYMENT_STATUS.DENIED]: 'Transaction denied',
  [PAYMENT_STATUS.ACCEPTED]: 'Transaction accepted',
};

export const PaymentCard = ({
  transaction = {
    id: 2137,
    storeName: 'Online Shop',
    amount: 42,
    completed: false.valueOf,
  },
  deniedMessage = 'Transaction denied - unknown error',
  onAccept = () => {},
  onDecline = () => {},
  status = PAYMENT_STATUS.LOADING,
}) => {
  const activityIndicatorAnimating =
    status === PAYMENT_STATUS.LOADING || status === PAYMENT_STATUS.PROCESSING;

  const activityIndicator = (
    <ActivityIndicator
      animating={activityIndicatorAnimating}
      size="large"
      hidesWhenStopped
    />
  );

  return (
    <Card elevation={3} style={styles.card}>
      <Card.Title
        style={styles.title}
        title={statusToTitle[status]}
        titleStyle={styles.titleText}
        subtitle={
          status === PAYMENT_STATUS.LOADING ? '...' : transaction.storeName
        }
        subtitleStyle={styles.subtitleText}
      />
      <Card.Content>
        {status === PAYMENT_STATUS.AWAITING && (
          <Text style={styles.amount}> ${transaction.amount} </Text>
        )}
        {status === PAYMENT_STATUS.DENIED && (
          <Text style={styles.deniedMessage}> {deniedMessage} </Text>
        )}
        {activityIndicatorAnimating && activityIndicator}
        {status === PAYMENT_STATUS.ACCEPTED && (
          <Avatar.Icon
            size={64}
            icon="check-bold"
            style={styles.iconAccepted}
          />
        )}
        {status === PAYMENT_STATUS.DENIED && (
          <Avatar.Icon size={64} icon="close-thick" style={styles.iconDenied} />
        )}
        {status === PAYMENT_STATUS.CANCELED && (
          <Avatar.Icon
            size={64}
            icon="close-thick"
            style={styles.iconCancelled}
          />
        )}
      </Card.Content>
      <Card.Actions style={styles.actions}>
        {status === PAYMENT_STATUS.AWAITING && (
          <>
            <Button mode="contained" icon="check" onPress={onAccept}>
              Accept
            </Button>
            <Button mode="outlined" icon="close" onPress={onDecline}>
              Decline
            </Button>
          </>
        )}
        {status === PAYMENT_STATUS.DENIED && (
          <>
            <Button mode="contained" icon="refresh" onPress={onAccept}>
              Try Again
            </Button>
            <Button
              mode="outlined"
              icon="close"
              onPress={() => BackHandler.exitApp()}>
              Exit
            </Button>
          </>
        )}
        {(status === PAYMENT_STATUS.ACCEPTED ||
          status === PAYMENT_STATUS.CANCELED) && (
          <Button
            mode="contained"
            icon="close"
            onPress={() => BackHandler.exitApp()}>
            Exit
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    // height: 'fit-content',
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
    fontSize: 80,
    fontWeight: '700',
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
