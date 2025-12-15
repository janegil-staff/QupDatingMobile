import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";

export default function EditReviewScreen({ navigation, route }) {
  // Collect all data passed from previous steps
  const {
    name, email, gender, birthdate, location,
    occupation, education, religion, bodyType, appearance,
    smoking, drinking, hasChildren, wantsChildren,
    willingToRelocate, relationshipStatus,
    bio, lookingFor, preferredAge,
    images = [], profileImage
  } = route.params || {};

  const handleSubmit = () => {
    // TODO: send payload to backend /api/mobile/update
    const payload = {
      name, email, gender, birthdate, location,
      occupation, education, religion, bodyType, appearance,
      smoking, drinking, hasChildren, wantsChildren,
      willingToRelocate, relationshipStatus,
      bio, lookingFor, preferredAge,
      images, profileImage,
    };
    console.log("Submitting updated profile:", payload);
    // navigation.navigate("Profile"); // go back to profile after save
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.heading}>Review & Save</Text>

      {/* Profile image */}
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      )}

      {/* Summary fields */}
      <Text style={styles.label}>Name: <Text style={styles.value}>{name}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{email}</Text></Text>
      <Text style={styles.label}>Gender: <Text style={styles.value}>{gender}</Text></Text>
      <Text style={styles.label}>Birthdate: <Text style={styles.value}>{birthdate?.toString()}</Text></Text>
      <Text style={styles.label}>Location: <Text style={styles.value}>{location}</Text></Text>

      <Text style={styles.label}>Occupation: <Text style={styles.value}>{occupation}</Text></Text>
      <Text style={styles.label}>Education: <Text style={styles.value}>{education}</Text></Text>
      <Text style={styles.label}>Religion: <Text style={styles.value}>{religion}</Text></Text>
      <Text style={styles.label}>Body Type: <Text style={styles.value}>{bodyType}</Text></Text>
      <Text style={styles.label}>Appearance: <Text style={styles.value}>{appearance}</Text></Text>

      <Text style={styles.label}>Smoking: <Text style={styles.value}>{smoking}</Text></Text>
      <Text style={styles.label}>Drinking: <Text style={styles.value}>{drinking}</Text></Text>
      <Text style={styles.label}>Has Children: <Text style={styles.value}>{hasChildren}</Text></Text>
      <Text style={styles.label}>Wants Children: <Text style={styles.value}>{wantsChildren}</Text></Text>
      <Text style={styles.label}>Willing to Relocate: <Text style={styles.value}>{willingToRelocate}</Text></Text>
      <Text style={styles.label}>Relationship Status: <Text style={styles.value}>{relationshipStatus}</Text></Text>

      <Text style={styles.label}>Bio: <Text style={styles.value}>{bio}</Text></Text>
      <Text style={styles.label}>Looking For: <Text style={styles.value}>{lookingFor}</Text></Text>
      <Text style={styles.label}>Preferred Age: <Text style={styles.value}>{preferredAge?.join(" - ")}</Text></Text>

      {/* Gallery preview */}
      <Text style={styles.label}>Images:</Text>
      <ScrollView horizontal style={{ marginVertical: 10 }}>
        {images.map((img, idx) => (
          <Image key={idx} source={{ uri: img.uri }} style={styles.galleryImage} />
        ))}
      </ScrollView>

      {/* Action buttons */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>✅ Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 20,
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
    fontWeight: "600",
  },
  value: {
    color: "gray",
    fontWeight: "400",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
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
  saveButton: {
    backgroundColor: "#16a34a",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
