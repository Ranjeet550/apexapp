import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a store using Zustand
const useStore = create((set) => ({
  username: '',
  password: '',
  isLoggedIn: false,
  token: '',

  // Initialize state from AsyncStorage
  initState: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      
      if (token && isLoggedIn === 'true') {
        set({ token, isLoggedIn: true }); // User is logged in
      } else {
        set({ token: '', isLoggedIn: false }); // User is not logged in
      }
    } catch (error) {
      console.error('Failed to load from AsyncStorage', error);
    }
  },

  // Action to set username and password
  setUser: (username, password) => set({ username, password }),

  // Action to set login status
  setLoginStatus: async (status) => {
    await AsyncStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    set({ isLoggedIn: status });
  },

  // Action to set token and persist it in AsyncStorage
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem('token', token);  // Save token to AsyncStorage
      set({ token });
    } catch (error) {
      console.error('Failed to save token to AsyncStorage', error);
    }
  },

  // Logout action to reset token and login status
  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');  // Remove token from AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'false');  // Set logged out status
      set({ token: '', isLoggedIn: false });  // Reset state
    } catch (error) {
      console.error('Failed to clear AsyncStorage', error);
    }
  },
}));

export default useStore;
