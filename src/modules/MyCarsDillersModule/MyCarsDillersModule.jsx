"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";

import { useMyCars } from "./useMyCars";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { CarsCardMObile } from "./component/CarsCardMobile/CarsCardMObile";

export const MyCarsDillersModule = () => {
  const { t,tabCange,vehicle,handleDelete } = useMyCars();

  const router = useRouter();
  const locale = useGetLang();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <>
      <Container my={isLargerThan845 ? "40px" : `20px`}>
        <Tabs onChange={tabCange} variant="unstyled">
          <TabList
            background={`rgba(227, 230, 237, 1)`}
            borderRadius={`12px`}
            justifyContent={`space-between`}
            padding={`2px`}
          >
            <Tab
              _selected={{
                background: `#FFFFFF`,
                color: `rgba(0, 51, 153, 1)`,
                boxShadow: ` 0px 4px 4px 0px rgba(0, 0, 0, 0.08)`,
              }}
              className={cls.tab}
            >
              Модерация
            </Tab>
            <Tab
              _selected={{
                background: `#FFFFFF`,
                color: `rgba(0, 51, 153, 1)`,
                boxShadow: ` 0px 4px 4px 0px rgba(0, 0, 0, 0.08)`,
              }}
              className={cls.tab}
            >
              Одобренные
            </Tab>
            <Tab
              _selected={{
                background: `#FFFFFF`,
                color: `rgba(0, 51, 153, 1)`,
                boxShadow: ` 0px 0px 2px 0px rgba(0, 0, 0, 0.04)`,
              }}
              className={cls.tab}
            >
              Оплаченные
            </Tab>
          </TabList>
          <TabPanels padding={0}>
            <TabPanel padding={0}>
            <Flex mt={`20px`} mb={`20px`}  alignItems={`center`} justifyContent={`space-between`} width={`100%`}>
               <p className={cls.nameTab}>{t(`В модерации`)}</p>
               <Box>
                  <p className={cls.tabCountName}>Добавлено</p>
                  <p className={cls.tabCount}>{vehicle?.length || 3}</p>
               </Box>
               <Box>
                  <p className={cls.tabCountName}>Сумма:</p>
                  <p className={cls.tabCount}> {(vehicle?.[0]?.salary || 0) * vehicle?.length} sum</p>
               </Box>
            </Flex>
              {
                vehicle?.map((item) => (
                  <CarsCardMObile type={0} color={`rgba(255, 59, 48, 1)`} handleDelete={handleDelete} item={item} key={item} />
                ))
              }
            </TabPanel>
            <TabPanel padding={0}>
            <Flex mt={`20px`} mb={`20px`}  alignItems={`center`} justifyContent={`space-between`} width={`100%`}>
               <p className={cls.nameTab}>{t(`Одобренные`)}</p>
               <Box>
                  <p className={cls.tabCountName}>Добавлено</p>
                  <p className={cls.tabCount}>{vehicle?.length || 0}</p>
               </Box>
               <Box>
                  <p className={cls.tabCountName}>Сумма:</p>
                  <p className={cls.tabCount}> {(vehicle?.[0]?.salary || 0) * vehicle?.length} sum</p>
               </Box>
            </Flex>
              {
                vehicle?.map((item) => (
                  <CarsCardMObile type={1} item={item} color={`rgba(21, 186, 77, 1)`} key={item} />
                ))
              }
            </TabPanel>
            <TabPanel padding={0}>
            <Flex mt={`20px`} mb={`20px`}  alignItems={`center`} justifyContent={`space-between`} width={`100%`}>
               <p className={cls.nameTab}>{t(`Оплаченные`)}</p>
               <Box>
                  <p className={cls.tabCountName}>Добавлено</p>
                  <p className={cls.tabCount}>{vehicle?.length || 0}</p>
               </Box>
               <Box>
                  <p className={cls.tabCountName}>Сумма:</p>
                  <p className={cls.tabCount}> {(vehicle?.[0]?.salary || 0) * vehicle?.length} sum</p>
               </Box>
            </Flex>
              {
                vehicle?.map((item) => (
                  <CarsCardMObile type={2} item={item} color={`rgba(21, 186, 77, 1)`} key={item} />
                ))
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};
