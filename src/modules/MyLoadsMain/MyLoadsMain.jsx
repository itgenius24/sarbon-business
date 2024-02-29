"use client";

import { Container } from "@/components/Container";
import { Box, CircularProgress, Heading } from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "./components/TopFilter";

export const MyLoadsMain = () => {

  const { allCargo, isLoading, onFilterChange } = useMyLoadsMainProps();

  return <Box py="40px">
    <Container>
      <Heading size="md" mb="24px">Мои грузы</Heading>
      <TopFilter onChange={onFilterChange} />
      <Box display="flex" flexDirection="column" rowGap="16px">
        {
          isLoading
          ? <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress isIndeterminate />
          </Box>
          : allCargo?.map(cargo => <LoadsCard key={cargo.guid} {...cargo} />)
        }
      </Box>
    </Container>
  </Box>;
};
