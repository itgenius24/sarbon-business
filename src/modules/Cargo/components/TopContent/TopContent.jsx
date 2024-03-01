import { DataList } from "@/components/DataList";
import { Rating } from "@/components/Rating";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

export const TopContent = ({
  address1,
  address2,
  proposedAmount,
  userName,
  rating,
  transportModel,
  phoneNumber
}) => {

  const [showNumber, setShowNumber] = useState(false);

  const list = [
    {
      title: "Водитель: ",
      value: userName,
    },
    {
      title: "Предлагаемая сумма: ",
      value: proposedAmount,
    },
    {
      title: "Модель транспорта: ",
      value: transportModel,
    },
    {
      title: "Рейтинг водителя: ",
      value: <Rating value={Math.round(rating)} />,
    },
  ];

  return <Box p="24px" bgColor="baseWhite" borderRadius="12px" mb="16px">
    <Heading mb="20px" size="md">{address1} - {address2} <Text as="span" color="brand.500">1235.56 km</Text></Heading>
    <DataList list={list} />
    <Button maxW="278px" mt="20px" onClick={() => setShowNumber(!showNumber)}>
      {
        showNumber ? phoneNumber : "Показать номер"
      }
    </Button>
  </Box>;
};
