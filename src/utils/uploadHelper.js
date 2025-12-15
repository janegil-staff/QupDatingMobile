const uploadImages = async (uris) => {
  const formData = new FormData();
  uris.forEach((uri, idx) => {
    formData.append("images", {
      uri,
      name: `image_${idx}.jpg`,
      type: "image/jpeg",
    });
  });

  const res = await fetch("https://qup.dating/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.images; // array of { url, public_id }
};
