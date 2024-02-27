import { DataList } from "@/components/DataList";
import { Rating } from "@/components/Rating";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

export const TopContent = () => {

  const list = [
    {
      title: "Водитель: ",
      value: "Искандар Фазлиддинов",
    },
    {
      title: "Предлагаемая сумма: ",
      value: "380 тыс. UZS",
    },
    {
      title: "Модель транспорта: ",
      value: "Грузовик MAH 1932, A 010 AA 00 RUS",
    },
    {
      title: "Рейтинг водителя: ",
      value: <Rating value={4} title="4.0" />,
    },
  ];

  return <Box p="24px" bgColor="baseWhite" borderRadius="12px" mb="16px">
    <Heading mb="20px" size="md">Самарканд - Бухоро <Text as="span" color="brand.500">1235.56 km</Text></Heading>
    <DataList list={list} />
    <Button maxW="278px" mt="20px">Показать номер</Button>
  </Box>;
};
