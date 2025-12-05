import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import CoursesScreen from './screens/CoursesScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookmarksProvider } from './context/BookmarksContext';

const TAB = createBottomTabNavigator();
const STACK = createNativeStackNavigator();

function AppTabs() {
  return (
    <TAB.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 65,
          paddingBottom: 10,
        },
        tabBarIcon: ({ size, color }) => {
          if (route.name === 'Home') return <Ionicons name="home" size={size} color={color} />;
          if (route.name === 'Courses') return <Ionicons name="layers" size={size} color={color} />;
          if (route.name === 'Categories') return <Ionicons name="grid" size={size} color={color} />;
          if (route.name === 'About') return <Ionicons name="information-circle" size={size} color={color} />;
          if (route.name === 'Profile') return <Ionicons name="person" size={size} color={color} />;
        },
      })}
    >
      <TAB.Screen name="Home" component={HomeScreen} />
      <TAB.Screen name="Courses" component={CoursesScreen} />
      <TAB.Screen name="Categories" component={CategoriesScreen} />
      <TAB.Screen name="About" component={AboutScreen} />
      <TAB.Screen name="Profile" component={ProfileScreen} />
    </TAB.Navigator>
  );
}

function AuthStack() {
  return (
    <STACK.Navigator screenOptions={{ headerShown: false }}>
      <STACK.Screen name="Login" component={LoginScreen} />
      <STACK.Screen name="Signup" component={SignupScreen} />
    </STACK.Navigator>
  );
}

function NavigationRoot() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <NavigationRoot />
      </BookmarksProvider>
    </AuthProvider>
  );
}
