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
import { useTranslation } from "react-i18next";

export const Card = ({ item, cls, ...props }) => {
  const locale = useGetLang();
  const { t } = useTranslation();
  const data = item?.status || [];


  return (
    <Flex
      {...props}
      key={item.guid}
      p={"10px 36px"}
      className={cls.card}
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={`center`}
    >
      {(data?.includes(`approve_from_driver`) ||
        data?.includes(`new_proposal_from_director`)) && (
        <TooltipComponets
          cls={cls}
          status={`ss`}
          label={
            data?.includes(`approve_from_driver`) ||
            data?.includes(`new_proposal_from_director`)
              ? t("Ждем подтверждение водителя")
              : t("Ждем подтверждение заказчика")
          }
          color={
            data?.includes(`approve_from_driver`) ||
            data?.includes(`new_proposal_from_director`)
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
              src={item?.flag_ot}
              alt="wef"
            />
            <p className={cls.country_code}>{item?.country_code_from}</p>
          </Box>

          <Box width={`100%`}>
            <p className={cls.title}>
              {item?.from ? (
                item?.from?.length > 30 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${item?.from}`}
                  >
                    <span>{`${item?.from.slice(0, 30)}...`}</span>
                  </Tooltip>
                ) : (
                  item?.from
                )
              ) : (
                item?.city_id_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || item?.city_id_data?.name
              )}
              <br />
              <span className={cls.subTitle}>
                {item?.as_soon_as_a
                  ? t("Готов к загрузке")
                  : item?.load_time && format(item?.load_time, `yyyy-MM-dd`)}
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
              src={item?.flag_do}
              alt={item?.flag_do}
            />
            <p className={cls.country_code}>{item?.country_code_to}</p>
          </Box>
          <Box width={`100%`}>
            <p className={cls.title}>
              {item?.to ? (
                item?.to.length > 30 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${item?.to}`}
                  >
                    <span>{`${item?.to.slice(0, 30)}...`}</span>
                  </Tooltip>
                ) : (
                  item?.to
                )
              ) : (
                item?.city_id_2_data?.[
                  "name_" + (locale === "uz" ? "en" : locale)
                ] || item?.city_id_2_data?.name
              )}{" "}
              <br />
              <span className={cls.subTitle}>
                {item?.as_soon_as_b
                  ? t("Как можно скорее")
                  : item?.date && format(item?.date, `yyyy-MM-dd`)}
              </span>
            </p>
          </Box>
        </Flex>
      </Box>
      <Box className={`${cls.contend} ${cls.contend3}`}>
        <Flex gap={`11px`}>
          <Flex gap={1} alignItems={"center"}>
            <StoneIcon /> <p className={cls.title}> {item?.weight}т</p>
          </Flex>
          <Flex gap={1} alignItems={"center"}>
            <LoadOulineIcon /> <p className={cls.title}> {item?.volume_m3}м³</p>
          </Flex>
        </Flex>

        <span className={cls.subTitle}>{t("Пиломатериалы")}</span>
      </Box>
      <Box className={`${cls.contend} ${cls.contend4}`}>
        <p className={cls.title}>{item?.vehicle_type_id_data?.name}</p>
        <span className={cls.subTitle}>{t("Задняя")}</span>
      </Box>
      <Box className={`${cls.contend} ${cls.contend5}`}>
        {item?.bid_cash ? (
          <>
            <p className={cls.title}>
              {item?.bid_cash} {item?.currency_id_data?.code}
              <span className={cls.subTitle1}>
                {item?.map_id_data?.payment_type
                  ? ` ${item?.map_id_data?.payment_type}`
                  : t(" Безнал")}
              </span>
            </p>
            <span className={cls.subTitle}>
              {t("Предопл.")}{" "}
              {item?.prepayment_percentage > 0
                ? `${item?.prepayment_percentage} ${item?.currency_id_data?.code}`
                : t("Нет")}{" "}
            </span>
          </>
        ) : (
          <>
            <p className={cls.title}>{t("По запросу")}</p>
            <span className={cls.subTitle}>
              {t("Предопл.")} {t("По запросу")}
            </span>
          </>
        )}
      </Box>
      <Box className={`${cls.contend} ${cls.contend6}`}>
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
