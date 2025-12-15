import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { saveProfile, prefillProfile } from "../../utils/profileService";
import * as SecureStore from "expo-secure-store";

export default function Step4Location({ form, setForm, setField }) {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        const res = await fetch("https://qup.dating/api/mobile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setForm(prefillProfile(data.user));
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchMe();
  }, [setForm]);

  const handleSaveAndNext = async () => {
    try {
      const updatedUser = await saveProfile({
        city: form.city,
        country: form.country,
      });

      // Navigate to next step (e.g. Bio)
      navigation.navigate("EditImages", { user: updatedUser });
    } catch (err) {
      // already logged inside saveProfile
    }
  };

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={0.8}
        width={null}
        color="#ff69b4"
        style={styles.progress}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        value={form?.city ?? ""}
        onChangeText={(val) => setField("city", val)}
        style={styles.input}
        placeholder="Enter your city"
        placeholderTextColor="#6b7280"
      />

      <Text style={styles.label}>Country</Text>
      <TextInput
        value={form?.country ?? ""}
        onChangeText={(val) => setField("country", val)}
        style={styles.input}
        placeholder="Enter your country"
        placeholderTextColor="#6b7280"
      />

      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navButton, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.navText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleSaveAndNext}
        >
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progress: { marginBottom: 20 },
  container: { flex: 1, backgroundColor: "#111827", padding: 20 },
  label: { color: "#ccc", marginBottom: 6, fontWeight: "600" },
  input: {
    backgroundColor: "#1f2937",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  backButton: { backgroundColor: "#374151" },
  nextButton: { backgroundColor: "#ff69b4" },
  navText: { color: "white", fontWeight: "700", fontSize: 16 },
});
