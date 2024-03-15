import clsx from "clsx";
import cls from "./styles.module.scss";
import { DeleteIcon, TruckIcon } from "@/assets/icons/icons";
import { LoadBtn } from "@/components/LoadBtn";
import { DataList } from "@/components/DataList";
import { Box, Button } from "@chakra-ui/react";
import { statuses } from "@/utils/constants";
import { formatSum } from "@/utils/formatSum";
import { useLoadsCardProps } from "./useLoadsCardProps";

export const LoadsCard = ({
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
}) => {

  const {
    list,
    router,
    isReversed,
    status
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
  });

  return <div className={clsx(cls.loadsCard, { [cls.rejected]: status === "rejected" })} onClick={() => router.push(`/my-loads/${status}/${guid}`)}>
    <div className={cls.cardTop}>
      <div className={cls.cardTopContent}>
        <h2 className={cls.address}>
          <span className={cls.addressText}>{isReversed ? address_id_data?.name : address_id_2_data?.name} -&gt; {isReversed ? address_id_2_data?.name : address_id_data?.name}</span>
          <span className={clsx(cls.addressStatus, cls[status])}>{statuses[status]}</span>
        </h2>
        <span className={cls.distance}>724 км</span>
      </div>
      <div className={cls.paymentInfo}>
        <div className={cls.paymentInfoContent}>
          <span className={cls.paymentInfoText}>
            {formatSum.format(bid_cash)} UZS
          </span>
          <span className={cls.paymentInfoSubText}>(до 30 тыс. UZS/км)</span>
        </div>
        <span className={cls.paymentInfoComment}>Возможен торг</span>
      </div>
    </div>
    <Box borderBottom="1px solid" borderColor="brand.200">
      <DataList list={list} />
      {
        status === "rejected" && <p className={cls.moderatorComment}>
          <span className={cls.moderatorCommentTitle}>Причина отказа модерации:</span>
          <span className={cls.moderatorCommentText} dangerouslySetInnerHTML={{ __html: moderator_comment }} />
        </p>
      }
    </Box>
    {
      status === "new" && <Box display="flex" width="570px" columnGap="12px" mt="32px">
        <Button
          variant="outlineError"
          bgColor="rgba(254, 228, 226, 1)"
          onClick={(e) => {
            e.stopPropagation();
            handleCancel(guid);
          }}
        >
          Отказать
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAccept(guid, users_id_2);
          }}
        >
          Принять
        </Button>
      </Box>
    }
    {
      status === "in_moderation" && <div className={cls.cardBottom}>
        <LoadBtn
          icon={<DeleteIcon color="#F04438" />}
          type="delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(guid);
          }}
        >
          Удалить
        </LoadBtn>
        <LoadBtn
          onClick={(e) => {
            e.stopPropagation();
            const query = new URLSearchParams({
              from: JSON.stringify({
                value: address_id_data?.guid,
                label: address_id_data?.name
              }),
              to: JSON.stringify({
                value: address_id_2_data?.guid,
                label: address_id_2_data?.name
              }),
              date: load_time,
              weight: weight,
              volume: volume_m3,
            });
            router.push("/search-car?" + query.toString());
          }}
          icon={<TruckIcon />}
        >
          Поиск машин
        </LoadBtn>
      </div>
    }
  </div>;
};
