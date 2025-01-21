"use client";

import { Container } from "@/components/Container";
import { TopContentPerfomet } from "../Cargo/components/TopContentPerfomet/TopContentPerfomet";
import { Box, Flex, Heading, Tab, useMediaQuery } from "@chakra-ui/react";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { useState } from "react";
import { ArrowIcon } from "@/assets/icons/icons";
import { useGetOffer } from "@/services/api";
import authStore from "@/store/auth.store";
import Card from "./components/Card/Card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useTranslation } from "@/app/i18n/client";

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

  return (
    <Container my="40px">
      <Flex width={"100%"} justifyContent={"space-between"}>
        <Heading
          size={isLargerThan845 ? "md" : "sm"}
          mb={isLargerThan845 ? "24px" : "12px"}
          // color={`var(--primary-text)`}

        >
          {t("Мои заказы")}
        </Heading>
      </Flex>
      <Flex className={cls.btnWrp}>
        <Box
          className={tab === `tab1` ? cls.tabActive : cls.tab}
          onClick={() => setTab(`tab1`)}
        >
          {t("В исполнение")}
        </Box>
        <Box
          className={tab === `tab2` ? cls.tabActive : cls.tab}
          onClick={() => setTab(`tab2`)}
        >
          {t("Завершенные")}
        </Box>
      </Flex>
      {tab === `tab1` ? (
        <>
        <TopContentPerfomet />
        </>
      ) : (
        <Box  overflowX={ isLargerThan845 ? `none`:`scroll`}>
          <Flex
            p={"10px 36px"}
            justifyContent={"space-between"}
            mt={isLargerThan845 ? "32px" : 0}
            width={isLargerThan845  ?`100%`:`1426px`}
          >
            <p className={cls.th}>{t("Откуда забрать")}</p>
            <p className={cls.th}>{t("Куда")}</p>
            <p className={cls.th}>{t("Груз")}</p>
            <p className={cls.th}>{t("Транспорт")}</p>
            <p className={cls.th}>{t("Водитель")}</p>
            <Flex
              gap={2}
              cursor={`pointer`}
              className={cls.th}
              justifyContent={`flex-start`}
              alignItems={`center`}
            >
              <p>{t("Стоимость")}</p>
            </Flex>
            <p className={cls.th}>{t("Заказчик")}</p>
          </Flex>

          {getOfferCount.isLoading ? (
            <LoadingSpinner />
          ) : getOfferCount?.data?.count > 0 ? (
            getOfferCount?.data?.response?.map((item) => (
              <Card isLargerThan845={isLargerThan845} key={item?.guid} item={item} t={t} />
            ))
          ) : (
            <Flex
              className={cls.noData}
              width={`100%`}
              height={`170px`}
              alignItems={`center`}
              justifyContent={`center`}
            >
              {t("Нет данных")}
            </Flex>
          )}
        </Box>
      )}
    </Container>
  );
};
