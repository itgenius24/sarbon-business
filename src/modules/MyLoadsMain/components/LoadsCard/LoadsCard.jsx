import clsx from "clsx";
import cls from "./styles.module.scss";
import { DeleteIcon, PencilIcon, TruckIcon } from "@/assets/icons/icons";
import { LoadBtn } from "@/components/LoadBtn";
import { DataList } from "@/components/DataList";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { cancelBy, statuses } from "@/utils/constants";
import { formatSum } from "@/utils/formatSum";
import { useLoadsCardProps } from "./useLoadsCardProps";
import { Modal } from "@/components/Modal";
import { Rating } from "@/components/Rating";
import { CustomTextarea } from "@/components/CustomTextarea";
import { Checkbox } from "@/components/Checkbox";
import { forwardRef } from "react";
import { Popup } from "@/components/Popup";

export const LoadsCard = forwardRef(
  (
    {
      guid,
      address_id_data,
      address_id_2_data,
      bid_cash,
      cargo_type_id_data,
      load_time,
      load_around_the_clock,
      take_all_unloads,
      order_status,
      date,
      provisions,
      handleDelete,
      response_status,
      orderStatus,
      weight,
      volume_m3,
      handleCancel,
      handleAccept,
      moderator_comment,
      indicate_status,
      users_id_2,
      users_id_2_data,
      currency_id_data,
      currency_id_2_data,
      request,
      no_haggling,
      driver_cash,
      short_name,
      city_id_data,
      city_id_2_data,
      distance,
      number_of_order,
      isLargerThan768,
      who_cancellation,
      cargo,
    },
    ref,
   
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
      order_status,
      provisions,
      response_status,
      orderStatus,
      cargo_type_id_data,
      load_around_the_clock,
      take_all_unloads,
      date,
      load_time,
      indicate_status,
      users_id_2,
      users_id_2_data,
      driver_cash,
      short_name,
      distance,
      currency_id_data,
      currency_id_2_data,
      handleDelete,
      cargo
    });

    console.log("cargo",cargo);
    return (
      <div>
        <div
          ref={ref}
          className={clsx(cls.loadsCard, {
            [cls.rejected]: status === "rejected",
          })}
          onClick={() => router.push(`/${locale}/my-loads/${status}/${guid}`)}
        >
          <a
            className={clsx(cls.stretchedLink, {
              [cls.isShow]: status === "performed",
            })}
            href={`/${locale}/my-loads/${status}/${guid}`}
          ></a>
          <div className={cls.cardTop}>
            <div className={cls.cardTopContent}>
              <h2 className={cls.address}>
                <span className={cls.addressText}>
                  <span className={cls.addressCountry}>
                    <span className={cls.addressCity}>
                      {
                        city_id_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ]
                      }
                    </span>
                    <span>
                      {
                        address_id_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ]
                      }
                    </span>
                  </span>
                  <span>-&gt;</span>
                  <span className={cls.addressCountry}>
                    <span className={cls.addressCity}>
                      {
                        city_id_2_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ]
                      }
                    </span>
                    {
                      console.log(`address_id_2_data`,address_id_2_data)
                    }<span>

                      {
                        address_id_2_data?.[
                          "name_" + (locale === "uz" ? "en" : "ru")
                        ]
                      }
                    </span>
                  </span>
                  {/* {address_id_data?.name} -&gt; {address_id_2_data?.name} */}
                </span>
                <span className={clsx(cls.addressStatus, cls[status])}>
                  {statuses[status]} {cancelBy[who_cancellation?.[0]]}
                </span>
              </h2>
              <span className={cls.distance}>{number_of_order}</span>
            </div>
            <div className={cls.paymentInfo}>
              <div className={cls.paymentInfoContent}>
                <span className={cls.paymentInfoText}>
                  {formatSum(currency_id_data?.code, bid_cash)}
                </span>
              </div>
              <span className={cls.paymentInfoComment}>
                {request
                  ? t("Запросить")
                  : no_haggling
                  ? t("Без торг")
                  : t("Возможен торг")}
              </span>
            </div>
          </div>
          <Box borderBottom="1px solid" borderColor="brand.200">
            <DataList status={status} list={status === "new" ? newStatusList : list} />
            {status === "rejected" && (
              <p className={cls.moderatorComment}>
                <span className={cls.moderatorCommentTitle}>
                  {t("Причина отказа модерации:")}
                </span>
                <span
                  className={cls.moderatorCommentText}
                  dangerouslySetInnerHTML={{ __html: moderator_comment }}
                />
              </p>
            )}
          </Box>
          <div className={cls.paymentInfoMobile}>
            <div className={cls.paymentInfoMobileContent}>
              <span className={cls.paymentInfoMobileText}>
                {formatSum(currency_id_data?.code, bid_cash)}
              </span>
            </div>
            <span className={cls.paymentInfoMobileComment}>
              {request
                ? t("Запросить")
                : no_haggling
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
                  handleCancel(guid);
                }}
              >
                {t("Отказать")}
              </Button>
              <Button
                fontSize={isLargerThan768 ? "16px" : "12px"}
                fontWeight={isLargerThan768 ? 600 : 500}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAccept(guid, users_id_2);
                }}
              >
                {t("Принять")}
              </Button>
            </Box>
          )}
          <div className={cls.cardBottom}>
            {status === "active" && (
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
                        value: city_id_data?.guid,
                        label: city_id_data?.name,
                        guid: city_id_data?.guid,
                      }),
                      to: JSON.stringify({
                        value: city_id_2_data?.guid,
                        label: city_id_2_data?.name,
                        guid: city_id_2_data?.guid,
                      }),
                      date: load_time,
                      weight: weight,
                      volume: volume_m3,
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
          <Modal
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
          </Modal>
          <Popup
            isOpen={isDeletePopupOpen}
            onClose={() => setIsDeletePopupOpen(false)}
            mainText={t("Вы уверены что хотите удалить груз ?", {
              name: short_name,
            })}
            status="delete"
            btn2Callback={() => onDeleteAccept(guid)}
          />
        </div>
        <span className={clsx(cls.addressStatusMobile, cls[status])}>
          {statuses[status]}hey
        </span>
      </div>
    );
  }
);
