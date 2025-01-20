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
      <Container   my={isLargerThan845 ? "40px" : `20px`}>
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "0px"}
            color={`var(--primary-text)`}
          >
            {t("Водители")}
          </Heading>
          <Button
            display={isLargerThan845 ? `flex` : `none`}
            onClick={() => router.push(`/${locale}/drivers/create`)}
            width={"fit-content"}
            leftIcon={<PlusIcon />}
          >
            {t("Добавить нового водителя")}
          </Button>
        </Flex>
        <Box mt={isLargerThan845 ? "37px" : `10px`}>
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
       {
        !isPending &&  <Button
          //  margin={`15px 15px`}
          marginTop={`20px`}
          width={`100%`}
          display={isLargerThan845 ? `none` : `flex`}
          onClick={() => router.push(`/${locale}/drivers/create`)}
          leftIcon={<PlusIcon />}
        >
          {t("Добавить нового водителя")}
        </Button>
       }
      </Container>
    </>
  );
};
