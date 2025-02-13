import { Container as ChakraContainer } from "@chakra-ui/react";

export const ContainerNav = ({ children, ...props }) => {

  return <ChakraContainer maxW="1440px" width="100%" {...props}>
    {children}
  </ChakraContainer>;
};
