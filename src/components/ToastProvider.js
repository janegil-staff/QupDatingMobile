import React, { createContext, useContext, useState } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const opacity = new Animated.Value(0);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

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
    ]).start(() => setToast(null));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✔️";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      default:
        return "";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={[
            styles.toast,
            toast.type === "success" && styles.success,
            toast.type === "error" && styles.error,
            toast.type === "info" && styles.info,
            toast.type === "warning" && styles.warning,
            { opacity },
          ]}
        >
          <View style={styles.row}>
            <Text style={styles.icon}>{getIcon(toast.type)}</Text>
            <Text style={styles.text}>{toast.message}</Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
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
  row: { flexDirection: "row", alignItems: "center" },
  icon: { fontSize: 18, marginRight: 8 },
  success: { backgroundColor: "#22c55e" }, // green
  error: { backgroundColor: "#ef4444" }, // red
  info: { backgroundColor: "#3b82f6" }, // blue
  warning: { backgroundColor: "#f59e0b" }, // amber
  text: { color: "white", fontWeight: "600" },
});
