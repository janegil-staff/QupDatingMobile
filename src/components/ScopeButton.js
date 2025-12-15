import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ScopeButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, active ? styles.active : styles.inactive]}
      onPress={onPress}
    >
      <Text
        style={[styles.text, active ? styles.activeText : styles.inactiveText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  active: {
    backgroundColor: "#ff69b4",
    borderColor: "#ff69b4",
  },
  inactive: {
    backgroundColor: "#1f2937",
    borderColor: "#374151",
  },
  text: {
    fontWeight: "600",
    fontSize: 14,
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "#9ca3af",
  },
});
