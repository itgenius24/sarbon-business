import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import cls from "./style.module.scss";
import {
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  BluetoothIcon2,
  CricleArrovIcon,
  LocationActiveIcon,
  PopupIcon,
} from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";

export const CarsCard = () => {
  const router = useRouter();
  const locale = useGetLang();

  return (
    <Flex
      className={cls.cardWrap}
      borderLeft={`4px solid  rgba(0, 122, 255, 1) `}
    >
      <Box className={`${cls.contend} ${cls.contend1}`}>
        <Flex alignItems={`center`} gap={`6px`}>
          <Avatar src="wdc" name="Bobur" />
          <Box>
            <p className={cls.title}>Шорасулов Олим</p>
            <p className={cls.tel}>+998 93 0776161 </p>
          </Box>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend2}`}>
        <Flex alignItems={`center`} gap={`6px`}>
          <Avatar src="wdc" name="Bobur" />
          <Box>
            <p className={cls.title}>Шорасулов Олим</p>
            <p className={cls.tel}>+998 93 0776161 </p>
          </Box>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
        <p className={cls.title}>Тентованный полуприцеп</p>
        <p className={cls.subTitle1}>
          <span className={cls.subTitle}>20т / 42м3 </span>01 A 123 NN
        </p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>
        <Flex>
          <Flex className={cls.locationWrap}>
            <Box>
              <p className={cls.locationTitle}>Занята: </p>
              <p className={cls.subBlueTitle}>З-000006287</p>
            </Box>
            <Flex alignItems={`center`} gap={2}>
              <LocationActiveIcon /> <CricleArrovIcon />{" "}
              <p className={cls.title}>Вкл. </p>
              <p className={cls.subBlueTitle}>24 июня 12:36</p>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <BluetoothIcon2 />
              <p className={cls.subTitle}>
                <span className={cls.title}>Вкл. </span>
              </p>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
                {/* {true? ( */}
                  <BatareyFullIcon />
                {/* ) : ( */}
                  {/* <BatareyIcon /> */}
                {/* )} */}
                <p className={cls.subTitle}>
                  <span className={cls.title}>50% </span>
                </p>
              </Flex>
          </Flex>
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
                  boxShadow={" 0px 12px 16px 10px rgba(16, 24, 40, 0.1)"}
                  border={"1px solid rgba(234, 236, 240, 1"}
                  className={cls.popoverCon}
                >
                  <PopoverArrow />
                  <PopoverBody>
                    <Box
                      style={{ padding: `10px 8px`, color: `red` }}
                      _hover={{
                        backgroundColor: `rgba(0, 122, 255, 1)`,
                        borderRadius: `6px`,
                        color: `rgba(255, 255, 255, 1)`,
                        cursor: `pointer`,
                      }}
                      className={cls.menuItem}
                    >
                      Удалить водителя
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
