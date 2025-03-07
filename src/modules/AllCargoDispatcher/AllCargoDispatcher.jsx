"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@chakra-ui/react";

import { IocnFilter, IocnSortBack, PlusIcon } from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { CarsCard } from "./component/CarsCard/CarsCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import authStore from "@/store/auth.store";
import { TextField } from "@/components/TextField";
import { useAllCargoDispatcher } from "./useAllCargoDispatcher";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

export const AllCargoDispatcher = () => {
  const {
    t,
    search,
    setSearchFn,
    deleteFuntion,
    negotiableOption,
    valueR,
    columns,
    onChange,
  } = useAllCargoDispatcher();
  const router = useRouter();
  const locale = useGetLang();

  const isSuperDispatcher = authStore?.userData?.user_status?.[0];

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <>
      <Container my="40px">
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "12px"}
            color={`var(--primary-text)`}
          >
            {t("Все грузы")}
          </Heading>
        </Flex>
        <Flex  width={`100%`} justifyContent={`space-between`}>
          <Box width={`40%`}>
            <Input
              value={search}
              className={cls.input}
              placeholder={t("Имя диспетчера, номер машины или телефон")}
              onChange={(e) => setSearchFn(e.target?.value)}
            />
          </Box>
          <RadioGroup onChange={(e) => onChange(e)} value={valueR}>
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
                        valueR === item.value ? cls.ActiveRadio : cls.radio
                      }
                    >
                      {item?.label?.charAt(0).toUpperCase() +
                        item?.label?.slice(1).toLowerCase()}
                    </span>
                  </Radio>
                ))}
            </Flex>
          </RadioGroup>
        </Flex>
        <Box mt={"37px"}>
            <SarbonTable variant="table" columns={columns} data={[1,2,3]}  />
        </Box>
     
      </Container>
    </>
  );
};
