import { PlusIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { TextField } from "@/components/TextField";
import { Box, Button, Heading } from "@chakra-ui/react";

export default function DistanceCalculation() {

  return <Container py="40px">
    <Heading size="md" mb="24px">Расчет расстояния</Heading>
    <Box p="24px" bgColor="baseWhite" borderRadius="12px">
      <Box display="flex" mb="20px" alignItems="center" justifyContent="space-between">
        <Heading size="sm" fontSize="18px" lineHeight="28px" fontWeight="600">Детали груза</Heading>
        <Button variant="reset" leftIcon={<PlusIcon color="#007aff" />}>Добавить доп. адрес</Button>
      </Box>
      <Box display="flex" columnGap="16px" mb="20px">
        <TextField label="Откуда" placeholder="Введите город, страну" />
        <TextField label="Куда" placeholder="Введите город, страну" />
      </Box>
    </Box>
  </Container>;
}
