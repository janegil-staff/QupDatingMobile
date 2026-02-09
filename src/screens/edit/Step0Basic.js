import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";

export default function Step0Basic({ form, setForm, setField, navigation }) {
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMe = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        const res = await fetch("https://qup.dating/api/mobile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setField("name", data.user.name || "");
        setField("birthdate", data.user.birthdate || "");
        setField("gender", data.user.gender || "");
        setField("occupation", data.user.occupation || "");
        setField("bio", data.user.bio || "");
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const handleNext = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      await fetch("https://qup.dating/api/mobile/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      // Navigate to next step
      navigation.navigate("EditAppearance", {
        form,
        setForm,
        setField,
        navigation,
      });
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={["#0f0c29", "#1a1a2e", "#16213e"]}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#ff69b4" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#0f0c29", "#1a1a2e", "#16213e"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Progress.Bar
          progress={0}
          width={null}
          color="#ff69b4"
          unfilledColor="rgba(255,255,255,0.08)"
          borderColor="rgba(255,255,255,0.1)"
          style={styles.progress}
        />
        {/* Name */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={form?.name ?? ""}
            onChangeText={(val) => setField("name", val)}
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="rgba(255,255,255,0.35)"
          />
        </View>
        {/* Birthdate */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Birthdate</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              style={{
                color: form?.birthdate
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.35)",
              }}
            >
              {form?.birthdate || "Select birthdate"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={form?.birthdate ? new Date(form.birthdate) : new Date()}
              mode="date"
              display="spinner"
              textColor="white"
              themeVariant="dark"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setField("birthdate", date.toISOString().split("T")[0]);
                }
              }}
            />
          )}
        </View>
        {/* Gender */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {["Male", "Female"].map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderButton,
                  form?.gender?.toLowerCase() === g.toLowerCase() &&
                    styles.genderActive,
                ]}
                onPress={() => setField("gender", g)}
              >
                <Text
                  style={[
                    styles.genderText,
                    form?.gender?.toLowerCase() === g.toLowerCase() &&
                      styles.genderTextActive,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Occupation */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Occupation</Text>
          <TextInput
            value={form?.occupation ?? ""}
            onChangeText={(val) => setField("occupation", val)}
            style={styles.input}
            placeholder="Your occupation"
            placeholderTextColor="rgba(255,255,255,0.35)"
          />
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            value={form?.bio ?? ""}
            onChangeText={(val) => setField("bio", val)}
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Tell us a bit about yourself"
            placeholderTextColor="rgba(255,255,255,0.35)"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={["rgba(255,105,180,0.9)", "rgba(255,60,150,0.9)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    marginBottom: 20,
  },
  glassCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.9)",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  genderActive: {
    backgroundColor: "rgba(255,105,180,0.35)",
    borderColor: "rgba(255,105,180,0.6)",
  },
  genderText: {
    color: "rgba(255,255,255,0.5)",
    fontWeight: "600",
  },
  genderTextActive: {
    color: "white",
  },
  nextButton: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#ff69b4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  nextGradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  nextText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
