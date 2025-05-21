// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrimaryLogin from '../screens/PrimaryLogin';
import SecondaryLogin from '../screens/SecondaryLogin';
import HomeScreen from '../screens/HomeScreen';
import RegistrationScreen from '../screens/Registration';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="PrimaryLogin"
    screenOptions={{ headerShown: false }} >
    
      <Stack.Screen name="PrimaryLogin" 
      component={PrimaryLogin}
       />
      <Stack.Screen name="SecondaryLogin" component={SecondaryLogin} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
