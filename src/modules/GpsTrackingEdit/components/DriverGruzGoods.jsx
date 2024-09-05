import {
  AppleIcon,
  BatareyFullIcon,
  BluetoothIcon,
  CeckGoodsIcon,
  CheckBlueIcon,
  CloseIconM,
  FurIcon,
  GreenCheckIcon,
  GruzGeenIcon,
  GruzGoodsIcon,
  GruzIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  ModalGruzIcon,
  ModalOodsIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { useUpdateCargo } from "@/services/api";
import authStore from "@/store/auth.store";
import { Avatar, Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";

const DriverGruzGoods = ({ cls,setModalType,loadState }) => {
  console.log("loadState",loadState,authStore.userData);

  const [isPopupOpen, setPopupOpen] = useState(false);
  function handleClosePopup() {
    setPopupOpen(false);
  }

  const { mutate } = useUpdateCargo({
    onSuccess:(res) => {
      setPopupOpen(false);
      setModalType("filter")
    },
  });

  const updateCar = () => {
    mutate({
      data:{
        guid: loadState?.guid,//yukni guidisi
        order_status: ["free_cargo"],
        users_id_3: ""
      }
    });
  };
  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={"10px"} alignItems={"flex-start"}>
        <Flex justifyContent={"space-between" } width={"100%"} alignItems={"center"}>
          <Flex gap={3}>
            <Avatar name="Bobur Nimatllayey" src="#" />
            <Box>
              <p className={cls.version}>
                <span>Груз добавил: </span>
              </p>
              <p className={cls.userName}>{loadState?.users_id_data?.full_name}</p>

            </Box>
          </Flex>
          <IconButton
            width={"fit-content"}
            style={{ background: "transparent" }}
            icon={<CloseIconM /> }
            onClick={() => setModalType(`filter`)}

          />
        </Flex>


        <Box mt={3} className={cls.cardWrap}>
          <Flex gap={2}>
            {/* <div className={cls.startAGoodsIcon}>A</div> */}
            <div className={cls.startAIconWrapGoods}><div className={cls.startAGoodsIcon}>A</div> <div className={cls.line}></div> </div>

            <Box>
              <p className={cls.cardStartTitle}>{loadState?.city_id_data?.name}</p>
              <p className={cls.cardStartSubTitle}>
                {loadState?.city_id_data?.address_id_data?.name} / <span>{format(loadState?.load_time,"yyyy-mm-dd")}</span>
              </p>
            </Box>
          </Flex>
          <Flex mt={5} gap={2}>
            <div className={cls.startBGoodsIcon}>B</div>
            <Box>
              <p className={cls.cardStartTitle}> {loadState?.city_id_2_data?.name}</p>
              <p className={cls.cardStartSubTitle}>
                {loadState?.city_id_2_data?.address_id_data?.name} /<span> {format(loadState?.date,"yyyy-mm-dd")}</span>
              </p>
            </Box>
          </Flex>

          <Flex className={cls.gruz} mt={5} gap={2}>
            <GruzGoodsIcon />
            <Box>
              <p className={cls.cardStartTitle}>Оборудование и запчасти</p>
              <p className={cls.cardStartSubTitle}>
                <Flex width={"100%"} justifyContent={"space-between"}>
                  <span>{loadState?.cargo_type_id_data?.name}</span>

                  <Flex ml={2} gap={3}>
                    <Flex gap={1} alignItems={"center"}>
                      <StoneIcon /> {loadState?.weight} т.
                    </Flex>
                    <Flex gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> {loadState?.volume_m3}m3
                    </Flex>
                  </Flex>
                </Flex>
              </p>
            </Box>
          </Flex>
          <Flex mt={3} justifyContent={"space-between"}>
            <p className={cls.cardStartSubTitle}>Cумма</p>
            <p className={cls.cardStartSubTitle}>Тип оплаты: <span>{loadState?.map_id_data?.payment_type?.length > 15 ? `${loadState?.map_id_data?.payment_type?.slice(0,15)}...`:loadState?.map_id_data?.payment_type }</span></p>
          </Flex>
          <Flex mt={3} justifyContent={"space-between"} alignItems={"center"}>
            <p className={cls.sum2}>{loadState?.bid_cash} {loadState?.currency_id_data?.code}</p>
            <p className={cls.cardStartSubTitle}>Предоплата: <span>{loadState?.prepayment_percentage > 0 ?"Da" : "Нет" }</span></p>
          </Flex>
        </Box>
        {
          loadState?.users_id_3_data.guid === authStore.userData.id ? <Box className={cls.cardWrap}>
            <Flex gap={2} mb={3}>
              <CeckGoodsIcon />
              <Box>
                <p className={cls.armorTitle}>Этот груз забронирован за вами</p>
                <p className={cls.armorDate}>
          До снятия брони: <span>
          12:36:59
                  </span>
                </p>
              </Box>
            </Flex>
            <Button onClick={() => setPopupOpen(true)} size={"lg"} className={cls.btngoods}>
          Отменить бронь
            </Button>
          </Box>:<Box className={cls.cardWrap}>
          <Flex width={'100%'} alignItems={'center'} gap={3}>
            <Avatar  name={loadState?.users_id_3_data?.full_name} src={loadState?.users_id_3_data?.photo}  />
             <Box>
             <p className={cls.cardStartSubTitle}>Диспетчер: </p>
             <p className={cls.name}>
               {loadState?.users_id_3_data?.full_name} {loadState?.users_id_3_data?.your_id}
             </p>
             <p className={cls.cardStartSubTitle}>07.08.2024 / 12:36 </p>

             </Box>
           </Flex>
          </Box>
        }


      </Flex>
      <Modal isOpen={isPopupOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalOodsIcon />
          </ModalHeader>
          <ModalCloseButton onClick={handleClosePopup} />
          <ModalBody>
            <p style={{ fontWeight:600,fontSize:"18px" }}>Забронировать груз?</p>
            <p style={{ fontWeight:500,fontSize:"14px" }}>Груз будет забронирован и недоступен для других диспетчеров.</p>
          </ModalBody>

          <ModalFooter>
            <Button style={{ background:'white',border:'1px solid rgba(208, 213, 221, 1)',color:'black' }} onClick={handleClosePopup} colorScheme="blue" mr={3} >
            Нет
            </Button>
            <Button style={{ background:'rgba(193, 187, 32, 1)' }} onClick={updateCar} className={cls.btngreen}>
            Отменить бронь
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DriverGruzGoods;
