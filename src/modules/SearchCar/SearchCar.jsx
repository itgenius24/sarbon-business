"use client";

import { Container } from "@/components/Container";
import { CarList } from "./component/CarList/CarList";
import { Search } from "./component/Search/Search";
import { Heading, useMediaQuery } from "@chakra-ui/react";
import { useSearchCar } from "./useSearchCar";

export const SearchCarModule = () => {
  const { getCarListProps, getSearchProps, t } = useSearchCar();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  return (
    <>
      <Container my="40px">
        <Heading size={isLargerThan845 ? "md" : "sm"} mb={isLargerThan845 ? "24px" : "12px"}>
          {t("Поиск машин")}
        </Heading>
        <Search {...getSearchProps()} />
        <CarList {...getCarListProps()} />
      </Container>
    </>
  );
};
