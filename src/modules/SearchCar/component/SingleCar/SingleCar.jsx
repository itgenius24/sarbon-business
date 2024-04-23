import cls from "./styles.module.scss";
import {
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
  useToast
} from "@chakra-ui/react";
import { DataList } from "@/components/DataList";
import authStore from "@/store/auth.store";
import { useGetUserCargo, useOfferFromCustomerMutation } from "@/services/api";
import { useState } from "react";
import { Rating } from "@/components/Rating";
import { Popup } from "@/components/Popup";
import Link from "next/link";

export const SingleCar = ({
  carInfo,
  showDistance = false,
  oneDir,
  infoList,
  phoneBtn
}) => {

  const userId = authStore.userData.id;

  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [phoneBtnText, setPhoneBtnText] = useState("Показать номер");

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
      value: address[carInfo?.users_id_data?.adr] || "Нет данных",
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

  const getAllUserCargoParams = {
    data: JSON.stringify({
      users_id: userId,
      with_relations: true,
      order_status: ["active"]
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

  function handleOffer(id) {
    offerFromCustomer.mutate({
      data: {
        object_data: {
          user_id: body.user_id,
          guid: id
        }
      }
    });
  }

  return (
    <div className={cls.loadsCard}>
      <div className={cls.cardTop}>
        <div className={cls.cardTopContent}>
          <h2 className={cls.address}>
            <span className={cls.addressText}>
              {oneDir ? (
                <span className={cls.addressCountry}>
                  <span className={cls.addressCity}>{carInfo.address_id_data?.name}</span>
                </span>
              ) : (<><span className={cls.addressCountry}>
                <span className={cls.addressCity}>{carInfo.city_id_data?.name}</span>
                <span>{carInfo.address_id_data?.name}</span>
              </span>
              <span>-&gt;</span>
              <span className={cls.addressCountry}>
                <span className={cls.addressCity}>{carInfo.city_id_2_data?.name}</span>
                <span>{carInfo.address_id_2_data?.name}</span>
              </span></>)}
              {/* {address_id_data?.name} -&gt; {address_id_2_data?.name} */}
            </span>
          </h2>
          <span><Rating value={carInfo?.users_id_data?.rating} title={carInfo?.users_id_data?.rating} /></span>
          {/* <span className={cls.distance}>724 км</span> */}
        </div>
        {showDistance && <div className={cls.distance}>
          {carInfo?.distance} км от адреса
        </div>}
      </div>
      <Box borderBottom="1px solid" borderColor="brand.200">
        <DataList list={newList} />
      </Box>
      <div className={cls.cardBottom}>
        <Button onClick={handleOpenModal} bgColor="#E0F2FE" width="278px" color="primary">Предложить груз</Button>
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
                    onClick={() => handleOffer(item.guid)}
                    key={item.guid}
                    mb="20px"
                    borderRadius="20px"
                    boxShadow="none"
                    border="1px solid #EAECF0"
                    cursor="pointer"
                  >
                    <CardBody p="20px">
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                          <span className={cls.addressText}>
                            <span className={cls.addressCountry}>
                              <span className={cls.addressCity}>{item.city_id_data?.name}</span>
                              <span>{item.address_id_data?.name}</span>
                            </span>
                            <span>-&gt;</span>
                            <span className={cls.addressCountry}>
                              <span className={cls.addressCity}>{item.city_id_2_data?.name}</span>
                              <span>{item.address_id_2_data?.name}</span>
                            </span>
                            {/* {address_id_data?.name} -&gt; {address_id_2_data?.name} */}
                          </span>
                        </Box>
                        <Box as="span" fontSize="14px" color="brand.400">{item?.number_of_order}</Box>
                      </Box>
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

