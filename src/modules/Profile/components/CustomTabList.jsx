import React from "react";
import { CustomLogOutTab } from "./CustomLogOutTab";
import { Tab, TabList, Text } from "@chakra-ui/react";

export const CustomTabList = ({ list=[] }) => {
  return (
    <TabList>
      {list?.map((tab, index) => (
        <Tab
          justifyContent="flex-start"
          p="14px 16px"
          _selected={{ bg: "brand.50" }}
          _hover={{ bg: "brand.50" }}
          key={index}
        >
          {tab?.icon}
          <Text lineHeight="20px" fontWeight={500} ml="10px" color="icon.base">
            {tab?.title}
          </Text>
        </Tab>
      ))}
      <CustomLogOutTab />
    </TabList>
  );
};
