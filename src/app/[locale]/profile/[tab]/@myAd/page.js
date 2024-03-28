"use client";

import { Box } from "@chakra-ui/react";

import { MainContentHeader } from "../../(components)/MainContentHeader";
import { AdList } from "../../(components)/AdList";
import { useMyAdProps } from "./useMyAdProps";
import { MainContentCard } from "@/components/MainContentCard";

export default function MyAd ({ params: { locale } }) {
  const {
    changeTabState,
    carsList,
    isLoading,
    openCreateAdCard,
    tabState
  } = useMyAdProps();

  return (
    <Box>
      <MainContentHeader
        title="Мои обьявления"
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
