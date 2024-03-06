import { TabPanel, TabPanels } from "@chakra-ui/react";
import React from "react";

export const CustomTabPanels = ({ list=[] }) => {
  return (
    <TabPanels>
      {list?.map((tab, index) => (
        <TabPanel p="0" key={index}>
          {tab?.content || tab?.title}
        </TabPanel>
      ))}
    </TabPanels>
  );
};
