import { TabPanel } from "@chakra-ui/react";
import React from "react";

export const CtabPanel = ({ panel = {} }) => {
  if (panel.children?.length) {
    return panel.children.map((item) => {
      return (
        <TabPanel index={item.id} key={item.title}>
          {item.title}
        </TabPanel>
      );
    });
  } else {
    return <TabPanel index={panel.id}>{panel.title}</TabPanel>;
  }

  // if (panel?.children?.length) {
  //   return panel.children.map((childPanel) => (
  //     <TabPanel p="0" key={childPanel?.title}>
  //       {childPanel?.content || childPanel?.title}
  //     </TabPanel>
  //   ));
  // }

  // return <TabPanel p="0">{panel?.content || panel?.title}</TabPanel>;
};
