import React from "react";
import { CustomLogOutTab } from "./CustomLogOutTab";
import { Tab, TabList, Text } from "@chakra-ui/react";
import { CTab } from "./CTab";

export const CTabList = ({ list = [], onClick = () => {}, tabIndex }) => {
  return (
    <TabList>
      {/* <MTab onClick={onClick} tab={list[0]} />
      <MTab onClick={onClick} tab={list[1]} />
      <MTab onClick={onClick} tab={list[2]} />
      <div>
        <MTab onClick={onClick} tab={list[3].children[0]} />
        <MTab onClick={onClick} tab={list[3].children[1]} />
      </div>
      <MTab onClick={onClick} tab={list[4]} /> */}
      {list.map((tab) => (
        <CTab
          tabIndex={tabIndex}
          tab={tab}
          key={tab?.title}
          onClick={onClick}
        />
      ))}
      <CustomLogOutTab />
      {/* <CustomTab /> */}
    </TabList>
  );
};

const MTab = ({ tab = {}, onClick }) => {
  const handleClick = () => {
    const index = tab?.id;
    if (typeof index === "number") onClick(index);
  };
  return (
    <Tab {...tabStyles} onClick={handleClick}>
      {tab?.icon}
      <Text lineHeight="20px" fontWeight={500} ml="10px" color="icon.base">
        {tab?.title}
      </Text>
    </Tab>
  );
};

const tabStyles = {
  width: "100%",
  justifyContent: "flex-start",
  p: "14px 16px",
  bg: "white",
  _selected: { bg: "brand.50" },
  _hover: { bg: "brand.50" },
};
