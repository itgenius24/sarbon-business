"use client";

import { Container } from "@/components/Container";
import { Box, Button, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { useSearchLoad } from "./useSearchLoad";
import { FilterLoad } from "./component/FilterLoad/FilterLoad";
import { TableComponent } from "./component/Tablecompoent/TableComponent";
import { useState } from "react";
import cls from "./style.module.scss";
import { FilterIcon } from "@/assets/icons/icons";
import { FilterLoadMobile } from "./component/FilterLoadMobile/FilterLoadMobile";

export const SearchLoadModule = () => {
  const {
    t,
    setValue,
    control,
    register,
    watch,
    formState,
    openFilter,
    setOpenFilter,
    dataRes,
    setDataRes,
    status2,
    setStatus2,
    setPage,
    page,
    isPendingLo,onSubmit
  } = useSearchLoad();

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  return (
    <>
      <Container my="40px">
        <Flex
          width={"100%"}
          alignItems={`center`}
          justifyContent={"space-between"}
        >
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "12px"}
            color={`var(--primary-text)`}
          >
            {t("Поиск грузов")}
          </Heading>

          <Flex
            onClick={() => setOpenFilter(true)}
            className={cls.filterBtn}
            display={isLargerThan845 ? `none` : `flex`}
          >
            <FilterIcon />
            <span>{t(`Фильтр`)}</span>
          </Flex>
        </Flex>
        {isLargerThan845 && (
          <Box
            padding={"20px 30px"}
            background={"white"}
            borderRadius={"12px"}
            mt={"22px"}
          >
            <FilterLoad
              setValue={setValue}
              control={control}
              register={register}
              watch={watch}
            />
          </Box>
        )}
        {!isLargerThan845 && (
          <FilterLoadMobile
            setValue={setValue}
            control={control}
            register={register}
            watch={watch}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            onSubmit={onSubmit}
          />
        )}
        <Box overflowX={isLargerThan845 ? `none` : `scroll`}>
          <TableComponent
            isLargerThan845={isLargerThan845}
            watch={watch}
            formState={formState}
            dataRes={dataRes}
            page={page}
            setDataRes={setDataRes}
            status2={status2}
            setStatus2={setStatus2}
            setPage={setPage}
            isPendingLo={isPendingLo}
          />
        </Box>
        <Button
        mt={`24px`}
        width={`fit-content`}
        onClick={() => setPage(page + 1)}
        className={cls.loadMore}
      >
        {t(`Загрузить еще`)}
      </Button>

      </Container>
    </>
  );
};
