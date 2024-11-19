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
  const data = item?.orders?.[0].provisions.filter(
    (item) =>
      item === `approve_from_driver` ||
      item === `approve_by_customer` ||
      item === `new_proposal_from_director`
  );

  console.log(`data`,data)
 

  return (
    <Flex
      {...props}
      key={item?.orders?.[0]?.guid}
      p={"10px 36px"}
      className={cls.card}
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={`center`}
    >
      {data?.length > 0 && (
        <TooltipComponets
          cls={cls}
          status={`ss`}
          label={
            data?.[0] === `approve_from_driver` ||
            data?.[0] === `new_proposal_from_director`
              ? `Ждем подтверждение водителя`
              : `Ждем подтверждение заказчика`
          }
          color={
            data?.[0] === `approve_from_driver` ||
            data?.[0] === `new_proposal_from_director`
              ? `rgba(193, 187, 32, 1)`
              : `rgba(0, 122, 255, 1)`
          }
        />
      )}
      <Box className={`${cls.contend} ${cls.contend1}`}>
        <Flex gap={`14px`} alignItems={`center`}>
          <Box
            display={`flex`}
            alignItems={`center`}
            flexDirection={`column`}
            width={`40px`}
          >
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={item?.cargo?.flag_ot}
              alt="wef"
            />
            <p className={cls.country_code}>{item?.cargo?.country_code_from}</p>
          </Box>

          <Box width={`100%`}>
            <p className={cls.title}>
              {item.cargo?.from ? (
                item.cargo?.from.length > 30 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${item.cargo?.from}`}
                  >
                    <span>{`${item.cargo?.from.slice(0, 30)}...`}</span>
                  </Tooltip>
                ) : (
                  item.cargo?.from
                )
              ) : (
                item?.city_id_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || item?.city_id_data?.name
              )}
              <br />
              <span className={cls.subTitle}>
                {item?.cargo?.load_time &&
                  format(item?.cargo?.load_time, `yyyy-MM-dd`)}{" "}
                ~ 3450 km
              </span>
            </p>
          </Box>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend2}`}>
        <Flex gap={`14px`} alignItems={`center`}>
          <Box
            display={`flex`}
            alignItems={`center`}
            flexDirection={`column`}
            width={`50px`}
          >
            <Image
              className={cls.flag}
              width={30}
              height={30}
              src={item?.cargo?.flag_do}
              alt={item?.cargo?.flag_do}
            />
            <p className={cls.country_code}>{item?.cargo?.country_code_to}</p>
          </Box>
          <Box width={`100%`}>
            <p className={cls.title}>
              {item?.cargo?.to ? (
                item.cargo?.to.length > 30 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${item.cargo?.to}`}
                  >
                    <span>{`${item.cargo?.to.slice(0, 30)}...`}</span>
                  </Tooltip>
                ) : (
                  item.cargo?.to
                )
              ) : (
                item?.city_id_2_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || item?.city_id_2_data?.name
              )}{" "}
              <br />
              <span className={cls.subTitle}>
                {item?.cargo?.date && format(item?.cargo?.date, `yyyy-MM-dd`)}
              </span>
            </p>
          </Box>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
        <Flex gap={`11px`}>
          <Flex gap={1} alignItems={"center"}>
            <StoneIcon /> <p className={cls.title}> {item?.cargo?.weight}т</p>
          </Flex>
          <Flex gap={1} alignItems={"center"}>
            <LoadOulineIcon />{" "}
            <p className={cls.title}> {item?.cargo?.volume_m3}м³</p>
          </Flex>
        </Flex>

        <span className={cls.subTitle}>Пиломатериалы</span>
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>
        <p className={cls.title}>{item?.cargo?.vehicle_type_id_data?.name}</p>
        <span className={cls.subTitle}>Задняя</span>
      </Box>
      <Box className={`${cls.contend} ${cls.contend5}`}>
        <p className={cls.title}>
          {item?.cargo?.bid_cash} {item.cargo?.currency_id_data?.code}
          <span className={cls.subTitle1}>
            {item?.cargo?.map_id_data?.payment_type
              ? ` ${item?.cargo?.map_id_data?.payment_type}`
              : ` Безнал`}
          </span>
        </p>
        <span className={cls.subTitle}>
          Предопл.{" "}
          {item?.cargo?.prepayment_percentage > 0
            ? `${item?.cargo?.prepayment_percentage} ${item?.cargo?.currency_id_data?.code}`
            : `Нет`}{" "}
        </span>
      </Box>
      <Box className={`${cls.contend} ${cls.contend6}`}>
        <Flex alignItems={`flex-start`} gap={1}>
          <Avatar
            width={`50px`}
            height={`50px`}
            src={
              process.env.NEXT_PUBLIC_MEDIA_URL +
              item?.cargo?.users_id_data?.photo
            }
            fontSize={`16px`}
            name={item?.cargo?.users_id_data?.full_name}
          />
          <Box>
            <Flex alignItems={`center`} gap={2}>
              <span className={cls.subTitle}>
                {item?.cargo?.users_id_data?.full_name}
              </span>
              <GalichkaIcon />
            </Flex>
            <p className={cls.tel}>{item?.cargo?.users_id_data?.phone}</p>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
