import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import useStore from '../store/Store';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the logout action from the zustand store
  const logout = useStore((state) => state.logout);

  // Simulate a delay before rendering content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loading spinner after 2 seconds
    }, 2000); // 2-second delay for the spinner

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleLogout = () => {
    logout(); // Call logout function from Zustand store
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        // Render fallback content during loading
        <Spinner color="red" visible={true} textContent="Loading..." textStyle={styles.spinnerText} />
      ) : (
        <>
          <Text style={styles.header}>Welcome to the Home Screen!</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Details')}
          >
            <Text style={styles.buttonText}>Go to Details</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinnerText: {
    color: 'red',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#FF5733', // Different color for logout button
    marginTop: 20, // Add some space between buttons
  },
});

export default HomeScreen;
