"use client";

import {
  Box,
  Flex,
  Tabs,
} from "@chakra-ui/react";
import { LeftHeaderCard } from "./LeftHeaderCard";
import { useGetUserInfoHook } from "../hooks/useGetUserInfo";
import { CustomTabList } from "./CustomTabList";
import { CustomTabPanels } from "./CustomTabPanels";
import { tabsList } from "../tablist";

export const MainContent = () => {
  const { data } = useGetUserInfoHook();

  return (
    <>
      <Tabs orientation="vertical" gap={6} variant="unstyled">
        <Box>
          <Flex gap={4}>
            <LeftHeaderCard title="Ваш ID:" value={data?.your_id} />
            <LeftHeaderCard title="Баланс" value={data?.balance} />
          </Flex>
          <Box mt="16px" rounded="12px" bg="white" py="8px">
            <CustomTabList list={tabsList} />
          </Box>
        </Box>
        <CustomTabPanels list={tabsList}/>
      </Tabs>
    </>
  );
};
