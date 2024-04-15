import cls from "./styles.module.scss";
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
  distance,
  city1,
  city2
}) => {

  const [showNumber, setShowNumber] = useState(false);

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const list = [
    {
      title: t("Водитель: "),
      value: userName || "",
    },
    {
      title: t("Модель транспорта: "),
      value: transportModel || "",
    },
    {
      title: t("Предлагаемая сумма: "),
      value: proposedAmount ? proposedAmount + " " + currency : "",
    },
    {
      title: t("Рейтинг водителя: "),
      value: <Rating value={Math.round(rating)} />,
    },
    {
      title: t("Предоплата: "),
      value: `${prepayment ? prepayment : ""} ${permission === "in_percentages" ? "%" : currency ? currency : ""}`,
    },
    {
      title: t("Оплата после завершения: "),
      value: `${paymentAfterFinish ? paymentAfterFinish : ""} ${permission === "in_percentages" ? "%" : currency || ""}`,
    },
    {
      title: t("Комментария водителя: "),
      value: driverComment || "",
      grow: true,
    },
  ];

  return <Box p="24px" bgColor="baseWhite" borderRadius="12px" mb="16px">
    <h2 className={cls.address}>
      <span className={cls.addressText}>
        <span className={cls.addressCountry}>
          <span className={cls.addressCity}>{city1}</span>
          <span>{address1}</span>
        </span>
        <span>-&gt;</span>
        <span className={cls.addressCountry}>
          <span className={cls.addressCity}>{city2}</span>
          <span>{address2}</span>
        </span>
        {/* {address_id_data?.name} -&gt; {address_id_2_data?.name} */}
      </span>
      <Text as="span" color="brand.500"> {distance} km</Text>
    </h2>
    <DataList list={list} />
    {
      status === "performed" && <Button maxW="278px" mt="20px" onClick={() => setShowNumber(!showNumber)}>
        { showNumber ? phoneNumber : t("Показать номер") }
      </Button>
    }
  </Box>;
};
