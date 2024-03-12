"use client";

import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { MainContentHeader } from "../../components/MainContentHeader";
import { MainContentCard } from "../../components/MainContentCard";

import { AdList } from "./components/AdList";
import { useMyAd } from "./hooks/useMyAd";
import {
  // useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import CreateAd from "./components/CreateAd";
import { SelectionArrow } from "@/assets/icons/icons";
// import { SelectionArrow } from "@/assets/icons/icons";
// import { MoreAboutCar } from "./components/MoreAboutCar";

export const MyAd = () => {
  const { onsubmit, list, isLoading, getCreateAdProps, isPending } = useMyAd();
  const { push, back } = useRouter();
  const { get } = useSearchParams();
  const create = get("create");

  const openCreatAdCard = () => {
    push(`${location.pathname}?create=true`);
  };

  return (
    <Box>
      <MainContentHeader
        title="Мои обьявления"
        onTitleClick={create ? back : undefined}
        icon={!!create && <SelectionArrow style={{ rotate: "90deg" }} />}
      />

      <MainContentCard
        as="form"
        onSubmit={onsubmit()}
        footer={
          !!create && (
            <ButtonGroup ml="auto" spacing="2">
              <Button
                h="40px"
                p="10px 16px"
                variant="outline"
                color="brand.700"
                borderColor="brand.300"
                fontSize="16px"
              >
                Отмена
              </Button>
              <Button
                isLoading={isPending}
                type="submit"
                fontSize="16px"
                h="40px"
                p="10px 16px"
                variant="solid"
              >
                Создать
              </Button>
            </ButtonGroup>
          )
        }
      >
        {!create && (
          <AdList
            handleNoData={openCreatAdCard}
            list={list}
            isLoading={isLoading}
          />
        )}
        {create && <CreateAd {...getCreateAdProps()} />}
      </MainContentCard>
    </Box>
  );
};

const dd = [
  {
    title: "Krone SD SX3258",
    range: "30 тыс. км",
    type: "Самосвал",
    city: "Ташкент",
    phone: "+*** ** *** ** **",
    owner: "Александр Алексеев",
    desc: "Берите есличо когда увидите продукт ваше денег не жалко станет, я на связе 24/7 в любой удобный момент звоните",
  },
  {
    title: "Vaz 234",
    range: "30 тыс. км",
    type: "Самосвал",
    city: "Ташкент",
  },
  {
    title: "DJR Kal0150",
    range: "1 200 км",
    type: "Самосвал",
    city: "Ташкент",
  },
  {
    title: "MercedezBenz Cros32",
    range: "1 200 км",
    type: "Самосвал",
    city: "Ташкент",
  },
];
