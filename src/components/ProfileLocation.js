import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function ProfileLocation({ location, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Location</Text>
      <TextInput
        value={location ?? ""}
        onChangeText={onChange}
        style={styles.input}
        placeholder="Enter your city"
        placeholderTextColor="#6b7280"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#1f2937",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151",
  },
});
