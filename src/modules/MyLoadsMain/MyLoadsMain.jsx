"use client";

import { Container } from "@/components/Container";
import { Box, Heading } from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "./components/TopFilter";

export const MyLoadsMain = () => {

  const { allCargo } = useMyLoadsMainProps();

  return <Box py="40px">
    <Container>
      <Heading size="md" mb="24px">Мои грузы</Heading>
      <TopFilter />
      <Box display="flex" flexDirection="column" rowGap="16px">
        {
          allCargo?.map(cargo => <LoadsCard key={cargo.id} {...cargo} />)
        }
      </Box>
    </Container>
  </Box>;
};
