import {
  AndroidIcon,
  AppleIcon,
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  CloseIconM,
  FurIcon,
  GruzIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  ModalGruzIcon,
  ModalWatingIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { useGetOffer, useUpdateResponse } from "@/services/api";
import { Avatar, Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";

const DriverExpectation = ({ cls,setModalType,contendSingle }) => {

  const [isPopupOpen, setPopupOpen] = useState(false);
  function handleClosePopup() {
    setPopupOpen(false);
  }

  const getOfferCount = useGetOffer(
    {
      data: JSON.stringify({
        users_id_2: contendSingle?.users_id,
        with_relations: true,
      })
    },
    { enabled: Boolean(contendSingle?.users_id), }
  );

  const updateResponseMutation = useUpdateResponse({
    onSuccess:() => {
      handleClosePopup();
      setModalType("filter");
    },
    onError(res) {
      console.error(res);
    }
  });


  const handleMutation = () => {
    updateResponseMutation.mutate(
      {
        data:{
          guid: getOfferCount?.data?.response?.[0]?.guid,
          "provisions": ["cancellation"],
          "who_cancellation": ["customer"]
        }
      },
    );
  };

  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex alignItems={"center"}>
          <Flex gap={3}>
            <Avatar name={contendSingle?.users_id_data?.full_name} src={contendSingle?.users_id_data?.photo} />
            <Box>
            <p className={cls.userName}>{contendSingle?.users_id_data?.full_name}</p>
              <p className={cls.version}>
                {" "}
                <StarsIcon /> 4.1<span>{" (16 отзывов)"}</span>
              </p>
            </Box>
          </Flex>
          <IconButton
            width={"fit-content"}
            style={{ background: "transparent" }}
            icon={<CloseIconM />}
            onClick={() => setModalType("filter")}
          />
        </Flex>
        <Button
          mt={`17px`}
          rightIcon={<NextBtnIcon />}
          size={`lg`}
          className={cls.btnBlueOutline}
          onClick={() => setPopupOpen(true)}
        >
          Ждём подтверждение водителя
        </Button>
        <Box className={cls.cardWrap}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
              <p className={cls.smallText}>Вкл: сегодня / 12:38 </p>
              <p className={cls.bigTitle}>{contendSingle?.location_name}</p>
            </Box>
          </Flex>
          <Flex mt={3} alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"} gap={2}>
              <BluetoothIcon />
              <Box>
                <p className={cls.smallText}>Bluetooth </p>
                <p className={cls.bigTitle}>Вкл</p>
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
            { contendSingle?.battery > 20 ?   <BatareyFullIcon /> :  <BatareyIcon />}
              <Box>
                <p className={cls.smallText}>Батарея </p>
                <p className={cls.bigTitle}>{contendSingle?.batter}%</p>
              </Box>
            </Flex>
          </Flex>
          <Flex mt={3} alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"} gap={2}>
            {contendSingle?.os === "android" ? <AndroidIcon /> : <AppleIcon />}
              <Box>
                <p className={cls.smallText}>Смартфон </p>
                <p className={cls.bigTitle}>{contendSingle?.os}</p>
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <FurIcon />
              <Box>
                <p className={cls.smallText}>Версия </p>
                <p className={cls.bigTitle}>{contendSingle?.version}</p>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box className={cls.cardWrap}>
          <Flex gap={2}>
            <div className={cls.startAIcon}>A</div>
            <Box>
              <p className={cls.cardStartTitle}>{getOfferCount?.data?.response?.[0]?.city_id_data?.name}</p>
              <p className={cls.cardStartSubTitle}>
                {" "}
                {getOfferCount?.data?.response?.[0]?.city_id_data?.address_id_data?.name} / <span>{format(getOfferCount?.data?.response?.[0]?.load_time ? getOfferCount?.data?.response?.[0]?.load_time : new Date(),"yyyy-mm-dd")}
                </span>{" "}
              </p>
            </Box>
          </Flex>
          <Flex mt={5} gap={2}>
            <div className={cls.startBIcon}>B</div>
            <Box>
              <p className={cls.cardStartTitle}>{getOfferCount?.data?.response?.[0]?.city_id_2_data?.name}</p>
              <p className={cls.cardStartSubTitle}>
                {getOfferCount?.data?.response?.[0]?.city_id_2_data?.address_id_data?.name} / <span>{format(getOfferCount?.data?.response?.[0]?.date ? getOfferCount?.data?.response?.[0]?.date  : new Date(),"yyyy-mm-dd")}</span>{" "}
              </p>
            </Box>
          </Flex>

          <Flex className={cls.gruz} mt={5} gap={2}>
            <GruzIcon />
            <Box>
              <p className={cls.cardStartTitle}>Оборудование и запчасти</p>
              <p className={cls.cardStartSubTitle}>
              <Flex width={"100%"} justifyContent={"space-between"}>
                  <span>{getOfferCount?.data?.response?.[0]?.cargo_type_id_data?.name}</span>
                  <Flex ml={2} gap={3}>
                    <Flex gap={1} alignItems={"center"}>
                      <StoneIcon /> {getOfferCount?.data?.response?.[0]?.weight} т.
                    </Flex>
                    <Flex gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> {getOfferCount?.data?.response?.[0]?.volume_m3}m3
                    </Flex>
                  </Flex>
                </Flex>
              </p>
            </Box>
          </Flex>
          <Flex mt={3} justifyContent={'space-between'}>
             <p className={cls.cardStartSubTitle}>Cумма</p>
             <p className={cls.cardStartSubTitle}>Тип оплаты: <span>Перечисление</span></p>
          </Flex>
          <Flex mt={3} justifyContent={'space-between'} alignItems={'center'}>
             <p className={cls.sum}>{getOfferCount?.data?.response?.[0]?.bid_cash} {getOfferCount?.data?.response?.[0]?.currency_id_data?.code} </p>
             <p className={cls.cardStartSubTitle}>Предоплата: <span>{getOfferCount?.data?.response?.[0]?.prepayment_percentage > 0 ?"Da" : "Нет" }</span></p>
          </Flex>
        </Box>
        <Box className={cls.cardWrap}>
           <Flex width={'100%'} alignItems={'center'} gap={3}>
            <Avatar  name={getOfferCount?.data?.response?.[0]?.users_id_3_data?.full_name} src={getOfferCount?.data?.response?.[0]?.users_id_3_data?.photo}  />
             <Box>
             <p className={cls.cardStartSubTitle}>Диспетчер: </p>
             <p className={cls.name}>
               {getOfferCount?.data?.response?.[0]?.users_id_3_data?.full_name} {getOfferCount?.data?.response?.[0]?.users_id_3_data?.your_id}
             </p>
             <p className={cls.cardStartSubTitle}>07.08.2024 / 12:36 </p>

             </Box>
           </Flex>
        </Box>
      </Flex>
      <Modal isOpen={isPopupOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalWatingIcon />
          </ModalHeader>
          <ModalCloseButton onClick={handleClosePopup} />
          <ModalBody>
            <p style={{ fontWeight:600,fontSize:"18px" }}>Ждём подтверждение от водителя </p>
            {/* <p style={{ fontWeight:500,fontSize:"14px" }}>Груз будет забронирован и недоступен для других диспетчеров.</p> */}
          </ModalBody>

          <ModalFooter>
            <Button style={{background:'white',color:'black',border:` 1px solid rgba(208, 213, 221, 1)`}} onClick={handleClosePopup} className={cls.btnOutline} mr={3}>
              Close
            </Button>
            <Button onClick={handleMutation}  style={{background:'rgba(254, 228, 226, 1)',color:'rgba(217, 45, 32, 1)'}} className={cls.btngreen}>
              Машина cвободна
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DriverExpectation;
