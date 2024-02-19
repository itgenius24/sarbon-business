import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  color: "brand.900",
  fontSize: "30px",
  lineHeight: "38px",
  fontWeight: "600",
});

const defaultProps = defineStyle({
  color: "brand.900",
  fontSize: "30px",
  lineHeight: "38px",
  fontWeight: "600",
});

const md = defineStyle({
  color: "brand.900",
  fontSize: "30px",
  lineHeight: "38px",
  fontWeight: "600",
});

const sm = defineStyle({
  color: "brand.900",
  fontSize: "20px",
  fontWeight: 600,
  lineHeight: "30px",
});

const sizes = { md, sm };

const theme = {
  baseStyle,
  defaultProps,
  sizes,
};

export const headingTheme = defineStyleConfig(theme);
