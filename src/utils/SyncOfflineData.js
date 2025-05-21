import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const syncOfflineData = async () => {
  try {
    const data = await AsyncStorage.getItem('registrations');
    if (!data) return;

    const registrations = JSON.parse(data);

    if (registrations.length > 0) {
      console.log('Syncing offline data...');

      // This is used to make api Simulation so here we simply add the settimeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate successful sync
      Alert.alert('Sync Complete', `${registrations.length} records synced to server.`);
      console.log('Data synced:', registrations);

      // Here basically we clear the tha data locally after succesffuly syncing proccess 
      await AsyncStorage.removeItem('registrations');
    }
  } catch (error) {
    console.log('Error syncing offline data:', error);
  }
};
