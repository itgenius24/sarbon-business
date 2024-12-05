"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@chakra-ui/react";

import { IocnFilter, IocnSortBack, PlusIcon } from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { CarsCard } from "./component/CarsCard/CarsCard";
import { useSearchLoadDispatcher } from "./useSearchLoadDispatcher";
import { TextField } from "@/components/TextField";
import { useState } from "react";

export const SearchLoadDispatcherModule = () => {
  const {
    t,
    setValue,
    register,
    watch,
    negotiableOption,
    isLargerThan845,
    data,
    addPage,
    nameFilter,
    nameFilterMawini,
    nameFilterMawiniNomer,
    tipFilter,
    timeFilter,
    isPending,
    filter1,
    filter2,
    filter3,
    filter4,
    filter5,
    filter6,
    onFilterChange,
    handleCheckboxChange,
    ids,
    observerRef,
    onSubmit,
    createAdressisPending,
    dispatcherFilter,
    setValueR,
    value,
    onChange
  } = useSearchLoadDispatcher();

  

  return (
    <>
      <Container my="40px">
        <Box position={`relative`} height={`100%`}>
          <Flex width={"100%"} justifyContent={"space-between"}>
            <Heading
              size={isLargerThan845 ? "md" : "sm"}
              mb={isLargerThan845 ? "24px" : "12px"}
            >
              {t("Выбрать водителя")}
            </Heading>
          </Flex>
          <Flex alignItems={`center`} justifyContent={`space-between`}>
            <Box width={`40%`}>
              <TextField
                register={register}
                onChange={onFilterChange}
                name="from"
                placeholder={t(
                  "Имя водителя, диспетчера, номер машины или телефон"
                )}
              />
            </Box>
            {/* <RadioGroup onChange={(e) => onChange(e)} value={value}>
              <Flex gap={"30px"}>
                {negotiableOption &&
                  negotiableOption.map((item) => (
                    <Radio
                      key={item.value}
                      border={"1px solid rgba(208, 213, 221, 1)"}
                      value={item.value}
                      size={"md"}
                    >
                      <span
                        className={
                          value === item.value ? cls.ActiveRadio : cls.radio
                        }
                      >
                        {item?.label?.charAt(0).toUpperCase() +
                          item?.label?.slice(1).toLowerCase()}
                      </span>
                    </Radio>
                  ))}
              </Flex>
            </RadioGroup> */}
          </Flex>
          <Box
            position={`sticky`}
            top={`0px`}
            zIndex={`234567`}
            background={`#F6F7F8`}
            mt={"27px"}
          >
            <Flex p={"10px 36px"} justifyContent={"space-between"} mt={"32px"}>
              <Flex
                cursor={`pointer`}
                className={cls.th}
                gap={2}
                justifyContent={`flex-start`}
                alignItems={`center`}
                onClick={() => nameFilter()}
              >
                <p className={cls.filterTitle}>Имя водителя</p>
                {filter1 ? <IocnSortBack /> : <IocnFilter />}

              </Flex>
              <Flex
                cursor={`pointer`}
                className={cls.th}
                gap={2}
                justifyContent={`flex-start`}
                alignItems={`center`}
                onClick={() => nameFilterMawini()}
              >
                <p className={cls.filterTitle}>Владелец машины</p>
                {filter2 ? <IocnSortBack /> : <IocnFilter />}

              </Flex>

              <Flex
                cursor={`pointer`}
                className={cls.th}
                gap={2}
                justifyContent={`flex-start`}
                alignItems={`center`}
                onClick={() => nameFilterMawiniNomer()}
              >
                <p className={cls.filterTitle}>Номер машины</p>
                {filter4 ? <IocnSortBack /> : <IocnFilter />}

              </Flex>


              <Flex
                cursor={`pointer`}
                className={cls.th}
                gap={2}
                justifyContent={`flex-start`}
                alignItems={`center`}
                onClick={tipFilter}
              >
                <p className={cls.filterTitle}>тип Кузова</p>
                {filter3 ? <IocnSortBack /> : <IocnFilter />}
              </Flex>
              <p className={cls.th}>вес / объём</p>
              <Flex
                cursor={`pointer`}
                className={cls.th}
                gap={2}
                justifyContent={`flex-start`}
                alignItems={`center`}
                onClick={timeFilter}
              >
                <p className={cls.filterTitle}>был онлайн</p>
                {filter5 ? <IocnSortBack /> : <IocnFilter />}
              </Flex>
              <Flex
                cursor={`pointer`}
                className={cls.th}
                gap={2}
                justifyContent={`flex-start`}
                alignItems={`center`}
                onClick={dispatcherFilter}
              >
                <p className={cls.filterTitle}>Диспетчер</p>
                {filter6 ? <IocnSortBack /> : <IocnFilter />}
              </Flex>
            </Flex>
          </Box>
          <Box
            ref={observerRef}
            id="wrap_card"
            className={cls.TAbleWrap}
            background={`white`}
            minH={`60vh`}
          >
            {data?.map((item, index) => (
              <CarsCard
                key={index}
                index={index}
                item={item}
                handleCheckboxChange={handleCheckboxChange}
                ids={ids?.map((item) => item?.guid)}
              />
            ))}
          </Box>
          <Box
            position={`absolute`}
            zIndex={`876543`}
            bottom={`20px`}
            left={`32px`}
          >
            {/* <Button
              isLoading={isPending}
              onClick={addPage}
              className={cls.btnLoad}
            >
              Загрузить еще 50
            </Button> */}
          </Box>
          <Flex
            className={cls.sticiy}
            alignItems={`center`}
            justifyContent={`center`}
            padding={`10px 30px`}
            background={`white`}
          >
            <Flex gap={`50px`} className={cls.addUser}>
              <p className={cls.addText}>Выбрано: {ids?.length}</p>
              <Button
                isLoading={createAdressisPending}
                onClick={onSubmit}
                isDisabled={ids?.length === 0}
                className={cls.btnAddLoad}
              >
                Добавить к себе
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </>
  );
};
