import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { SavedJobsProvider } from "./context/SavedJobsContext";

import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import SavedJobsScreen from "./components/SavedJobsScreen";
import ProfileScreen from "./components/ProfileScreen";
import JobDetailsScreen from "./components/JobDetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "Home") icon = "home";
         if (route.name === "Jobs") icon = "briefcase";
        if (route.name === "Saved") icon = "bookmark";
        if (route.name === "Profile") icon = "person";
        return <Ionicons name={icon} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
     <Tab.Screen name="Jobs" component={JobDetailsScreen} />
    <Tab.Screen name="Saved" component={SavedJobsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const MainNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SavedJobsProvider>
        <MainNavigator />
      </SavedJobsProvider>
    </AuthProvider>
  );
}