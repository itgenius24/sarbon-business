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

      </Box>
      <Box className={`${cls.contend} ${cls.contend2}`}>

      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>

      </Box>
      <Box className={`${cls.contend} ${cls.contend5}`}>

      </Box>
      <Box className={`${cls.contend} ${cls.contend6}`}>

      </Box>
    </Flex>
  );
});
