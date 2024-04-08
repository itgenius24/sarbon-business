export const formatSum = (code, value) => {
  if (!value || !code) return "";
  const format = new Intl.NumberFormat("de-DE", {
    style: "currency",
    // minimumFractionDigits: 3,
    // maximumFractionDigits: 3,
    currency: code,
  });

  return format.format(value);
};
