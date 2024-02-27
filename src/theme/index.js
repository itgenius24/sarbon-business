import { colors } from "./colors";
import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "@/theme/components/button";
import { headingTheme } from "@/theme/components/heading";
import { modalTheme } from "@/theme/components/modal";

export const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, Roboto, sans-serif"
  },
  colors,
  components: {
    Button: buttonTheme,
    Heading: headingTheme,
    Modal: modalTheme
  }
});
