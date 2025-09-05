import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Dashboard from './src/auth/Test';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return <Dashboard />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

        {!isLogin && (
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#999" />
        )}

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry />

        {!isLogin && (
          <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#999" secureTextEntry />
        )}

        <TouchableOpacity style={styles.button} onPress={() => setLoggedIn(true)}>
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    textAlign: 'center',
    color: '#007AFF',
    marginTop: 10,
  },
});

export default App;
