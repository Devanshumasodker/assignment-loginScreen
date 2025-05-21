import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Linking,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SecondaryLogin = () => {
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigation = useNavigation();

  const correctPin = '1234'; // You can later link this with secure storage or API

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      navigation.navigate('Home');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        Alert.alert(
          'Too Many Attempts',
          'Contact Super Admin:\n\nPhone: 9876543210\nEmail: admin@example.com',
          [
            {
              text: 'Call Now',
              onPress: () => Linking.openURL('tel:9876543210'),
            },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
      } else {
        Alert.alert('Incorrect PIN', `Attempts left: ${3 - newAttempts}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Enter Your 4-digit PIN</Text>
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        keyboardType="number-pad"
        maxLength={4}
        placeholder="****"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <Button title="Submit" onPress={handlePinSubmit} />
    </SafeAreaView>
  );
};

export default SecondaryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});
