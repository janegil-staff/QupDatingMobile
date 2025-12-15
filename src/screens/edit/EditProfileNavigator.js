import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Step0Basic from "./Step0Basic";
import Step1Appearance from "./Step1Appearance";
import Step2Lifestyle from "./Step2Lifestyle";
import Step3Habits from "./Step3Habits";
import Step4Bio from "./Step4Bio";
import Step5Images from "./Step5Images";
import { useToast } from "../components/ToastProvider";

export default function EditProfileNavigator() {
  const { showToast } = useToast();

  const [step, setStep] = useState(0);
  const totalSteps = 6;
  const [loading, setLoading] = useState(true);

  // Safe default form object
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    gender: "",
    occupation: "",
    appearance: "",
    lifestyle: "",
    habits: "",
    bio: "",
    images: [],
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        setForm((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveStepData = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Save failed");

      showToast("Step data saved successfully", "success");
    } catch (err) {
      showToast("Failed to save step data", "error");
    }
  };

  const next = async () => {
    await saveStepData();
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#ff69b4"
        style={{ marginTop: 50 }}
      />
    );
  }

  const steps = [
    <Step0Basic form={form} setField={setField} />,
    <Step1Appearance form={form} setField={setField} />,
    <Step2Lifestyle form={form} setField={setField} />,
    <Step3Habits form={form} setField={setField} />,
    <Step4Bio form={form} setField={setField} />,
    <Step5Images form={form} setField={setField} />,
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${((step + 1) / totalSteps) * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        Step {step + 1} of {totalSteps}
      </Text>

      {/* Step content */}
      {steps[step]}

      {/* Navigation buttons */}
      <View style={styles.navRow}>
        {step > 0 && (
          <TouchableOpacity onPress={prev} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < totalSteps - 1 ? (
          <TouchableOpacity onPress={next} style={styles.nextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={saveStepData} style={styles.saveButton}>
            <Text style={styles.saveText}>Save Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    height: 10,
    backgroundColor: "#374151",
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ff69b4",
  },
  progressText: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  backButton: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  backText: { color: "#374151", fontWeight: "600" },
  nextButton: {
    backgroundColor: "#ff69b4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextText: { color: "white", fontWeight: "600" },
  saveButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveText: { color: "white", fontWeight: "600" },
});
