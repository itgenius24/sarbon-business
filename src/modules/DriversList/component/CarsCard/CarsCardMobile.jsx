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
import { useGetLang } from "@/hooks/useGetLang";
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
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cls from "./style.module.scss";

export const CarsCardMobile = ({ t, item, handleDelete }) => {
  const router = useRouter();
  const locale = useGetLang();

  const order = item?.order_data?.provisions?.includes(`performed`);

  return (
    <Box
      className={cls.cardWrap}
      borderTop={`4px solid  ${
        order ? "rgba(0, 122, 255, 1)" : "rgba(21, 186, 77, 1)"
      } `}
    >
      <Flex justifyContent={`space-between`} width={`100%`}>
        <Flex gap={`20px`} alignItems={`center`}>
          <Box>
            {item && item?.photo !== "photo" && item?.photo ? (
              <Image
                style={{ borderRadius: `50%`, width: `100px`, height: `100px` }}
                src={
                  item?.photo?.includes("http")
                    ? item?.photo
                    : `${process.env.NEXT_PUBLIC_MEDIA_URL}${item?.photo}`
                }
                objectFit="cover"
                width={`200`}
                height={`100`}
                alt="w"
              />
            ) : (
              <div className={cls.svgIcon}>
                <NoImgDrivers />
              </div>
            )}
          </Box>
          <Flex gap={"50px"}>
            <Box>
              <p className={cls.title}>{item?.full_name}</p>
              <p className={cls.phone}>{item?.phone}</p>
                 <p className={cls.subTitle}>
                {item?.is_independent ?  t(`Независимый водитель`) : t(`Зависимый водитель`)}
              </p>
            </Box>
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
                    style={{ padding: `10px 8px` }}
                    cursor={`pointer`}
                    _hover={{
                      backgroundColor: `rgba(0, 122, 255, 1)`,
                      borderRadius: `6px`,
                      color: `rgba(255, 255, 255, 1)`,
                    }}
                    className={cls.menuItem}
                    onClick={() =>
                      router.push(`/${locale}/drivers/create?id=${item?.guid}`)
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
      </Flex>

      <Box></Box>

      <Flex mt={`20px`} alignItems={`flex-end`} gap={"30px"} width={"100%"}>
        <Box width={"100%"}>
          {order ? (
            <Box
              background={
                order ? "rgba(0, 122, 255, 0.08)" : "rgba(21, 186, 77, 1)"
              }
              gap={"30px"}
              alignItems={"center"}
              className={cls.statusWrap}
            >
              <Box>
                <p className={cls.subTitle}>{t("Машина")}:</p>
                {item?.vehicle_data && (
                  <Box
                    padding={`15px 0`}
                    marginBottom={`15px`}
                    borderBottom={`1px solid rgba(226, 228, 234, 1)`}
                  >
                    <Flex justifyContent={`space-between`} gap={3}>
                      <Box>
                        <p className={cls.title}>{item?.vehicle_data?.marka}</p>
                        <p className={cls.subTitle}>
                          {item?.vehicle_data?.car_number
                            ? item?.vehicle_data?.car_number
                            : ``}
                        </p>
                      </Box>
                      {item?.vehicle_data?.car_photo !== "photo" &&
                      item?.vehicle_data?.car_photo ? (
                        <Image
                          style={{
                            borderRadius: `6px`,
                            width: `60px`,
                            height: `45px`,
                          }}
                          src={item?.vehicle_data?.car_photo}
                          width={`100`}
                          height={`100`}
                          alt="w"
                        />
                      ) : (
                        <NoImFur />
                      )}
                    </Flex>
                  </Box>
                )}
              </Box>
              <Flex justifyContent={`space-between`}>
                <Box>
                  <p className={cls.subTitle}>
                    {t("Статус")}: <span>{t("Занята")} </span>
                  </p>
                  <p className={cls.subBlueTitle}>
                    {item?.orders?.[0]?.cargo_id_data?.number_of_order}
                  </p>
                </Box>
                {item?.users_gps?.[0] && (
                  <Box>
                    <Flex justifyContent={`end`} gap={2}>
                      <LocationActiveIcon />
                      <p className={cls.subTitle}>
                        <span>
                          {item?.users_gps?.[0]?.gps ? t("Вкл") : t("Откл")}
                        </span>
                      </p>
                    </Flex>
                    <Flex gap={`5px`} alignItems={`center`}>
                      <CricleArrovIcon />
                      <p className={cls.subBlueTitle}>
                        {format(
                          item?.users_gps?.[0]?.create_time || new Date(),
                          "yyyy-MM-dd"
                        )}
                      </p>
                    </Flex>
                  </Box>
                )}
              </Flex>
              {item?.users_gps?.[0] && (
                <Flex mt={`10px`} justifyContent={`space-between`}>
                  <Flex alignItems={"center"} gap={2}>
                    <BluetoothIcon />
                    <p className={cls.subTitle}>
                      <span>{t("Вкл")} </span>
                    </p>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    {item?.users_gps?.[0]?.battery > 20 ? (
                      <BatareyFullIcon />
                    ) : (
                      <BatareyIcon />
                    )}
                    <p className={cls.subTitle}>
                      <span>{item?.users_gps?.[0]?.battery}%</span>
                    </p>
                  </Flex>
                </Flex>
              )}
            </Box>
          ) : (
            <Box
              mt={1}
              borderRadius={`10px`}
              border={`1px solid var(--quat_grey, rgba(219, 216, 227, 1))`}
              padding={`20px 16px`}
              width={`100%`}
            >
              <Box
                padding={`0px 0 15px`}
                marginBottom={`15px`}
                borderBottom={`1px solid rgba(226, 228, 234, 1)`}
              >
                <Box>
                  <Flex
                    justifyContent={`space-between`}
                    alignItems={`center`}
                    gap={3}
                  >
                    {item?.vehicle_data && (
                      <Box width={`100%`}>
                        <Flex
                          width={`100%`}
                          justifyContent={`space-between`}
                          gap={3}
                        >
                          <Box>
                            <p className={cls.title}>
                              {item?.vehicle_data?.marka}
                            </p>
                            <p className={cls.subTitle}>
                              {item?.vehicle_data?.car_number
                                ? item?.vehicle_data?.car_number
                                : ``}
                            </p>
                          </Box>
                          {item?.vehicle_data?.car_photo !== "photo" &&
                          item?.vehicle_data?.car_photo ? (
                            <Image
                              style={{
                                borderRadius: `6px`,
                                width: `60px`,
                                height: `45px`,
                              }}
                              src={item?.vehicle_data?.car_photo}
                              width={`100`}
                              height={`100`}
                              alt="w"
                            />
                          ) : (
                            <NoImFur />
                          )}
                        </Flex>
                      </Box>
                    )}
                  </Flex>
                </Box>
              </Box>

              <Flex justifyContent={`space-between`}>
                <Box>
                  <p className={cls.subTitle}>
                    {t("Статус")}:{" "}
                    <span>
                      {" "}
                      {item?.vehicle_data ? t("Свободна") : t("Свободна")}{" "}
                    </span>
                  </p>
                  <p className={cls.subResTitle}>
                    {item?.vehicle_data ? t(`без груза`) : t(`без машины`)}
                  </p>
                </Box>
                {item?.users_gps?.[0] && (
                  <Box>
                    <Flex justifyContent={`end`} gap={2}>
                      <LocationActiveIcon />
                      <p className={cls.subTitle}>
                        <span>
                          {item?.users_gps?.[0]?.gps ? t("Вкл") : t("Откл")}
                        </span>
                      </p>
                    </Flex>
                    <Flex gap={`5px`} alignItems={`center`}>
                      <CricleArrovIcon />
                      <p className={cls.subBlueTitle}>
                        {format(
                          item?.users_gps?.[0]?.create_time || new Date(),
                          "yyyy-MM-dd"
                        )}
                      </p>
                    </Flex>
                  </Box>
                )}
              </Flex>
              {item?.users_gps?.[0] && (
                <Flex mt={`10px`} justifyContent={`space-between`}>
                  <Flex alignItems={"center"} gap={2}>
                    <BluetoothIcon />
                    <p className={cls.subTitle}>
                      <span>{t("Вкл")} </span>
                    </p>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    {item?.users_gps?.[0]?.battery > 20 ? (
                      <BatareyFullIcon />
                    ) : (
                      <BatareyIcon />
                    )}
                    <p className={cls.subTitle}>
                      <span>{item?.users_gps?.[0]?.battery}%</span>
                    </p>
                  </Flex>
                </Flex>
              )}
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
