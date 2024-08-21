import {
  AppleIcon,
  BatareyFullIcon,
  BluetoothIcon,
  CloseIconM,
  FurIcon,
  GruzIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { Avatar, Box, Button, Flex, IconButton } from "@chakra-ui/react";
import React from "react";

const DriverCheck = ({ cls }) => {
  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex alignItems={"center"}>
          <Flex gap={3}>
            <Avatar name="Bobur Nimatllayey" src="#" />
            <Box>
              <p className={cls.userName}>Абдуллаев Умиджон Рахмонбердиевич</p>
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
          />
        </Flex>
        <Button
          mt={`17px`}
          rightIcon={<NextBtnIcon />}
          size={`lg`}
          className={cls.btnBlueOutline}
        >
          Ждём подтверждение водителя
        </Button>
        <Box className={cls.cardWrap}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
              <p className={cls.smallText}>Вкл: сегодня / 12:38 </p>
              <p className={cls.bigTitle}>г. Нукус, Каракалпакстан</p>
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
              <BatareyFullIcon />
              <Box>
                <p className={cls.smallText}>Батарея </p>
                <p className={cls.bigTitle}>78%</p>
              </Box>
            </Flex>
          </Flex>
          <Flex mt={3} alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"} gap={2}>
              <AppleIcon />
              <Box>
                <p className={cls.smallText}>Смартфон </p>
                <p className={cls.bigTitle}>iOS 17.5</p>
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <FurIcon />
              <Box>
                <p className={cls.smallText}>Версия </p>
                <p className={cls.bigTitle}>1.1.9</p>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box className={cls.cardWrap}>
          <Flex gap={2}>
            <div className={cls.startAIcon}>A</div>
            <Box>
              <p className={cls.cardStartTitle}>Екатеринбург</p>
              <p className={cls.cardStartSubTitle}>
                {" "}
                RUS / <span>18 августа</span>{" "}
              </p>
            </Box>
          </Flex>
          <Flex mt={5} gap={2}>
            <div className={cls.startBIcon}>B</div>
            <Box>
              <p className={cls.cardStartTitle}>Ташкент</p>
              <p className={cls.cardStartSubTitle}>
                UZB / <span>29 августа (через 11 дней)</span>{" "}
              </p>
            </Box>
          </Flex>

          <Flex className={cls.gruz} mt={5} gap={2}>
            <GruzIcon />
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
             <p className={cls.sum}>3600 EUR </p>
             <p className={cls.cardStartSubTitle}>Предоплата: <span>Нет</span></p>
          </Flex>
        </Box>
        <Box className={cls.cardWrap}>
           <Flex width={'100%'} alignItems={'center'} gap={3}>
            <Avatar  name="B"  />
             <Box>
             <p className={cls.cardStartSubTitle}>Диспетчер: </p>
             <p className={cls.name}>
               Абдулла Хакимов (U-000001838 )
             </p>
             <p className={cls.cardStartSubTitle}>07.08.2024 / 12:36 </p>

             </Box>
           </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default DriverCheck;
