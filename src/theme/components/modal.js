import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const sizes = definePartsStyle({
  xl: definePartsStyle({
    dialog: {
      width: "100%",
      maxWidth: "805px"
    }
  })
});

export const modalTheme = defineMultiStyleConfig({ sizes });
