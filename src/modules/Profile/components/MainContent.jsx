"use client";

import { Box, Flex, Tabs } from "@chakra-ui/react";
import { LeftHeaderCard } from "./LeftHeaderCard";
import { CTabList } from "./CTabList";
import { CTabPanels } from "./CTabPanels";
import { tabsList } from "../tablist";
import { useCallback, useState } from "react";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";

export const MainContent = () => {
  const { data } = useGetUserInfoHook();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = useCallback((index) => {
    setTabIndex(index);
  }, []);

  return (
    <>
      <Tabs
        isLazy
        index={tabIndex}
        // onChange={handleTabsChange}
        orientation="vertical"
        gap={6}
        variant="unstyled"
      >
        <Box>
          <Flex gap={4}>
            <LeftHeaderCard title="Ваш ID:" value={data?.your_id} />
            <LeftHeaderCard title="Баланс" value={data?.balance} />
          </Flex>
          <Box mt="16px" rounded="12px" bg="white" py="8px">
            <CTabList
              list={tabsList}
              onClick={handleTabsChange}
              tabIndex={tabIndex}
            />
          </Box>
        </Box>
        <CTabPanels list={tabsList} />
      </Tabs>
    </>
  );
};
