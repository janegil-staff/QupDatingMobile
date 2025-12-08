import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchProfile = async () => {
        const storedEmail = await SecureStore.getItemAsync("userEmail");
      try {
        const res = await fetch(
          `https://qup.dating/api/mobile/profile?email=${storedEmail}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>No profile data found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* Location */}
      <Text style={styles.location}>
        {user.location?.name} ({user.location?.country})
      </Text>

      {/* Bio */}
      <View style={styles.bioBox}>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      {/* Gallery */}
      <ScrollView horizontal style={{ marginVertical: 10 }}>
        {user.images?.map((img) => (
          <Image
            key={img._id}
            source={{ uri: img.url }}
            style={styles.galleryImage}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  bioBox: {
    backgroundColor: "#1f2937",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    width: "100%",
  },
  bio: {
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#dc2626",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
