"use client";

import { Container } from "@/components/Container";
import { TopContentPerfomet } from "../Cargo/components/TopContentPerfomet/TopContentPerfomet";
import { Box, Flex, Heading, Tab, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { useState } from "react";
import { ArrowIcon } from "@/assets/icons/icons";
import { useGetOffer } from "@/services/api";
import authStore from "@/store/auth.store";
import Card from "./components/Card/Card";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const PerformedModule = () => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");
  const [tab, setTab] = useState(`tab1`);
  const getOfferCount = useGetOffer(
    {
      data: JSON.stringify({
        firm_id: authStore.userData.firm_id,
        with_relations: true,
        provisions: ["archive"],
      }),
    },
    { enabled: Boolean(tab === `tab2`) }
  );

  console.log(`getOfferCount`, getOfferCount?.data);

  return (
    <Container my="40px">
      <Flex width={"100%"} justifyContent={"space-between"}>
        <Heading
          size={isLargerThan845 ? "md" : "sm"}
          mb={isLargerThan845 ? "24px" : "12px"}
        >
          {t("Мои заказы")}
        </Heading>
      </Flex>
      <Flex className={cls.btnWrp}>
        <Box
          className={tab === `tab1` ? cls.tabActive : cls.tab}
          onClick={() => setTab(`tab1`)}
        >
          В исполнение
        </Box>
        <Box
          className={tab === `tab2` ? cls.tabActive : cls.tab}
          onClick={() => setTab(`tab2`)}
        >
          Завершенные
        </Box>
      </Flex>
      {tab === `tab1` ? (
        <TopContentPerfomet />
      ) : (
        <Box>
          <Flex
            p={"10px 36px"}
            justifyContent={"space-between"}
            mt={"32px"}
            width={"100%"}
          >
            <p className={cls.th}>Откуда забрать</p>
            <p className={cls.th}>Куда</p>
            <p className={cls.th}>Груз</p>
            <p className={cls.th}>Транспорт</p>
            <p className={cls.th}>Водитель</p>
            <Flex
              gap={2}
              cursor={`pointer`}
              className={cls.th}
              justifyContent={`flex-start`}
              alignItems={`center`}
            >
              <p>Стомость</p>
            </Flex>
            <p className={cls.th}>Заказчик</p>
          </Flex>
         
          {getOfferCount.isLoading ? (
            <LoadingSpinner />
          ) : getOfferCount?.data?.count > 0 ? (
            getOfferCount?.data?.response?.map((item) => (
              <Card key={item?.guid} item={item} />
            ))
          ) : (
            <Flex
              className={cls.noData}
              width={`100%`}
              height={`170px`}
              alignItems={`center`}
              justifyContent={`center`}
            >
              No data
            </Flex>
          )}
        </Box>
      )}
    </Container>
  );
};
