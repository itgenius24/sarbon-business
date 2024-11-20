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
import { Checkbox } from "@/components/Checkbox";
import { format } from "date-fns";

export const CarsCard = ({ item, handleCheckboxChange,ids }) => {
  const router = useRouter();
  const locale = useGetLang();

  return (
    <Flex  className={`${cls.cardWrap} ${ids.includes(item?.user?.guid) && cls.active} `}>
      <Box className={`${cls.contend} ${cls.contend1}`}>
        <p className={cls.title}>{item?.user?.full_name}</p>
        <p className={cls.subTitle}>{item?.user?.phone}</p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend2}`}>
        <p className={cls.title}>
          {item?.vehicles?.[0]?.firm_id_data?.full_name}
        </p>
        <p className={cls.subTitle}>
          {item?.vehicles?.[0]?.firm_id_data?.phone_number || (
            <span>Владелец водитель</span>
          )}
        </p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
        <p className={cls.title}>{item?.vehicles?.[0]?.car_number}</p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>
        <p className={cls.title}>
          {item?.vehicles?.[0]?.trailer_type_id_data?.name}{" "}
        </p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend5}`}>
        <p className={cls.title}>
          {item?.vehicles?.[0]?.height}т / {item?.vehicles?.[0]?.capacity}м3
        </p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend6}`}>
        <p className={cls.title}>
          {item?.users_gps?.[0]?.update_time
            ? format(item?.users_gps?.[0]?.update_time, `yyyy-MM-dd`)
            : `___`}
        </p>
      </Box>
      <Flex
        justifyContent={`space-between`}
        alignItems={`center`}
        className={`${cls.contend} ${cls.contend7}`}
      >
        <p className={cls.title}>
          <span className={cls.subTitle}>Без диспетчера</span>
        </p>
        <Checkbox  onClick={() => handleCheckboxChange(item?.user?.guid)}></Checkbox>
      </Flex>
    </Flex>
  );
};
