import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function EditHabitsScreen({ navigation, route }) {
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
  } = route.params || {};

  const [smoking, setSmoking] = useState(null);
  const [drinking, setDrinking] = useState(null);
  const [hasChildren, setHasChildren] = useState(null);
  const [wantsChildren, setWantsChildren] = useState(null);
  const [willingToRelocate, setWillingToRelocate] = useState(null);
  const [relationshipStatus, setRelationshipStatus] = useState(null);

  const toggleOption = (setter, value) => setter(value);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Habits & Family</Text>

      {/* Smoking */}
      <Text style={styles.label}>Smoking</Text>
      <View style={styles.row}>
        {["Yes", "No", "Occasionally"].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.option, smoking === opt && styles.selected]}
            onPress={() => toggleOption(setSmoking, opt)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Drinking */}
      <Text style={styles.label}>Drinking</Text>
      <View style={styles.row}>
        {["Yes", "No", "Socially"].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.option, drinking === opt && styles.selected]}
            onPress={() => toggleOption(setDrinking, opt)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Has Children */}
      <Text style={styles.label}>Has Children</Text>
      <View style={styles.row}>
        {["Yes", "No"].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.option, hasChildren === opt && styles.selected]}
            onPress={() => toggleOption(setHasChildren, opt)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Wants Children */}
      <Text style={styles.label}>Wants Children</Text>
      <View style={styles.row}>
        {["Yes", "No", "Maybe"].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.option, wantsChildren === opt && styles.selected]}
            onPress={() => toggleOption(setWantsChildren, opt)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Willing to Relocate */}
      <Text style={styles.label}>Willing to Relocate</Text>
      <View style={styles.row}>
        {["Yes", "No"].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.option,
              willingToRelocate === opt && styles.selected,
            ]}
            onPress={() => toggleOption(setWillingToRelocate, opt)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Relationship Status */}
      <Text style={styles.label}>Relationship Status</Text>
      <View style={styles.row}>
        {["Single", "Divorced", "Widowed", "Complicated"].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.option,
              relationshipStatus === opt && styles.selected,
            ]}
            onPress={() => toggleOption(setRelationshipStatus, opt)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
            navigation.navigate("EditBio", {
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
  label: {
    color: "white",
    marginBottom: 8,
    marginTop: 12,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  option: {
    backgroundColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: "#2563eb",
  },
  optionText: {
    color: "white",
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
