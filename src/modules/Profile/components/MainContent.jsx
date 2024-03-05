"use client";

import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { LeftHeaderCard } from "./LeftHeaderCard";
import {
  AddCard,
  Car,
  File,
  TopUpBalance,
  User,
} from "@/assets/icons/icons";
import { PersonalInfo } from "../tabs/PersonalInfo";
import { CustomLogOutTab } from "./CustomLogOutTab";

export const MainContent = () => {
  return (
    <>
      <Tabs orientation="vertical" gap={6} variant="unstyled">
        <Box>
          {/* header */}
          <Flex gap={4}>
            {/* left header */}
            <LeftHeaderCard
              title={headerData[0].title}
              value={headerData[0].value}
            />
            <LeftHeaderCard
              title={headerData[1].title}
              value={headerData[1].value}
            />
          </Flex>
          <Box mt="16px" rounded="12px" bg="white" py="8px">
            {/* tabs */}
            <TabList>
              {tabsList.map((tab, index) => (
                <Tab
                  justifyContent="flex-start"
                  p="14px 16px"
                  _selected={{ bg: "brand.50" }}
                  _hover={{ bg: "brand.50" }}
                  key={index}
                >
                  {tab.icon}
                  <Text
                    lineHeight="20px"
                    fontWeight={500}
                    ml="10px"
                    color="icon.base"
                  >
                    {tab.title}
                  </Text>
                </Tab>
              ))}
              <CustomLogOutTab/>
            </TabList>
          </Box>
        </Box>
        {/* right */}
        <TabPanels>
          {tabsList.map((tab, index) => (
            <TabPanel p="0" key={index}>
              {tab.content || tab.title}
            </TabPanel>
          ))}
        </TabPanels>
        {/* <TabIndicator
            mt="-1.5px"
            width="10px"
            height="10px"
            bg="blue"
            borderRadius="1px"
          /> */}
      </Tabs>

    </>
  );
};

const tabsList = [
  { title: "Личные данные", icon: <User />, content: <PersonalInfo /> },
  { title: "Добавить карту", icon: <AddCard /> },
  { title: "Пополнить баланс", icon: <TopUpBalance /> },
  { title: "Продажа авто", icon: <Car /> },
  { title: "Справочники", icon: <File /> },

];

const headerData = [
  { title: "Ваш ID:", value: "123123" },
  { title: "Баланс", value: "23 000 сум" },
];
