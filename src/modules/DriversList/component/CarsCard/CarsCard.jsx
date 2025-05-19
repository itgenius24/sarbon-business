import {
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
  LocationActiveIcon,
  NoImFur,
  NoImgDrivers,
  PopupIcon,
} from "@/assets/icons/icons";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";

export const CarsCard = ({ t, item, handleDelete }) => {
  const router = useRouter();
  const locale = useGetLang();

  const order = item?.order_data?.provisions?.includes(`performed`)

  return (
    <Box
      className={cls.cardWrap}
      borderLeft={`4px solid  ${
        order ? "rgba(0, 122, 255, 1)" : "rgba(21, 186, 77, 1)"
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
                  cursor={`pointer`}
                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
                  }}
                  className={cls.menuItem}
                  onClick={() =>
                    router.push(
                      `/${locale}/drivers/create?id=${item?.guid}`
                    )
                  }
                >
                  {t("Изменить данные водителя")}
                </Box>
                {/* <Box
                  style={{ padding: `10px 8px` }}
                  cursor={`pointer`}
                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
                  }}
                  className={cls.menuItem}
                  onClick={() => caroCencel(item?.guid)}
                >
                  Открепить машину
                </Box> */}
                <Box
                  cursor={`pointer`}
                  style={{ padding: `10px 8px`, color: `red` }}
                  _hover={{
                    backgroundColor: `rgba(0, 122, 255, 1)`,
                    borderRadius: `6px`,
                    color: `rgba(255, 255, 255, 1)`,
                  }}
                  className={cls.menuItem}
                  onClick={() => handleDelete(item?.guid)}
                >
                  {t("Удалить водителя")}
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Box>
      <Flex alignItems={`flex-end`} gap={"30px"} width={"100%"}>
        <Box>
          {item && item?.photo !== "photo" && item?.photo ? (
            <Image
              style={{
                borderRadius: `50%`,
                width: `130px`,
                height: `130px`,
                objectFit: `cover`,
              }}
              src={item?.photo}
              objectFit="cover"
              width={200}
              height={200}
              alt="w"
            />
          ) : (
            <NoImgDrivers />
          )}
        </Box>
        <Box width={"60%"}>
          <Flex gap={"50px"}>
            <Box>
              <p className={cls.title}>{item?.full_name}</p>
              <p className={cls.subTitle}>{item?.phone}</p>
            </Box>
          </Flex>
          {order ? (
            <Flex
              background={
                order?.length > 1
                  ? "rgba(0, 122, 255, 0.08)"
                  : "rgba(21, 186, 77, 1)"
              }
              gap={"30px"}
              alignItems={"center"}
              className={cls.statusWrap}
            >
              <Box>
                <p className={cls.subTitle}>{t("Статус")}:</p>
                <p className={cls.subBlueTitle}>
                  {t("Занята")}:{" "}
                  {item?.order_data?.[0]?.cargo_id_data?.number_of_order}
                </p>
              </Box>
              {item?.users_gps?.[0] && (
                <>
                  <Flex gap={2}>
                    <LocationActiveIcon /> <CricleArrovIcon />{" "}
                    <p className={cls.title}>
                      {" "}
                      {item?.users_gps?.[0]?.gps ? t("Вкл") : t("Откл")}
                    </p>
                    <p className={cls.subBlueTitle}>
                      {format(
                        item?.users_gps?.[0]?.create_time || new Date(),
                        "yyyy-MM-dd"
                      )}
                    </p>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    <BluetoothIcon />
                    <p className={cls.subTitle}>
                      {t("Bluetooth")}:{" "}
                      <span className={cls.title}>{t("Вкл")} </span>
                    </p>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    {item?.users_gps?.[0]?.battery > 20 ? (
                      <BatareyFullIcon />
                    ) : (
                      <BatareyIcon />
                    )}
                    <p className={cls.subTitle}>
                      {t("Батарея")}:{" "}
                      <span className={cls.title}>
                        {item?.users_gps?.[0]?.battery}%
                      </span>
                    </p>
                  </Flex>
                </>
              )}
            </Flex>
          ) : (
            <Box
              mt={1}
              borderRadius={`10px`}
              border={`1px solid var(--quat_grey, rgba(219, 216, 227, 1))`}
              padding={`4px 14px`}
              width={`100%`}
              display={`flex`}
              alignItems={`center`}
              justifyContent={`space-between`}
            >
              <Box>
                <p className={cls.subTitle}>{t("Статус")}:</p>
                <Flex gap={3} alignItems={`center`}>
                  <p className={cls.title2}>
                    {" "}
                    {item?.vehicles?.[0]
                      ? t("Свободна, без груза")
                      : t("Свободна, без машины")}{" "}
                  </p>
                </Flex>
              </Box>

              {item?.users_gps?.[0] && (
                <>
                  <Flex gap={2}>
                    <LocationActiveIcon /> <CricleArrovIcon />{" "}
                    <p className={cls.title}>
                      {" "}
                      {item?.users_gps?.[0]?.gps ? t("Вкл") : t("Откл")}
                    </p>
                    <p className={cls.subBlueTitle}>
                      {format(
                        item?.users_gps?.[0]?.update_time || new Date(),
                        "yyyy-MM-dd"
                      )}
                    </p>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    <BluetoothIcon />
                    <p className={cls.subTitle}>
                      {t("Bluetooth")}:{" "}
                      <span className={cls.title}>{t("Вкл")} </span>
                    </p>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    {item?.users_gps?.[0]?.battery > 20 ? (
                      <BatareyFullIcon />
                    ) : (
                      <BatareyIcon />
                    )}
                    <p className={cls.subTitle}>
                      {t("Батарея")}:
                      <span className={cls.title}>
                        {item?.users_gps?.[0]?.battery}%
                      </span>
                    </p>
                  </Flex>
                </>
              )}
            </Box>
          )}
        </Box>
        <Box width={"25%"}>
          <p className={cls.subTitle}>{t("Машина")}:</p>
          {item?.vehicles?.[0] ? (
            <Box className={cls.profileWrap}>
              <Flex gap={3}>
                {item?.vehicles?.[0]?.car_photo !== "photo" &&
                item?.vehicles?.[0]?.car_photo ? (
                  <Image
                    style={{
                      borderRadius: `6px`,
                      width: `60px`,
                      height: `45px`,
                      objectFit: `cover`,
                    }}
                    src={item?.vehicles?.[0]?.car_photo}
                    // objectFit="cover"
                    width={100}x
                    height={100}
                    alt="w"
                  />
                ) : (
                  <NoImFur />
                )}

                <Box>
                  <p className={cls.title}>{item?.vehicles?.[0]?.marka}</p>
                  <p className={cls.subTitle}>
                    {item?.vehicles?.[0]?.car_number
                      ? item?.vehicles?.[0]?.car_number
                      : ``}
                  </p>
                </Box>
              </Flex>
            </Box>
          ) : (
            <Box className={cls.profileWrap2}>
              <Flex gap={3}>
                <NoImFur />
                <Box>
                  <p className={cls.title}>{t("Без машины")}</p>
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
