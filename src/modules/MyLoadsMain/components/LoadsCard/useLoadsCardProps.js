import { Rating } from "@/components/Rating";
import { useCreateFeedback } from "@/services/api";
import authStore from "@/store/auth.store";
import { formatDate } from "@/utils/formatDate";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
}) => {

  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);

  const toast = useToast();

  const responseStatuses = {
    in_moderation: order_status,
    new: provisions,
    performed: provisions,
    cancellation: provisions,
    archive: provisions,
    approve_from_driver: response_status,
    approve_by_customer: response_status
  };

  const performedStatuses = {
    no_status: "нет статуса",
    go_to_load: "иду на загрузку",
    wait_for_the_download: "жду загрузку",
    loading: "загружаюсь",
    go_to_unload: "иду на разгрузку",
    unloading: "разгружаюсь",
    unloaded: "разгрузился",
    complete_the_order: "завершить заказ",
    breaking: "Поломка",
    road_accident: "ДТП"
  };

  const status = responseStatuses[orderStatus]?.[0] || responseStatuses["in_moderation"]?.[0];

  const router = useRouter();

  const list = [
    {
      title: status === "performed" ? "Статус: " : "Расстояние: ",
      value: status === "performed" ? performedStatuses[indicate_status[0]] : "570 км",
    },
    {
      title: "Товар: ",
      value: cargo_type_id_data?.name,
    },
    {
      title: "Вид: ",
      value: load_around_the_clock
        ? "отдельной машиной или догрузом (FTL или LTL)"
        : take_all_unloads
          ? "отдельной машиной (FTL)"
          : "",
    },
    {
      title: "Время: ",
      value: formatDate(load_time, "dd.MM.yyyy"),
    },
  ];

  const newStatusList = [
    {
      title: "Водитель: ",
      value: users_id_2_data?.full_name || "не указан",
    },
    {
      title: "Модель транспорта: ",
      value: short_name || "не указан",
    },
    {
      title: "Предлагаемая сумма: ",
      value: driver_cash,
    },
    {
      title: "Рейтинг водителя: ",
      value: <Rating title={users_id_2_data?.rating} value={users_id_2_data?.rating} />,
    },
  ];

  const { register, handleSubmit } = useForm();

  const createFeedback = useCreateFeedback({
    onSuccess() {
      toast({
        title: "Ваш отзыв отправлен",
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
    register
  };

};
