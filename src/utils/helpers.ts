// Small pure functions with no side effects.
// Pure = same input always gives same output. Easy to test.

// Takes a full name like "Alice Johnson" → returns "AJ"

// This file is for small helper functions that are used in multiple places.

export function getInitials(name: string): string {
  return name
    .split(" ") // ["Alice", "Johnson"]
    .map((part) => part[0]) // ["A", "J"]
    .join("") // "AJ"
    .slice(0, 2) // safety: max 2 chars
    .toUpperCase();
}

// Returns a random avatar color class from a preset list.
// We pick based on the user's id so the color is stable (not random on every render).
const AVATAR_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-orange-100 text-orange-800",
  "bg-teal-100 text-teal-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-amber-100 text-amber-800",
  "bg-pink-100 text-pink-800",
];

// This function is used when creating a new user to assign them an avatar color.
export function pickAvatarColor(id: number): string {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

// Returns the current month + year as a string, e.g. "May 2025"
export function getCurrentMonthYear(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
