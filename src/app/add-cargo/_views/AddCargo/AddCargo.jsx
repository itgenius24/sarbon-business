import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Button, Heading } from "@chakra-ui/react";
import { CargoDetail } from "../../_components/CargoDetail";

export const AddCargo = () => {

  return <Container height="100%" >
    <Box as="article" height="100%">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="48px" mb="32px">
        <Heading size="md">Добавить груз</Heading>
        <Box display="flex" columnGap="12px">
          <Button leftIcon={<PlusIcon />} size="sm" >Заполнить из шаблона</Button>
          <Button leftIcon={<DeleteIcon />} variant="secondaryWhite" size="sm" >Очистить форму</Button>
        </Box>
      </Box>
      <CargoDetail />
    </Box>
  </Container>;
};
