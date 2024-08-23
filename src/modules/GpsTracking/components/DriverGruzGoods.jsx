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
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { Avatar, Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";

const DriverGruzGoods = ({ cls }) => {
  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex justifyContent={'space-between' } width={'100%'}  alignItems={"center"}>
          <Flex gap={3}>
            <Avatar name="Bobur Nimatllayey" src="#" />
            <Box>
            <p className={cls.version}>
                <span>Груз добавил: </span>
              </p>
              <p className={cls.userName}>Абдуллаев Умиджон</p>
             
            </Box>
          </Flex>
          <IconButton
            width={"fit-content"}
            style={{ background: "transparent" }}
            icon={<CloseIconM />}
          />
        </Flex>
  
       
        <Box mt={3} className={cls.cardWrap}>
          <Flex gap={2}>
            <div className={cls.startAGoodsIcon}>A</div>
            <Box>
              <p className={cls.cardStartTitle}>Екатеринбург</p>
              <p className={cls.cardStartSubTitle}>
                RUS / <span>18 августа</span>
              </p>
            </Box>
          </Flex>
          <Flex mt={5} gap={2}>
            <div className={cls.startBGoodsIcon}>B</div>
            <Box>
              <p className={cls.cardStartTitle}> Ташкент</p>
              <p className={cls.cardStartSubTitle}>
              UZB /<span> 29 августа (через 11 дней)</span>
              </p>
            </Box>
          </Flex>

          <Flex className={cls.gruz} mt={5} gap={2}>
            <GruzGoodsIcon   />
            <Box>
              <p className={cls.cardStartTitle}>Оборудование и запчасти</p>
              <p className={cls.cardStartSubTitle}>
                <Flex width={"100%"} justifyContent={"space-between"}>
                  <span>Контейнеровоз</span>
                  <Flex ml={2} gap={3}>
                    <Flex gap={1} alignItems={"center"}>
                      <StoneIcon /> 22 т.
                    </Flex>
                    <Flex gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> 86m3
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
             <p className={cls.sum2}>3600 EUR </p>
             <p className={cls.cardStartSubTitle}>Предоплата: <span>Нет</span></p>
          </Flex>
        </Box>
       <Box className={cls.cardWrap}>
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
       <Button   size={`lg`} className={cls.btngoods}>
          Машина cвободна
        </Button>
       </Box>
      
      </Flex>
      <Modal isOpen={false} isCentered>
        <ModalOverlay />
        <ModalContent>
         <ModalHeader>
         <ModalGruzIcon />
         </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p style={{fontWeight:600,fontSize:'18px'}}>Забронировать груз?</p>
            <p style={{fontWeight:500,fontSize:'14px'}}>Груз будет забронирован и недоступен для других диспетчеров.</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={''}>
              Close
            </Button>
            <Button   size={`lg`} className={cls.btngreen}>
              Машина cвободна
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DriverGruzGoods;
