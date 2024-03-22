"use client";

import { Box } from "@chakra-ui/react";
import { MainContentHeader } from "../../(components)/MainContentHeader";
import { SearchList } from "../../(components)/SearchList";
import { useWantBuyProps } from "./useWantBuyProps";
import { MainContentCard } from "@/components/MainContentCard";

export default function WantBuy() {

  const { dropDownProps, carsList, isLoading, } = useWantBuyProps();

  return <Box>
    <MainContentHeader title="Хочу купить" />

    <MainContentCard as="form">
      <SearchList
        carsList={carsList}
        dropDownProps={dropDownProps}
        isLoading={isLoading}
      />
    </MainContentCard>
  </Box>;
}
