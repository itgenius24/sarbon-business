import { Rating } from "@/components/Rating";
import { useCreateFeedback } from "@/services/api";
import authStore from "@/store/auth.store";
import { formatDate } from "@/utils/formatDate";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { formatSum } from "@/utils/formatSum";

export const useLoadsCardProps = ({
  order_status,
  provisions,
  response_status,
  orderStatus,
  cargo_type_id_data,
  load_around_the_clock,
  take_all_unloads,
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
  cargo //cargoda yuk nomi user ismlari bor
}) => {
  console.log("cargo_type_id_data",cargo);

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const toast = useToast();

  const responseStatuses = {
    "": order_status,
    in_moderation: order_status,
    new: provisions,
    performed: provisions,
    cancellation: provisions,
    archive: provisions,
    approve_from_driver: response_status,
    approve_by_customer: response_status
  };

  const performedStatuses = {
    no_status: t("нет статуса"),
    go_to_load: t("иду на загрузку"),
    wait_for_the_download: t("жду загрузку"),
    loading: t("загружаюсь"),
    go_to_unload: t("иду на разгрузку"),
    unloading: t("разгружаюсь"),
    unloaded: t("разгрузился"),
    complete_the_order: t("завершить заказ"),
    breaking: t("Поломка"),
    road_accident: t("ДТП"),
    in_active: t("неактивен"),
  };

  const status = responseStatuses[orderStatus]?.[0] || responseStatuses["in_moderation"]?.[0];


  const router = useRouter();

  const list = [
    {
      title: status === "performed" ? t("Статус: ") : t("Расстояние: "),
      value: status === "performed" ? performedStatuses[indicate_status[0]] : `${distance} км`,
    },
    {
      title: t("Товар: "),
      value: cargo_type_id_data?.name,
    },
    {
      title: t("Вид: "),
      value: load_around_the_clock
        ? t("отдельной машиной или догрузом (FTL или LTL)")
        : take_all_unloads
          ? t("отдельной машиной (FTL)")
          : "",
    },
    {
      title: t("Время: "),
      value: formatDate(load_time, "dd.MM.yyyy"),
    },
  ];

  const newStatusList = [
    {
      title: t("Водитель: "),
      value: users_id_2_data?.full_name || t("не указан"),
    },
    {
      title: t("Модель транспорта: "),
      value: short_name || t("не указан"),
    },
    {
      title: t("Предлагаемая сумма: "),
      value: formatSum(currency_id_2_data?.code, driver_cash),
    },
    {
      title: t("Мобильный телефон: "),
      value: cargo?.users_id_2_data?.phone ,
    },
  ];

  const { register, handleSubmit, setValue, watch, } = useForm();

  const createFeedback = useCreateFeedback({
    onSuccess() {
      toast({
        title: t("Ваш отзыв отправлен"),
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      handleCloseEstimateModal();
    }
  });

  function onSubmit(data) {
    const reviewStatus = Object.keys(data).filter(key => key.includes("driver_"));

    createFeedback.mutate({
      data: {
        company_id: null,
        grade: ratingValue,
        rewiv: data.rewiv,
        users_id: users_id_2,
        review_status: reviewStatus.filter(key => data[key]),
        users_id_2: authStore.userData.id,
        status: [
          "client"
        ]
      }
    });
  }

  function handleOpenEstimateModal(e) {
    e.stopPropagation();
    setIsEstimateModalOpen(true);
  }

  function handleCloseEstimateModal() {
    setIsEstimateModalOpen(false);
  }

  function handleClickRating(value) {
    setRatingValue(value);
  }

  function onDeleteAccept(id) {
    handleDelete(id);
    setIsDeletePopupOpen(false);
  }

  return {
    list,
    newStatusList,
    router,
    status,
    handleOpenEstimateModal,
    handleCloseEstimateModal,
    isEstimateModalOpen,
    ratingValue,
    handleClickRating,
    handleSubmit,
    onSubmit,
    register,
    t,
    locale,
    setValue,
    watch,
    isDeletePopupOpen,
    setIsDeletePopupOpen,
    onDeleteAccept,
  };

};
