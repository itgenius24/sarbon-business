"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { useHandbookProps } from "./useHandbookProps";
import { MainContentHeader } from "../../(components)/MainContentHeader";
import { MainContentCard } from "@/components/MainContentCard";

export default function Handbook() {
  const { data, isLoading } = useHandbookProps();

  if (isLoading) return <SkeletonComp />;

  return (
    <Box>
      <MainContentHeader title="Справочники" />
      <MainContentCard>
        {data.map((d) => (
          <Box key={d.guid} mb="16px">
            <Box
              lineHeight="28px"
              fontSize="18px"
              fontWeight={600}
              color="brand.600"
              mb="8px"
              dangerouslySetInnerHTML={{ __html: d?.question }}
            />
            <Box
              lineHeight="24px"
              dangerouslySetInnerHTML={{ __html: d?.answear }}
            />
          </Box>
        ))}
      </MainContentCard>
    </Box>
  );
}
