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

export const CarsCard = () => {
  const router = useRouter();
  const locale = useGetLang();

  return (
    <Flex className={cls.cardWrap}>
      <Box className={`${cls.contend} ${cls.contend1}`}>
        <p className={cls.title}>Аббосов Алибек</p>
        <p className={cls.subTitle}>+998 93 0776161</p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend2}`}>
        <p className={cls.title}>Absolute Logistics</p>
        <p className={cls.subTitle}>+998 93 0776161</p>
      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
      <p className={cls.title}>01 A 123 NN</p>
        
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>
      <p className={cls.title}>Тентованный полупр.</p>

      </Box>
      <Box className={`${cls.contend} ${cls.contend5}`}>
      <p className={cls.title}>20т / 42м3</p>

      </Box>
      <Box className={`${cls.contend} ${cls.contend6}`}>
      <p className={cls.title}>29 сент 2028</p>

      </Box>
      <Flex justifyContent={`space-between`} alignItems={`center`} className={`${cls.contend} ${cls.contend7}`}>
        <p className={cls.title}>Машарипова Севинч</p>
   <Checkbox >
    
   </Checkbox>
      </Flex>
    </Flex>
  );
};
