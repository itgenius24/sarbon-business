import { Box, Heading } from "@chakra-ui/react";
import { CargoForm } from "../CargoForm";
import { DeadlineForm } from "../DeadlineForm";
import { TransportDetail } from "../TransportDetail";
import { LoadingForm } from "../LoadingForm";

export const CargoDetail = () => {

  return <Box as="article" borderRadius="12px" padding="24px" bgColor="baseWhite">
    <Heading size="sm">Детали груза</Heading>
    <CargoForm />
    <DeadlineForm />
    <LoadingForm />
    <TransportDetail />
  </Box>;
};
