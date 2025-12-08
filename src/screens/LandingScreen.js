import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function LandingScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../assets/couple-smiling.png")}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to QupDate</Text>
          <Text style={styles.subtitle}>
            Love with Norwegian warmth and world-class UX
          </Text>

          {/* Two buttons side-by-side */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={() => navigation.navigate("LoginForm")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.registerButton]}
              onPress={() => navigation.navigate("AccountSetupScreen")}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About QupDate</Text>
        <Text style={styles.aboutText}>
          QupDate is a modern dating platform built for Norway — with dark
          theme, beautiful design, and real connection. We combine safety,
          style, and usability to give you an experience that feels like home.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#000" },
  hero: { height: 500, justifyContent: "flex-end" },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: { fontSize: 16, color: "#ccc", marginTop: 8, textAlign: "center" },

  // 👇 Row for side-by-side buttons
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#88C0D0", // bluish
  },
  registerButton: {
    backgroundColor: "#A3BE8C", // greenish
  },
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 16 },

  aboutSection: { padding: 24, backgroundColor: "#111" },
  aboutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#88C0D0",
    marginBottom: 12,
  },
  aboutText: { fontSize: 16, color: "#ccc", lineHeight: 22 },
});
