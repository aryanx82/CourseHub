import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please provide both email and password.');
      return;
    }
    try {
      setSubmitting(true);
      await signIn({ email, password });
    } catch (e) {
      Alert.alert('Login failed', e.message || 'Unable to log in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Course<Text style={styles.logoAccent}>Hub</Text></Text>
      <Text style={styles.heading}>Welcome back</Text>
      <Text style={styles.subheading}>Log in to continue exploring programs.</Text>

      <TextInput
        placeholder="Email address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} disabled={submitting}>
        <Text style={styles.primaryText}>{submitting ? 'Logging in...' : 'Log in'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.switchText}>
          New here? <Text style={{ color: '#6C7BFF' }}>Create an account</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoAccent: {
    color: '#6C7BFF',
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  subheading: {
    textAlign: 'center',
    color: '#6c7383',
    marginBottom: 30,
  },
  input: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: '#6C7BFF',
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 8,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4a4e69',
  },
});

