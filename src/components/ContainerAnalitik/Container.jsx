import { Container as ChakraContainer } from "@chakra-ui/react";

export const ContainerAnalitik = ({ children, ...props }) => {

  return <ChakraContainer maxW="1460px" width="100%" {...props}>
    {children}
  </ChakraContainer>;
};
