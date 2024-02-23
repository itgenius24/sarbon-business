import { Container } from "@/components/Container";
import { Box, Heading } from "@chakra-ui/react";
import { LoadsCard } from "../../_components/LoadsCard";

export const MyLoadsMain = () => {
  return <Box py="40px">
    <Container>
      <Heading size="md" mb="24px">Мои грузы</Heading>
      <Box display="flex" flexDirection="column" rowGap="16px">
        <LoadsCard />
        <LoadsCard />
        <LoadsCard />
      </Box>
    </Container>
  </Box>;
};
