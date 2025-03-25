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
  color,
  handleUpdateId,
  handleDelete,
  type,
}) => {
  const router = useRouter();
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return (
    <Box className={cls.cardWrap1}>
      <Flex
        className={cls.header}
        alignItems={`center`}
        width={`100%`}
        justifyContent={`space-between`}
        background={color || `red`}
      >
        <p className={cls.titleHeader}>

          {type === 0 ? `Ждет модерацию` : type === 1 ? `Одобрено` : `Оплачено`}
        </p>
        <p className={cls.titleHeader}>
          {format(item?.create_time, `dd.MM.yyyy, hh:mm`)}
        </p>
      </Flex>

      <Box p={`5px 16px 16px 16px`}>
        <Flex
          alignItems={`center`}
          width={`100%`}
          h={`40px`}
          justifyContent={`space-between`}
        >
          <p className={cls.title}>{item?.marka}</p>
          {
            type === 0  &&  <Box className={cls.popup}>
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
                        router.push(
                          `/${locale}/add-cars?id=${item?.guid}&user_id=${item?.users_id}`
                        )
                      }
                    >
                      {t("Редактировать машину")}
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
          }
        </Flex>
        <Flex gap={`10px`} justifyContent={`space-between`}>
          <Flex width={"50%"} rowGap={`18px`} flexDirection={`column`}>
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
            <Box>
              <p className={cls.subTitle}>{t("Тип загрузки")}:</p>
              <p className={cls.title}>
                {item?.download_type &&
                  translateArray(item?.download_type)?.join(",")}
              </p>
            </Box>
            <Box>
              <p className={cls.subTitle}>{t("Дополнительно")}:</p>
              <p className={cls.title}>
                {item?.adr} {item?.tir ? `TIR` : ""}{" "}
                {item?.coupling ? `Сцепка` : ``}{" "}
                {item?.pneumatic ? `Пневмоход` : ``}{" "}
                {item?.konika ? `Коники` : ``}
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
                    {item?.car_position?.[0] === `moderation` && (
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

        <Flex mt={`10px`} alignItems={"center"} gap={"30px"} width={"100%"}>
          <Box width={"100%"}>
            <Box
              style={{
                background: "rgba(237, 239, 245, 1)",
              }}
              gap={"30px"}
              alignItems={"center"}
              className={cls.statusWrap}
            >
              <Box width={"100%"}>
                <p className={cls.subTitle}>{t("Водитель")}:</p>
                {item?.users_id_data && (
                  <Box className={cls.profileWrap}>
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
                )}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
