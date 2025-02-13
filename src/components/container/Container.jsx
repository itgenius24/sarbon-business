import { Container as ChakraContainer } from "@chakra-ui/react";

export const ContainerNav = ({ children, ...props }) => {

  return <ChakraContainer maxW="1744px" width="100%" {...props}>
    {children}
  </ChakraContainer>;
};
