// utils/normalizeAndCapitalize.js

// Normalize: always store lowercase for consistency
export function normalizeValue(val) {
  return val ? val.toLowerCase() : "";
}

// Capitalize: display nice labels (multi-word safe)
export function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
