"use client";

import { Box, useMediaQuery } from "@chakra-ui/react";
import { MainContentHeader } from "../../(components)/MainContentHeader";
import { SearchList } from "../../(components)/SearchList";
import { useWantBuyProps } from "./useWantBuyProps";
import { MainContentCard } from "@/components/MainContentCard";
import { BackArrow } from "@/assets/icons/icons";

export default function WantBuy() {

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const {
    dropDownProps,
    carsList,
    isLoading,
    router,
  } = useWantBuyProps();

  return <Box>
    <MainContentHeader title={
      <Box display={isLargerThan845 ? "block" : "flex"} alignItems="center">
        <button onClick={router.back}>
          <BackArrow />
        </button>
        <span>Хочу купить</span>
      </Box>
    } />

    <MainContentCard as="form">
      <SearchList
        carsList={carsList}
        dropDownProps={dropDownProps}
        isLoading={isLoading}
      />
    </MainContentCard>
  </Box>;
}
