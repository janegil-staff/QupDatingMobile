import React, { useEffect } from "react";
import { Animated, Text, StyleSheet } from "react-native";

export default function Toast({ message, type, onHide }) {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2500),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, []);

  return (
    <Animated.View
      style={[
        styles.toast,
        type === "success" ? styles.success : styles.error,
        { opacity },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 40,
    left: "10%",
    right: "10%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  success: { backgroundColor: "#22c55e" },
  error: { backgroundColor: "#ef4444" },
  text: { color: "white", fontWeight: "600" },
});
