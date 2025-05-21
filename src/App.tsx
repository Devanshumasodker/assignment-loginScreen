import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import NetInfo from '@react-native-community/netinfo';
import { syncOfflineData } from './utils/SyncOfflineData'; // adjust path if needed

const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncOfflineData(); // try syncing when connection is available
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
