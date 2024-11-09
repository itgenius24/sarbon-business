import { Container as ChakraContainer } from "@chakra-ui/react";

export const Container = ({ children, ...props }) => {

  return  <ChakraContainer maxW="1458px" width="100%" {...props}>
    {children}
  </ChakraContainer>;
};
