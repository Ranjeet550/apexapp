import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email');
    } else {
      // Handle password reset functionality (just logging for now)
      console.log('Password reset for:', email);
      Alert.alert('Success', 'Password reset email sent!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
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
});

export default ForgotPassword;
