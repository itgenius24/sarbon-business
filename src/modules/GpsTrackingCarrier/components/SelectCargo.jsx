import {
  CheckModalIcon,
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
  useMediaQuery,
  DrawerFooter,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  Drawer,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import CheckBoxComponent from "./CheckBoxComponent";
import { Checkbox } from "@/components/Checkbox";
import { useGetUserCargo, useOfferFromCustomerMutation } from "@/services/api";
import { useTranslation } from "react-i18next";
import { useGetLang } from "@/hooks/useGetLang";

const SelectCargo = ({
  cls,
  currentUserLocationData,
  setCenterModalType,
  setOffset,
  statusIconChange,
  setIconStatus,
}) => {
  const { t } = useTranslation();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const [selectCargo, setSelectCargo] = useState("");
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(false);
  const locale = useGetLang();
  const getAllUserCargoParams = {
    data: JSON.stringify({
      users_id: currentUserLocationData.user.guid,
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
          item.city_id_data?.name
            .toLowerCase()
            .includes(search?.toLowerCase()) ||
          item.city_id_2_data?.name
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
      statusIconChange();
    },
  });

  function handleOffer() {
    setDisabled(true);
    offerFromCustomer.mutate({
      data: {
        object_data: {
          user_id: currentUserLocationData?.user?.users_id,
          guid: selectCargo,
        },
      },
    });
  }

  return (
    <>
      {isLargerThan845 ? (
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
                      onClick={() => setSelectCargo(item?.guid)}
                      active={item?.guid === selectCargo}
                    >
                      <Box className={cls.countryWrap}>
                        <Flex gap={3}>
                          <p>{item.from || item.city_id_data?.name}</p>{" "}
                          <NextCheckIcon />{" "}
                          <p>{item.to || item.city_id_2_data?.name}</p>{" "}
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
            <Checkbox>{t("Отображать только мои грузы")}</Checkbox>
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
      ) : (
        <Drawer placement="bottom" isOpen={true}>
          <DrawerOverlay />
          <DrawerContent borderRadius="12px 12px 0 0">
            <DrawerHeader>
              <Flex
                justifyContent={"space-between"}
                // alignItems={"center"}
                flexDirection={`column`}
                className={cls.selectCargoTop}
              >
                <p className={cls.topTitle}>{t(`Выберите груз`)}</p>
                <InputGroup mt={`20px`} className={cls.inputWrap}>
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
            </DrawerHeader>
            <DrawerCloseButton  top={`15px`}  onClick={() => setCenterModalType("")}  />


            <DrawerBody minHeight={`200px`} maxHeight={`590px`}>
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
                              <p>{item.from || item.city_id_data?.name}</p>{" "}
                              <NextCheckIcon />{" "}
                              <p>{item.to || item.city_id_2_data?.name}</p>{" "}
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
                    <Flex
                      direction={"column"}
                      alignItems={"center"}
                      gap={"30px"}
                    >
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
            </DrawerBody>
            <DrawerFooter mb={`20px`}>
              <Flex
                width={`100%`}
                justifyContent={"space-between"}
                // alignItems={"center"}
                className={cls.selectCargoBottom}
                flexDirection={`column`}
              >
                <Checkbox>{t("Отображать только мои грузы")}</Checkbox>
                <Flex
                  mt={`20px`}
                  width={`100%`}
                  flexDirection={`column`}
                  gap={2}
                >
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
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SelectCargo;
