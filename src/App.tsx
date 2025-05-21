import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppNavigator/>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
