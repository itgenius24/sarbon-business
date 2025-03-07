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

import {PlusIcon } from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { useMyDispatcher } from "./useMyDispatcher";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

export const DispatcherModule = () => {
  const {
    t,
    option,
    valueR,
    setValueR,
    onChange,
    search,
    setSearchFn,
    deleteFuntion,
    addPage,
    columns
  } = useMyDispatcher();
  const router = useRouter();
  const locale = useGetLang();

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const rowClassName = (row) => {
      return cls.order
  }
  return (
    <>
      <Container my="40px">
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "12px"}
            color={`var(--primary-text)`}
          >
            {t("Диспетчеры")}
          </Heading>
        </Flex>
        <Flex width={`100%`} justifyContent={`space-between`}>
          <Box width={`40%`}>
            <Input
              value={search}
              className={cls.input}
              placeholder={t("Имя диспетчера или телефон")}
              onChange={(e) => setSearchFn(e.target?.value)}
            />
          </Box>
          <Flex alignItems={`center`} gap={`50px`}>
            <RadioGroup onChange={(e) => onChange(e)} value={valueR}>
              <Flex gap={"30px"}>
                {option &&
                  option.map((item) => (
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
            <Button onClick={() => router.push(`/${locale}/dispatcher/create`)}  width={"fit-content"} leftIcon={<PlusIcon />}>
              {t(`Создать диспетчера `)}
            </Button>
          </Flex>
        </Flex>

        <Box mt={"37px"}>
          <SarbonTable rowClassName={rowClassName}  variant="card" columns={columns}  data={[1,2,3,4]} />
        </Box>

      </Container>
    </>
  );
};
