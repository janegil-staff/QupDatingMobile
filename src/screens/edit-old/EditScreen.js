import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, StyleSheet } from "react-native";

export default function EditScreen() {
  const [form, setForm] = useState(null); // start empty
  const [loading, setLoading] = useState(true);

  const setField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://qup.dating/api/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // if you use cookies/sessions
        });
        const data = await res.json();

        // ✅ initialize form with data from DB
        setForm({
          name: data.name || "",
          birthDay: data.birthDay || "",
          birthMonth: data.birthMonth || "",
          birthYear: data.birthYear || "",
          gender: data.gender || "",
          occupation: data.occupation || "",
          height: data.height || "",
          appearance: data.appearance || "",
          bodyType: data.bodyType || "",
          smoking: data.smoking || "",
          drinking: data.drinking || "",
          relationshipStatus: data.relationshipStatus || "",
          hasChildren: data.hasChildren ?? null,
          wantsChildren: data.wantsChildren ?? null,
          willingToRelocate: data.willingToRelocate ?? null,
          education: data.education || "",
          religion: data.religion || "",
          tags: data.tags || "",
          bio: data.bio || "",
          lookingFor: data.lookingFor || "",
          preferredAgeMin: data.preferredAgeMin || 18,
          preferredAgeMax: data.preferredAgeMax || 99,
          location: data.location || "",
          searchScope: data.searchScope || "",
          images: data.images || [],
          profileImage: data.profileImage || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading || !form) {
    return <ActivityIndicator size="large" color="#ff69b4" />;
  }
  return (
    <ScrollView style={styles.container}>
      {/* Step 0 */}
      {step === 0 && (
        <View style={styles.grid}>
          <Field label="Name">
            <TextInput
              value={form.name}
              onChangeText={(val) => setField("name", val)}
              style={styles.input}
            />
          </Field>
          <Field label="Birthdate">
            <BirthdatePicker form={form} setField={setField} />
          </Field>
          <Field label="Gender">
            <RadioButtonGroup
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
              value={form.gender}
              onChange={(val) => setField("gender", val)}
            />
          </Field>
          <Field label="Occupation">
            <TextInput
              value={form.occupation}
              onChangeText={(val) => setField("occupation", val)}
              style={styles.input}
            />
          </Field>
        </View>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <View style={styles.grid}>
          <Field label="Height (cm)">
            <TextInput
              value={form.height}
              onChangeText={(val) => setField("height", val)}
              style={styles.input}
              keyboardType="numeric"
            />
          </Field>
          <Field label="Appearance">
            <Picker
              selectedValue={form.appearance}
              onValueChange={(val) => setField("appearance", val)}
              style={styles.picker}
            >
              <Picker.Item label="Choose..." value="" />
              <Picker.Item label="Normal" value="Normal" />
              <Picker.Item label="Pretty" value="Pretty" />
              <Picker.Item label="Cute" value="Cute" />
              <Picker.Item label="Handsome" value="Handsome" />
              <Picker.Item label="Stylish" value="Stylish" />
              <Picker.Item label="Unique" value="Unique" />
            </Picker>
          </Field>
          <Field label="Body Type">
            <Picker
              selectedValue={form.bodyType}
              onValueChange={(val) => setField("bodyType", val)}
              style={styles.picker}
            >
              <Picker.Item label="Choose..." value="" />
              <Picker.Item label="Slim" value="Slim" />
              <Picker.Item label="Average" value="Average" />
              <Picker.Item label="Athletic" value="Athletic" />
              <Picker.Item label="Curvy" value="Curvy" />
              <Picker.Item label="Muscular" value="Muscular" />
            </Picker>
          </Field>
        </View>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <View style={styles.grid}>
          {/* Smoking, Drinking, Relationship, Children, Relocate */}
          {/* ... same pattern with Picker */}
        </View>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <View style={styles.grid}>
          {/* Education, Religion, Tags, Bio, Looking For, AgeRangeSlider */}
        </View>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <View style={styles.grid}>
          <Field label="Location Name">
            <ProfileLocation
              handleLocationSelected={(loc) => setField("location", loc)}
              location={form.location}
            />
          </Field>
          <View style={styles.scopeRow}>
            <ScopeButton
              label="🏠 Nearby"
              active={form.searchScope === "Nearby"}
              onPress={() => setField("searchScope", "Nearby")}
            />
            <ScopeButton
              label="🌍 Worldwide"
              active={form.searchScope === "Worldwide"}
              onPress={() => setField("searchScope", "Worldwide")}
            />
          </View>
        </View>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <View style={styles.grid}>
          <ImageUploadGrid
            images={form.images}
            setImages={(imgs) => setForm({ ...form, images: imgs })}
            removeImage={(i) => {}}
            profileImage={form.profileImage}
            setProfileImage={(url) => setForm({ ...form, profileImage: url })}
          />
        </View>
      )}

      {/* Errors */}
      {errors.global && <Text style={styles.error}>{errors.global}</Text>}
      {errors.submit && <Text style={styles.error}>{errors.submit}</Text>}

      {/* Navigation */}
      <View style={styles.navRow}>
        {step > 0 && (
          <TouchableOpacity onPress={prev} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 5 ? (
          <TouchableOpacity onPress={next} style={styles.nextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={saving}
            style={[styles.saveButton, saving && styles.saveDisabled]}
          >
            <Text style={styles.saveText}>
              {saving ? "Saving..." : "Save profile"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

function Field({ label, children }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function ScopeButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.scopeButton, active && styles.scopeSelected]}
    >
      <Text style={styles.scopeText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827", padding: 20 },
  grid: { flexDirection: "column", gap: 12 },
  field: { marginBottom: 15 },
  label: { color: "#ccc", fontSize: 14, marginBottom: 4 },
  input: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: 10,
    borderRadius: 8,
  },
  picker: {
    backgroundColor: "#1f2937",
    color: "white",
    borderRadius: 8,
  },
  scopeRow: { flexDirection: "row", gap: 12, marginTop: 20 },
  scopeButton: {
    flex: 1,
    backgroundColor: "#374151",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  scopeSelected: { backgroundColor: "#ff69b4" },
  scopeText: { color: "white", fontWeight: "600" },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 8,
  },
  backText: { color: "#374151" },
  nextButton: {
    backgroundColor: "#ff69b4",
    padding: 12,
    borderRadius: 8,
  },
  nextText: { color: "white", fontWeight: "600" },
  saveButton: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 8,
  },
  saveDisabled: { backgroundColor: "#9ca3af" },
  saveText: { color: "white", fontWeight: "600" },
  error: { color: "#f87171", fontSize: 12, marginTop: 10 },
});
