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

export const CarsCard = ({ item, deleteFuntion }) => {
  const router = useRouter();
  const locale = useGetLang();

  return (
    <Flex
      className={cls.cardWrap}
      borderLeft={`4px solid  ${
        item?.order ? ` rgba(0, 122, 255, 1) ` : `rgba(21, 186, 77, 1)`
      }`}
    >
      <Box className={`${cls.contend} ${cls.contend1}`}>
        <Flex alignItems={`center`} gap={`6px`}>
          <Avatar
            size="sm"
            src={item?.user?.users_id_data?.photo}
            name={item?.user?.users_id_data?.full_name}
          />
          <Box>
            <p className={cls.title}>{item?.user?.users_id_data?.full_name}</p>
            <a
              target="_blank"
              href={`https://t.me/${item?.user?.users_id_data?.phone}`}
              className={cls.tel}
            >
              {item?.user?.users_id_data?.phone}{" "}
            </a>
          </Box>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend2}`}>
        {item?.user?.firm_id_data ? (
          <Flex alignItems={`center`} gap={`6px`}>
            <Avatar
              size="sm"
              src={item?.user?.firm_id_data?.logo}
              name={item?.user?.firm_id_data?.full_name}
            />
            <Box>
              <p className={cls.title}>{item?.user?.firm_id_data?.full_name}</p>
              <a
                target="_blank"
                href={`https://t.me/${item?.user?.firm_id_data?.phone_number}`}
                className={cls.tel}
              >
                {item?.user?.firm_id_data?.phone_number}
              </a>
            </Box>
          </Flex>
        ) : (
          <p className={cls.title}>
            <span className={cls.subTitle}>Владелец водитель</span>
          </p>
        )}
      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
        <p className={cls.title}>
          {item?.vehicles?.[0]?.trailer_type_id_data?.name}
        </p>

        <Flex>
          <p className={cls.subTitle1}>
            <span style={{ marginRight: `9px` }} className={cls.subTitle}>
              {item?.vehicles?.[0]?.height}т / {item?.vehicles?.[0]?.capacity}м3
            </span>
          </p>

          <Tooltip
            border={`1px solid rgba(219, 216, 227, 1)`}
            background={`white`}
            color={`black`}
            placement="top-end"
            label={item?.vehicles?.[0]?.car_country || `uz`}
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
              src={flegCountry(item?.vehicles?.[0]?.car_country || `uz`)}
            />
          </Tooltip>
          <p className={cls.subTitle1}>{item?.vehicles?.[0]?.car_number}</p>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>
        <Flex>
          <Flex
            background={
              item?.order
                ? ` rgba(0, 122, 255, 0.08)`
                : `rgba(229, 243, 235, 1)`
            }
            className={cls.locationWrap}
          >
            {item?.order ? (
              <Box>
                <p className={cls.locationTitle}>Занята: </p>
                <p className={cls.subBlueTitle}>З-000006287</p>
              </Box>
            ) : (
              <Box>
                <p className={cls.locationTitle2}>Свободна: </p>
                <p className={cls.subBlueTitle2}>Найти груз</p>
              </Box>
            )}

            {item.users_gps && (
              <>
                <Flex alignItems={`center`} gap={2}>
                  <LocationActiveIcon /> <CricleArrovIcon />
                  <p className={cls.title}>Вкл. </p>
                  <p className={cls.subBlueTitle}>
                    {format(item?.users_gps[0]?.update_time, `yyyy-MM-dd`)}
                  </p>
                </Flex>
                <Flex alignItems={"center"} gap={2}>
                  <BluetoothIcon2 />
                  <p className={cls.subTitle}>
                    <span className={cls.title}>Вкл. </span>
                  </p>
                </Flex>
                <Flex alignItems={"center"} gap={2}>
                  {item?.users_gps[0]?.battery > 20 ? (
                    <BatareyFullIcon />
                  ) : (
                    <BatareyIcon />
                  )}
                  <p className={cls.subTitle}>
                    <span className={cls.title}>
                      {item?.users_gps[0]?.battery}%{" "}
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
                            deleteFuntion(item?.user?.guid);
                            onClose();
                          }}
                        >
                          Удалить водителя
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
};
