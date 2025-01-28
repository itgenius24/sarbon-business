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
  Tooltip,
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
import { useTranslation } from "@/app/i18n/client";
import { flegCountry } from "@/utils/flegCountry";

export const CarsCardMObile = ({
  item,
  setCarId,
  setCenterModalType,
  handleUpdateId,
  handleDelete,
}) => {
  const router = useRouter();
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

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

  return (
    <Box
      className={cls.cardWrap1}
      borderTop={`4px solid  ${
        item?.users_id_data?.provisions[0] === `waiting_for_driver`
          ? "rgba(0, 122, 255, 1)"
          : "rgba(21, 186, 77, 1)"
      } `}
    >
      <Flex alignItems={`center`} mb={`5px`} width={`100%`} justifyContent={`space-between`}>
        <p className={cls.title}>{item?.marka}</p>
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
                    {t("Редактировать машину")}
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
                    {t("Открепить водителя")}
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
                    {t("Удалить машину")}
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Box>
      </Flex>

      <Flex gap={`10px`} justifyContent={`space-between`}>
        <Flex width={"50%"} rowGap={`16px`} flexDirection={`column`}>
          <Box
            flexDirection={`column`}
            mr={5}
            alignItems={`flex-start`}
            className={cls.subTitle2}
          >
            <p className={cls.loadType}>
              {item?.trailer_type_id_data?.[`name_${locale}`]
                ? item?.trailer_type_id_data?.[`name_${locale}`]
                : item?.trailer_type_id_data?.name}
            </p>
            <Flex mt={`4px`} gap={2}>
              <Flex gap={1} alignItems={"center"}>
                <StoneIcon /> {item?.capacity} т.
              </Flex>
              <Flex gap={1} alignItems={"center"}>
                <LoadOulineIcon /> {item?.height} m3
              </Flex>
            </Flex>
          </Box>
          <Box >
            <p className={cls.subTitle}>{t("Тип загрузки")}:</p>
            <p className={cls.title}>
              {item?.download_type &&
                translateArray(item?.download_type)?.join(",")}
            </p>
          </Box>
          <Box mt={`16px`}>
            <p className={cls.subTitle}>{t("Дополнительно")}:</p>
            <p className={cls.title}>
              {item?.adr} {item.tir ? `TIR ` : ""} 
            </p>
          </Box>
        </Flex>
        <Box width={`50%`}>
          <Box
            width={`100%`}
            background={"rgba(219, 216, 227, 1)"}
            borderRadius={"6px"}
            height={`120px`}
            display={`flex`}
            alignItems={`center`}
            justifyContent={`center`}
          >
            {item?.car_photo ? (
              <>
                <Box width={`100%`} position={`relative`}>
                  <Image
                    className={cls.image}
                    src={item?.car_photo}
                    width={250}
                    height={250}
                    alt="w"
                  />
                  {item.car_position?.[0] === `moderation` && (
                    <Box
                      position={`absolute`}
                      width={`100%`}
                      zIndex={11}
                      bottom={`10px`}
                      // left={`10px`}
                      color={`white`}
                      borderRadius={`4px`}
                      fontSize={`12px`}
                      padding={`4px 5px`}
                      background={`rgba(255, 59, 48, 1)`}
                      textAlign={`center`}
                    >
                      {t("ждет модерацию")}
                    </Box>
                  )}
                </Box>
              </>
            ) : (
              <NoImg />
            )}
          </Box>
          <Flex
            justifyContent={`flex-end`}
            m={`10px 0px`}
            alignItems={`center`}
            gap={"10px"}
          >
            <Tooltip
              border={`1px solid rgba(219, 216, 227, 1)`}
              background={`white`}
              color={`black`}
              placement="top-end"
              label={item?.car_country || `uz`}
            >
              <Image
                style={{
                  width: `32px`,
                  height: `20px`,
                }}
                width={100}
                height={100}
                src={flegCountry(item?.car_country || `uz`)}
              />
            </Tooltip>
            <p className={cls.title}>{item?.car_number}</p>
          </Flex>
        </Box>
      </Flex>

    

      <Flex mt={`14px`} alignItems={"center"} gap={"30px"} width={"100%"}>
        <Box width={"100%"}>
          {response?.response ? (
            <Box
              style={{
                background: `${
                  response?.response?.[0]?.users_id_data?.provisions[0] ===
                  `waiting_for_driver`
                    ? "rgba(0, 122, 255, 0.08)"
                    : "rgba(21, 186, 77, 0.08)"
                }`,
              }}
              gap={"30px"}
              alignItems={"center"}
              className={cls.statusWrap}
            >
              <Box width={"100%"}>
                <p className={cls.subTitle}>{t("Водитель")}:</p>
                {item.users_id_data ? (
                  <Box
                    // style={{
                    //   background: `${
                    //     item?.users_id_data?.provisions[0] ===
                    //     `waiting_for_driver`
                    //       ? "rgba(0, 122, 255, 0.08)"
                    //       : "rgba(21, 186, 77, 0.08)"
                    //   }`,
                    // }}
                    className={cls.profileWrap}
                  >
                    <Flex gap={3}>
                      <Avatar
                        src={item?.users_id_data?.photo}
                        name={item?.users_id_data?.full_name}
                      />
                      <Box>
                        <p className={cls.title}>
                          {item?.users_id_data?.full_name}
                        </p>
                        <p className={cls.subTitle}>
                          {item?.users_id_data?.phone}
                        </p>
                      </Box>
                    </Flex>
                  </Box>
                ) : (
                  <Box className={cls.profileWrap2}>
                    <Flex gap={3}>
                      <UserIconRadius />
                      <Box>
                        <p className={cls.title}>{t("Без водителя")}</p>
                        <p
                          onClick={() => {
                            setCarId(item);
                            setCenterModalType(true);
                          }}
                          className={cls.subTitle2Blue}
                        >
                          {t("Назначить водителя")}
                        </p>
                      </Box>
                    </Flex>
                  </Box>
                )}
              </Box>
              <Flex rowGap={`5px`} flexDirection={`column`}>
                <Flex width={`100%`} justifyContent={`space-between`}>
                  {response?.response?.[0]?.users_id_data?.provisions[0] ===
                  `waiting_for_driver` ? (
                    <Box>
                      <p className={cls.subTitle}>
                        {t("Статус")}: <span>{t("Занят")}</span>
                      </p>
                      <p className={cls.subBlueTitle}>
                        {response?.response?.[0]?.users_id_data?.your_id}
                      </p>
                    </Box>
                  ) : (
                    <Box>
                      <p className={cls.subTitle}>
                        {t("Статус")}: <span>{t("Свободна")}</span>
                      </p>
                      <p className={cls.subBlueTitle}>{t(`Найти груз`)}</p>
                    </Box>
                  )}
                  <Flex alignItems={`flex-end`} flexDirection={`column`} >
                    <Flex>
                      <LocationActiveIcon />
                      <p className={cls.title}>{t("Вкл")}. </p>
                    </Flex>
                    <Flex gap={`5px`}>
                      <CricleArrovIcon />
                      <p className={cls.subBlueTitle}>
                        {format(
                          response?.response?.[0]?.create_time || new Date(),
                          "yyyy-MM-dd"
                        )}
                      </p>
                    </Flex>
                  </Flex>
                </Flex>

               <Flex mt={`10px`} width={`100%`} justifyContent={`space-between`}>
               <Flex alignItems={"center"} gap={2}>
                  <BluetoothIcon />
                  <p className={cls.subTitle}>
                    {t("Bluetooth")}:{" "}
                    <span className={cls.title}>{t("Вкл")}. </span>
                  </p>
                </Flex>
                <Flex alignItems={"center"} gap={2}>
                  {response?.response?.[0]?.battery > 20 ? (
                    <BatareyFullIcon />
                  ) : (
                    <BatareyIcon />
                  )}
                  <p className={cls.subTitle}>
                    <span className={cls.title}>
                      {response?.response?.[0]?.battery} %{" "}
                    </span>
                  </p>
                </Flex>
               </Flex>
              </Flex>
            </Box>
          ) : (
            <Box
              mt={1}
              borderRadius={`10px`}
              border={`1px solid var(--quat_grey, rgba(219, 216, 227, 1))`}
              padding={`7px 15px 17px 15px`}
              width={`100%`}
              marginBottom={`12px`}
            >
              <Box width={"100%"}>
                <p className={cls.subTitle}>{t("Водитель")}:</p>
                {item.users_id_data ? (
                  <Box
                    className={cls.profileWrap}
                  >
                    <Flex gap={3}>
                      <Avatar
                        src={item?.users_id_data?.photo}
                        name={item?.users_id_data?.full_name}
                      />
                      <Box>
                        <p className={cls.title}>
                          {item?.users_id_data?.full_name}
                        </p>
                        <p className={cls.subTitle}>
                          {item?.users_id_data?.phone}
                        </p>
                      </Box>
                    </Flex>
                  </Box>
                ) : (
                  <Box className={cls.profileWrap2}>
                    <Flex gap={3}>
                      <UserIconRadius />
                      <Box>
                        <p className={cls.title}>{t("Без водителя")}</p>
                        <p
                          onClick={() => {
                            setCarId(item);
                            setCenterModalType(true);
                          }}
                          className={cls.subTitle2Blue}
                        >
                          {t("Назначить водителя")}
                        </p>
                      </Box>
                    </Flex>
                  </Box>
                )}
              </Box>
              {/* <p className={cls.subTitle}>{t("Статус")}:</p> */}
              <p className={cls.title}>{t("Свободна, без водителя")}. </p>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
