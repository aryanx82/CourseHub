import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const USER_KEY = '@coursehub_user';
const CREDENTIALS_KEY = '@coursehub_credentials';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrateAuthState = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        // ignore hydration errors for now
      } finally {
        setLoading(false);
      }
    };

    hydrateAuthState();
  }, []);

  useEffect(() => {
    const persistUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem(USER_KEY);
        }
      } catch (e) {
        // ignore persistence errors for now
      }
    };

    persistUser();
  }, [user]);

  const signIn = async (credentials) => {
    const { email, password } = credentials;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const raw = await AsyncStorage.getItem(CREDENTIALS_KEY);
    if (!raw) {
      throw new Error('No account found. Please sign up first.');
    }

    const stored = JSON.parse(raw);
    if (stored.email !== email || stored.password !== password) {
      throw new Error('Invalid email or password');
    }

    const nextUser = {
      name: stored.name || 'Learner',
      email: stored.email,
    };
    setUser(nextUser);
  };

  const signUp = async (userData) => {
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    const toStore = { name, email, password };
    await AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(toStore));

    const nextUser = { name, email };
    setUser(nextUser);
  };

  const signOut = async () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

