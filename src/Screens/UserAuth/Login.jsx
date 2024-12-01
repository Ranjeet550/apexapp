import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import useStore from '../../store/Store';

// Function to generate a random token
const generateRandomToken = () => {
  return Math.random().toString(36).substr(2, 9);  // Simple token generator
};

const logo = require('./../../assets/img/logo.png');

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Get and set data from zustand store
  const setUser = useStore((state) => state.setUser);
  const setLoginStatus = useStore((state) => state.setLoginStatus);
  const setToken = useStore((state) => state.setToken);
  
  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields');
    } else if (username === 'Admin' && password === '123') {
      // Generate a random token and store it in the store
      const token = generateRandomToken();
      setToken(token);  // Store the token in the zustand store
      setUser(username, password);
      setLoginStatus(true);  // Set login status to true

      console.log('Username:', username, 'Password:', password, 'Token:', token);
      Alert.alert('Login Successful', `Token: ${token}`);
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      {/* Image Logo */}
      <Image source={logo} style={styles.logo} />

      <Text style={styles.header}>Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 120,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login;
