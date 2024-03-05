import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  width: "100%",
  bgColor: "transparent",
  color: "primary",
  border: "1px solid #007AFF",
  borderRadius: "8px",
});

const outlineError = defineStyle({
  width: "100%",
  bgColor: "transparent",
  color: "#B42318",
  border: "1px solid #FDA29B",
  borderRadius: "8px",
});

const reset = defineStyle({
  height: "auto",
  padding: "0",
  fontWeight: "600",
  color: "primary",
  fontSize: "14px",
  lineHeight: "20px",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: 8,
});

const solid = defineStyle({
  width: "100%",
  bgColor: "primary",
  color: "baseWhite",
  border: "1px solid primary",
  borderRadius: "8px",
  _hover: { bgColor: "primaryText", color: "baseWhite" },
  _active: { bgColor: "primaryText", color: "baseWhite" },
  _disabled: { bgColor: "primary", color: "baseWhite", cursor: "not-allowed" },
});

const secondary = defineStyle({
  width: "100%",
  bgColor: "brand.100",
  color: "brand.500",
  border: "1px solid brand.300",
  borderRadius: "8px",
});

const secondaryWhite = defineStyle({
  width: "100%",
  bgColor: "baseWhite",
  color: "brand.700",
  border: "1px solid brand.300",
  borderRadius: "8px",
});

const sm = defineStyle({
  height: "40px",
  padding: "10px 16px",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "20px",
});

const md = defineStyle({
  padding: "12px 20px",
  height: "48px",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
});

const variants = {
  outline,
  reset,
  solid,
  secondary,
  secondaryWhite,
  outlineError,
};

const sizes = {
  sm,
  md
};

const theme = { variants, sizes };

export const buttonTheme = defineStyleConfig(theme);
