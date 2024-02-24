"use client";

import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Button, Heading } from "@chakra-ui/react";
import { CargoDetail } from "./components/CargoDetail";
import { CargoSetup } from "./components/CargoSetup";
import { Stages } from "./components/Stages";
import { AddCargoProvider } from "./providers";
import { useAddCargoProps } from "./useAddCargoProps";

export const Cargo = () => {

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
                <Button leftIcon={<DeleteIcon />} onClick={() => addCargoProps.reset({})} variant="secondaryWhite" size="sm" >Очистить форму</Button>
              </Box>
            </Box>
            <CargoDetail />
            <CargoSetup />
          </Box>
          <Stages />
        </Box>
        <Box mt="32px">
          <Box display="flex" columnGap="12px" justifyContent="flex-end" maxWidth="900px">
            <Button size="sm" maxWidth="223px" variant="secondaryWhite">Сохранить как шаблон</Button>
            <Button size="sm" maxWidth="223px" onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}>Опубликовать груз</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  </AddCargoProvider>;
};
