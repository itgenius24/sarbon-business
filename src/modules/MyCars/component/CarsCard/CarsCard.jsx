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
  CricleArrovIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NoImg,
  PopupIcon,
  StoneIcon,
  UserIconRadius,
} from "@/assets/icons/icons";

import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import { translateArray } from "@/utils/translateArray";
import { useGetUserGpsData } from "@/services/api";

export const CarsCard = ({
  item,
  setCarId,
  setCenterModalType,
  handleUpdateId,
  handleDelete,
}) => {
  const router = useRouter();
  const locale = useGetLang();

  const { data: response } = useGetUserGpsData({
    params: {
      data: JSON.stringify({
        users_id: item.users_id,
        with_relations: true,
      }),
    },
    querySettings: {
      enabled: Boolean(item.users_id_data),
    },
  });

  console.log(`response`, item);

  return (
    <Box
      className={cls.cardWrap}
      borderLeft={`4px solid  ${
        item?.users_id_data?.provisions[0] === `waiting_for_driver`
          ? "rgba(0, 122, 255, 1)"
          : "rgba(21, 186, 77, 1)"
      } `}
    >
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
                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
                    cursor: `pointer`,
                  }}
                  className={cls.menuItem}
                  onClick={() =>
                    router.push(`/${locale}/my-cars/create?id=${item.guid}`)
                  }
                >
                  Редактировать машину
                </Box>
                <Box
                  style={{ padding: `10px 8px` }}
                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
                    cursor: `pointer`,
                  }}
                  className={cls.menuItem}
                  onClick={() => handleUpdateId(item.guid)}
                >
                  Открепить водителя
                </Box>
                <Box
                  style={{ padding: `10px 8px`, color: `red` }}
                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
                    cursor: `pointer`,
                  }}
                  className={cls.menuItem}
                  onClick={() => handleDelete(item?.guid)}
                >
                  Удалить машину
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Box>
      <Flex alignItems={"center"} gap={"30px"} width={"100%"}>
        <Box
          width={"15%"}
          background={"rgba(219, 216, 227, 1)"}
          borderRadius={"6px"}
          display={`flex`}
          alignItems={`center`}
          justifyContent={`center`}
        >
          {item?.car_photo ? <>
          <Box position={`relative`}>
                <Image src={item?.car_photo} width={250} height={250} alt="w" />
                {
                  item.status?.[0] === `in_active` && <Box position={`absolute`} zIndex={11} bottom={`10px`} left={`10px`} color={`white`} borderRadius={`4px`} padding={`8px 10px`} background={`rgba(255, 59, 48, 1)`} >
                   ждет модерацию
                </Box>
                }
          </Box>
          </>
           : (
            <NoImg />
          )}
        </Box>
        <Box width={"60%"}>
          <Flex gap={"50px"}>
            <p className={cls.title}>
              {item?.marka} <br /> {item?.car_number}
            </p>
            <Flex
              flexDirection={`column`}
              mr={5}
              alignItems={`flex-start`}
              className={cls.subTitle2}
            >
              <p className={cls.loadType}>{item?.trailer_type_id_data?.name}</p>
              <Flex gap={2}>
                <Flex gap={1} alignItems={"center"}>
                  <StoneIcon /> {item?.height} т.
                </Flex>
                <Flex gap={1} alignItems={"center"}>
                  <LoadOulineIcon /> {item?.capacity} m3
                </Flex>
              </Flex>
            </Flex>
            <Box>
              <p className={cls.subTitle}>Тип загрузки:</p>
              <p className={cls.title}>
                { item?.download_type && translateArray(item?.download_type)?.join(",")}
              </p>
            </Box>
            <Box>
              <p className={cls.subTitle}>Дополнительно:</p>
              <p className={cls.title}>
                {item?.adr} {item.tir ? `, TIR` : ""}{" "}
              </p>
            </Box>
          </Flex>
          {response?.response ? (
            <Flex
              style={{
                background: `${
                  response?.response?.[0]?.users_id_data?.provisions[0] === `waiting_for_driver`
                    ? "rgba(0, 122, 255, 0.08)"
                    : "rgba(21, 186, 77, 0.08)"
                }`,
              }}
              gap={"30px"}
              alignItems={"center"}
              className={cls.statusWrap}
            >
              <Box>
                <p className={cls.subTitle}>Статус:</p>
                <p className={cls.subBlueTitle}>
                Свободна: {response?.response?.[0]?.users_id_data?.your_id}
                </p>
              </Box>
              <Flex alignItems={`center`} gap={2}>
                <LocationActiveIcon /> <CricleArrovIcon />{" "}
                <p className={cls.title}>Вкл. </p>
                <p className={cls.subBlueTitle}>
                  {format(response?.response?.[0]?.create_time || new Date(), "yyyy-MM-dd")}
                </p>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                <BluetoothIcon />
                <p className={cls.subTitle}>
                  Bluetooth: <span className={cls.title}>Вкл. </span>
                </p>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                {response?.response?.[0]?.battery > 20 ? (
                  <BatareyFullIcon />
                ) : (
                  <BatareyIcon />
                )}
                <p className={cls.subTitle}>
                  Батарея: <span className={cls.title}>{response?.response?.[0]?.battery } % </span>
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
              <p className={cls.title}>Свободна, без водителя. </p>
            </Box>
          )}
        </Box>
        <Box width={"25%"}>
          <p className={cls.subTitle}>Водитель:</p>
          {item.users_id_data ? (
            <Box
              style={{
                background: `${
                  item?.users_id_data?.provisions[0] === `waiting_for_driver`
                    ? "rgba(0, 122, 255, 0.08)"
                    : "rgba(21, 186, 77, 0.08)"
                }`,
              }}
              className={cls.profileWrap}
            >
              <Flex gap={3}>
                <Avatar
                  src={item?.users_id_data?.photo}
                  name={item?.users_id_data?.full_name}
                />
                <Box>
                  <p className={cls.title}>{item?.users_id_data?.full_name}</p>
                  <p className={cls.subTitle}>{item?.users_id_data?.phone}</p>
                </Box>
              </Flex>
            </Box>
          ) : (
            <Box className={cls.profileWrap2}>
              <Flex gap={3}>
                <UserIconRadius />
                <Box>
                  <p className={cls.title}>Без водителя</p>
                  <p
                    onClick={() => {
                      setCarId(item);
                      setCenterModalType(true);
                    }}
                    className={cls.subTitle2Blue}
                  >
                    Назначить водителя
                  </p>
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
