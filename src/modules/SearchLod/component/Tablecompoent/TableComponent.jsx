import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import cls from "./style.module.scss";

import {
  useDeleteOrder,
  useGetCar,
  useGetCargoList,
  useGetCargoPost,
  useGetUserData,
  useLogistikaGpsTrackingFilterDriver,
  useLogistikaGpsTrackingFilterDriverPred,
  useUpdateUserData,
} from "@/services/api";

import { Card } from "../Card/Card";
import {
  ArrowIcon,
  LoadOulineIcon,
  NextCheckIcon,
  SearchIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import CheckBoxComponent from "@/modules/GpsTrackingEdit/components/CheckBoxComponent";
import { useGetLang } from "@/hooks/useGetLang";
import { Checkbox } from "@/components/Checkbox";
import TooltipComponets from "../TooltipComponets";
import authStore from "@/store/auth.store";

export const TableComponent = ({ watch, formState }) => {
  const [selectCargo, setSelectCargo] = useState([]);
  const [dataRes, setDataRes] = useState([]);
  const [search, setSearch] = useState("");
  const [carId, setCarId] = useState();
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" - yuqoridan pastga, "desc" - pastdan yuqoriga
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [centerModalType, setCenterModalType] = useState();
  const [dataUser, setDataUser] = useState();
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);

  const locale = useGetLang();
  const firm_id = authStore.userData.firm_id;

  const { data } = useGetCargoList({
    params: {
      data: JSON.stringify({
        cargo_type: ["cargo"],
        // firm_id,
        // map_id:watch(`checkbox1`)
        order_status: ["active"],
        with_relations: true,
      }),
    },
    querySettings: { enabled: true },
  });

  const { mutate: getCargoPost } = useGetCargoPost({
    onSuccess: (res) => {
      setDataRes(res?.response);
      setStatus2(false);
    },
  });

  const { dirtyFields } = formState;

  useEffect(() => {
    const dataCargo = {
      data: {
        object_data: {
          from: watch(`from`) || ``,
          to: watch(`to`) || ``,
          prepayment: watch(`prepayment`) ? `true` : ``,
          spot: watch(`spot`) ? `true` : ``,
          in_spot: watch(`in_spot`) ? `true` : ``,
          vehicle_type_id: watch(`vehicle_type_id`)?.value,
          min_volume: +watch(`min_volume`) || 0,
          max_volume: +watch(`max_volume`) || 0,
          min_weight: +watch(`min_weight`) || 0,
          max_weight: +watch(`max_weight`) || 0,
          only_for_me: watch(`only_for_me`) || 0,
          firm_id,
        },
      },
    };
    getCargoPost(dataCargo);
    // if (!dataRes?.length) {
    //   setDataRes(data?.response);
    // }
  }, [
    watch(`from`)?.length,
    watch(`to`)?.length,
    watch(`prepayment`),
    watch(`spot`),
    watch(`in_spot`),
    watch(`vehicle_type_id`)?.value,
    watch(`min_volume`),
    watch(`max_volume`),
    watch(`min_weight`),
    watch(`max_weight`),
    watch(`only_for_me`),
    status2,
  ]);

  const { data: useList } = useGetUserData({
    params: {
      data: JSON.stringify({
        firm_id: firm_id,
        client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
        with_relations: true,
      }),
    },

    querySettings: {
      onSuccess: (res) => {
        console.log(`res`, res);
      },
    },
  });

  const { mutate: deleteOrderData } = useDeleteOrder({
    onSuccess: (res) => {
      setStatus(true);
      setStatus2(true);
      setCenterModalType(false);
    },
  });

  const { mutate: updateUer } = useUpdateUserData({});

  const { mutate: pridlojetData, isPending } =
    useLogistikaGpsTrackingFilterDriverPred({
      onSuccess: (res) => {
        setCarId();
        setSelectCargo([]);
        setStatus(true);
        setCenterModalType(false);
        setStatus2(true);
      },
    });

  const { mutate } = useGetCar({
    onSuccess: (res) => {
      setDataUser(res?.response);
      setStatus(false);
    },
  });

  useEffect(() => {
    const data = { data: { object_data: { firm_id } } };
    mutate(data);
  }, [status]);

  const handleSelect = (guid) => {
    if (selectCargo.includes(guid)) {
      // Agar ID allaqachon tanlangan bo'lsa, uni olib tashlaymiz
      setSelectCargo(selectCargo.filter((selectedId) => selectedId !== guid));
    } else {
      // Agar ID tanlanmagan bo'lsa, uni arrayga qo'shamiz
      setSelectCargo([...selectCargo, guid]);
    }
  };

  const filteredData = dataUser?.filter((item) => {
    // Agar checkbox tanlangan bo'lsa, faqat statusi true bo'lgan elementlarni ko'rsatish
    if (isCheckboxChecked) {
      return (
        item?.user?.provisions?.[0] === `empty` &&
        item?.user?.full_name.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Agar checkbox tanlanmagan bo'lsa, faqat search natijasini ko'rsatish
    return item?.user?.full_name.toLowerCase().includes(search.toLowerCase());
  });

  const handlePred = () => {
    const data = {
      data: {
        object_data: {
          firm_id,
          cargo_id: carId?.cargo?.guid,
          driver_ids: selectCargo,
          cargo_number: carId?.cargo?.number_of_order,
          customer_id: carId?.cargo?.users_id
        },
      },
    };
    pridlojetData(data);
  };

  console.log(`dataRes`, carId?.cargo);

  const handleSort = () => {
    const sortedData = [...dataRes].sort((a, b) => {
      if (sortOrder === "asc") {
        return a?.cargo?.bid_cash - b.cargo?.bid_cash;
      } else {
        return b?.cargo?.bid_cash - a?.cargo?.bid_cash;
      }
    });
    setDataRes(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const deleteOrder = (data) => {
    const order = data?.orders?.filter(
      (item) =>
        item.provisions?.filter((el) => el === `approve_from_driver`)?.[0] ===
        `approve_from_driver`
    );

    console.log(`order`, data);
    if (order?.length > 0) {
      deleteOrderData({ id: order?.[0]?.guid });

      updateUer({
        data: {
          guid: data?.user?.guid,
          provisions: ["empty"],
        },
      });
    }
  };

  return (
    <>
      <Flex
        p={"10px 36px"}
        justifyContent={"space-between"}
        mt={"32px"}
        width={"100%"}
      >
        <p className={cls.th}>Откуда забрать</p>
        <p className={cls.th}>Куда</p>
        <p className={cls.th}>Груз</p>
        <p className={cls.th}>Транспорт</p>
        <Flex
          onClick={handleSort}
          gap={2}
          cursor={`pointer`}
          className={cls.th}
          justifyContent={`flex-start`}
          alignItems={`center`}
        >
          <p style={{ color: `rgba(0, 122, 255, 1)` }}>Стомость</p>
          <ArrowIcon />
        </Flex>
        <p className={cls.th}>Заказчик</p>
      </Flex>
      <Flex flexDirection={`column`} rowGap={`20px`}>
        {dataRes &&
          dataRes.map((item) => (
            <Card
              onClick={() => {
                setCarId(item);
                setCenterModalType(true);
              }}
              key={item?.id}
              cls={cls}
              item={item}
            />
          ))}
      </Flex>
      {centerModalType && (
        <div className={cls.modalOver}>
          <div className={cls.selectCargo}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              className={cls.selectCargoTop}
            >
              <p className={cls.topTitle}>Предложить груз водителю</p>
              <InputGroup className={cls.inputWrap}>
                <Input
                  placeholder="Поиск"
                  className={cls.input}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputRightElement>
                  <SearchIcon />
                </InputRightElement>
              </InputGroup>
            </Flex>
            <Box className={cls.modalContend}>
              {filteredData?.length > 0 ? (
                filteredData?.map((item) => {
                  return (
                    <CheckBoxComponent
                      key={item?.user?.guid}
                      onClick={() => {
                        if (
                          item?.user?.provisions[0] === `our_cargo` ||
                          item?.user?.provisions[0] === `waiting_for_driver`
                        ) {
                          // deleteOrder(item) emas, faqat onOpen() chaqirildi
                        } else {
                          handleSelect(item?.user?.guid);
                        }
                      }}
                      active={selectCargo.includes(item?.user?.guid)}
                      status={
                        item?.user?.provisions[0] === `our_cargo` ||
                        item?.user?.provisions[0] === `waiting_for_driver`
                      }
                    >
                      {item?.user?.provisions[0] === `our_cargo` ||
                      item?.user?.provisions[0] === `waiting_for_driver` ? (
                        <>
                          {item?.user?.provisions[0] === `our_cargo` && (
                            <TooltipComponets
                              cls={cls}
                              status={`check`}
                              label={`Водитель подтвердил`}
                              color={`rgba(21, 186, 77, 1)`}
                            />
                          )}

                          {item?.user?.provisions[0] ===
                            `waiting_for_driver` && (
                            <TooltipComponets
                              cls={cls}
                              status={`waiting_for_driver`}
                              label={`Ждем подтверждение водителя`}
                              color={`rgba(193, 187, 32, 1)`}
                            />
                          )}

                          <Popover>
                            <PopoverTrigger>
                              <Box as="button" className={cls.countryWrap}>
                                <Flex gap={3}>
                                  <Avatar
                                    name={item?.user?.full_name}
                                    src={item?.user?.photo}
                                  />
                                  <Box>
                                    <p className={cls.name}>
                                      {item?.user?.full_name}
                                    </p>
                                    <p className={cls.subTitle}>
                                      {item?.user?.phone}
                                    </p>
                                  </Box>
                                </Flex>
                              </Box>
                            </PopoverTrigger>

                            <PopoverContent
                              background={`white`}
                              position={`relative`}
                              border={`none`}
                              boxShadow={` 0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                              width={`300px`}
                            >
                              <PopoverArrow size={`lg`} />
                              <PopoverBody fontWeight={400}>
                                <PopoverCloseButton />
                                <Box onClick={() => deleteOrder(item)}>
                                  Отменить предложение
                                </Box>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </>
                      ) : (
                        <Box className={cls.countryWrap}>
                          <Flex gap={3}>
                            <Avatar
                              name={item?.user?.full_name}
                              src={item?.user?.photo}
                            />
                            <Box>
                              <p className={cls.name}>
                                {item?.user?.full_name}
                              </p>
                              <p className={cls.subTitle}>
                                {item?.user?.phone}
                              </p>
                            </Box>
                          </Flex>
                        </Box>
                      )}
                    </CheckBoxComponent>
                  );
                })
              ) : (
                <Flex direction={"column"} alignItems={"center"} gap={"30px"}>
                  <p color={"blackAlpha.400"} fontSize={"18px"}>
                    {/* Только свободные водители */}
                  </p>
                  {/* <Link href={"/add-cargo"} variant={"outline"}>
                        {t("Добавить груз")}
                      </Link> */}
                </Flex>
              )}
            </Box>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              className={cls.selectCargoBottom}
            >
              <Checkbox
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              >
                Только свободные водители
              </Checkbox>
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
                  // isDisabled={!selectCargo || disabled}
                  isLoading={isPending}
                  onClick={() => handlePred()}
                  className={cls.topButton}
                  size="md"
                >
                  Предложить
                </Button>
              </Flex>
            </Flex>
          </div>
        </div>
      )}
    </>
  );
};
