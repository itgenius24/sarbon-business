import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import cls from "./style.module.scss";
import { useTranslation } from "react-i18next";

import {
  useDeleteOrder,
  useGetCar,
  useGetCargoList,
  useGetUserData,
  useLogistikaGpsTrackingFilterDriverPred,
  useUpdateUserData,
} from "@/services/api";

import {
  CopyIconAdress,
  GalichkaIcon,
  LoadOulineIcon,
  SearchIcon,
  StoneIcon,
  UserIconCerate,
} from "@/assets/icons/icons";
import { useGetLang } from "@/hooks/useGetLang";
import { Checkbox } from "@/components/Checkbox";
import TooltipComponets from "../TooltipComponets";
import authStore from "@/store/auth.store";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import Image from "next/image";
import { format } from "date-fns";
import copy from "copy-to-clipboard";
import { useRouter } from "next/navigation";
import CheckBoxComponent from "@/modules/GpsTrackingCarrier/components/CheckBoxComponent";
import { CardLoad } from "../CardLoad/CardLoad";

export const TableComponent = ({
  isLargerThan845,
  dataRes,
  setDataResOld,
  dataResOld,
  setDataRes,
  setStatus2,
}) => {
  const { t } = useTranslation();
  const [selectCargo, setSelectCargo] = useState([]);

  const [search, setSearch] = useState("");
  const [carId, setCarId] = useState();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [centerModalType, setCenterModalType] = useState(null);
  const [dataUser, setDataUser] = useState();
  const [status, setStatus] = useState(false);
  const toast = useToast();
  const router = useRouter();
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

  const { mutate: deleteOrderData } = useDeleteOrder({
    onSuccess: (res) => {
      setStatus(true);
      setStatus2(true);
      setCenterModalType(false);
      onClose();
    },
  });

  const { mutate: updateUer } = useUpdateUserData({});

  const { mutate: pridlojetData, isLoading } =
    useLogistikaGpsTrackingFilterDriverPred({
      onSuccess: (res) => {
        setCarId();
        setSelectCargo([]);
        setStatus(true);
        setCenterModalType(false);
        onClose();
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
      setSelectCargo(selectCargo.filter((selectedId) => selectedId !== guid));
    } else {
      setSelectCargo([...selectCargo, guid]);
    }
  };

  const filteredData = dataUser?.filter((item) => {
    const provisionsData = item?.orders?.filter(
      (item) =>
        item.provisions?.includes(`performed`) ||
        item.provisions?.includes(`approve_from_driver`) ||
        item.provisions?.includes(`new_proposal_from_director`) ||
        item.provisions?.includes(`approve_by_customer`)
    );

    if (isCheckboxChecked) {
      return (
        (!provisionsData || provisionsData?.length === 0) &&
        item?.full_name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return (
        provisionsData?.length > 0 &&
        item?.full_name.toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  const handlePred = () => {
    const data = {
      data: {
        object_data: {
          firm_id,
          cargo_id: carId?.guid,
          driver_ids: selectCargo,
          cargo_number: carId?.number_of_order,
          customer_id: carId?.users_id,
        },
      },
    };
    pridlojetData(data);
  };

  const handleSort = (type) => {
    const sortedData = [...dataRes].sort((a, b) => {
      if (type === "back") {
        return a?.bid_cash - b.bid_cash;
      } else if (type === "top") {
        return b?.bid_cash - a?.bid_cash;
      }
    });
    if (type === `all`) {
      setDataRes(dataResOld);
    } else {
      setDataRes(sortedData);
    }
  };

  const handleSorFrom = (type) => {
    const sortedData = [...dataRes].sort((a, b) => {
      if (type === `top`) {
        return a?.from.localeCompare(b?.from);
      } else if (type === `back`) {
        return b?.from.localeCompare(a?.from);
      }
    });

    if (type === `all`) {
      setDataRes(dataResOld);
    } else {
      setDataRes(sortedData);
    }
  };

  const handleSorTo = (type) => {
    const sortedData = [...dataRes].sort((a, b) => {
      if (type === `top`) {
        return a?.to?.localeCompare(b?.to);
      } else if (type === `back`) {
        return b?.to?.localeCompare(a?.to);
      }
    });

    if (type === `all`) {
      setDataRes(dataResOld);
    } else {
      setDataRes(sortedData);
    }
  };

  const handleSorCar = (type) => {
    const sortedData = [...dataRes].sort((a, b) => {
      if (type === `top`) {
        return a?.car_type?.localeCompare(b?.car_type);
      } else if (type === `back`) {
        return b?.car_type?.localeCompare(a?.car_type);
      }
    });

    if (type === `all`) {
      setDataRes(dataResOld);
    } else {
      setDataRes(sortedData);
    }
  };

  const deleteOrder = (data) => {
    const order = data?.orders?.filter(
      (item) =>
        item.provisions?.filter((el) => el !== `performed`)?.[0] !== `performed`
    );
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

  const copyFn = (name) => {
    copy(name);
    toast({
      title: t("Адрес скопирован"),
      status: "success",
      position: "top right",
      isClosable: true,
      duration: 3000,
    });
  };

  const columns = [
    {
      title: t("Откуда забрать"),
      width: 250,
      filter: true,
      key: `from`,
      filterType: (type) => handleSorFrom(type),
      render: (row, index) => (
        <Flex className={cls.address} gap={`14px`} alignItems={`center`}>
          <Box display={`flex`} flexDirection={`column`}>
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={row?.flag_ot ||  `https://flagcdn.com/w320/${row?.country_code_from?.toLowerCase()}.png`}
              alt="wef"
            />
            <p className={cls.country_code}>{row?.country_code_from}</p>
          </Box>

          <Flex>
            <p className={cls.title}>
              {row?.from ? (
                row?.from?.length > 20 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${row?.from}`}
                  >
                    <span>{`${row?.from.slice(0, 20)}...`}</span>
                  </Tooltip>
                ) : (
                  row?.from
                )
              ) : (
                row?.city_id_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || row?.city_id_data?.name
              )}
              <br />
              <span className={cls.subTitle}>
                {row?.as_soon_as_a
                  ? t("Готов к загрузке")
                  : row?.load_time && format(row?.load_time, `yyyy-MM-dd`)}
               
              </span>
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                copyFn(row?.from);
              }}
              className={cls.copy}
            >
              <CopyIconAdress />
            </div>
          </Flex>
        </Flex>
      ),
    },
    {
      title: t("Куда"),
      width: 250,
      filter: true,
      key: `to`,
      filterType: (type) => handleSorTo(type),
      render: (row, index) => (
        <Flex className={cls.address} gap={`14px`} alignItems={`center`}>
          <Box display={`flex`} flexDirection={`column`}>
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={row?.flag_do ||  `https://flagcdn.com/w320/${row?.country_code_to?.toLowerCase()}.png`}
              alt={row?.flag_do}
            />
            <p className={cls.country_code}>{row?.country_code_to}</p>
          </Box>
          <Flex>
            <p className={cls.title}>
              {row?.to ? (
                row?.to.length > 20 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${row?.to}`}
                  >
                    <span>{`${row?.to.slice(0, 20)}...`}</span>
                  </Tooltip>
                ) : (
                  row?.to
                )
              ) : (
                row?.city_id_2_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || row?.city_id_2_data?.name
              )}{" "}
              <br />
              <span className={cls.subTitle}>
                {row?.as_soon_as_b
                  ? t("Как можно скорее")
                  : row?.date && format(row?.date, `yyyy-MM-dd`)}
              </span>
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                copyFn(row?.to);
              }}
              className={cls.copy}
            >
              <CopyIconAdress />
            </div>
          </Flex>
        </Flex>
      ),
    },
    {
      title: t("Груз"),
      width: 200,
      render: (row, index) => (
        <>
          <Flex gap={`11px`}>
            <Flex gap={1} alignItems={"center"}>
              <StoneIcon /> <p className={cls.title}> {row?.weight}т</p>
            </Flex>
            <Flex gap={1} alignItems={"center"}>
              <LoadOulineIcon />{" "}
              <p className={cls.title}> {row?.volume_m3}м³</p>
            </Flex>
          </Flex>
          <span className={cls.subTitle}>
            {row?.[`product_type_${locale}`]
              ? row?.[`product_type_${locale}`]
              : row?.product_type}
          </span>
        </>
      ),
    },
    {
      title: t("Транспорт"),
      filter: true,
      key: `car`,
      filterType: (type) => handleSorCar(type),
      width: 200,
      render: (row, index) => (
        <Box>
          <p className={cls.title}>{row?.car_type}</p>
          <span className={cls.subTitle}>{t("Задняя")}</span>
        </Box>
      ),
    },
    {
      title: t("Стомость"),
      width: 200,
      filter: true,
      key: `price`,
      filterType: (type) => handleSort(type),
      render: (row, index) => (
        <Box>
          {row?.bid_cash ? (
            <>
              <p className={cls.title}>
                {row?.bid_cash} {row?.currency_id_data?.[0]?.code}
                <span className={cls.subTitle1}>
                  {row?.[`payment_type_${locale}`] || row?.payment_type
                    ? ` ${t(
                        row?.[`payment_type_${locale}`]
                          ? row?.[`payment_type_${locale}`]
                          : row?.payment_type
                      )}`
                    : t(" Безнал")}
                </span>
              </p>
              <span className={cls.subTitle}>
                {t("Предопл.")}{" "}
                {row?.prepayment_percentage > 0
                  ? `${row?.prepayment_percentage} ${row?.currency_id_data?.[0]?.code}`
                  : t("Нет")}
              </span>
            </>
          ) : (
            <>
              <p className={cls.title}>{t("По запросу")}</p>
              <span className={cls.subTitle}>
                {t("Предопл.")} {t("По запросу")}
              </span>
            </>
          )}
        </Box>
      ),
    },
    {
      title: t("Заказчик"),
      width: 200,
      render: (row, index) => (
        <Box>
          <Flex alignItems={`center`} gap={1}>
            <Avatar
              width={`50px`}
              height={`50px`}
              src={
                process.env.NEXT_PUBLIC_MEDIA_URL +
                row?.customer_data?.[0]?.photo
              }
              fontSize={`16px`}
              name={row?.customer_data?.[0]?.full_name}
            />
            <Box>
              <Flex alignrows={`center`} gap={2}>
                <span className={cls.subTitle}>
                  {row?.customer_data?.[0]?.full_name}
                </span>
                <GalichkaIcon />
              </Flex>
              <p className={cls.tel}>{row?.customer_data?.[0]?.phone}</p>
            </Box>
          </Flex>
        </Box>
      ),
    },
  ];

  const statusTooltip = (item) => {
    const data = item?.status || [];

    {
      return (
        (data?.includes(`approve_from_driver`) ||
          data?.includes(`approve_by_customer`) ||
          data?.includes(`new_proposal_from_director`)) && (
          <TooltipComponets
            cls={cls}
            status={`ss`}
            label={
              data?.includes(`approve_from_driver`) ||
              data?.includes(`new_proposal_from_director`)
                ? t("Ждем подтверждение водителя")
                : t("Ждем подтверждение заказчика")
            }
            color={
              data?.includes(`approve_from_driver`) ||
              data?.includes(`new_proposal_from_director`)
                ? `rgba(193, 187, 32, 1)`
                : `rgba(0, 122, 255, 1)`
            }
          />
        )
      );
    }
  };

  const onRow = (item) => {
    setCarId(item);
    setCenterModalType(true);
    onOpen();
  };

  return (
    <>
      <Box mb={`10px`} mt={"32px"}>
        {!isLargerThan845 ? (
          <Flex flexDirection={`column`} rowGap={`20px`} alignItems={`center`}>
            {dataRes.map((item) => {
              return (
                <CardLoad
                  onRow={() => onRow(item)}
                  key={item?.guid}
                  item={item}
                  t={t}
                  locale={locale}
                  isTollTip={true}
                  statusTooltip={statusTooltip}
                />
              );
            })}
          </Flex>
        ) : (
          <SarbonTable
            isTooltip
            statusTooltip={statusTooltip}
            variant="card"
            columns={columns}
            data={dataRes}
            onRow={onRow}
          />
        )}
      </Box>

      {isLargerThan845 ? (
        <Modal size={`2xl`} isCentered isOpen={isOpen}>
          <ModalOverlay onClick={onClose} />
          <ModalContent>
            <ModalHeader borderBottom={`1px solid rgba(219, 216, 227, 1)`}>
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                height={`40px`}
              >
                <p className={cls.topTitle}>{t("Предложить груз водителю")}</p>
                {dataUser?.length > 0 ? (
                  <InputGroup width={`40%`} className={cls.inputWrap}>
                    <Input
                      placeholder={t("Поиск")}
                      className={cls.input}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <InputRightElement>
                      <SearchIcon />
                    </InputRightElement>
                  </InputGroup>
                ) : (
                  <ModalCloseButton onClick={onClose} />
                )}
              </Flex>
            </ModalHeader>
            <ModalBody minHeight={`400px`}>
              <Box>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item) => {
                    const provisionsData = item?.orders?.filter(
                      (item) =>
                        item.provisions?.includes(`performed`) ||
                        item.provisions?.includes(`approve_from_driver`) ||
                        item.provisions?.includes(
                          `new_proposal_from_director`
                        ) ||
                        item.provisions?.includes(`approve_by_customer`)
                    );
                    return (
                      <CheckBoxComponent
                        key={item?.guid}
                        onClick={() => {
                          if (
                            provisionsData?.[0]?.provisions?.includes(
                              `performed`
                            ) ||
                            provisionsData?.[0]?.provisions?.includes(
                              `approve_from_driver`
                            ) ||
                            provisionsData?.[0]?.provisions?.includes(
                              `new_proposal_from_director`
                            ) ||
                            provisionsData?.[0]?.provisions?.includes(
                              `approve_by_customer`
                            )
                          ) {
                            // deleteOrder(item) emas, faqat onOpen() chaqirildi
                          } else {
                            handleSelect(item?.guid);
                          }
                        }}
                        active={selectCargo.includes(item?.guid)}
                        status={
                          provisionsData?.[0]?.provisions?.includes(
                            `performed`
                          ) ||
                          provisionsData?.[0]?.provisions?.includes(
                            `approve_from_driver`
                          ) ||
                          provisionsData?.[0]?.provisions?.includes(
                            `new_proposal_from_director`
                          ) ||
                          provisionsData?.[0]?.provisions?.includes(
                            `approve_by_customer`
                          )
                        }
                      >
                        {provisionsData?.[0]?.provisions?.includes(
                          `performed`
                        ) ||
                        provisionsData?.[0]?.provisions?.includes(
                          `approve_from_driver`
                        ) ||
                        provisionsData?.[0]?.provisions?.includes(
                          `new_proposal_from_director`
                        ) ||
                        provisionsData?.[0]?.provisions?.includes(
                          `approve_by_customer`
                        ) ? (
                          <>
                            {provisionsData?.[0]?.provisions?.includes(
                              `approve_by_customer`
                            ) && (
                              <TooltipComponets
                                cls={cls}
                                status={`check`}
                                label={`Водитель подтвердил`}
                                color={`rgba(21, 186, 77, 1)`}
                              />
                            )}
                            {provisionsData?.[0]?.provisions?.includes(
                              `performed`
                            ) && (
                              <TooltipComponets
                                cls={cls}
                                status={`check`}
                                label={`Водитель занят`}
                                color={`rgba(21, 186, 77, 1)`}
                              />
                            )}
                            {(provisionsData?.[0]?.provisions?.includes(
                              `approve_from_driver`
                            ) ||
                              provisionsData?.[0]?.provisions?.includes(
                                `new_proposal_from_director`
                              )) && (
                              <TooltipComponets
                                cls={cls}
                                status={`approve_from_driver`}
                                label={`Ждем подтверждение водителя`}
                                color={`rgba(193, 187, 32, 1)`}
                              />
                            )}

                            <Popover>
                              <PopoverTrigger>
                                <Box as="button" className={cls.countryWrap}>
                                  <Flex gap={3}>
                                    <Avatar
                                      name={item?.full_name}
                                      src={item?.photo}
                                    />
                                    <Box>
                                      <p className={cls.name}>
                                        {item?.full_name}
                                      </p>
                                      <p className={cls.subTitle}>
                                        {item?.phone}
                                      </p>
                                    </Box>
                                  </Flex>
                                </Box>
                              </PopoverTrigger>

                              <PopoverContent
                                background={`white`}
                                position={`relative`}
                                border={`none`}
                                boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                                width={`300px`}
                              >
                                <PopoverArrow size={`lg`} />
                                <PopoverBody fontWeight={400}>
                                  <PopoverCloseButton />
                                  <Box onClick={() => deleteOrder(item)}>
                                    {t("Отменить предложение")}
                                  </Box>
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </>
                        ) : (
                          <Box className={cls.countryWrap}>
                            <Flex gap={3}>
                              <Avatar
                                name={item?.full_name}
                                src={item?.photo}
                              />
                              <Box>
                                <p className={cls.name}>{item?.full_name}</p>
                                <p className={cls.subTitle}>{item?.phone}</p>
                              </Box>
                            </Flex>
                          </Box>
                        )}
                      </CheckBoxComponent>
                    );
                  })
                ) : (
                  <Flex direction={"column"} alignItems={"center"} gap={"30px"}>
                    <UserIconCerate />

                    <Text color={"blackAlpha.400"} fontSize={"18px"}>
                      {t("У вас пока нет водителей")}
                    </Text>
                    <Button
                      onClick={() => router.push(`/${locale}/drivers/create`)}
                      className={cls.topButton}
                      size="md"
                      width={`fit-content`}
                    >
                      {t("Добавить водителя")}
                    </Button>
                  </Flex>
                )}
              </Box>
            </ModalBody>
            <ModalFooter borderTop={`1px solid rgba(219, 216, 227, 1)`}>
              <Flex
                width={`100%`}
                justifyContent={"space-between"}
                alignItems={"center"}
                className={cls.selectCargoBottom}
                height={`45px`}
              >
                <Checkbox
                  defaultChecked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                >
                  {t("Только свободные водители")}
                </Checkbox>

                {dataUser?.length > 0 && (
                  <Flex gap={2}>
                    <Button
                      className={cls.topButton}
                      onClick={() => onClose()}
                      variant="secondaryWhite"
                      size="md"
                      border="1px solid #D0D5DD"
                    >
                      {t("Отменить")}
                    </Button>

                    <Button
                      isDisabled={selectCargo.length === 0}
                      isLoading={isLoading}
                      onClick={() => handlePred()}
                      className={cls.topButton}
                      size="md"
                    >
                      {t("Предложить")}
                    </Button>
                  </Flex>
                )}
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay onClick={onClose} />
          <DrawerContent borderRadius="12px 12px 0 0">
            <DrawerHeader>
              <Flex
                justifyContent={"space-between"}
                width={`100%`}
                // alignItems={"center"}
                flexDirection={`column`}
                className={cls.selectCargoTop}
              >
                <p className={cls.topTitle}>{t("Предложить груз водителю")}</p>
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
            <DrawerCloseButton
              top={`15px`}
              onClick={() => {
                onClose();
                setCenterModalType(``);
              }}
            />
            <DrawerBody>
              <Box className={cls.modalContend}>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item) => {
                    const provisionsData = item?.orders?.filter(
                      (item) =>
                        item.provisions?.includes(`performed`) ||
                        item.provisions?.includes(`approve_from_driver`) ||
                        item.provisions?.includes(
                          `new_proposal_from_director`
                        ) ||
                        item.provisions?.includes(`approve_by_customer`)
                    );
                    console.log(`provisions`, provisionsData);
                    return (
                      <CheckBoxComponent
                        key={item?.guid}
                        onClick={() => {
                          if (
                            provisionsData?.[0]?.provisions?.includes(
                              `performed`
                            ) ||
                            provisionsData?.[0]?.provisions?.includes(
                              `approve_from_driver`
                            ) ||
                            provisionsData?.[0]?.provisions?.includes(
                              `new_proposal_from_director`
                            ) ||
                            provisionsData?.[0]?.provisions?.includes(
                              `approve_by_customer`
                            )
                          ) {
                            // deleteOrder(item) emas, faqat onOpen() chaqirildi
                          } else {
                            handleSelect(item?.guid);
                          }
                        }}
                        active={selectCargo.includes(item?.guid)}
                        status={
                          provisionsData?.[0]?.provisions?.includes(
                            `performed`
                          ) ||
                          provisionsData?.[0]?.provisions?.includes(
                            `approve_from_driver`
                          ) ||
                          provisionsData?.[0]?.provisions?.includes(
                            `new_proposal_from_director`
                          ) ||
                          provisionsData?.[0]?.provisions?.includes(
                            `approve_by_customer`
                          )
                        }
                      >
                        {provisionsData?.[0]?.provisions?.includes(
                          `performed`
                        ) ||
                        provisionsData?.[0]?.provisions?.includes(
                          `approve_from_driver`
                        ) ||
                        provisionsData?.[0]?.provisions?.includes(
                          `new_proposal_from_director`
                        ) ||
                        provisionsData?.[0]?.provisions?.includes(
                          `approve_by_customer`
                        ) ? (
                          <>
                            {provisionsData?.[0]?.provisions?.includes(
                              `approve_by_customer`
                            ) && (
                              <TooltipComponets
                                cls={cls}
                                status={`check`}
                                label={`Водитель подтвердил`}
                                color={`rgba(21, 186, 77, 1)`}
                              />
                            )}
                            {provisionsData?.[0]?.provisions?.includes(
                              `performed`
                            ) && (
                              <TooltipComponets
                                cls={cls}
                                status={`check`}
                                label={`Водитель занят`}
                                color={`rgba(21, 186, 77, 1)`}
                              />
                            )}
                            {(provisionsData?.[0]?.provisions?.includes(
                              `approve_from_driver`
                            ) ||
                              provisionsData?.[0]?.provisions?.includes(
                                `new_proposal_from_director`
                              )) && (
                              <TooltipComponets
                                cls={cls}
                                status={`approve_from_driver`}
                                label={`Ждем подтверждение водителя`}
                                color={`rgba(193, 187, 32, 1)`}
                              />
                            )}

                            <Popover>
                              <PopoverTrigger>
                                <Box as="button" className={cls.countryWrap}>
                                  <Flex gap={3}>
                                    <Avatar
                                      name={item?.full_name}
                                      src={item?.photo}
                                    />
                                    <Box>
                                      <p className={cls.name}>
                                        {item?.full_name}
                                      </p>
                                      <p className={cls.subTitle}>
                                        {item?.phone}
                                      </p>
                                    </Box>
                                  </Flex>
                                </Box>
                              </PopoverTrigger>

                              <PopoverContent
                                background={`white`}
                                position={`relative`}
                                border={`none`}
                                boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                                width={`300px`}
                              >
                                <PopoverArrow size={`lg`} />
                                <PopoverBody fontWeight={400}>
                                  <PopoverCloseButton />
                                  <Box onClick={() => deleteOrder(item)}>
                                    {t("Отменить предложение")}
                                  </Box>
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </>
                        ) : (
                          <Box className={cls.countryWrap}>
                            <Flex gap={3}>
                              <Avatar
                                name={item?.full_name}
                                src={item?.photo}
                              />
                              <Box>
                                <p className={cls.name}>{item?.full_name}</p>
                                <p className={cls.subTitle}>{item?.phone}</p>
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
                      {t("Только свободные водители")}
                    </p>
                  </Flex>
                )}
              </Box>
            </DrawerBody>
            <DrawerFooter mb={`20px`}>
              <Flex
                rowGap={`20px`}
                width={`100%`}
                flexDirection={`column`}
                mt={3}
                gap={2}
              >
                <Checkbox
                  defaultChecked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                >
                  {t("Только свободные водители")}
                </Checkbox>

                <Button
                  className={cls.topButton}
                  onClick={() => setCenterModalType("")}
                  variant="secondaryWhite"
                  size="md"
                  border="1px solid #D0D5DD"
                >
                  {t("Отменить")}
                </Button>
                <Button
                  isLoading={isLoading}
                  onClick={() => handlePred()}
                  className={cls.topButton}
                  size="md"
                >
                  {t("Предложить")}
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
