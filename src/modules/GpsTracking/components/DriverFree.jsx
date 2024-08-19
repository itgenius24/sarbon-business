import {
    AppleIcon,
    BatareyFullIcon,
    BluetoothIcon,
  CloseIconM,
  FurIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { Avatar, Box, Button, Flex, IconButton } from "@chakra-ui/react";
import React from "react";

const DriverFree = ({ cls }) => {
  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex   alignItems={"center"}>
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
        <Box mt={`17px`} className={cls.cardWrap}>
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
        <Box className={cls.btnOutline}>
           <Flex width={'100%'} justifyContent={'space-between'}>
              <span>Контейнеровоз</span>
              <Flex gap={3}>
               <Flex gap={1} alignItems={'center'}> <StoneIcon /> 22 т.</Flex>
               <Flex  gap={1} alignItems={'center'}> <LoadOulineIcon /> 86m3</Flex>
              </Flex>
           </Flex>
        </Box>
        <Button leftIcon={<LoadgreenIcon />} rightIcon={<NextBtnIcon />} size={`lg`} className={cls.btngreenOutline}>
          Машина cвободна
        </Button>
        <Button   size={`lg`} className={cls.btngreen}>
          Машина cвободна
        </Button>
      </Flex>
    </div>
  );
};

export default DriverFree;
