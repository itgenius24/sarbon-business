
import cls from "./style.module.scss";
import { Avatar, Box, Flex, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import { GalichkaIcon } from "@/assets/icons/icons";

const Card = ({ item, ...props }) => {
  return (
    <Flex
      {...props}
      p={"10px 36px"}
      className={cls.card}
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={`center`}
    >
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
              src={item?.cargo_id_data?.flag_ot}
              alt="wef"
            />
            <p className={cls.country_code}>
              {item?.cargo_id_data?.country_code_from}
            </p>
          </Box>

          <Box width={`100%`}>
            <p className={cls.title}>
              {item?.cargo_id_data?.from ? (
                item?.cargo_id_data?.from.length > 30 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${item?.cargo_id_data?.from}`}
                  >
                    <span>{`${item?.cargo_id_data?.from.slice(
                      0,
                      30
                    )}...`}</span>
                  </Tooltip>
                ) : (
                  item?.cargo_id_data?.from
                )
              ) : (
                ``
              )}
              <br />
              <span className={cls.subTitle}>
                {item?.cargo_id_data?.load_time &&
                  format(item?.cargo_id_data?.load_time, `yyyy-MM-dd`)}{" "}
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
              src={item?.cargo_id_data?.flag_do}
              alt={item?.cargo_id_data?.flag_do}
            />
            <p className={cls.country_code}>
              {item?.cargo_id_data?.country_code_to}
            </p>
          </Box>
          <Box width={`100%`}>
            <p className={cls.title}>
              {item?.cargo_id_data?.to ? (
                item.cargo_id_data?.to.length > 30 ? (
                  <Tooltip
                    color={`black`}
                    boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                    background={`#fff`}
                    label={`${item.cargo_id_data?.to}`}
                  >
                    <span>{`${item.cargo_id_data?.to.slice(0, 30)}...`}</span>
                  </Tooltip>
                ) : (
                  item.cargo_id_data?.to
                )
              ) : (
                ``
              )}
              <br />
              <span className={cls.subTitle}>
                {item?.cargo_id_data?.date &&
                  format(item?.cargo_id_data?.date, `yyyy-MM-dd`)}
              </span>
            </p>
          </Box>
        </Flex>
      </Box>

      <Box className={`${cls.contend} ${cls.contend3}`}>
        <p className={cls.title}> {item?.cargo_id_data?.product_type}</p>
        <span className={cls.subTitle}>
          {`${item?.cargo_id_data?.weight || ``}т / ${
            item?.cargo_id_data?.volume_m3 || ``
          }м³`}
        </span>
      </Box>

      <Box className={`${cls.contend} ${cls.contend4}`}></Box>
      <Box className={`${cls.contend} ${cls.contend5}`}>
        <p className={cls.title}>
          {item?.users_id_data?.full_name}
        </p>
        <p className={cls.subTitle}>
          {item?.users_id_data?.phone}
        </p>
      </Box>

      <Box className={`${cls.contend} ${cls.contend6}`}>
      <p className={cls.title}>
          {item?.cargo_id_data?.bid_cash} {item?.currency_id_data?.code}
          <span className={cls.subTitle1}>
            {item?.cargo_id_data?.map_id_data?.payment_type
              ? ` ${item?.cargo_id_data?.map_id_data?.payment_type}`
              : ` Безнал`}
          </span>
        </p>
        <span className={cls.subTitle}>
          Предопл.
          {item?.cargo_id_data?.prepayment_percentage > 0
            ? `${item?.cargo_id_data?.prepayment_percentage} ${item?.currency_id_data?.code}`
            : `Нет`}
        </span>
      </Box>
      <Box className={`${cls.contend} ${cls.contend7}`}>
      <Flex alignItems={`flex-start`} gap={1}>
          <Avatar
            width={`50px`}
            height={`50px`}
            src={
              process.env.NEXT_PUBLIC_MEDIA_URL +
              item?.users_id_2_data?.photo
            }
            fontSize={`16px`}
            name={item?.users_id_2_data?.full_name}
          />
          <Box>
            <Flex alignItems={`center`} gap={2}>
              <span className={cls.subTitle}>
                {item?.users_id_2_data?.full_name}
              </span>
              <GalichkaIcon />
            </Flex>
            <p className={cls.tel}>{item?.users_id_2_data?.phone}</p>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Card;
