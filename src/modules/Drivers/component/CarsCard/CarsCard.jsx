import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import cls from "./style.module.scss";
import {
  BatareyFullIcon,
  BluetoothIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NoImg,
  PopupIcon,
  StoneIcon,
} from "@/assets/icons/icons";

export const CarsCard = ({ t, status }) => {
  return (
    <Box className={cls.cardWrap}>
      <Box className={cls.popup}>
        <Popover placement={"bottom-start"}>
          <PopoverTrigger>
            <IconButton
              size={"sm"}
              borderRadius={"50%"}
              icon={<PopupIcon />}
              width="40px"
              _hover={{ backgroundColor: "rgba(226, 228, 234, 1)" }}
              backgroundColor={"white"}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              padding={"0 6px"}
              boxShadow={" 0px 12px 16px 10px rgba(16, 24, 40, 0.1)"}
              border={"1px solid rgba(234, 236, 240, 1"}
              className={cls.popoverCon}
            >
              <PopoverArrow />
              <PopoverBody>
                <Box className={cls.menuItem}>Редактировать машину</Box>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Box>
      <Flex gap={"30px"} width={"100%"}>
        <Box
          width={"12%"}
          background={"rgba(219, 216, 227, 1)"}
          borderRadius={"6px"}
        >
          <NoImg />
        </Box>
        <Box width={"60%"}>
          <Flex gap={"50px"}>
            <p className={cls.title}>
              Volvo FH500 <br /> 01 A 123 NN
            </p>
            <Flex
              flexDirection={`column`}
              mr={5}
              alignItems={`flex-start`}
              className={cls.subTitle2}
            >
              <p className={cls.loadType}>Тентованный полуприцеп</p>
              <Flex gap={2}>
                <Flex gap={1} alignItems={"center"}>
                  <StoneIcon /> 22 т.
                </Flex>
                <Flex gap={1} alignItems={"center"}>
                  <LoadOulineIcon /> 33 m3
                </Flex>
              </Flex>
            </Flex>
            <Box>
              <p className={cls.subTitle}>Тип загрузки:</p>
              <p className={cls.title}>Верхняя, Боковая</p>
            </Box>
            <Box>
              <p className={cls.subTitle}>Дополнительно:</p>
              <p className={cls.title}>ADR-5, TIR </p>
            </Box>
          </Flex>
          <Flex gap={"30px"} alignItems={"center"} className={cls.statusWrap}>
            <Box>
              <p className={cls.subTitle}>Статус:</p>
              <p className={cls.subBlueTitle}>Занята: З-000006287</p>
            </Box>
            <Flex gap={2}>
              <LocationActiveIcon /> <p className={cls.title}>Вкл. </p>
              <p className={cls.subBlueTitle}>24 июня 12:36</p>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <BluetoothIcon />
              <p className={cls.subTitle}>
                Bluetooth: <span className={cls.title}>Вкл. </span>
              </p>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <BatareyFullIcon />
              <p className={cls.subTitle}>
                Bluetooth: <span className={cls.title}>Вкл. </span>
              </p>
            </Flex>
          </Flex>
        </Box>
        <Box width={"25%"}>
          <p className={cls.subTitle}>Водитель:</p>
          <Box className={cls.profileWrap}>
            <Flex gap={3}>
              <Avatar name="Bobur Nimatullayev" />
              <Box>
                <p className={cls.title}>Алексей Королёв</p>
                <p className={cls.subTitle}>+998 93 0776161</p>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
