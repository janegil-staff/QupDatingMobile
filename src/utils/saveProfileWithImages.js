import * as SecureStore from "expo-secure-store";

export async function saveProfileWithImages(images) {
  // images: array of { uri: localURI | url: existingURL, isNew: boolean }
  try {
    const token = await SecureStore.getItemAsync("authToken");
    const formData = new FormData();

    // Only append new images for upload
    images.forEach((img) => {
      if (img.isNew && img.uri) {
        formData.append("images", {
          uri: img.uri,
          type: "image/jpeg",
          name: "photo.jpg",
        });
      }
    });

    const res = await fetch("https://qup.dating/api/mobile/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json(); // { images: [{ url, public_id }] }

    // Merge uploaded images with existing URLs
    const finalImages = images.map((img) =>
      img.isNew ? data.images.shift() : img
    );

    // Persist to profile
    const patchRes = await fetch("https://qup.dating/api/mobile/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        images: finalImages,
        profileImage: finalImages.find((i) => i.isProfile)?.url,
      }),
    });

    if (!patchRes.ok) throw new Error("Failed to save profile");

    const updated = await patchRes.json();
    return updated;
  } catch (err) {
    console.error("Failed to save profile with images", err);
    throw err;
  }
}
