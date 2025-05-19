import { Avatar, Box, Flex, Tooltip } from "@chakra-ui/react";

import cls from "./style.module.scss";

import {
  FromIcon,
  GalichkaIcon,
  LoadOulineIcon,
  StoneIcon,
  ToIcon,
} from "@/assets/icons/icons";
import { format } from "date-fns";

export const CardLoad = ({
  item,
  t,
  locale,
  isTollTip,
  statusTooltip,
  onRow,
  ...props
}) => {
  return (
    <Box
      onClick={() => onRow(item)}
      className={cls.cardWrapper}
      {...props}
      key={item.guid}
    >
      {isTollTip && statusTooltip(item)}
      <Flex alignItems={`center`} gap={`10px`} className={cls.headerCard}>
        <Avatar
          width={`35px`}
          height={`35px`}
          // fontSize={`20px`}
          size="sm"
          src={
            process.env.NEXT_PUBLIC_MEDIA_URL + item.customer_data?.[0]?.photo
          }
          fontSize={`16px`}
          name={item.customer_data?.[0]?.full_name}
        />
        <Box>
          <Flex alignrows={`center`} gap={2}>
            <span className={cls.customerName}>
              {item.customer_data?.[0]?.full_name}
            </span>
            <GalichkaIcon />
          </Flex>
          <p className={cls.tel}>{item.customer_data?.[0]?.phone}</p>
        </Box>
      </Flex>
      <Box className={cls.addressWrap}>
        <Flex alignItems={`center`} mb={`20px`} gap={2}>
          <div className={cls.startFromIconWrap}>
            <FromIcon />
          </div>
          <Box>
            <Flex>
              <p className={cls.address}>
                {item?.from &&
                  (item?.from?.length > 20 ? (
                    <Tooltip
                      color={`black`}
                      boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                      background={`#fff`}
                      label={`${item?.from}`}
                    >
                      <span>{`${item?.from.slice(0, 20)}...`}</span>
                    </Tooltip>
                  ) : (
                    item?.from
                  ))}
              </p>
              <span className={cls.countyCode}>
                {" "}
                - {item?.country_code_from}
              </span>
            </Flex>
            <p className={cls.date}>
              {item?.as_soon_as_a
                ? t("Готов к загрузке")
                : item?.load_time && format(item?.load_time, `yyyy-MM-dd`)}
            </p>
          </Box>
        </Flex>
        <div className={cls.line}></div>{" "}
        <Flex alignItems={`center`} gap={2}>
          <ToIcon />
          <Box>
            <Flex>
              <p className={cls.address}>
                {item?.to &&
                  (item?.to?.length > 20 ? (
                    <Tooltip
                      color={`black`}
                      boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                      background={`#fff`}
                      label={`${item?.to}`}
                    >
                      <span>{`${item?.to.slice(0, 20)}...`}</span>
                    </Tooltip>
                  ) : (
                    item?.to
                  ))}
              </p>
              <span className={cls.countyCode}> - {item?.country_code_to}</span>
            </Flex>
            <p className={cls.date}>
              {item?.as_soon_as_b
                ? t("Готов к загрузке")
                : item?.load_time && format(item?.load_time, `yyyy-MM-dd`)}
            </p>
          </Box>
        </Flex>
      </Box>
      <Flex justifyContent={`space-between`} className={cls.driverVehicleWrap}>
        <Box>
          <p className={cls.productType}>{item.product_type} </p>
          <p className={cls.vehicleType}>
            {item?.car_type} {`(${item?.number_of_cars} ${t(`машины`)}) `}
          </p>
        </Box>
        <Box>
          <Flex gap={1} alignItems={"center"}>
            <StoneIcon />{" "}
            <p className={cls.vehicleTypeParams}> {item?.weight}т</p>
          </Flex>
          <Flex gap={1} alignItems={"center"}>
            <LoadOulineIcon />{" "}
            <p className={cls.vehicleTypeParams}> {item?.volume_m3}м³</p>
          </Flex>
        </Box>
      </Flex>
      <Flex justifyContent={`space-between`} className={cls.priceVehicleWrap}>
        <Box>
          <p className={cls.priceTitle}>{t(`Общая сумма`)}</p>
          <p className={cls.priceType}>
            {item?.bid_cash
              ? `${item?.bid_cash} ${item?.currency_id_data?.[0]?.code}`
              : t(`По запросу`)}
          </p>
        </Box>
        <Box>
          <p className={cls.priceTitle}>{t(`Предоплата`)}</p>
          <p className={cls.price}>
            {" "}
            {item?.bid_cash
              ? item?.prepayment_percentage > 0
                ? `${item?.prepayment_percentage} ${item?.currency_id_data?.[0]?.code}`
                : t("Нет")
              : t(`По запросу`)}
          </p>
        </Box>
        <Box>
          <p className={cls.priceTitle}>{t(`Тип оплаты`)}</p>
          <p className={cls.price}>
            {item?.bid_cash
              ? item?.[`payment_type_${locale}`] || item?.payment_type
                ? ` ${t(
                    item?.[`payment_type_${locale}`]
                      ? item?.[`payment_type_${locale}`]
                      : item?.payment_type
                  )}`
                : t(" Безнал")
              : t(`По запросу`)}
          </p>
        </Box>
      </Flex>
    </Box>
  );
};
