import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RadioButtonGroup({ options, value, onChange }) {
  return (
    <View style={styles.group}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          style={[styles.button, value === opt.value && styles.buttonSelected]}
          onPress={() => onChange(opt.value)}
        >
          <Text
            style={[styles.text, value === opt.value && styles.textSelected]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#374151",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonSelected: {
    backgroundColor: "#ff69b4",
  },
  text: {
    color: "#d1d5db",
    fontWeight: "500",
  },
  textSelected: {
    color: "white",
    fontWeight: "700",
  },
});
