import clsx from "clsx";
import cls from "./styles.module.scss";
import {
  ArrowNextIcon,
  DeleteIcon,
  MapIcon,
  PencilIcon,
  TruckIcon,
} from "@/assets/icons/icons";
import { LoadBtn } from "@/components/LoadBtn";
import { DataList } from "@/components/DataList";
import { Box, Button, Flex, Heading, Tooltip } from "@chakra-ui/react";
import { cancelBy, statuses } from "@/utils/constants";
import { formatSum } from "@/utils/formatSum";
import { useLoadsCardProps } from "./useLoadsCardProps";

import { Rating } from "@/components/Rating";
import { CustomTextarea } from "@/components/CustomTextarea";
import { Checkbox } from "@/components/Checkbox";
import { forwardRef } from "react";
import { Popup } from "@/components/Popup";
import { ModalS } from "@/components/Modal";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { statusColor, statusText } from "../../data";

export const LoadsCard = forwardRef(
  (
    {
      cargo,
      orderStatus,
      handleDelete,
      handleAccept,
      handleCancel,
      isLargerThan768,
    },
    ref
  ) => {
    const {
      list,
      newStatusList,
      router,
      status,
      handleOpenEstimateModal,
      handleCloseEstimateModal,
      isEstimateModalOpen,
      handleClickRating,
      ratingValue,
      handleSubmit,
      register,
      onSubmit,
      t,
      locale,
      setValue,
      watch,
      isDeletePopupOpen,
      onDeleteAccept,
      setIsDeletePopupOpen,
    } = useLoadsCardProps({
      order_status: cargo?.order_status,
      provisions: cargo?.provisions,
      response_status: cargo?.response_status,
      orderStatus: orderStatus,
      cargo_type_id_data: cargo?.cargo_type_id_data,
      load_around_the_clock: cargo?.load_around_the_clock,
      take_all_unloads: cargo?.take_all_unloads,
      date: cargo?.date,
      load_time: cargo?.load_time,
      indicate_status: cargo?.indicate_status,
      users_id_2: cargo?.users_id_2,
      users_id_2_data: cargo?.users_id_2_data,
      driver_cash: cargo?.driver_cash,
      short_name: cargo?.short_name,
      distance: cargo?.distance,
      currency_id_data: cargo?.currency_id_data,
      currency_id_2_data: cargo?.currency_id_2_data,
      handleDelete: handleDelete,
      cargo,
    });

    return (
      <>
        <div ref={ref} className={cls.status}>
          <div className={cls.statusCard}>
            <div
              style={{ background: statusColor[cargo?.order_status?.[0]] }}
              className={cls.statusXeader}
            >
              <div className={cls.leftContend}>
                <div className={cls.text}>
                  <h3>
                    {cargo?.from?.length > 20 ? (
                      <Tooltip
                        color={`black`}
                        boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                        background={`#fff`}
                        label={`${cargo?.from}`}
                      >
                        <span>{`${cargo?.from.slice(0, 20)}...`}</span>
                      </Tooltip>
                    ) : (
                      cargo?.from
                    )}
                  </h3>
                  <p>
                    {cargo?.address_id_data?.name}
                    <span>
                      {cargo?.as_soon_as_a
                        ? `${cargo?.country_code_from?.toUpperCase()} / Как можно скорее`
                        : cargo?.load_time &&
                          format(
                            new Date(cargo?.load_time).setHours(
                              new Date(cargo?.load_time).getHours() - 5
                            ),
                            "dd-MMMM",
                            { locale: ru }
                          )}
                    </span>
                  </p>
                </div>
                <ArrowNextIcon />
                <div className={cls.text}>
                  <h3>
                    {cargo?.to?.length > 20 ? (
                      <Tooltip
                        color={`black`}
                        boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                        background={`#fff`}
                        label={`${cargo?.to}`}
                      >
                        <span>{`${cargo?.to.slice(0, 20)}...`}</span>
                      </Tooltip>
                    ) : (
                      cargo?.to
                    )}
                  </h3>
                  <p>
                    {cargo?.address_id_2_data?.name}

                    <span>
                      {cargo?.as_soon_as_b
                        ? `${cargo?.country_code_to?.toUpperCase()} / Как можно скорее`
                        : cargo?.date &&
                          format(
                            new Date(cargo?.date).setHours(
                              new Date(cargo?.date).getHours() - 5
                            ),
                            "dd-MMMM",
                            { locale: ru }
                          )}
                    </span>
                  </p>
                </div>
              </div>
              <div className={cls.rightContend}>
                <div className={cls.text}>
                  <p className={cls.rightTitle}>
                    Тип оплаты: {cargo?.payment_type}
                  </p>
                  <p className={cls.rightTitle}>
                    Предоплата:
                    {/* {cargo?.payment_type?.[0] === "prepayment" ? `Да` : `Нет`} */}
                    {cargo?.prepayment_percentage
                      ? ` ${cargo?.prepayment_percentage} ${cargo?.currency_id_data?.code}`
                      : `Нет`}
                  </p>
                </div>
                <div className={cls.text}>
                  <p className={cls.rightTitle}>Общая сумма</p>
                  <p className={cls.totalSum}>
                    {cargo?.bid_cash
                      ? `${cargo?.bid_cash}  ${cargo?.currency_id_data?.code}`
                      : `По запросу`}
                  </p>
                </div>
              </div>
            </div>
            <div className={cls.cardBody}>
              {orderStatus === `performed` && (
                <div className={cls.card}>
                  <div className={cls.cardItem}>
                    <span className={cls.cardBodyTitle}>Водитель</span>
                    <p className={cls.cardName}>
                      {cargo?.users_id_data?.full_name}{" "}
                      {cargo?.users_id_data?.rating > 0
                        ? `+${cargo?.users_id_data?.rating}`
                        : ``}
                    </p>
                  </div>
                  <div className={cls.cardItem}>
                    <span className={cls.cardBodyTitle}>Телефон</span>
                    <p className={cls.cardName}>
                      {cargo?.users_id_data?.phone}
                    </p>
                  </div>
                  <div className={cls.cardItem}>
                    <span className={cls.cardBodyTitle}>Статус</span>
                    <p className={cls.cardName}>
                      {/* {
                  performedStatuses[
                    cargo?.indicate_status?.[0]
                      ? cargo?.indicate_status?.[0]
                      : `Не cтатус`
                  ]
                } */}
                      {/* <span className={cls.cardNameDate}> (Сегодня, 12:36)</span> */}
                    </p>
                  </div>
                </div>
              )}
              <div className={cls.card}>
                <Flex justifyContent={`space-between`} width={`100%`}>
                  <Flex gap={`70px`}>
                    <div className={cls.cardItem}>
                      <span className={cls.cardBodyTitle}>Товары</span>
                      <p className={cls.cardName}>{cargo?.product_type}</p>
                    </div>
                    <div className={cls.cardItem}>
                      <span className={cls.cardBodyTitle}>Транспорт</span>
                      <p className={cls.cardName}>{cargo?.car_type}</p>
                    </div>
                    <div className={cls.cardItem}>
                      <span className={cls.cardBodyTitle}>Вес, объём</span>
                      <p className={cls.cardName}>
                        {cargo?.weight}
                        {cargo?.measurement_id_data?.Symbol} /{" "}
                        {cargo?.volume_m3} m³
                      </p>
                    </div>
                  </Flex>
                  <div style={{textAlign:`right`}} className={cls.cardItem}>
                      <span  className={cls.cardBodyTitle}>Номер груза</span>
                      <p className={cls.cardName}>{cargo?.number_of_order}</p>
                    </div>
                </Flex>
              </div>
              <div className={cls.card}>
                <Flex
                  width={`100%`}
                  className={cls.cardItem}
                  justifyContent={`space-between`}
                  alignItems={`center`}
                >
                  <Box>
                    <span className={cls.cardBodyTitle}>
                      Статус:
                      {cargo?.updated_time &&
                        format(cargo?.updated_time, ` dd.MM.yyyy, HH:mm`)}
                    </span>
                    <Flex
                      style={{
                        color: statusColor[cargo?.order_status?.[0]],
                        fontWeight: 600,
                        fontSize: `18px`,
                        gap: `6px`,
                      }}
                    >
                      {statusText[cargo?.order_status?.[0]]}
                      <p
                        style={{
                          color: `rgba(33, 31, 38, 1)`,
                          fontWeight: 400,
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            cargo?.order_status?.[0] === `rejected`
                              ? cargo?.moderator_comment
                              : ``,
                        }}
                      ></p>
                    </Flex>
                  </Box>
                  <Box>
                    {status === `active` && (
                      <Button
                        onClick={() =>
                          router.push(
                            `/${locale}/my-loads/${status}/${cargo?.guid}`
                          )
                        }
                        className={cls.btnActive}
                      >
                        {t(`Изменить`)}
                      </Button>
                    )}
                    {(status === `in_moderation` || status === `rejected`) && (
                      <Flex gap={`11px`}>
                        <Button
                          onClick={() =>
                            router.push(
                              `/${locale}/my-loads/${status}/${cargo?.guid}`
                            )
                          }
                          className={cls.bntOutline}
                        >
                          {t(`Изменить`)}
                        </Button>
                        <Button
                          leftIcon={<DeleteIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDeletePopupOpen(true);
                          }}
                          className={cls.bntOutline}
                        >
                          {t(`Удалить`)}
                        </Button>
                      </Flex>
                    )}
                  </Box>
                </Flex>
              </div>
              {orderStatus == "performed" && (
                <div className={cls.cardFooter}>
                  <div className={cls.cardFooterLeft}>
                    <div className={cls.cardItem}>
                      <span className={cls.cardBodyTitle}>Пройдено</span>
                      <p className={cls.cardName}>
                        <span>1357 км </span> /{" "}
                        {cargo?.distance?.toFixed(1) || 0} км
                      </p>
                    </div>

                    <div
                      className={cls.btn}
                      onClick={() =>
                        router.push(
                          `/${locale}/my-loads/performed/${cargo?.guid}?isFirst=true&&car_id=${cargo?.cargo_id}`
                        )
                      }
                    >
                      <MapIcon /> Показать на карте
                    </div>
                  </div>
                  <div className={cls.rightContend}></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div
          ref={ref}
          className={clsx(cls.loadsCard, {
            [cls.rejected]: status === "rejected",
          })}
          onClick={() =>
            router.push(`/${locale}/my-loads/${status}/${cargo?.guid}`)
          }
        >
          <a
            className={clsx(cls.stretchedLink, {
              [cls.isShow]: status === "performed",
            })}
            href={`/${locale}/my-loads/${status}/${cargo?.guid}`}
          ></a>
          <div className={cls.cardTop}>
            <div className={cls.cardTopContent}>
              <h2 className={cls.address}>
                <span className={cls.addressText}>
                  <span className={cls.addressCountry}>
                    <span className={cls.addressCity}>
                      {cargo?.from ? (
                        cargo?.from?.length > 20 ? (
                          <Tooltip
                            color={`black`}
                            boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                            background={`#fff`}
                            label={`${cargo?.from}`}
                          >
                            <span>{`${cargo?.from.slice(0, 20)}...`}</span>
                          </Tooltip>
                        ) : (
                          cargo?.from
                        )
                      ) : (
                        cargo?.city_id_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ]
                      )}
                    </span>
                    <span>
                      {
                        cargo?.address_id_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ]
                      }
                    </span>
                  </span>
                  <span>-&gt;</span>
                  <span className={cls.addressCountry}>
                    <span className={cls.addressCity}>
                      {cargo?.to ? (
                        cargo?.to?.length > 20 ? (
                          <Tooltip
                            color={`black`}
                            boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                            background={`#fff`}
                            label={`${cargo?.to}`}
                          >
                            <span>{`${cargo?.to.slice(0, 20)}...`}</span>
                          </Tooltip>
                        ) : (
                          cargo?.to
                        )
                      ) : (
                        cargo?.city_id_2_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ]
                      )}
                    </span>
                    {}
                    <span>
                      {
                        cargo?.address_id_2_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ]
                      }
                    </span>
                  </span>
                </span>
                <span className={clsx(cls.addressStatus, cls[status])}>
                  {statuses[status]} {cancelBy[cargo?.who_cancellation?.[0]]}
                </span>
              </h2>
              <span className={cls.distance}>{cargo?.number_of_order}</span>
            </div>
            <div className={cls.paymentInfo}>
              <div className={cls.paymentInfoContent}>
                <span className={cls.paymentInfoText}>
                  {formatSum(cargo?.currency_id_data?.code, cargo?.bid_cash)}
                </span>
              </div>
              <span className={cls.paymentInfoComment}>
                {cargo?.request
                  ? t("Запросить")
                  : cargo?.no_haggling
                  ? t("Без торг")
                  : t("Возможен торг")}
              </span>
            </div>
          </div>
          <Box borderBottom="1px solid" borderColor="brand.200">
            <DataList
              status={status}
              list={
                status === "new" || status === `approve_from_driver`
                  ? newStatusList
                  : list
              }
            />
            {status === "rejected" && (
              <p className={cls.moderatorComment}>
                <span className={cls.moderatorCommentTitle}>
                  {t("Причина отказа модерации:")}
                </span>
                <span
                  className={cls.moderatorCommentText}
                  dangerouslySetInnerHTML={{
                    __html: cargo?.moderator_comment,
                  }}
                />
              </p>
            )}
          </Box>
          <div className={cls.paymentInfoMobile}>
            <div className={cls.paymentInfoMobileContent}>
              <span className={cls.paymentInfoMobileText}>
                {formatSum(cargo?.currency_id_data?.code, cargo?.bid_cash)}
              </span>
            </div>
            <span className={cls.paymentInfoMobileComment}>
              {cargo?.request
                ? t("Запросить")
                : cargo?.no_haggling
                ? t("Без торг")
                : t("Возможен торг")}
            </span>
          </div>
          {status === "new" && (
            <Box
              display="flex"
              width={isLargerThan768 ? "570px" : "100%"}
              columnGap="12px"
              mt="32px"
            >
              <Button
                fontSize={isLargerThan768 ? "16px" : "12px"}
                fontWeight={isLargerThan768 ? 600 : 500}
                variant="outlineError"
                bgColor="rgba(254, 228, 226, 1)"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel(cargo?.guid);
                }}
              >
                {t("Отказать")}
              </Button>
              <Button
                fontSize={isLargerThan768 ? "16px" : "12px"}
                fontWeight={isLargerThan768 ? 600 : 500}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAccept(cargo?.guid, cargo?.users_id_2);
                }}
              >
                {t("Принять")}
              </Button>
            </Box>
          )}
          <div className={cls.cardBottom}>
            {(status === "active" ||
              status === "in_active" ||
              status === "in_moderation") && (
              <Flex
                width={"400px"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={3}
              >
                <LoadBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    const query = new URLSearchParams({
                      from: JSON.stringify({
                        value: cargo?.city_id_data?.guid,
                        label: cargo?.city_id_data?.name,
                        guid: cargo?.city_id_data?.guid,
                      }),
                      to: JSON.stringify({
                        value: cargo?.city_id_2_data?.guid,
                        label: cargo?.city_id_2_data?.name,
                        guid: cargo?.city_id_2_data?.guid,
                      }),
                      date: cargo?.load_time,
                      weight: cargo?.weight,
                      volume: cargo?.volume_m3,
                    });
                    router.push(`/${locale}/search-car?` + query.toString());
                  }}
                  icon={<TruckIcon />}
                >
                  {t("Поиск машин")}
                </LoadBtn>
                <LoadBtn icon={<PencilIcon />}>{t("Изменить")}</LoadBtn>
              </Flex>
            )}
            {status === "in_moderation" && (
              <LoadBtn
                icon={<DeleteIcon color="#F04438" />}
                type="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeletePopupOpen(true);
                }}
              >
                {t("Удалить")}
              </LoadBtn>
            )}
          </div>
          {status === "archive" && (
            <div className={cls.cardBottom}>
              <Button
                onClick={handleOpenEstimateModal}
                size="sm"
                variant="secondary"
                width="278px"
                color="#000000"
              >
                {t("Оценить водителя")}
              </Button>
            </div>
          )}
          <ModalS
            isOpen={isEstimateModalOpen}
            onClose={handleCloseEstimateModal}
            secondBtnCallback={handleSubmit(onSubmit)}
            title={t("Оцените водителя")}
            secondBtnText={t("Готово")}
            size="lg"
            width="644px"
            oneBtn
            withCloseBtn
          >
            <Rating
              className={cls.rating}
              width="56"
              height="56"
              onClick={handleClickRating}
              value={ratingValue}
            />
            <Heading mb="24px" size="sm">
              {t("Что вам понравилось больше всего?")}
            </Heading>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py="18px"
              borderBottom="1px solid #EAECF0"
            >
              <span className={cls.text}>{t("Хороший водитель")}</span>
              <Checkbox
                filled
                width={"24px"}
                height={"24px"}
                iconSize={"16px"}
                name="driver_1"
                register={register}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py="18px"
              borderBottom="1px solid #EAECF0"
            >
              <span className={cls.text}>{t("Вовремя получил груз")}</span>
              <Checkbox
                filled
                width={"24px"}
                height={"24px"}
                iconSize={"16px"}
                name="driver_2"
                register={register}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py="18px"
              borderBottom="1px solid #EAECF0"
            >
              <span className={cls.text}>{t("Вежливый")}</span>
              <Checkbox
                filled
                width={"24px"}
                height={"24px"}
                iconSize={"16px"}
                name="driver_3"
                register={register}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py="18px"
              borderBottom="1px solid #EAECF0"
            >
              <span className={cls.text}>{t("Не доставили груз вовремя")}</span>
              <Checkbox
                filled
                width={"24px"}
                height={"24px"}
                iconSize={"16px"}
                name="driver_4"
                register={register}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py="18px"
              borderBottom="1px solid #EAECF0"
            >
              <span className={cls.text}>{t("Не дисциплинированый")}</span>
              <Checkbox
                filled
                width={"24px"}
                height={"24px"}
                iconSize={"16px"}
                name="driver_5"
                register={register}
              />
            </Box>
            <Box mt="24px">
              <span className={cls.text}>{t("Комментарий")}</span>
              <CustomTextarea
                register={register}
                name="rewiv"
                className={cls.textarea}
                value={watch("rewiv")}
                watch={watch}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 1000) {
                    setValue("rewiv", value.replace(/\d/g, ""));
                  }
                }}
              />
            </Box>
          </ModalS>
          <Popup
            isOpen={isDeletePopupOpen}
            onClose={() => setIsDeletePopupOpen(false)}
            mainText={t("Вы уверены что хотите удалить груз ?", {
              name: cargo?.short_name,
            })}
            status="delete"
            btn2Callback={() => onDeleteAccept(cargo?.guid)}
          />
        </div> */}
        {/* <span className={clsx(cls.addressStatusMobile, cls[status])}>
          {statuses[status]}hey
        </span> */}
        <Popup
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          mainText={t("Вы уверены что хотите удалить груз ?", {
            name: cargo?.short_name,
          })}
          status="delete"
          btn2Callback={() => onDeleteAccept(cargo?.guid)}
        />
      </>
    );
  }
);
