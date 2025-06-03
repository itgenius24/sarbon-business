"use client";

import React from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/Skeleton";
import { useHandbookProps } from "./useHandbookProps";
import { MainContentHeader } from "../../(components)/MainContentHeader";
import { MainContentCard } from "@/components/MainContentCard";
import { BackArrow } from "@/assets/icons/icons";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Handbook() {
  const router = useRouter();
  const { data, isLoading } = useHandbookProps();

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const {t} = useTranslation();
  if (isLoading) return <SkeletonComp />;

  return (
    <Box>
      <MainContentHeader title={
        <Flex onClick={!isLargerThan845 ? router.back : () => {}} as="button" alignItems="center">
          <BackArrow />
          <span>{t(`Справочники`)}</span>
        </Flex>
      } />
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
