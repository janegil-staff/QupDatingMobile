import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation, route }) {
  // If you passed user data from login:
  const user = route.params?.user;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to QupDate</Text>

      {user ? (
        <Text style={styles.subheading}>Hello, {user.name || user.email} 👋</Text>
      ) : (
        <Text style={styles.subheading}>You are logged in!</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LandingScreen")}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  subheading: {
    color: "#9CA3AF",
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#EF4444", // red for logout
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
