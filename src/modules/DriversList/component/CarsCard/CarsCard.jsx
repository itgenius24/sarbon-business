import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import cls from "./style.module.scss";
import {
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  CricleArrovIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NoImFur,
  NoImg,
  NoImgDrivers,
  PopupIcon,
  SearchIcon,
  StoneIcon,
  UserIconRadius,
} from "@/assets/icons/icons";
import CheckBoxComponent from "@/modules/GpsTrackingEdit/components/CheckBoxComponent";
import { useState } from "react";
import TooltipComponets from "@/modules/SearchLod/component/TooltipComponets";
import { Checkbox } from "@/components/Checkbox";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";

export const CarsCard = ({ t, item, caroCencel, }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [centerModalType, setCenterModalType] = useState(false);
  const router = useRouter();
  const locale = useGetLang();
  console.log("item11", item?.users_id_data?.provisions?.[0] === `waiting_for_driver`);
  return (
    <Box className={cls.cardWrap}   borderLeft={`4px solid  ${
      item?.users_id_data?.provisions?.[0] === `waiting_for_driver`
        ? "rgba(0, 122, 255, 1)"
        : "rgba(21, 186, 77, 1)"
    } `}>
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
                  style={{ padding: `10px 8px` }}
                  cursor={`pointer`}
                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
                  }}
                  className={cls.menuItem}
                  onClick={() =>
                    router.push(`/${locale}/drivers/create?id=${item.guid}`)
                  }
                >
                  Изменить данные водителя
                </Box>
                <Box
                  style={{ padding: `10px 8px` }}
                  cursor={`pointer`}

                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
                  }}
                  className={cls.menuItem}
                  onClick={() => caroCencel(item.guid)}
                >
                 Открепить машину
                </Box>
                <Box
                  cursor={`pointer`}

                  style={{ padding: `10px 8px`, color: `red` }}
                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
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
      <Flex alignItems={`flex-end`} gap={"30px"} width={"100%"}>
        <Box
        // width={"12%"}
        // background={"rgba(219, 216, 227, 1)"}
        // borderRadius={"6px"}
        >

  
          {item?.users_id_data &&  item?.users_id_data?.photo !== "photo" && item?.users_id_data?.photo ? (
            <Image
              style={{ borderRadius: `50%`, width: `130px`, height: `130px` }}
              src={item?.users_id_data?.photo}
              objectFit="cover"
              width={`200`}
              height={`100`}
              alt="w"
            />
          ) : (
            <NoImgDrivers />
          )}
        </Box>
        <Box width={"60%"}>
          <Flex gap={"50px"}>
            <Box>
              <p className={cls.title}>{item?.users_id_data?.full_name}</p>
              <p className={cls.subTitle}>{item?.users_id_data?.phone}</p>
            </Box>
          </Flex>
          {item.users_id_data            ? (
            <Flex background={ item?.users_id_data?.provisions?.[0] === `waiting_for_driver`
        ? "rgba(0, 122, 255, 0.08)"
        : "rgba(21, 186, 77, 1)"} gap={"30px"} alignItems={"center"} className={cls.statusWrap}>
              <Box>
                <p className={cls.subTitle}>Статус:</p>
                <p className={cls.subBlueTitle}>
                  Занята: {item?.users_id_data?.your_id}
                </p>
              </Box>
              <Flex gap={2}>
                <LocationActiveIcon /> <CricleArrovIcon />   <p className={cls.title}> {item?.gps ? "Вкл" : "Откл" } </p>
                <p className={cls.subBlueTitle}>
                  {format(item.create_time || new Date(), "yyyy-MM-dd")}
                </p>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                <BluetoothIcon />
                <p className={cls.subTitle}>
                  Bluetooth: <span className={cls.title}>Вкл. </span>
                </p>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                {item?.battery > 20 ? (
                  <BatareyFullIcon />
                ) : (
                  <BatareyIcon />
                )}
                <p className={cls.subTitle}>
                  Батарея: <span className={cls.title}>{item?.battery}% </span>
                </p>
              </Flex>
            </Flex>
          ) : (
            <Box
              mt={1}
              borderRadius={`10px`}
              border={`1px solid var(--quat_grey, rgba(219, 216, 227, 1))`}
              padding={`4px 14px`}
              width={`100%`}
            >
              <p className={cls.subTitle}>Статус:</p>
              <Flex gap={3} alignItems={`center`}>
                <p className={cls.title2}>Свободна, без водителя. </p>{" "}
                <span className={cls.subBlueTitle}>
                 
                  berdievsirojiddin@mail.com
                </span>
              </Flex>
            </Box>
          )}
        </Box>
        <Box width={"25%"}>
          <p className={cls.subTitle}>Машина:</p>
          {item?.users_id_data &&  item?.users_id_data?.photo !== "photo" && item?.users_id_data?.photo? (
            <Box className={cls.profileWrap}>
              <Flex gap={3}>
                {/* <Image
                  // style={{
                  //   borderRadius: `6px`,
                  //   width: `60px`,
                  //   height: `45px`,
                  // }}
                  src={item?.users_id_data?.photo}
                  // objectFit="cover"
                  width={`200`}
                  height={`100`}
                  alt="w"
                /> */}
                {/* 
                <Avatar
                  src={item?.users_id_data?.photo}
                  name={item?.users_id_data?.full_name}
                /> */}
                <Box>
                  <p className={cls.title}>Mercedes Actros</p>
                  <p className={cls.subTitle}>01 A 123 NN</p>
                </Box>
              </Flex>
            </Box>
          ) : (
            <Box className={cls.profileWrap2}>
              <Flex gap={3}>
                <NoImFur />
                <Box>
                  <p className={cls.title}>Без машины</p>
                  {/* <p
                    // onClick={() => setCenterModalType(true)}
                    className={cls.subTitle2Blue}
                  >
                   Прикрепить машину
                  </p> */}
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
   
    </Box>
  );
};
