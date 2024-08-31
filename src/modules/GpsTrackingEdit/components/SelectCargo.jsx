import {
  LoadOulineIcon,
  NextCheckIcon,
  SearchIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import CheckBoxComponent from "./CheckBoxComponent";
import { Checkbox } from "@/components/Checkbox";
import { useGetUserCargo, useOfferFromCustomerMutation } from "@/services/api";
import { useTranslation } from "react-i18next";
import { useGetLang } from "@/hooks/useGetLang";

const SelectCargo = ({ cls, contendSingle, setCenterModalType }) => {
  const { t } = useTranslation();
  const [selectCargo, setSelectCargo] = useState("");
  const [search,setSearch] = useState('');
  const locale = useGetLang();
  const getAllUserCargoParams = {
    data: JSON.stringify({
      users_id: contendSingle.users_id,
      with_relations: true,
      order_status: ["active"],
      cargo_type: ["cargo"],
    }),
  };

  const getAllUserCargo = useGetUserCargo(getAllUserCargoParams, {
    enabled: !!contendSingle.users_id_data.guid,
  });

  const cargoData = useMemo(() => {
      if(search){
        return  getAllUserCargo.data?.response?.filter(item => item.cargo_type_id_data?.name.toLowerCase().includes(search?.toLowerCase()));
      }
      else{
        return getAllUserCargo.data?.response;
      }
  },[search,getAllUserCargo,getAllUserCargo.data?.response]);

  const offerFromCustomer = useOfferFromCustomerMutation({
    onSuccess() {
      setCenterModalType("");
    },
  });

  console.log("selectCargo", contendSingle);

  function handleOffer() {
    offerFromCustomer.mutate({
      data: {
        object_data: {
          user_id: contendSingle.users_id,
          guid: selectCargo,
        },
      },
    });
  }

  return (
    <div className={cls.selectCargo}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        className={cls.selectCargoTop}
      >
        <p className={cls.topTitle}>Выберите груз</p>
        <InputGroup className={cls.inputWrap}>
          <Input placeholder="Поиск" className={cls.input} onChange={(e) => setSearch(e.target.value)} />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Box className={cls.modalContend}>
        {!getAllUserCargo?.isLoading ? (
         cargoData.length > 0 ? (
            cargoData.map((item) => {
              return (
                <CheckBoxComponent
                  key={item.guid}
                  onClick={() => setSelectCargo(item?.guid)}
                  active={item?.guid === selectCargo}
                >
                  <Box className={cls.countryWrap}>
                    <Flex gap={3}>
                      <p>
                        {item.city_id_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ] || item.city_id_data?.name}
                      </p>{" "}
                      <NextCheckIcon />{" "}
                      <p>
                        {" "}
                        {item.city_id_2_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ] || item.city_id_2_data?.name}
                      </p>{" "}
                    </Flex>
                    <Flex className={cls.subTitle} gap={3}>
                      {item?.cargo_type_id_data?.name}

                      <Flex gap={1} alignItems={"center"}>
                        <StoneIcon /> {item?.weight} т.
                      </Flex>
                      <Flex gap={1} alignItems={"center"}>
                        <LoadOulineIcon /> {item?.volume_m3} m3
                      </Flex>
                    </Flex>
                  </Box>
                </CheckBoxComponent>
              );
            })
          ) : (
            <Flex direction={"column"} alignItems={"center"} gap={"30px"}>
              <Text color={"blackAlpha.400"} fontSize={"18px"}>
                {t("У вас нет существующих грузов")}
              </Text>
              {/* <Link href={"/add-cargo"} variant={"outline"}>
                        {t("Добавить груз")}
                      </Link> */}
            </Flex>
          )
        ) : (
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Spinner />
          </Flex>
        )}
      </Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        className={cls.selectCargoBottom}
      >
        <Checkbox>Отображать только мои грузы</Checkbox>
        <Flex gap={2}>
          <Button
            className={cls.topButton}
            onClick={() => setCenterModalType("")}
            variant="secondaryWhite"
            size="md"
            border="1px solid #D0D5DD"
          >
            Отменить
          </Button>
          <Button
            isDisabled={!selectCargo}
            onClick={() => handleOffer()}
            className={cls.topButton}
            size="md"
          >
            Предложить
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default SelectCargo;
