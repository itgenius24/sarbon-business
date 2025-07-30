"use client";

import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { MainContentHeader } from "../../(components)/MainContentHeader";
import { AdList } from "../../(components)/AdList";
import { useMyAdProps } from "./useMyAdProps";
import { MainContentCard } from "@/components/MainContentCard";
import { BackArrow } from "@/assets/icons/icons";
import { useTranslation } from "react-i18next";

export default function MyAd ({ params: { locale } }) {
  const {
    changeTabState,
    carsList,
    isLoading,
    openCreateAdCard,
    tabState,
    back,
  } = useMyAdProps();

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();
  return (
    <Box>
      <MainContentHeader
        title={
          !isLargerThan845 && <Flex as="button" onClick={!isLargerThan845 ? back : () => {}} alignItems="center" >
            <BackArrow />
            <span>{t(`Мои обьявления`)}</span>
          </Flex>
        }
      />
      <MainContentCard as="form" >
        <AdList
          handleNoData={openCreateAdCard}
          isLoading={isLoading}
          changeTabState={changeTabState}
          tabState={tabState}
          list={carsList}
          locale={locale}
        />
      </MainContentCard>
    </Box>
  );
}
