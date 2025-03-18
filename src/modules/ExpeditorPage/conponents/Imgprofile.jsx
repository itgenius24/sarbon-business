"use client"

import { Box, Flex } from "@chakra-ui/react"
import cls from './style.module.scss';
import { ExitDoorNoIcon } from "@/assets/icons/icons";

const Imgprofile = ({IsUser}) => {
  return (
    <Flex alignItems={`center`} width={`100%`} className={cls.wrap} gap={`18px`}>
          <Box className={cls.imgBox}>
             <ExitDoorNoIcon />
          </Box>
          <Box>
            <p className={cls.name}>ООО Uztrans Logistics Group</p>
            <p className={cls.id}>ID: U-000003033</p>
          </Box>
    </Flex>
  )
}

export default Imgprofile