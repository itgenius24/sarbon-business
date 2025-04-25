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
import { useTranslation } from "react-i18next";

const DriverExpectation = ({ cls,setModalType,currentUserLocationData }) => {
 const { t } = useTranslation();
  const [isPopupOpen, setPopupOpen] = useState(false);
  function handleClosePopup() {
    setPopupOpen(false);
  }

  const getOfferCount = useGetOffer(
    {
      data: JSON.stringify({
        users_id_2: currentUserLocationData?.user?.guid,
        with_relations: true,
      })
    },
    { enabled: Boolean(currentUserLocationData?.user?.guid), }
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

  console.log(`currentUserLocationData`,currentUserLocationData)


  const handleMutation = () => {
    updateResponseMutation.mutate(
      {
        data:{
          guid: currentUserLocationData?.orders?.[0]?.cargo_id_data?.guid,
          "provisions": ["cancellation"],
          "who_cancellation": ["customer"]
        }
      },
    );
  };

  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex width={'100%'} justifyContent={'space-between'} alignItems={"center"}>
          <Flex gap={3}>
            <Avatar name={currentUserLocationData?.user?.full_name} src={currentUserLocationData?.user?.photo} />
            <Box>
            <p className={cls.userName}>{currentUserLocationData?.user?.full_name}</p>
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
        <Box className={cls.cardWrapOutline}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
            <p className={cls.smallText}>Вкл: {format( new Date(currentUserLocationData?.users_gps?.[0]?.update_time).setHours(new Date(currentUserLocationData?.users_gps?.[0]?.update_time).getHours() - 5),"yyyy-MM-dd, HH:mm")} </p>
            <p className={cls.bigTitle}>{currentUserLocationData?.users_gps?.[0]?.location_name || "Нет адреса"}</p>
            </Box>
          </Flex>
          <Flex justifyContent={'space-between'}>
          <Flex mt={3} alignItems={"center"} flexDirection={'column'} rowGap={'15px'}>
            <Flex alignItems={"center"} gap={2}>
              <BluetoothIcon />
              <Box>
                <p className={cls.smallText}>Bluetooth </p>
                <p className={cls.bigTitle}>Вкл</p>
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
            {currentUserLocationData?.users_gps?.[0]?.os === "android" ? <AndroidIcon /> : <AppleIcon />}
              <Box>
                <p className={cls.smallText}>{t(`Смартфон`)} </p>
                <p className={cls.bigTitle}>{currentUserLocationData?.users_gps?.[0]?.os}</p>
              </Box>
            </Flex>
          
          </Flex>
          <Flex mt={3} alignItems={"center"} flexDirection={'column'} rowGap={'15px'}>
          <Flex alignItems={"center"} gap={2}>
            { currentUserLocationData?.users_gps?.[0]?.battery > 20 ?   <BatareyFullIcon /> :  <BatareyIcon />}
              <Box>
                <p className={cls.smallText}>{t(`Батарея`)} </p>
                <p className={cls.bigTitle}>{currentUserLocationData?.users_gps?.[0]?.battery}%</p>
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <FurIcon />
              <Box>
                <p className={cls.smallText}>{t(`Версия`)} </p>
                <p className={cls.bigTitle}>{currentUserLocationData?.users_gps?.[0]?.version}</p>
              </Box>
            </Flex>
          </Flex>
          </Flex>
        </Box>
        <Box className={cls.cardWrapOutline}>
          <Flex gap={2}>
          <div className={cls.startAIconWrap}><div  className={cls.startAIcon}>A</div> <div className={cls.line}></div> </div>
          <Box>
              <p className={cls.cardStartTitle}>{currentUserLocationData?.orders?.[0]?.cargo_id_data?.from}</p>
              <p className={cls.cardStartSubTitle}>
                
                {currentUserLocationData?.orders?.[0]?.cargo_id_data?.city_id_data?.address_id_data?.name} / <span>{format(currentUserLocationData?.orders?.[0]?.cargo_id_data?.load_time ? currentUserLocationData?.orders?.[0]?.cargo_id_data?.load_time : new Date(),"yyyy-MM-dd")}
                </span>
              </p>
            </Box>
          </Flex>
          <Flex mt={5} gap={2}>
            <div className={cls.startBIcon}>B</div>
            <Box>
              <p className={cls.cardStartTitle}>{currentUserLocationData?.orders?.[0]?.cargo_id_data?.to}</p>
              <p className={cls.cardStartSubTitle}>
                {currentUserLocationData?.orders?.[0]?.cargo_id_data?.city_id_2_data?.address_id_data?.name} / <span>{format(currentUserLocationData?.orders?.[0]?.cargo_id_data?.date ? currentUserLocationData?.orders?.[0]?.cargo_id_data?.date  : new Date(),"yyyy-MM-dd")}</span>{" "}
              </p>
            </Box>
          </Flex>

          <Flex className={cls.gruz} mt={5} gap={2}>
            <GruzIcon />
            <Box>
              <p className={cls.cardStartTitle}>Оборудование и запчасти</p>
              <p className={cls.cardStartSubTitle}>
              <Flex width={"100%"} justifyContent={"space-between"}>
                  <span>{currentUserLocationData?.orders?.[0]?.cargo_id_data?.cargo_type_id_data?.name}</span>
                  <Flex ml={2} gap={3}>
                    <Flex gap={1} alignItems={"center"}>
                      <StoneIcon /> {currentUserLocationData?.orders?.[0]?.cargo_id_data?.weight} т.
                    </Flex>
                    <Flex gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> {currentUserLocationData?.orders?.[0]?.cargo_id_data?.volume_m3}m3
                    </Flex>
                  </Flex>
                </Flex>
              </p>
            </Box>
          </Flex>
          <Flex mt={3} justifyContent={'space-between'}>
             <p className={cls.cardStartSubTitle}>{t(`Cумма`)}</p>
             <p className={cls.cardStartSubTitle}>{t(`Тип оплаты`)}: <span>Перечисление</span></p>
          </Flex>
          <Flex mt={3} justifyContent={'space-between'} alignItems={'center'}>
             <p className={cls.sum}>{currentUserLocationData?.orders?.[0]?.cargo_id_data?.bid_cash} {currentUserLocationData?.orders?.[0]?.cargo_id_data?.currency_id_data?.code} </p>
             <p className={cls.cardStartSubTitle}>Предоплата: <span>{currentUserLocationData?.orders?.[0]?.cargo_id_data?.prepayment_percentage > 0 ? "Дa" : "Нет" }</span></p>
          </Flex>
        </Box>
        <Box className={cls.cardWrapOutline}>
           <Flex width={'100%'} alignItems={'center'} gap={3}>
            <Avatar  name={currentUserLocationData?.orders?.[0]?.users_id_3_data?.full_name} src={currentUserLocationData?.orders?.[0]?.users_id_3_data?.photo}  />
             <Box>
             <p className={cls.cardStartSubTitle}>Диспетчер: </p>
             <p className={cls.name}>
               {currentUserLocationData?.orders?.[0]?.users_id_3_data?.full_name} {currentUserLocationData?.orders?.[0]?.users_id_3_data?.your_id}
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
            Подождем
            </Button>
            <Button onClick={handleMutation}  style={{background:'rgba(254, 228, 226, 1)',color:'rgba(217, 45, 32, 1)'}} className={cls.btngreen}>
            Отменить предложение
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DriverExpectation;
