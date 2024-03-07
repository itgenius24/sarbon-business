import { Box, } from "@chakra-ui/react";
import { MainContentHeader } from "../../components/MainContentHeader";
import { MainContentCard } from "../../components/MainContentCard";

import { SearchList } from "./components/SearchList";
import { useWantBuy } from "./hooks/useWantBuy";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectionArrow } from "@/assets/icons/icons";
import { MoreAboutCar } from "./components/MoreAboutCar";


export const WantBuy = () => {
  const { dropDownProps, onToggle, carsList, isLoading, } = useWantBuy();
  const { push ,back } = useRouter();
  const path = usePathname();
  // const params = useParams();
  const searchParams = useSearchParams();
  // console.log("path", path);
  // console.log("params", params);
  // console.log("searchParams", searchParams);
  const carID = searchParams.get("carID");

  const clickItem=(item)=> {
    if(item?.guid) push(`${path}?carID=${item.guid}`);
  };

  return (
    <Box>
      <MainContentHeader
        onTitleClick={carID ? back: undefined}
        title="Хочу купить"
        icon={!!carID && <SelectionArrow style={{ rotate: "90deg" }} />}
      />

      <MainContentCard as="form">
        {!carID && (
          <SearchList
            carsList={carsList}
            dropDownProps={dropDownProps}
            onCarClick={clickItem}
            isLoading={isLoading}
          />
        )}
        {carID && (
          <MoreAboutCar carID={carID} onCarClick={onToggle} />
        )}
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
