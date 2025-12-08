import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function EditLifestyleScreen({ navigation, route }) {
  // You can pass data forward from EditBasicScreen via route.params
  const { name, email, gender, birthdate, location } = route.params || {};

  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [religion, setReligion] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [appearance, setAppearance] = useState("");

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
      <TextInput
        style={styles.input}
        placeholder="Religion"
        placeholderTextColor="#6b7280"
        value={religion}
        onChangeText={setReligion}
      />

      {/* Body Type */}
      <TextInput
        style={styles.input}
        placeholder="Body Type"
        placeholderTextColor="#6b7280"
        value={bodyType}
        onChangeText={setBodyType}
      />

      {/* Appearance */}
      <TextInput
        style={styles.input}
        placeholder="Appearance"
        placeholderTextColor="#6b7280"
        value={appearance}
        onChangeText={setAppearance}
      />

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
          onPress={() =>
            navigation.navigate("EditHabits", {
              name,
              email,
              gender,
              birthdate,
              location,
              occupation,
              education,
              religion,
              bodyType,
              appearance,
            })
          }
        >
          <Text style={styles.buttonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 20,
    justifyContent: "center",
  },
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
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: "#374151",
  },
  nextButton: {
    backgroundColor: "#2563eb",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
