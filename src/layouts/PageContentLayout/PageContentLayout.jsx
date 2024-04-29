import { Box } from "@chakra-ui/react";

export const PageContentLayout = ({ children }) => {
  return <Box className="fade-in" maxW="908px" mx="auto">
    {children}
  </Box>;
};
