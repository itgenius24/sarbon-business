import { Container } from "@/components/Container";
import { Box, Heading } from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "./components/TopFilter";

export const MyLoadsMain = () => {

  const { cargos, onFilterChange, handleDelete } = useMyLoadsMainProps();

  return <Box py="40px">
    <Container>
      <Heading size="md" mb="24px">Мои грузы</Heading>
      <TopFilter onChange={onFilterChange} />
      <Box display="flex" flexDirection="column" rowGap="16px">
        {
          cargos?.length
            ? cargos?.map(cargo => <LoadsCard key={cargo.guid} handleDelete={handleDelete} {...cargo} />)
            : <Heading size="sm" textAlign="center">Ничего не найдено</Heading>
        }
      </Box>
    </Container>
  </Box>;
};
