import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function EditImagesScreen({ navigation, route }) {
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
    bio,
    lookingFor,
    preferredAge,
  } = route.params || {};

  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImages([...images, { uri }]);
      if (!profileImage) setProfileImage(uri); // first image becomes profile
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Images</Text>

      {/* Profile image */}
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      ) : (
        <Text style={styles.placeholder}>No profile image selected</Text>
      )}

      {/* Gallery */}
      <FlatList
        data={images}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.galleryImage} />
        )}
        style={{ marginVertical: 20 }}
      />

      {/* Add image button */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📷 Add Image</Text>
      </TouchableOpacity>

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
            navigation.navigate("EditReview", {
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
              preferredAge,
              images,
              profileImage,
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  placeholder: {
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
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
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
