"use client";

import { Container } from "@/components/Container";

import { Box, Button, Flex, Heading, useMediaQuery } from "@chakra-ui/react";

import { PlusIcon } from "@/assets/icons/icons";
import styles from "./style.module.scss";

import { CarsCard } from "./component/CarsCard/CarsCard";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import { useDriversList } from "./useDriversList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CarsCardMobile } from "./component/CarsCard/CarsCardMobile";

export const DriversList = () => {
  const { t, data, handleDelete, isPending } = useDriversList();

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
            color={`var(--primary-text)`}
          >
            {t("Водители")}
          </Heading>
          <Button
            onClick={() => router.push(`/${locale}/drivers/create`)}
            width={"fit-content"}
            leftIcon={<PlusIcon />}
          >
            {t("Добавить нового водителя")}
          </Button>
        </Flex>
        <Box mt={"37px"}>
          {data?.length > 0 ? (
            data?.map((item) =>
              isLargerThan845 ? (
                <CarsCard
                  t={t}
                  key={item.guid}
                  item={item}
                  handleDelete={handleDelete}
                />
              ) : (
                <CarsCardMobile
                  t={t}
                  key={item.guid}
                  item={item}
                  handleDelete={handleDelete}
                />
              )
            )
          ) : isPending ? (
            <LoadingSpinner />
          ) : (
            <Flex
              className={styles.noData}
              width={`100%`}
              height={`170px`}
              alignItems={`center`}
              justifyContent={`center`}
            >
              {t("У вас еще нет добавленных водителей")}
            </Flex>
          )}
        </Box>
      </Container>
    </>
  );
};
