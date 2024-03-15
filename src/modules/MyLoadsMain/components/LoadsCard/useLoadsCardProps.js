import { formatDate } from "@/utils/isValidDate";
import { useRouter } from "next/navigation";

export const useLoadsCardProps = ({
  order_status,
  provisions,
  response_status,
  orderStatus,
  cargo_type_id_data,
  load_around_the_clock,
  take_all_unloads,
  date,
  load_time,
  indicate_status
}) => {

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

  const isReversed = orderStatus === "" || orderStatus === "in_moderation";

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

  return {
    list,
    router,
    isReversed,
    status
  };

};
