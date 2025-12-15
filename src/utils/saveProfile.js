export async function saveProfile(updates) {
  const token = await SecureStore.getItemAsync("authToken");
  const res = await fetch("https://qup.dating/api/mobile/me", {
    method: "PATCH", // or PUT depending on backend
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates), // ✅ flat fields
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
