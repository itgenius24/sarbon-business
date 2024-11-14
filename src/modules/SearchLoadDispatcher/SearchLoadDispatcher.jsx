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

import { IocnFilter, PlusIcon } from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { CarsCard } from "./component/CarsCard/CarsCard";
import { useSearchLoadDispatcher } from "./useSearchLoadDispatcher";
import { TextField } from "@/components/TextField";
import { useState } from "react";

export const SearchLoadDispatcherModule = () => {
  const { t, setValue, register, watch } = useSearchLoadDispatcher();
  const router = useRouter();
  const locale = useGetLang();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const negotiableOption = [
    {
      value: `val1`,
      label: t(`Отображать все (682)`),
    },
    {
      value: `val2`,
      label: t(`Только свободные (349)`),
    },
    {
      value: `val3`,
      label: t(`Только мои водители (36)`),
    },
  ];

  const [value, setValueR] = useState(`val1`);
  const onChange = (e) => {
    setValueR(e);
  };

  return (
    <>
      <Container my="40px">
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
              name="from"
              placeholder={t(
                "Имя водителя, диспетчера, номер машины или телефон"
              )}
            />
          </Box>
          <RadioGroup
            // isDisabled={!canEdit}
            onChange={(e) => onChange(e)}
            value={value}
          >
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
          </RadioGroup>
        </Flex>
        <Box mt={"27px"}>
          <Flex
            p={"10px 36px"}
            justifyContent={"space-between"}
            mt={"32px"}
            width={"100%"}
          >
            <Flex
              cursor={`pointer`}
              className={cls.th}
              gap={2}
              justifyContent={`flex-start`}
              alignItems={`center`}
            >
              <p>Имя водителя</p>
              <IocnFilter />
            </Flex>
            <p className={cls.th}>Владелец машины</p>
            <p className={cls.th}>Номер машины</p>

            <Flex
              cursor={`pointer`}
              className={cls.th}
              gap={2}
              justifyContent={`flex-start`}
              alignItems={`center`}
            >
              <p style={{ color: `rgba(0, 122, 255, 1)` }}>тип Кузова</p>
              <IocnFilter />
            </Flex>
            <p className={cls.th}>вес / объём</p>
            <p className={cls.th}>был онлайн</p>
            <p className={cls.th}>Диспетчер</p>
          </Flex>
        </Box>
        <Box className={cls.TAbleWrap} background={`white`}  minH={`70vh`}>
          <CarsCard />
        </Box>
      </Container>
    </>
  );
};
