import cls from "./styles.module.scss";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { DataList } from "@/components/DataList";
import authStore from "@/store/auth.store";
import { useGetUserCargo, useGetVehicle, useOfferFromCustomerMutation } from "@/services/api";
import { useState } from "react";
import { Rating } from "@/components/Rating";
import { Popup } from "@/components/Popup";
import Link from "next/link";
import clsx from "clsx";
import { useGetLang } from "@/hooks/useGetLang";
import { Placemark } from "@pbe/react-yandex-maps";
import { UseIcon, UseIconRed } from "@/assets/icons/icons";

export const SingleCar = ({
  carInfo,
  showDistance = false,
  oneDir,
  infoList,
  phoneBtn,
  dataAccordion,
  additionalData,
  withAddress,
  carType,
  loadType,
  capacity,
  height,
  isMap=false
}) => {

  const locale = useGetLang();

  const userId = authStore.userData.id;

  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [phoneBtnText, setPhoneBtnText] = useState("Показать номер");

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  function handleClickPhoneBtn() {
    setPhoneBtnText(carInfo.users_id_data.phone);

  }
  function handleClosePopup() {
    setPopupOpen(false);
  }

  const newList = infoList ? infoList(carInfo) : [
    {
      title: "Транспорт",
      value: carInfo?.short_name || "Нет данных",
    },
    {
      title: "Разрешение:",
      value:  address[carInfo?.users_id_data?.adr] || "Нет данных",
    },
    {
      title: "Детали:",
      value: `${carInfo?.capacity}т, ${carInfo?.volume} м3`,
    },
    {
      title: "Дата загрузки:",
      value: carInfo?.date || "Нет данных",
    },
  ];

  const requestBody = {};

  if(carType) {
    requestBody.trailer_type_id = carType;
  }

  if(loadType) {
    requestBody.load_type_id_3 = loadType;
  }

  if(height) {
    requestBody.height = height;
  }

  if(capacity) {
    requestBody.capacity = Number(capacity);
  }

  const getVehicle = useGetVehicle(
    {
      data: JSON.stringify({
        users_id: carInfo.users_id,
        with_relations: true,
        ...requestBody
      })
    },
    { enabled: true, }
  );




  const newListDraggable = () => {
    const data = getVehicle.data?.response;

    return (data?.map?.((item) => {
      return [
        {
          title: "Транспорт:",
          value: item?.trailer_type_id_data?.name || "Нет данных"
        },
        {
          title: "Разрешение:",
          value: address[item?.users_id_data?.adr] || "Нет данных"
        },
        {
          title: "Детали:",
          value: `${item?.capacity || 0}т, ${item?.height || 0} м3`
        },
        {
          title: "Тип загрузки:",
          value: item?.load_type_id_3_data?.name || "Нет данных"
        },
        {
          title: "Номер транспорта:",
          value: item?.car_number || "Нет данных"
        },
      ];
    }) || []);
  };

  const getAllUserCargoParams = {
    data: JSON.stringify({
      users_id: userId,
      with_relations: true,
      order_status: ["active"],
      cargo_type: ["cargo"],
    })
  };

  const getAllUserCargo = useGetUserCargo(
    getAllUserCargoParams,
    { enabled: !!userId && isOpen }
  );

  const offerFromCustomer = useOfferFromCustomerMutation({
    onSuccess() {
      setIsOpen(false);
      setPopupOpen(true);
    }
  });

  const [body, setBody] = useState({});

  function handleOpenModal() {
    setIsOpen(true);
    setBody({ user_id: carInfo?.users_id });
  }

  console.log(`carInfo`, carInfo);

  function handleOffer(id) {
    offerFromCustomer.mutate({
      data: {
        object_data: {
          user_id: body.user_id,
          guid: id,
        }
      }
    });
  }

  if(!isMap)
    return (
      <>
        <div className={clsx(cls.loadsCard, { [cls.withData]: !!newListDraggable()?.length })}>
          <div className={cls.cardTop}>
            <div className={cls.cardTopContent}>
              <h2 className={cls.address}>
                <span className={cls.addressText}>
                  {oneDir ? (
                <span className={cls.addressCountry}>
                  <span className={cls.addressCity}>{carInfo.address_id_data?.["name_" + (locale === "uz" ? "en" : "ru")]}</span>
                </span>
              ) : (<><span className={cls.addressCountry}>
                <span className={cls.addressCity}>{carInfo.city_id_data?.["name_" + (locale === "uz" ? "en" : "ru")]}</span>
                <span>{carInfo.address_id_data?.["name_" + (locale === "uz" ? "en" : "ru")]}</span>
              </span>
              <span>-&gt;</span>
              <span className={cls.addressCountry}>
                <span className={cls.addressCity}>{carInfo.city_id_2_data?.["name_" + (locale === "uz" ? "en" : "ru")]}</span>
                <span>{carInfo.address_id_2_data?.["name_" + (locale === "uz" ? "en" : "ru")]}</span>
              </span></>)}
                  {/* {address_id_data?.name} -&gt; {address_id_2_data?.name} */}
                </span>
              </h2>
              <span>
                {
                  withAddress && <Box mb="10px">{carInfo?.location_name}</Box>
                }
                <Rating value={carInfo?.users_id_data?.rating} title={carInfo?.users_id_data?.rating} />
              </span>
              {/* <span className={cls.distance}>724 км</span> */}
            </div>
            {showDistance && <div className={cls.distance}>
              {carInfo?.differance?.toFixed(2)} км от адреса
            </div>}
          </div>
          <Box borderBottom="1px solid" borderColor="brand.200">
            {additionalData && <Box my="5px">
          Водитель: {carInfo?.users_id_data?.full_name}
            </Box>}
            {
          dataAccordion ? <Accordion allowMultiple >
            <AccordionItem borderBottom="1px solid" borderColor="brand.200" borderTop="none">
              <h2>
                <AccordionButton pl="0">
                  <Box as="span" flex="1" textAlign="left" display="flex" justifyContent="space-between">
                    <span>Дополнительная информация</span>
                    <span>{newListDraggable()?.length}</span>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={0}>
                {
                  newListDraggable()?.map((item, index) => <DataList list={item} index={index} key={index} />)
                }
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          : <DataList list={newList} />
            }
          </Box>
          <div className={cls.cardBottom}>
            <Button className={cls.button} onClick={handleOpenModal} bgColor="#E0F2FE" width="278px" color="primary">Предложить груз</Button>
            {!phoneBtn ? null : (
          <Button onClick={handleClickPhoneBtn} variant={"solid"} width="278px">{phoneBtnText}</Button>)
            }
          </div>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Heading size="sm">Выберите груз</Heading>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody p="20px">
                {!getAllUserCargo?.isLoading
              ? getAllUserCargo.data?.response?.length > 0
                ? getAllUserCargo.data?.response?.map((item) => {
                  return <Card
                    onClick={
                      () => {
                        if(!offerFromCustomer.isPending) {
                          handleOffer(item.guid);
                        }
                      }
                    }
                    style={{ cursor: offerFromCustomer.isPending ? "progress" : "pointer" }}
                    key={item.guid}
                    mb="20px"
                    borderRadius="20px"
                    boxShadow="none"
                    border="1px solid #EAECF0"
                    cursor="pointer"
                  >
                    <CardBody p="20px">
                      <Box display="flex" columnGap="12px" flexGrow={1} maxWidth="calc(100% - 40px)">
                        <Box flexGrow={1} maxWidth={"calc(50% - 40px)"} flexWrap="wrap" display="flex" flexDirection="column" textAlign="left" rowGap="8px" >
                          <Text as="span" maxWidth="100%" fontWeight={600} fontSize={isLargerThan800 ? "20px" : "16px"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                            {item.city_id_data?.["name_" + (locale === "uz" ? "en" : "ru")] || item.city_id_data?.name}
                          </Text>
                          <span>{item.address_id_data?.["name_" + (locale === "uz" ? "en" : "ru")] || item.address_id_data?.name}</span>
                        </Box>
                        <Box as="span" alignSelf="center">
                          -{">"}
                        </Box>
                        <Box flexGrow={1} maxWidth={"calc(50% - 40px)"} flexWrap="wrap" display="flex" flexDirection="column" rowGap="8px" textAlign="left" pr="10px">
                          <Text as="span" maxWidth="100%" fontWeight={600} fontSize={isLargerThan800 ? "20px" : "16px"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                            {item.city_id_2_data?.["name_" + (locale === "uz" ? "en" : "ru")] || item.city_id_2_data?.name}
                          </Text>
                          <span>{item.address_id_2_data?.["name_" + (locale === "uz" ? "en" : "ru")] || item.address_id_2_data?.name}</span>
                        </Box>
                      </Box>
                      <Box as="span" fontSize="14px" color="brand.400">{item?.number_of_order}</Box>
                    </CardBody>
                  </Card>;
                }) : (
                  <Flex direction={"column"} alignItems={"center"} gap={"30px"}>
                    <Text color={"blackAlpha.400"} fontSize={"18px"}>У вас нет существующих грузов</Text>
                    <Link href={"/add-cargo"} variant={"outline"}>Добавить груз</Link>
                  </Flex>
                ) : (
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Spinner/>
                </Flex>
              )
                }
              </ModalBody>
            </ModalContent>
          </Modal>
          <Popup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            status="success"
            mainText="Успешно предложен"
            subText="Груз успешно предложен водителю"
            hideButtons
          />
        </div>
      </>


    );

  else
    return(
      <>
        {newListDraggable()?.length ? (
        <Placemark
          key={carInfo?.id}
          geometry={[carInfo?.lat, carInfo?.long]}
          properties={{
            balloonContent:
              carInfo?.users_id_data?.full_name +
              " " +
              carInfo?.users_id_data?.phone,
          }}
          options={{
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(UseIconRed),
            iconImageSize: [50, 62],
            iconImageOffset: [-15, -42],
          }}
        />
      ) : (
        <Placemark
          key={carInfo?.id}
          geometry={[carInfo?.lat, carInfo?.long]}
          properties={{
            balloonContent:
              carInfo?.users_id_data?.full_name +
              " " +
              carInfo?.users_id_data?.phone + (carInfo?.vehicle_type_id_data?.name || ""),
          }}
          options={{
            iconLayout: "default#image",
            iconImageHref:
              "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(UseIcon),
            iconImageSize: [50, 62],
            iconImageOffset: [-15, -42],
          }}
        />
      )}
      </>
    );
};

const address = {
  adr_1: "adr-1",
  adr_2: "adr-2",
  adr_3: "adr-3",
  adr_4: "adr-4",
  adr_5: "adr-5",
  adr_6: "adr-6",
};

