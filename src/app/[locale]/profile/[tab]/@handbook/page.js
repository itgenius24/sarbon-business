"use client";

import React from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
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
        <Accordion defaultIndex={[0]} allowMultiple>
          {data.map((d) => (
            <AccordionItem key={d.guid} mb="16px" border="none">
              <AccordionButton borderRadius="16px" justifyContent="space-between" flexDirection="row-reverse">
                <Box
                  flexGrow={1}
                  textAlign="left"
                  pl="24px"
                  lineHeight="28px"
                  fontSize="18px"
                  fontWeight={600}
                  color="#101828"
                  mb="8px"
                  dangerouslySetInnerHTML={{ __html: d?.question }}
                />
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Box
                  pl="47px"
                  lineHeight="24px"
                  color="#475467"
                  dangerouslySetInnerHTML={{ __html: d?.answear }}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}

        </Accordion>
      </MainContentCard>
    </Box>
  );
}
