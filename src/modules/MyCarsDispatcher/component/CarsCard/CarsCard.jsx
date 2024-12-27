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
  BluetoothIcon2,
  CricleArrovIcon,
  LocationActiveIcon,
  PopupIcon,
} from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import { format } from "date-fns";
import Image from "next/image";
import { flegCountry } from "@/utils/flegCountry";
import { forwardRef } from "react";

export const CarsCard = forwardRef(({ item, deleteFuntion, containerRef,t }) => {
  const router = useRouter();
  const locale = useGetLang();


  return (
    <Flex
      ref={containerRef}
      className={cls.cardWrap}
      borderLeft={`4px solid  ${
        item?.order_data ? ` rgba(0, 122, 255, 1) ` : `rgba(21, 186, 77, 1)`
      }`}
    >
      <Box className={`${cls.contend} ${cls.contend1}`}>
        <Flex alignItems={`center`} gap={`6px`}>
          <Avatar
            size="sm"
            src={item?.driver_data?.[0]?.photo}
            name={item?.driver_data?.[0]?.full_name}
          />
          <Box>
            <p className={cls.title}>{item?.driver_data?.[0]?.full_name}</p>
            <a
              target="_blank"
              href={`https://t.me/${item?.driver_data?.[0]?.phone}`}
              className={cls.tel}
            >
              {item?.driver_data?.[0]?.phone}{" "}
            </a>
          </Box>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend2}`}>
        {item?.firm_data?.[0] ? (
          <Flex alignItems={`center`} gap={`6px`}>
            <Avatar
              size="sm"
              src={item?.firm_data?.[0]?.logo}
              name={item?.firm_data?.[0]?.full_name}
            />
            <Box>
              <p className={cls.title}>{item?.firm_data?.[0]?.full_name}</p>
              <a
                target="_blank"
                href={`https://t.me/${item?.firm_data?.[0]?.phone_number}`}
                className={cls.tel}
              >
                {item?.firm_data?.[0]?.phone_number}
              </a>
            </Box>
          </Flex>
        ) : (
          <p className={cls.title}>
            <span className={cls.subTitle}>{t(`Владелец водитель`)}</span>
          </p>
        )}
      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
        <p className={cls.title}>
          {item?.vehicle_data?.trailer_type_id_data?.name}
        </p>

        <Flex>
          <p className={cls.subTitle1}>
            <span style={{ marginRight: `9px` }} className={cls.subTitle}>
              {item?.vehicle_data?.height}т / {item?.vehicle_data?.capacity}м3
            </span>
          </p>

          <Tooltip
            border={`1px solid rgba(219, 216, 227, 1)`}
            background={`white`}
            color={`black`}
            placement="top-end"
            label={item?.vehicle_data?.car_country || `uz`}
          >
            <Image
              alt="w"
              style={{
                width: `30px`,
                height: `20px`,
                marginRight: `9px`,
              }}
              width={100}
              height={100}
              src={flegCountry(item?.vehicle_data?.car_country || `uz`)}
            />
          </Tooltip>
          <p className={cls.subTitle1}>{item?.vehicle_data?.car_number}</p>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>
        <Flex>
          <Flex
            background={
              item?.order_data
                ? ` rgba(0, 122, 255, 0.08)`
                : `rgba(229, 243, 235, 1)`
            }
            className={cls.locationWrap}
          >
            {item?.order_data ? (
              <Box>
                <p className={cls.locationTitle}>{t(`Занята`)}: </p>
                <p className={cls.subBlueTitle}></p>
              </Box>
            ) : (
              <Box>
                <p className={cls.locationTitle2}>{t(`Свободна`)}: </p>
                <p className={cls.subBlueTitle2}>{t(`Найти груз`)}</p>
              </Box>
            )}

            {item?.gps_data && (
              <>
                <Flex alignItems={`center`} gap={2}>
                  <LocationActiveIcon /> <CricleArrovIcon />
                  <p className={cls.title}>{t(`Вкл`)}. </p>
                  <p className={cls.subBlueTitle}>
                    {item?.gps_data[0]?.update_time &&
                      format(item?.gps_data[0]?.update_time, `yyyy-MM-dd`)}
                  </p>
                </Flex>
                <Flex alignItems={"center"} gap={2}>
                  <BluetoothIcon2 />
                  <p className={cls.subTitle}>
                    <span className={cls.title}>{t(`Вкл`)}. </span>
                  </p>
                </Flex>
                <Flex alignItems={"center"} gap={2}>
                  {item?.gps_data[0]?.battery > 20 ? (
                    <BatareyFullIcon />
                  ) : (
                    <BatareyIcon />
                  )}
                  <p className={cls.subTitle}>
                    <span className={cls.title}>
                      {item?.gps_data[0]?.battery}%{" "}
                    </span>
                  </p>
                </Flex>
              </>
            )}
          </Flex>
          <Box className={cls.popup}>
            <Popover placement={"bottom-start"}>
              {({ isOpen, onClose }) => (
                <>
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
                          onClick={() => {
                            deleteFuntion(item?.driver_data);
                            onClose();
                          }}
                        >
                          {t(`Удалить водителя`)}
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
});
