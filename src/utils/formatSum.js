export const formatSum = (code, value) => {
  const format = new Intl.NumberFormat("de-DE", {
    style: "currency",
    // minimumFractionDigits: 3,
    // maximumFractionDigits: 3,
    currency: code,
  });

  return format.format(value);
};
