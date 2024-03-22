"use client";

import { Box } from "@chakra-ui/react";

import { MainContentHeader } from "../../(components)/MainContentHeader";
import { AdList } from "../../(components)/AdList";
import { useMyAdProps } from "./useMyAdProps";
import { MainContentCard } from "@/components/MainContentCard";

export default function MyAd () {
  const {
    changeTabState,
    carsList,
    isLoading,
    openCreateAdCard,
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
          list={carsList}
        />
      </MainContentCard>
    </Box>
  );
}
