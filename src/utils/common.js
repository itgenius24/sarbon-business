const rootFontSize = 16;

export const rem = (px) => {
  return px ? `${(Math.abs(px) / rootFontSize).toFixed(3)}rem` : "0rem";
};
