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
import authStore from "@/store/auth.store";

const SelectCargo = ({ cls, currentUserLocationData, setCenterModalType, setOffset,statusIconChange,setIconStatus }) => {
  const { t } = useTranslation();
  const [selectCargo, setSelectCargo] = useState("");
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(false);
  const locale = useGetLang();
  const getAllUserCargoParams = {
    data: JSON.stringify({
      // users_id: currentUserLocationData.user.guid,
      with_relations: true,
      order_status: ["active"],
      cargo_type: ["cargo"],
    }),
  };

  const getAllUserCargo = useGetUserCargo(getAllUserCargoParams, {
    enabled: !!currentUserLocationData.user.guid,
  });

  const cargoData = useMemo(() => {
    if (search) {
      return getAllUserCargo.data?.response?.filter(
        (item) =>
          item?.from
            .toLowerCase()
            .includes(search?.toLowerCase()) ||
          item?.to
            .toLowerCase()
            .includes(search?.toLowerCase())
      );
    } else {
      return getAllUserCargo.data?.response;
    }
  }, [search, getAllUserCargo, getAllUserCargo.data?.response]);

  const offerFromCustomer = useOfferFromCustomerMutation({
    onSuccess() {
      setCenterModalType("");
      setDisabled(false);
      setOffset(0);
      setIconStatus("waiting_for_driver");
      statusIconChange()
    },
  });


  function handleOffer() {
    setDisabled(true);
    offerFromCustomer.mutate({
      data: {
        object_data: {
          cargo_id:selectCargo?.guid,
          driver_id:currentUserLocationData?.users_id,
          dispatcher_id:authStore?.userData.id,
          customer_id:selectCargo?.users_id_data?.guid,
          firm_id:currentUserLocationData?.firm_data?.firm_data?.[0]?.firm_id,
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
        <p className={cls.topTitle}>{t(`Выберите груз`)}</p>
        <InputGroup className={cls.inputWrap}>
          <Input
            placeholder={t("Поиск")}
            className={cls.input}
            onChange={(e) => setSearch(e.target.value)}
          />
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
                  onClick={() => setSelectCargo(item)}
                  active={item?.guid === selectCargo?.guid}
                >
                  <Box className={cls.countryWrap}>
                    <Flex gap={3}>
                      <p>
                        {item.from || item.city_id_data?.name}
                      </p>{" "}
                      <NextCheckIcon />{" "}
                      <p>
                        
                        {item.to|| item.city_id_2_data?.name}
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
        justifyContent={"flex-end"}
        alignItems={"center"}
        className={cls.selectCargoBottom}
      >
        {/* <Checkbox>{t( "Отображать только мои грузы")}</Checkbox> */}
        <Flex gap={2}>
          <Button
            className={cls.topButton}
            onClick={() => setCenterModalType("")}
            variant="secondaryWhite"
            size="md"
            border="1px solid #D0D5DD"
          >
            {t(`Отменить`)}
          </Button>
          <Button
            isDisabled={!selectCargo || disabled}
            onClick={() => handleOffer()}
            className={cls.topButton}
            size="md"
          >
             {t(`Предложить`)}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default SelectCargo;
