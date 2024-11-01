import {
  ClockIconStatus,
  GalichkaIcon,
  LoadOulineIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { useGetLang } from "@/hooks/useGetLang";
import { Avatar, Box, Flex, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import TooltipComponets from "../TooltipComponets";
import Image from "next/image";

export const Card = ({ item, cls, ...props }) => {
  const locale = useGetLang();
  console.log(`item`, item);
  return (
    <Flex
      {...props}
      key={item?.id}
      gap={3}
      className={cls.card}
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={`center`}
    >
      {/* <TooltipComponets cls={cls} status={`ss`} label={`wqdwe`} color={`red`} /> */}
      <Box className={cls.contend}>
        <Flex gap={`14px`} alignItems={`center`}>
          <Box>
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={item.flag_ot}
              alt="wef"
            />
            <p className={cls.country_code}>{item?.country_code_from}</p>
          </Box>

          <p className={cls.title}>
            {item.address_name
              ? item.address_name.split("|")[0].charAt(0).toUpperCase() +
                item.address_name.split("|")[0].slice(1).toLowerCase()
              : item?.city_id_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || item?.city_id_data?.name}{" "}
            <br />
            <span className={cls.subTitle}>
              {item?.load_time && format(item?.load_time, `yyyy-MM-dd`)} ~ 3450
              km
            </span>
          </p>
        </Flex>
      </Box>
      <Box className={cls.contend}>
        <Flex gap={`14px`} alignItems={`center`}>
          <Box >
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={item?.flag_do}
              alt={item?.flag_do}
            />
            <p className={cls.country_code}>{item?.country_code_to}</p>
          </Box>

          <p className={cls.title}>
            {item?.address_name
              ? item?.address_name?.split("|")[1]?.charAt(0).toUpperCase() +
                item?.address_name?.split("|")[1]?.slice(1).toLowerCase()
              : item?.city_id_2_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || item?.city_id_2_data?.name}{" "}
            <br />
            <span className={cls.subTitle}>
              { item?.date && format(item?.date, `yyyy-MM-dd`)}
            </span>
          </p>
        </Flex>
      </Box>
      <Box className={cls.contend}>
        <Flex gap={`11px`}>
          <Flex gap={1} alignItems={"center"}>
            <StoneIcon /> <p className={cls.title}> {item?.weight}т</p>
          </Flex>
          <Flex gap={1} alignItems={"center"}>
            <LoadOulineIcon /> <p className={cls.title}> {item?.volume_m3}м³</p>
          </Flex>
        </Flex>

        <span className={cls.subTitle}>Пиломатериалы</span>
      </Box>
      <Box className={cls.contend}>
        <p className={cls.title}>{item?.vehicle_type_id_data?.name}</p>
        <span className={cls.subTitle}>Задняя</span>
      </Box>
      <Box className={cls.contend}>
        <p className={cls.title}>
          {item?.bid_cash} {item.currency_id_data?.code}
          <span className={cls.subTitle1}>
            {item?.map_id_data?.payment_type
              ? ` ${item?.map_id_data?.payment_type}`
              : ` Безнал`}
          </span>
        </p>
        <span className={cls.subTitle}>Предопл. {item?.prepayment_percentage > 0 ? `${item?.prepayment_percentage} ${item?.currency_id_data?.code}` : `Нет`}  </span>
      </Box>
      <Box className={cls.contend}>
        <Flex alignItems={`flex-start`} gap={1}>
          <Avatar
            width={`50px`}
            height={`50px`}
            src={process.env.NEXT_PUBLIC_MEDIA_URL + item?.users_id_data?.photo}
            fontSize={`16px`}
            name={item?.users_id_data?.full_name}
          />
          <Box>
            <Flex alignItems={`center`} gap={2}>
              <span className={cls.subTitle}>
                {item?.users_id_data?.full_name}
              </span>
              <GalichkaIcon />
            </Flex>
            <p className={cls.tel}>{item?.users_id_data?.phone}</p>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
