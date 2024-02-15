import { colors } from "./colors";
import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "@/theme/components/button";

export const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, Roboto, sans-serif"
  },
  colors,
  components: { Button: buttonTheme, }
});
