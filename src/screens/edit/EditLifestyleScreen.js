import React, { useState } from "react";
import { View } from "react-native";
import Step2Lifestyle from "./Step2Lifestyle";

export default function EditLifestyleScreen({ navigation }) {
  const [form, setForm] = useState({
    diet: "",
    exercise: "",
    smoking: "",
    drinking: "",
  });

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Step2Lifestyle
        form={form}
        setForm={setForm}
        setField={setField}
        navigation={navigation}
      />
    </View>
  );
}
