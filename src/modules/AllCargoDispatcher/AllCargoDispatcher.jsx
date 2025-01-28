"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@chakra-ui/react";

import { IocnFilter, IocnSortBack, PlusIcon } from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { CarsCard } from "./component/CarsCard/CarsCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import authStore from "@/store/auth.store";
import { TextField } from "@/components/TextField";
import { useAllCargoDispatcher } from "./useAllCargoDispatcher";

export const AllCargoDispatcher = () => {
  const {
    t,
    search,
    setSearchFn,
    deleteFuntion,
    negotiableOption,
    valueR,

    onChange,
  } = useAllCargoDispatcher();
  const router = useRouter();
  const locale = useGetLang();

  const isSuperDispatcher = authStore?.userData?.user_status?.[0];

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  // console.log(`salom`,)
  return (
    <>
      <Container my="40px">
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "12px"}
            color={`var(--primary-text)`}
          >
            {t("Все грузы")}
          </Heading>
        </Flex>
        <Flex  width={`100%`} justifyContent={`space-between`}>
          <Box width={`40%`}>
            <Input
              value={search}
              className={cls.input}
              placeholder={t("Имя диспетчера, номер машины или телефон")}
              onChange={(e) => setSearchFn(e.target?.value)}
            />
          </Box>
          <RadioGroup onChange={(e) => onChange(e)} value={valueR}>
            <Flex gap={"30px"}>
              {negotiableOption &&
                negotiableOption.map((item) => (
                  <Radio
                    key={item.value}
                    border={"1px solid rgba(208, 213, 221, 1)"}
                    value={item.value}
                    size={"md"}
                  >
                    <span
                      className={
                        valueR === item.value ? cls.ActiveRadio : cls.radio
                      }
                    >
                      {item?.label?.charAt(0).toUpperCase() +
                        item?.label?.slice(1).toLowerCase()}
                    </span>
                  </Radio>
                ))}
            </Flex>
          </RadioGroup>
        </Flex>
        <Box mt={"37px"}>
          <Flex
            p={"10px 36px"}
            justifyContent={"space-between"}
            mt={"32px"}
            width={"100%"}
          >
            <p className={cls.th}>{t(`Откуда`)}</p>
            <p className={cls.th}>{t(`Куда`)}</p>

            <Flex
              cursor={`pointer`}
              className={cls.th}
              gap={2}
              justifyContent={`flex-start`}
              alignItems={`center`}
            >
              <p className={cls.filterTitle}>{t(`Когда забрать`)}</p>
              {/* {false ? <IocnSortBack /> : <IocnFilter />} */}
            </Flex>
            <p className={cls.th}>{t(`Когда доставить`)}</p>
            <p className={cls.th}>{t(`Общая Стомость`)}</p>
            <p className={cls.th}>{t(`предоплатА`)}</p>
            <p className={cls.th}>{t(`Диспетчер`)}</p>
          </Flex>
        </Box>
        <div  className={cls.itemWrap}  id="scroll-container">
          {[1, 2, 3, 4].map((item) => (
            <CarsCard
              t={t}
              key={item}
              item={item}
              deleteFuntion={deleteFuntion}
            />
          ))}

          {/* ))}
          {isPending ? (
            <Box pt={`20px`}>
              <LoadingSpinner />
            </Box>
          ) : (
            <Box height={`50px`} mt={`20px`}>
              <LoadingSpinner />
            </Box>
          )} */}
        </div>
      </Container>
    </>
  );
};
