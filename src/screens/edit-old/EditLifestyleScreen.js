import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";

// helper to PATCH lifestyle fields
async function saveStepData(payload) {
  const token = await SecureStore.getItemAsync("authToken");
  if (!token) return null;

  const res = await fetch("http://localhost:3000/api/mobile/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("❌ Server error:", res.status, await res.text());
    return null;
  }
  return await res.json();
}

export default function EditLifestyleScreen({ navigation, route }) {
  // values passed from previous screen
  const { name, gender, birthdate, location } = route.params || {};

  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [religion, setReligion] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [appearance, setAppearance] = useState("");

  // ✅ Prefill from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (!token) return;

        const res = await fetch("http://localhost:3000/api/mobile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && data) {
          setOccupation(data.occupation || "");
          setEducation(data.education || "");
          setReligion(data.religion || "");
          setBodyType(data.bodyType || "");
          setAppearance(data.appearance || "");
        }
      } catch (err) {
        console.error("❌ Error fetching lifestyle data:", err);
      }
    };

    fetchUser();
  }, []);

  const renderOptions = (label, options, selected, setSelected) => (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.optionButton,
              selected === opt && styles.optionSelected,
            ]}
            onPress={() => setSelected(opt)}
          >
            <Text
              style={[
                styles.optionText,
                selected === opt && styles.optionTextSelected,
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Lifestyle & Appearance</Text>

      {/* Occupation */}
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        placeholderTextColor="#6b7280"
        value={occupation}
        onChangeText={setOccupation}
      />

      {/* Education */}
      <TextInput
        style={styles.input}
        placeholder="Education"
        placeholderTextColor="#6b7280"
        value={education}
        onChangeText={setEducation}
      />

      {/* Religion */}
      {renderOptions(
        "Religion",
        ["Christian", "Muslim", "Atheist", "Other"],
        religion,
        setReligion
      )}

      {/* Body Type */}
      {renderOptions(
        "Body Type",
        ["Slim", "Average", "Athletic", "Curvy"],
        bodyType,
        setBodyType
      )}

      {/* Appearance */}
      {renderOptions(
        "Appearance",
        ["Casual", "Stylish", "Formal"],
        appearance,
        setAppearance
      )}

      {/* Navigation buttons */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={async () => {
            const payload = {
              occupation,
              education,
              religion,
              bodyType,
              appearance,
            };
            const updatedUser = await saveStepData(payload);
            if (!updatedUser) {
              alert("Failed to save lifestyle data. Please try again.");
              return;
            }
            navigation.navigate("EditHabits", {
              name,
              gender,
              birthdate,
              location,
              ...payload,
            });
          }}
        >
          <Text style={styles.buttonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827", padding: 20 },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  section: { marginBottom: 20 },
  label: { color: "white", fontSize: 16, marginBottom: 8 },
  optionsRow: { flexDirection: "row", flexWrap: "wrap" },
  optionButton: {
    backgroundColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#374151",
    marginRight: 10,
    marginBottom: 10,
  },
  optionSelected: { backgroundColor: "#ff69b4", borderColor: "#ff69b4" },
  optionText: { color: "#ccc" },
  optionTextSelected: { color: "#fff", fontWeight: "600" },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  backButton: { backgroundColor: "#374151" },
  nextButton: { backgroundColor: "#2563eb" },
  buttonText: { color: "white", fontWeight: "600" },
});
