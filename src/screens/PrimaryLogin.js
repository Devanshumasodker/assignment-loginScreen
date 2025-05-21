import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Linking,
  AppState,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrimaryLogin = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const navigation = useNavigation();

  const correctCredentials = {
    userID: 'helloworld',
    password: '1234',
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setAttempts(0); // Reset attempts when back from call
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, [appState]);

  const handleLogin = async () => {
    if (userID === correctCredentials.userID && password === correctCredentials.password) {
      const timestamp = new Date().getTime();
      await AsyncStorage.setItem('primaryLoginTime', JSON.stringify(timestamp));
      navigation.navigate('SecondaryLogin');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        Alert.alert(
          'Contact Super Admin',
          'Phone: 9876543210\nEmail: admin@example.com',
          [
            { text: 'Call Now', onPress: () => Linking.openURL('tel:9876543210') },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
      } else {
        Alert.alert('Login Failed', `Invalid credentials. Attempts left: ${3 - newAttempts}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Enter Your Login Details</Text>

      <TextInput
        style={styles.input}
        placeholder="User ID"
        placeholderTextColor="#888"
        onChangeText={setUserID}
        value={userID}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.registerText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={[styles.btn, { backgroundColor: '#28a745', marginTop: 10 }]}
      >
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PrimaryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'black',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
