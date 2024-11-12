"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";

import {
  IocnFilter,
  PlusIcon,
} from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { useMyCarsDispatcher } from "./useMyCarsDispatcher";
import { CarsCard } from "./component/CarsCard/CarsCard";

export const MyCarsDispatcherModule = () => {
  const { t } = useMyCarsDispatcher();
  const router = useRouter();
  const locale = useGetLang();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  return (
    <>
      <Container my="40px">
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "12px"}
          >
            {t("Ваши водители")}
          </Heading>
          <Flex gap={`28px`}>
            <Box className={cls.countrWrap}>
              <p>
                Всего: <span>36</span>
              </p>
              <p>
                Свободных: <span>25</span>
              </p>
            </Box>
            <Button
              onClick={() => router.push(`/${locale}/my-cars/create`)}
              width={"fit-content"}
              leftIcon={<PlusIcon />}
            >
              Добавить водителя
            </Button>
          </Flex>
        </Flex>
        <Box mt={"37px"}>
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
              <p style={{ color: `rgba(0, 122, 255, 1)` }}>Водитель</p>
              <IocnFilter />
            </Flex>
            <p className={cls.th}>Владелец машины</p>
            <p className={cls.th}>Машина</p>

            <Flex
              gap={2}
              cursor={`pointer`}
              className={cls.th}
              justifyContent={`flex-start`}
              alignItems={`center`}
            >
              <p>Статус</p>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <CarsCard />
        </Box>
      </Container>
    </>
  );
};
