import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LandingScreen from "../screens/LandingScreen";
import LoginForm from "./LoginForm";

// Onboarding pipeline (Register flow)
import AccountSetupScreen from "../screens/AccountSetupScreen";
import OnboardingDetails from "../screens/OnboardingDetails";
import LifestyleBasicsScreen from "../screens/LifestyleBasicsScreen";
import HabitsFamilyScreen from "../screens/HabitsFamilyScreen";
import BioPreferencesScreen from "../screens/BioPreferencesScreen";
import ImageUploadScreen from "../screens/ImageUploadScreen";
import ReviewSubmit from "../screens/ReviewSubmit";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingScreen"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#111827" }, // dark theme polish
        }}
      >
        {/* Landing page */}
        <Stack.Screen name="LandingScreen" component={LandingScreen} />

        {/* Login flow */}
        <Stack.Screen name="LoginForm" component={LoginForm} />

        {/* Register flow (onboarding pipeline) */}
        <Stack.Screen
          name="AccountSetupScreen"
          component={AccountSetupScreen}
        />
        <Stack.Screen name="OnboardingDetails" component={OnboardingDetails} />
        <Stack.Screen
          name="LifestyleBasicsScreen"
          component={LifestyleBasicsScreen}
        />
        <Stack.Screen
          name="HabitsFamilyScreen"
          component={HabitsFamilyScreen}
        />
        <Stack.Screen
          name="BioPreferencesScreen"
          component={BioPreferencesScreen}
        />

        <Stack.Screen name="ImageUploadScreen" component={ImageUploadScreen} />
        <Stack.Screen name="ReviewSubmit" component={ReviewSubmit} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
