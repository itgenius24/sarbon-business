export function normalizeName(name) {
  let trimmedName = name?.trim() || ``;

  let capitalizedName = trimmedName
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return capitalizedName;
}
