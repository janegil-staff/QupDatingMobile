import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";

function normalizeLocation(input) {
  // naive split by comma
  const parts = input.split(",").map((p) => p.trim());

  return {
    street: parts[0] || "",
    city: parts[3] || "",
    state: parts[4] || "",
    postalCode: parts[5] || "",
    country: parts[6] || "",
  };
}

export default function EditBasicScreen({ navigation, route }) {
  const {
    name: initialName,
    gender: initialGender,
    birthdate: initialBirthdate,
    location: initialLocation,
  } = route.params || {};

  const [name, setName] = useState(initialName || "");

  const [gender, setGender] = useState(initialGender || null);
  const [birthdate, setBirthdate] = useState(
    initialBirthdate ? new Date(initialBirthdate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState(initialLocation || "");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMe = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      const res = await fetch("https://qup.dating/api/mobile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data) {
        setName(data.user.name || "");
        setGender(data.user.gender || null);
        setBirthdate(
          data.user.birthdate ? new Date(data.user.birthdate) : new Date()
        );
        setLocation(data.user.location?.name || "");
      }
    };
    fetchMe();
  }, []);

  async function saveStepData(payload) {
    const token = await SecureStore.getItemAsync("authToken");

    // transform location if it's a string
    let body = { ...payload };
    if (typeof body.location === "string") {
      body.location = normalizeLocation(body.location);
    }

    const res = await fetch("http://localhost:3000/api/mobile/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Basic Information</Text>

      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#6b7280"
        value={name}
        onChangeText={setName}
      />

      {/* Gender */}
      <View style={styles.row}>
        {["male", "female", "other"].map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genderButton, gender === g && styles.genderSelected]}
            onPress={() => setGender(g)}
          >
            <Text style={styles.genderText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Birthdate */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: "white" }}>
          {birthdate ? birthdate.toDateString() : "Select Birthdate"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <View style={{ backgroundColor: "#fff", borderRadius: 8, padding: 10 }}>
          <DateTimePicker
            value={birthdate}
            mode="date"
            display="spinner"
            themeVariant="light"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setBirthdate(date);
            }}
          />
        </View>
      )}

      {/* Location */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor="#6b7280"
        value={location}
        onChangeText={setLocation}
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
          onPress={async () => {
            await saveStepData({
              name,
              gender,
              birthdate,
              location,
            });
            navigation.navigate("EditLifestyle");
          }}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  genderButton: {
    backgroundColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  genderSelected: { backgroundColor: "#2563eb" },
  genderText: { color: "white" },
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
