import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";

export default function EditBioScreen({ navigation, route }) {
  // Collect previous data from route.params
  const {
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
    smoking,
    drinking,
    hasChildren,
    wantsChildren,
    willingToRelocate,
    relationshipStatus,
  } = route.params || {};

  const [bio, setBio] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [preferredAgeMin, setPreferredAgeMin] = useState(18);
  const [preferredAgeMax, setPreferredAgeMax] = useState(35);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Bio & Preferences</Text>

      {/* Bio */}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Write a short bio..."
        placeholderTextColor="#6b7280"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      {/* Looking For */}
      <TextInput
        style={styles.input}
        placeholder="Looking for (e.g., friendship, relationship)"
        placeholderTextColor="#6b7280"
        value={lookingFor}
        onChangeText={setLookingFor}
      />

      {/* Preferred Age Range */}
      <Text style={styles.label}>
        Preferred Age Range: {preferredAgeMin} - {preferredAgeMax}
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={18}
        maximumValue={60}
        step={1}
        value={preferredAgeMin}
        onValueChange={setPreferredAgeMin}
        minimumTrackTintColor="#2563eb"
        maximumTrackTintColor="#6b7280"
      />
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={18}
        maximumValue={60}
        step={1}
        value={preferredAgeMax}
        onValueChange={setPreferredAgeMax}
        minimumTrackTintColor="#2563eb"
        maximumTrackTintColor="#6b7280"
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
            navigation.navigate("EditImages", {
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
              smoking,
              drinking,
              hasChildren,
              wantsChildren,
              willingToRelocate,
              relationshipStatus,
              bio,
              lookingFor,
              preferredAge: [preferredAgeMin, preferredAgeMax],
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
  label: {
    color: "white",
    marginBottom: 8,
    fontWeight: "600",
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
