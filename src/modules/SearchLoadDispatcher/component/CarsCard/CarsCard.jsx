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

export const CarsCard = () => {
  const router = useRouter();
  const locale = useGetLang();

  return (
    <Flex
      className={cls.cardWrap}
     
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
      <Box className={`${cls.contend} ${cls.contend7}`}>
      
      </Box>
    </Flex>
  );
};
