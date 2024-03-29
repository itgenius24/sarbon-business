import { useTranslation } from "@/app/i18n/client";
import { DataList } from "@/components/DataList";
import { Rating } from "@/components/Rating";
import { useGetLang } from "@/hooks/useGetLang";
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
  status,
  permission,
  currency,
}) => {

  const [showNumber, setShowNumber] = useState(false);

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const list = [
    {
      title: t("Водитель: "),
      value: userName,
    },
    {
      title: t("Модель транспорта: "),
      value: transportModel,
    },
    {
      title: t("Предлагаемая сумма: "),
      value: proposedAmount + " " + currency,
    },
    {
      title: t("Рейтинг водителя: "),
      value: <Rating value={Math.round(rating)} />,
    },
    {
      title: t("Предоплата: "),
      value: `${prepayment} ${permission === "in_percentages" ? "%" : currency}`,
    },
    {
      title: t("Оплата после завершения: "),
      value: `${paymentAfterFinish} ${permission === "in_percentages" ? "%" : currency}`,
    },
    {
      title: t("Комментария водителя: "),
      value: driverComment,
      grow: true,
    },
  ];

  return <Box p="24px" bgColor="baseWhite" borderRadius="12px" mb="16px">
    <Heading mb="20px" size="md">{address1} - {address2} <Text as="span" color="brand.500">1235.56 km</Text></Heading>
    <DataList list={list} />
    {
      status === "performed" && <Button maxW="278px" mt="20px" onClick={() => setShowNumber(!showNumber)}>
        { showNumber ? phoneNumber : t("Показать номер") }
      </Button>
    }
  </Box>;
};
