"use client";

import { Container } from "@/components/Container";
import { CarList } from "./component/CarList/CarList";
import { Search } from "./component/Search/Search";
import { Heading } from "@chakra-ui/react";
import { useSearchCar } from "./useSearchCar";

export const SearchCarModule = () => {
  const { getCarListProps, getSearchProps, t } = useSearchCar();
  return (
    <>
      <Container my="40px">
        <Heading size="md" mb="24px">
          {t("Поиск машин")}
        </Heading>
        <Search {...getSearchProps()} />

        <CarList {...getCarListProps()} />
      </Container>
    </>
  );
};
