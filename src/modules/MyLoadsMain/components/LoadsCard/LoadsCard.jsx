import clsx from "clsx";
import cls from "./styles.module.scss";
import { DeleteIcon, PencilIcon, TruckIcon } from "@/assets/icons/icons";
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

export const LoadsCard = forwardRef(({cargo,orderStatus,handleDelete,handleAccept,handleCancel,isLargerThan768},ref) => {
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
    <div>
      <div
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
                      cargo?.from?.length > 10 ? (
                        <Tooltip
                          color={`black`}
                          boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                          background={`#fff`}
                          label={`${cargo?.from}`}
                        >
                          <span>{`${cargo?.from.slice(0, 10)}...`}</span>
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
                      cargo?.to?.length > 10 ? (
                        <Tooltip
                          color={`black`}
                          boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
                          background={`#fff`}
                          label={`${cargo?.to}`}
                        >
                          <span>{`${cargo?.to.slice(0, 10)}...`}</span>
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
                {/* {address_id_data?.name} -&gt; {address_id_2_data?.name} */}
              </span>
              <span className={clsx(cls.addressStatus, cls[status])}>
                {statuses[status]}{" "}
                {cancelBy[cargo?.who_cancellation?.[0]]}
              </span>
            </h2>
            <span className={cls.distance}>
              {cargo?.number_of_order}
            </span>
          </div>
          <div className={cls.paymentInfo}>
            <div className={cls.paymentInfoContent}>
              <span className={cls.paymentInfoText}>
                {formatSum(
                  cargo?.currency_id_data?.code,
                  cargo?.bid_cash
                )}
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
              {formatSum(
                cargo?.currency_id_data?.code,
                cargo?.bid_cash
              )}
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
               handleAccept(
                  cargo?.guid,
                  cargo?.users_id_2
                );
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
      </div>
      <span className={clsx(cls.addressStatusMobile, cls[status])}>
        {statuses[status]}hey
      </span>
    </div>
  );
});
