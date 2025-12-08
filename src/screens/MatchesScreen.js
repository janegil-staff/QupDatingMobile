import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Matches</Text>
      <Text style={styles.subheading}>
        Here you’ll see people you’ve matched with.
      </Text>
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  subheading: {
    color: "#9CA3AF",
    fontSize: 16,
    textAlign: "center",
  },
});
