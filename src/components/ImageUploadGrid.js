import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ImageUploadGrid({ images = [], onAdd, onRemove }) {
  const renderItem = ({ item, index }) => (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(index)}
      >
        <Ionicons name="close-circle" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Images</Text>

      {/* Grid of images */}
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, idx) => idx.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      {/* Add button */}
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Ionicons name="add" size={28} color="white" />
        <Text style={styles.addText}>Add Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  grid: {
    gap: 12,
  },
  imageWrapper: {
    position: "relative",
    margin: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#1f2937",
  },
  removeButton: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#111827",
    borderRadius: 50,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  addText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
});
