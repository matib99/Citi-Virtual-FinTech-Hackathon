import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// import {Card, Text, Button} from 'react-native-paper';

import {Button, Card, IconButton, TextInput} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

const logo = require('../../assets/qrpay.png');

export const UserPage = ({navigation, route}) => {
  const [username, setUsername] = useState('User1');
  const [editing, setEditing] = useState(false);

  const userIcon = () => (
    <IconButton
      icon="account"
      mode="contained"
      size={36}
      onPress={() => setEditing(true)}
    />
  );

  useEffect(() => {
    AsyncStorage.getItem('@username').then(val => {
      if (val !== null) {
        setUsername(val);
      }
      setUsername('user1');
    });
  }, []);
  const onUsernameChange = () => {
    AsyncStorage.setItem('@username', username)
      .then(() => {
        setEditing(false);
      })
      .catch(err => alert(err));
  };
  return (
    <View style={styles.userPageContainer}>
      <Card elevation={3} style={styles.card}>
        <Card.Title
          style={styles.title}
          title={username}
          titleStyle={styles.titleText}
          subtitle="Your transfer QR code"
          subtitleStyle={styles.subtitleText}
          left={userIcon}
        />
        <Card.Content style={styles.cardContent}>
          {editing && <TextInput value={username} onChangeText={setUsername} />}
          <View style={styles.qrWrapper}>
            <QRCode
              value={`qrpay://transfer/${username}`}
              logo={logo}
              logoSize={50}
              logoBackgroundColor="white"
              logoBorderRadius={10}
              logoMargin={5}
              quietZone={16}
              size={200}
            />
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          {editing && (
            <Button mode="contained" icon="check" onPress={onUsernameChange}>
              Accept
            </Button>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  userPageContainer: {
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
  cardContent: {
    textAlign: 'center',
    marginTop: 16,
  },
  qrWrapper: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  actions: {
    marginTop: 16,
    justifyContent: 'space-around',
  },
});
