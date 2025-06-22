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
  Tooltip,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import CheckBoxComponent from "./CheckBoxComponent";
import {
  useGetCargoMap,
  useOfferFromCustomerMutation,
} from "@/services/api";
import { useTranslation } from "react-i18next";
import authStore from "@/store/auth.store";

const SelectCargo = ({
  cls,
  currentUserLocationData,
  setCenterModalType,
  setOffset,
  setIconStatus,
}) => {
  const { t } = useTranslation();
  const [selectCargo, setSelectCargo] = useState([]);
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { data: dataMap, isLoading } = useGetCargoMap({
    data: {
      data: {
        object_data: {
          from_lat: currentUserLocationData?.users_gps?.[0]?.lat,
          from_long: currentUserLocationData?.users_gps?.[0]?.long,
          from_radius: 10000000000,
          page: 1,
          limit: 1000,
        },
      },
    },
    querySettings: {
      select: (res) => ({...res,
        response: res?.response.sort((a, b) => a.distances - b.distances),
      }),
    },
  });



  const cargoData = useMemo(() => {
    if (search) {
      return dataMap?.response?.filter(
        (item) =>
          item?.from.toLowerCase().includes(search?.toLowerCase()) ||
          item?.to.toLowerCase().includes(search?.toLowerCase()) ||
          item?.number_of_order.toLowerCase().includes(search?.toLowerCase())
      );
    } else {
      return dataMap?.response;
    }
  }, [search, dataMap, dataMap?.response]);

  const offerFromCustomer = useOfferFromCustomerMutation({
    onSuccess() {
      setCenterModalType("");
      setDisabled(false);
      setOffset(0);
      setIconStatus("waiting_for_driver");
      // statusIconChange();
      setSelectCargo([]);
    },

    onError: (res) => {
      setSelectCargo([]);
      setCenterModalType("");
      setDisabled(false);
      setOffset(0);
    },
  });

  function handleOffer() {
    setDisabled(true);
    offerFromCustomer.mutate({
      data: {
        object_data: {
          cargo: selectCargo?.map((item) => ({
            cargo_id: item.guid,
            customer_id: item?.users_id,
          })),
          driver_id: currentUserLocationData?.users_id,
          dispatcher_id: authStore?.userData.id,
          firm_id: currentUserLocationData?.firm_data?.firm_data?.[0]?.firm_id,
          approve_time_from_dispatcher: new Date().toISOString()
        },
      },
    });
  }

  const toggleSelect = (id) => {
    const exists = selectCargo.find((i) => i.guid === id.guid);
    if (exists) {
      setSelectCargo(selectCargo.filter((i) => i.guid !== id.guid));
    } else {
      setSelectCargo([...selectCargo, id]);
    }
  };

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
            isDisabled={isLoading}
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
        {!isLoading ? (
          cargoData?.length > 0 ? (
            cargoData?.map((item) => {
              return (
                <CheckBoxComponent
                  key={item.guid}
                  onClick={() => toggleSelect(item)}
                  active={selectCargo?.some((i) => i.guid === item.guid)}
                >
                  <Box className={cls.countryWrap}>
                    <Flex gap={3}>
                      <Tooltip
                        color={`black`}
                        boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                        background={`#fff`}
                        label={`${item.from}`}
                      >
                        <p>
                          {item.from?.length >= 20
                            ? `${item.from?.slice(0, 20)}...`
                            : item.from}
                        </p>
                      </Tooltip>
                      <NextCheckIcon />
                      <Tooltip
                        color={`black`}
                        boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                        background={`#fff`}
                        label={`${item.to}`}
                      >
                        <p>
                          {item.to?.length >= 20
                            ? `${item.to?.slice(0, 20)}...`
                            : item.to}
                        </p>
                      </Tooltip>
                    </Flex>
                    <Flex mt={`5px`} className={cls.subTitle} gap={3}>
                      {item?.product_type}

                      <Flex gap={1} alignItems={"center"}>
                        <StoneIcon /> {item?.weight} т.
                      </Flex>
                      <Flex gap={1} alignItems={"center"}>
                        <LoadOulineIcon /> {item?.volume_m3} m3
                      </Flex>
                      <span>ID: {item?.number_of_order}</span>
                      <span>S: {item?.distances?.toFixed(1)} km</span>

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
        justifyContent={`space-between`}
        alignItems={"center"}
        className={cls.selectCargoBottom}
      >
        <p className={cls.count}>Выбрано: {selectCargo?.length} </p>
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
