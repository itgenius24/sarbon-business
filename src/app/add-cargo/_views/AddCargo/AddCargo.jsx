import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Button, Heading } from "@chakra-ui/react";
import { CargoDetail } from "../../_components/CargoDetail";
import { Stages } from "../../_components/Stages";
import { useAddCargoProps } from "./useAddCargoProps";
import { AddCargoProvider } from "../../_providers";

export const AddCargo = () => {

  const addCargoProps = useAddCargoProps();

  return <AddCargoProvider value={addCargoProps}>
    <Box pt="48px" pb="128px">
      <Container height="100%">
        <Box as="article" height="100%" display="flex" alignItems="flex-start" columnGap="32px">
          <Box flexGrow={1} maxW="900px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="32px">
              <Heading size="md">Добавить груз</Heading>
              <Box display="flex" columnGap="12px">
                <Button leftIcon={<PlusIcon />} size="sm" >Заполнить из шаблона</Button>
                <Button leftIcon={<DeleteIcon />} variant="secondaryWhite" size="sm" >Очистить форму</Button>
              </Box>
            </Box>
            <CargoDetail />
          </Box>
          <Stages />
        </Box>
      </Container>
    </Box>
  </AddCargoProvider>;
};
