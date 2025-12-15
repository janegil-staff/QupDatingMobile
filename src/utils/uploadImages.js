import * as SecureStore from "expo-secure-store";

/**
 * Uploads multiple local image URIs to your backend, which uses Cloudinary.
 * Returns an array of { url, public_id }.
 */
export async function uploadImages(uris = []) {
  if (!uris || uris.length === 0) return [];

  const formData = new FormData();

  uris.forEach((uri, idx) => {
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    formData.append("images", {
      uri,
      name: filename,
      type,
    });
  });

  const token = await SecureStore.getItemAsync("authToken");

  const res = await fetch("https://qup.dating/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${text}`);
  }

  const data = await res.json();
  // returns [{ url, public_id }, ...]
  return data.images || [];
}
