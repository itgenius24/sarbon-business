import { SelectionArrow } from "@/assets/icons/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Tab,
  Text,
  useMultiStyleConfig,
  useTab,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const CTab = ({ tab = {}, onClick, tabIndex }) => {
  if (tab?.children?.length) {
    return <NestedTab tab={tab} onClick={onClick} tabIndex={tabIndex} />;
  }

  const handleClick = () => {
    const index = tab?.id;
    if (typeof index === "number") onClick(index);
  };

  const bgColor = tabIndex === tab?.id ? "brand.50" : "";
  return (
    <Tab {...tabStyles} bg={bgColor} onClick={handleClick}>
      {tab?.icon}
      <Text lineHeight="20px" fontWeight={500} ml="10px" color="icon.base">
        {tab?.title}
      </Text>
    </Tab>
  );
};

const CustomTab = React.forwardRef((props, ref) => {
  // 1. Reuse the `useTab` hook
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps["aria-selected"];

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig("Tabs", tabProps);
  console.log("styles", styles);
  console.log("tabProps", tabProps);

  return (
    <Button __css={styles.tab} {...tabProps}>
      <Box as="span" mr="2">
        {isSelected ? "😎" : "😐"}
      </Box>
      {tabProps.children}
    </Button>
  );
});

const tabStyles = {
  justifyContent: "flex-start",
  p: "14px 16px",
  bg: "white",
  // _selected: { bg: "transparent" },
  _hover: { bg: "brand.50" },
};

const NestedTab = ({ tab, onClick, tabIndex }) => {
  // const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CAccordion
      content={
        <Flex direction="column">
          {tab.children.map((tab, i) => {
            return (
              <CTab tab={tab} key={i} onClick={onClick} tabIndex={tabIndex} />
            );
          })}
        </Flex>
      }
    >
      <Flex {...tabStyles}>
        {tab?.icon}{" "}
        <Text lineHeight="20px" fontWeight={500} ml="10px" color="icon.base">
          {tab?.title}
        </Text>{" "}
        <AccordionIcon ml="auto" />
      </Flex>
      {/* <Flex
        align="center"
        // {...tabStyles}
        // onClick={() => setIsExpanded((prev) => !prev)}
      >
        {tab?.icon}
        <Text lineHeight="20px" fontWeight={500} ml="10px" color="icon.base">
          {tab?.title}
        </Text>
      </Flex> */}
      {/* <Box border="1px solid" ml="auto">
            <SelectionArrow
              style={{
                rotate: isExpanded ? "180deg" : "0deg",
                transition: "0.3s",
              }}
            />
          </Box> */}
      {/* {tab.children.map((tab, i) => {
        return <CTab tab={tab} key={i} />;
      })} */}
    </CAccordion>
  );
};

const CAccordion = ({ children = "click me", content = "hello world" }) => {
  return (
    <Accordion allowToggle>
      <AccordionItem border="none" p="0">
        <AccordionButton _hover={{ bg: "none" }} p="0">
          <Box flex={1}>{children}</Box>
        </AccordionButton>
        <AccordionPanel p="0">{content}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
