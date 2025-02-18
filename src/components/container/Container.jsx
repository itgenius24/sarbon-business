import { Container as ChakraContainer } from "@chakra-ui/react";

export const ContainerNav = ({ children, ...props }) => {

  return <ChakraContainer maxW="98%" width="100%" {...props}>
    {children}
  </ChakraContainer>;
};
