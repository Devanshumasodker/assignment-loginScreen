import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const RegistrationScreen = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    idType: '',
    idNumber: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const isValid = Object.values(form).every((value) => value.trim() !== '');
    if (!isValid) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    const netInfo = await NetInfo.fetch();

    if (netInfo.isConnected) {
      // Simulate API call
      setTimeout(() => {
        Alert.alert('Success', 'Data sent to server (simulated)');
        setForm({
          name: '',
          age: '',
          gender: '',
          phone: '',
          email: '',
          idType: '',
          idNumber: '',
          state: '',
          city: '',
          pincode: '',
          address: '',
        });
      }, 1000);
    } else {
      try {
        const localData = await AsyncStorage.getItem('registrations');
        const parsed = localData ? JSON.parse(localData) : [];
        parsed.push(form);
        await AsyncStorage.setItem('registrations', JSON.stringify(parsed));
        Alert.alert('Offline Saved', 'Data stored locally until online.');
      } catch (err) {
        Alert.alert('Storage Error', 'Failed to save data locally.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Registration Form</Text>
        {[
          { key: 'name', label: 'Full Name' },
          { key: 'age', label: 'Age', keyboardType: 'numeric' },
          { key: 'gender', label: 'Gender' },
          { key: 'phone', label: 'Phone Number', keyboardType: 'phone-pad' },
          { key: 'email', label: 'Email ID', keyboardType: 'email-address' },
          { key: 'idType', label: 'Issued ID Type' },
          { key: 'idNumber', label: 'Issued ID Number' },
          { key: 'state', label: 'State' },
          { key: 'city', label: 'City' },
          { key: 'pincode', label: 'Pin Code', keyboardType: 'numeric' },
          { key: 'address', label: 'Address' },
        ].map(({ key, label, keyboardType }) => (
          <TextInput
            key={key}
            style={styles.input}
            placeholder={label}
            value={form[key]}
            keyboardType={keyboardType || 'default'}
            onChangeText={(text) => handleChange(key, text)}
            placeholderTextColor="#999"
          />
        ))}

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    color: 'black',
  },
});
