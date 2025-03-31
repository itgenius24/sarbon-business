"use client";

import { Box, Flex, Tooltip } from "@chakra-ui/react";
import cls from "./style.module.scss";
import { ExitDoorNoIcon, UserIconLg } from "@/assets/icons/icons";
import Image from "next/image";

const Imgprofile = ({ company_name, yu_id, type, img = `` }) => {
  return (
    <Flex alignItems={`center`} className={cls.wrap} gap={`18px`}>
      <Box className={cls.imgBox}>
        {type === `legal_owner` ? (
          img?.includes(`https`) && img ? (
            <Image className={cls.imgLe} width={200} height={200} src={img} alt="logo" />
          ) : (
            <ExitDoorNoIcon />
          )
        ) : (
          img?.includes(`https`) && img ? (
            <Image className={cls.img} width={200} height={200} src={img} alt="logo" />
          ) : (
            <UserIconLg />
          )
         
        )}
      </Box>
      <Box>
        {company_name?.length > 20 ? (
          <Tooltip
            color={`black`}
            boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
            background={`#fff`}
            label={company_name}
          >
            <p> {company_name?.slice(0, 20)}...</p>
          </Tooltip>
        ) : (
          <p className={cls.name}>{company_name}</p>
        )}

        <p className={cls.id}>{yu_id}</p>
      </Box>
    </Flex>
  );
};

export default Imgprofile;
