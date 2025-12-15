// ProgressBar.js
import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressBar({ step, totalSteps }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View
          key={i}
          style={[styles.segment, i < step ? styles.active : styles.inactive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#111827",
  },
  segment: {
    flex: 1,
    height: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  active: {
    backgroundColor: "#ff69b4",
  },
  inactive: {
    backgroundColor: "#374151",
  },
});
