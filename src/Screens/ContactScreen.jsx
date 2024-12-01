import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.contactInfo}>Email: contact@apexerp.com</Text>
      <Text style={styles.contactInfo}>Phone: +1 (800) 123-4567</Text>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactInfo: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
});

export default ContactScreen;
