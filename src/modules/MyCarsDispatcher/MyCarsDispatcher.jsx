"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";

import { IocnFilter, IocnSortBack, PlusIcon } from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { useMyCarsDispatcher } from "./useMyCarsDispatcher";
import { CarsCard } from "./component/CarsCard/CarsCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import authStore from "@/store/auth.store";
import { TextField } from "@/components/TextField";

export const MyCarsDispatcherModule = () => {
  const {
    t,
    data,
    deleteFuntion,
    nameFilter,
    filter1,
    isLoading,
    register,
    setSearchFn,
    search,
    containerRef,
    count,
    addPage,
  } = useMyCarsDispatcher();
  const router = useRouter();
  const locale = useGetLang();

  const isSuperDispatcher = authStore?.userData?.user_status?.[0];

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  console.log(`data`,data)

  return (
    <>
      <Container  maxW={`1444px`} my="40px">
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "12px"}
            color={`var(--primary-text)`}
          >
            {t("Ваши водители")}
          </Heading>
          <Flex gap={`28px`}>
            <Box className={cls.countrWrap}>
              <p>
                {t(`Всего`)}: <span>{count?.count || 0}</span>
              </p>
              <p>
                {t(`Свободных`)}:<span>{count?.free_count || 0}</span>
              </p>
            </Box>
            {isSuperDispatcher === "approved" && (
              <Button
                onClick={() =>
                  router.push(`/${locale}/my-cars-dispatcher/create`)
                }
                width={"fit-content"}
                leftIcon={<PlusIcon />}
              >
                {t(`Добавить водителя`)}
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex>
          <Box width={`40%`}>
            <Input
              value={search}
              className={cls.input}
              placeholder={t("Имя водителя, номер машины или телефон")}
              onChange={(e) => setSearchFn(e.target?.value)}
            />
          </Box>
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
              <p className={cls.filterTitle}>{t(`Водитель`)}</p>
              {filter1 ? <IocnSortBack /> : <IocnFilter />}
            </Flex>
            <p className={cls.th}>{t(`Владелец машины`)}</p>
            <p className={cls.th}>{t(`Машина`)}</p>

            <Flex
              gap={2}
              cursor={`pointer`}
              className={cls.th}
              justifyContent={`flex-start`}
              alignItems={`center`}
            >
              <p>{t(`Статус`)}</p>
            </Flex>
          </Flex>
        </Box>
        <div id="scroll-container">
          {data?.length > 0 &&
            data?.map((item) => (
              <CarsCard
                t={t}
                // containerRef={containerRef}
                key={item?.driver_data?.guid}
                item={item}
                deleteFuntion={deleteFuntion}
              />
            ))}
          {data?.length >= 50 && count?.count > data?.length && (
            <Box mt={6} width={`fit-contend`}>
              <Button
                width={`fit-contend`}
                isLoading={isLoading}
                onClick={addPage}
                className={cls.btnLoad}
              >
                Загрузить еще 50
              </Button>
            </Box>
          )}

          {/* {isLoading ? (
            <Box pt={`20px`}>
              <LoadingSpinner />
            </Box>
          ) : (
            <Box height={`50px`} mt={`20px`}>
              <LoadingSpinner />
            </Box>
          )} */}
        </div>
      </Container>
    </>
  );
};
