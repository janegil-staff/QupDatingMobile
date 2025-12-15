// utils/capitalizeLabel.js
export function capitalizeLabel(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
