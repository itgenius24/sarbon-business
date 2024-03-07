import { TabPanel, TabPanels } from "@chakra-ui/react";
import React from "react";
import { CtabPanel } from "./CtabPanel";

export const CTabPanels = ({ list = [] }) => {
  return (
    <TabPanels>
      {list.map((l) => {
        if (!l.children?.length) {
          return (
            <TabPanel p="0" key={l.title}>
              {l?.content || l.title}
            </TabPanel>
          );
        }

        return l.children.map((item) => (
          <TabPanel p="0" key={item.title}>
            {item?.content || item.title}
          </TabPanel>
        ));
      })}

      {/* <TabPanel>{list[0].title}</TabPanel>
      <TabPanel>{list[1].title}</TabPanel>
      <TabPanel>{list[2].title}</TabPanel>
      {list[3].children.map((item) => (
        <TabPanel key={item.title}>{item.title}</TabPanel>
      ))}
      <TabPanel>{list[4].title}</TabPanel> */}

      {/* {list?.map((tab) => (
        <TabPanel key={tab?.title}>{tab?.content || tab?.title}</TabPanel>
      ))} */}
      {/* {list?.map((tab, index) => {
        return <CtabPanel key={tab?.title} panel={tab} />;
      })} */}
    </TabPanels>
  );
};

const indices = [0, 1, 2, 3, 4, 5];
