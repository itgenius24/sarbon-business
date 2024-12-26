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
import { Checkbox } from "@/components/Checkbox";
import { format } from "date-fns";
import Image from "next/image";
import { flegCountry } from "@/utils/flegCountry";
import { forwardRef } from "react";

export const CarsCard = forwardRef(({ item, handleCheckboxChange, ids, index,containerRef }) => {
  const router = useRouter();
  const locale = useGetLang();

  return (
    <Flex
      ref={containerRef}
      as={`label`}
      for={item?.guid}
      className={`${cls.cardWrap} ${ids.includes(item?.guid) && cls.active} `}
    >
      <Box className={`${cls.contend} ${cls.contend1}`}>
        {item?.full_name?.length > 18 ? (
          <Tooltip color={`black`} background={`white`} label={item?.full_name}>
            <p className={cls.title}>{item?.full_name?.slice(0, 18)}...</p>
          </Tooltip>
        ) : (
          <p className={cls.title}>{item?.full_name}</p>
        )}
        <p className={cls.subTitle}>{item?.phone}</p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend2}`}>
        {item?.firm_data?.[0]?.full_name?.length > 18 ? (
          <Tooltip
            color={`black`}
            background={`white`}
            label={item?.firm_data?.[0]?.full_name}
          >
            <p className={cls.title}>
              {item?.firm_data?.[0]?.full_name?.slice(0, 18)}...
            </p>
          </Tooltip>
        ) : (
          <p className={cls.title}>{item?.firm_data?.[0]?.full_name}</p>
        )}
        <p className={cls.subTitle}>
          {item?.firm_data?.[0]?.phone_number || <span>Владелец водитель</span>}
        </p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
        <p className={cls.title}>
          {item?.vehicle_data?.[0]?.car_number ? (
            <Flex>
              <Tooltip
                border={`1px solid rgba(219, 216, 227, 1)`}
                background={`white`}
                color={`black`}
                placement="top-end"
                label={item?.vehicle_data?.[0]?.car_country || `uz`}
              >
                <Image
                  style={{
                    width: `30px`,
                    height: `20px`,
                    marginRight: `9px`,
                  }}
                  width={100}
                  height={100}
                  src={flegCountry(
                    item?.vehicle_data?.[0]?.car_country || `uz`
                  )}
                  alt="qwe"
                />
              </Tooltip>
              <p>{item?.vehicle_data?.[0]?.car_number}</p>
            </Flex>
          ) : (
            <span className={cls.subTitle}>Без Номер</span>
          )}
        </p>
        {/* <p className={cls.title}>{item?.vehicles?.[0]?.car_number}</p> */}
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>
        <p className={cls.title}>
          {item?.trailer_type_data?.[0]?.name
            ? item?.trailer_type_data?.[0]?.name
            : `____`}
        </p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend5}`}>
        <p className={cls.title}>
          {item?.vehicle_data?.[0]?.height
            ? `${item?.vehicle_data?.[0]?.height}т / ${item?.vehicle_data?.[0]?.capacity}м3`
            : `___`}
        </p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend6}`}>
        <p className={cls.title}>
          {item?.gps_data?.[0]?.update_time
            ? format(item?.gps_data?.[0]?.update_time, `yyyy-MM-dd`)
            : `___`}
        </p>
      </Box>
      <Flex
        justifyContent={`space-between`}
        alignItems={`center`}
        className={`${cls.contend} ${cls.contend7}`}
      >
        <Flex
          width={`100%`}
          justifyContent={`space-between`}
          alignItems={`center`}
          className={cls.title}
        >
          {item?.dispatcher_full_data ? (
            item?.dispatcher_full_data?.full_name
          ) : (
            <>
              <span className={cls.subTitle}>Без диспетчера</span>
              <Checkbox
                id={item?.guid}
                onClick={() => handleCheckboxChange(item)}
              ></Checkbox>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
});
