import {
  NoteIconProfile,
  RejectIcon,
  SuccessIconProfile,
} from "@/assets/icons/icons";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import cls from './style.module.scss';
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const StatusComponent = ({ status = `bad`, date }) => {
console.log(`status`,status)
  const statusObj = {
    great: () => {
      return { text: `Отлично`, icon: <SuccessIconProfile />,color:`rgba(38, 189, 73, 1)` };
    },
    bad: () => {
      return { text: `Плохо`, icon: <RejectIcon /> ,color:`rgba(236, 26, 26, 1)`};
    },
    note: () => {
      return { text: `Заметка`, icon: <NoteIconProfile />,color:`rgba(26, 135, 236, 1)` };
    },
  };
  return <Flex gap={`14px`} alignItems={`center`} >
       { status && statusObj[status]()?.icon}
       <Box>
        <p  className={cls.text} style={{color: status && statusObj[status]()?.color}}>{ status && statusObj[status]()?.text}</p>
        <p  className={cls.data}>{date && format(date,`dd MMMM yyyy`,{locale:ru})}</p>
       </Box>
  </Flex>;
};

export default StatusComponent;
