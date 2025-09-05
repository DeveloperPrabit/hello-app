// src/auth/Test.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard!</Text>
      <Button title="Logout" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Dashboard;
