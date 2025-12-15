import * as SecureStore from "expo-secure-store";

export async function saveProfile(updates) {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    const res = await fetch("https://qup.dating/api/mobile/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    console.error("Failed to save profile", err);
    throw err;
  }
}

/**
 * Prefill a form object with user data from the backend.
 * Ensures all expected fields exist (no undefined errors)
 */
export function prefillProfile(user) {
  if (!user) return {};
  return {
    name: user.name || "",
    education: user.education || "",
    religion: user.religion || "",
    relationship: user.relationship || "",
    children: user.children || "",
    exercise: user.exercise || "",
    smoking: user.smoking || "",
    drinking: user.drinking || "",
    bio: user.bio || "",
    profileImage: user.profileImage || "",
    images: user.images || [], // array of { url, public_id }
    appearance: user.appearance || "",
    bodyType: user.bodyType || "",
    height: user.height || "",
    tags: user.tags || [],
    lookingFor: user.lookingFor || "",
    willingToRelocate: user.willingToRelocate || false,
  };
}
