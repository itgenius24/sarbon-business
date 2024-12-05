"use client";

import { Container } from "@/components/Container";

import { Box, Button, Flex, Heading, useMediaQuery } from "@chakra-ui/react";

import { IocnFilter, IocnSortBack, PlusIcon } from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { useMyCarsDispatcher } from "./useMyCarsDispatcher";
import { CarsCard } from "./component/CarsCard/CarsCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const MyCarsDispatcherModule = () => {
  const { t, data, deleteFuntion,nameFilter,filter1,isPending } = useMyCarsDispatcher();
  const router = useRouter();
  const locale = useGetLang();
  const isOrderData = data?.filter((item) => !item?.order)
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
                Всего: <span>{data?.length || 0}</span>
              </p>
              <p>
                Свободных: <span>{isOrderData?.length || 0}</span>
              </p>
            </Box>
            <Button
              onClick={() => router.push(`/${locale}/my-cars-dispatcher/create`)}
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
              onClick={nameFilter}
            >
              <p  className={cls.filterTitle}>Водитель</p>
              {filter1 ? <IocnSortBack /> : <IocnFilter />}
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
          {data?.length > 0 &&
            data?.map((item) => (
              <CarsCard
                key={item.user?.guid}
                item={item}
                deleteFuntion={deleteFuntion}
              />
            ))}
          {isPending && <Box pt={`20px`}>
            <LoadingSpinner />
          </Box>}
        </Box>
      </Container>
    </>
  );
};
