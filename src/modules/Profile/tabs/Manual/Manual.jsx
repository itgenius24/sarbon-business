import React from "react";
import { useManual } from "./useManual";
import { MainContentHeader } from "../../components/MainContentHeader";
import { MainContentCard } from "../../components/MainContentCard";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";

export const Manual = () => {
  const { data, isLoading } = useManual();

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
            ></Box>
            <Box
              lineHeight="24px"
              dangerouslySetInnerHTML={{ __html: d?.answear }}
            ></Box>
          </Box>
        ))}
      </MainContentCard>
    </Box>
  );
};
