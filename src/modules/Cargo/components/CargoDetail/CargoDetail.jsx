import { Box, Heading } from "@chakra-ui/react";
import { CargoForm } from "../CargoForm";
import { DeadlineForm } from "../DeadlineForm";
// import { LoadingForm } from "../LoadingForm";
import { TransportDetail } from "../TransportDetail";
import dynamic from "next/dynamic";

const DynamicLoadingForm = dynamic(async () => import("../LoadingForm"), { ssr: false, });

export const CargoDetail = () => {

  return <Box as="article" borderRadius="12px" padding="24px" bgColor="baseWhite">
    <Heading size="sm">Детали груза</Heading>
    <CargoForm />
    <DeadlineForm />
    <DynamicLoadingForm />
    <TransportDetail />
  </Box>;
};
