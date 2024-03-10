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
  phoneNumber,
  prepayment,
  paymentAfterFinish,
  driverComment,
}) => {

  const [showNumber, setShowNumber] = useState(false);

  const list = [
    {
      title: "Водитель: ",
      value: userName,
    },
    {
      title: "Модель транспорта: ",
      value: transportModel,
    },
    {
      title: "Предлагаемая сумма: ",
      value: proposedAmount,
    },
    {
      title: "Рейтинг водителя: ",
      value: <Rating value={Math.round(rating)} />,
    },
    {
      title: "Предоплата: ",
      value: prepayment,
    },
    {
      title: "Оплата после завершения: ",
      value: paymentAfterFinish,
    },
    {
      title: "Комментария водителя: ",
      value: driverComment,
      grow: true,
    },
  ];

  return <Box p="24px" bgColor="baseWhite" borderRadius="12px" mb="16px">
    <Heading mb="20px" size="md">{address2} - {address1} <Text as="span" color="brand.500">1235.56 km</Text></Heading>
    <DataList list={list} />
    <Button maxW="278px" mt="20px" onClick={() => setShowNumber(!showNumber)}>
      {
        showNumber ? phoneNumber : "Показать номер"
      }
    </Button>
  </Box>;
};
