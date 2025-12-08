import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditBasicScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState("");

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

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#6b7280"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Gender */}
      <View style={styles.row}>
        {["Male", "Female", "Other"].map((g) => (
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
        <DateTimePicker
          value={birthdate}
          mode="date"
          display="spinner"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setBirthdate(date);
          }}
        />
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
          onPress={() =>
            navigation.navigate("EditLifestyle", {
              name,
              email,
              gender,
              birthdate,
              location,
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
  genderSelected: {
    backgroundColor: "#2563eb",
  },
  genderText: {
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
