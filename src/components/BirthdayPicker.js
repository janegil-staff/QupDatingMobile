import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function BirthdatePicker({ form, setField }) {
  const currentDate = new Date();
  const [birthYear, setBirthYear] = useState(
    String(currentDate.getFullYear() - 18)
  );
  const [birthMonth, setBirthMonth] = useState(
    String(currentDate.getMonth() + 1)
  ); // months are 0-based
  const [birthDay, setBirthDay] = useState(String(currentDate.getDate()));

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        {/* Day Picker */}
        <Picker
          selectedValue={form?.birthDay}
          onValueChange={(val) => setField("birthDay", val)}
          style={styles.picker}
        >
          <Picker.Item label="Day" value="" />
          {[...Array(31)].map((_, i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>

        {/* Month Picker */}
        <Picker
          selectedValue={form?.birthMonth}
          onValueChange={(val) => setField("birthMonth", val)}
          style={styles.picker}
        >
          <Picker.Item label="Month" value="" />
          <Picker.Item label="Jan" value="0" />
          <Picker.Item label="Feb" value="1" />
          <Picker.Item label="Mar" value="2" />
          <Picker.Item label="Apr" value="3" />
          <Picker.Item label="May" value="4" />
          <Picker.Item label="Jun" value="5" />
          <Picker.Item label="Jul" value="6" />
          <Picker.Item label="Aug" value="7" />
          <Picker.Item label="Sep" value="8" />
          <Picker.Item label="Oct" value="9" />
          <Picker.Item label="Nov" value="10" />
          <Picker.Item label="Dec" value="11" />
        </Picker>

        {/* Year Picker */}
        <Picker
          selectedValue={form?.birthYear}
          onValueChange={(val) => setField("birthYear", val)}
          style={styles.picker}
        >
          <Picker.Item label="Year" value="" />
          {[...Array(100)].map((_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <Picker.Item key={year} label={`${year}`} value={`${year}`} />
            );
          })}
        </Picker>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  section: { marginBottom: 20 },
  label: { color: "#ccc", fontSize: 14, marginBottom: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    flex: 1,
    backgroundColor: "#1f2937",
    color: "white",
    borderRadius: 8,
    marginHorizontal: 4,
  },
});
