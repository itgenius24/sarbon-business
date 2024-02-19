import { Box, Heading } from "@chakra-ui/react";
import { CargoForm } from "../CargoForm";

export const CargoDetail = () => {

  return <Box as="article" borderRadius="12px" padding="24px" bgColor="baseWhite">
    <Heading size="sm">Детали груза</Heading>
    <CargoForm />
  </Box>;
};
