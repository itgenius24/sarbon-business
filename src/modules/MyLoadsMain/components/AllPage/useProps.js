import {
  useCreateActionHistoriesMutation,
  useDeleteCargo,
  useGetOffer,
  useGetUserCargo,
  useGetUserCargoAll,
  useGetUserCargoPa,
} from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useProps = (orderStatus, t, search, address) => {
  const toast = useToast();
  const role_id = authStore.userData.role_id;
  const userId = authStore.userData.id;
  const [limit, setLimit] = useState(0);

  const [data, setData] = useState([]);
  const getAllUserCargo = useGetUserCargoAll({
    data: {
      data: {
        row_view_id: "5e8b88e5-5621-4761-8816-904e92ef1ec0",
        offset: limit,
        order: {},
        view_fields: [
          "package_quantity",
          "number_of_cars",
          "number_of_order",
          "straps_number",
          "bid_amount",
          "conditions",
          "comment",
          "driver_comment",
          "short_name",
          "phone",
          "moderator_comment",
          "duration",
          "width",
          "template_name",
          "location_name",
          "accepted_offers",
          "address_name",
          "flag_ot",
          "flag_do",
          "country_code_from",
          "country_code_to",
          "from",
          "to",
          "car_type",
          "product_type",
          "payment_description",
          "payment_type",
          "country_from",
          "country_to",
        ],
        search: search.length > 0 ? search : ``,
        limit: search.length  > 0 ? 1000 : 100,
        users_id: ["b1ce9e78-273d-4591-af58-1912c8cba680"],
        cargo_type: ["cargo"],
      },
    },
    querySettings: {
      enabled: Boolean(orderStatus === `` || address),
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        {
          const resData = res?.response || [];

          if (search.length > 0) {
            // Qidiruv bo'lsa, faqat yangi datani chiqaramiz
            setData(resData || []);
          } else if (!address) {
            // Pagination: Agar offset 0 bo‘lsa (birinchi sahifa), data tozalanadi
            setData((prevData) =>
              limit === 0 ? resData : [...prevData, ...resData]
            );
          } else {
            // Agar boshqa holatlar bo‘lsa, data almashtiriladi
            setData(resData || []);
          }
        }
      },
    },
  });

  const { mutate: actionCreate } = useCreateActionHistoriesMutation();

  const addPage = () => {
    setLimit((prev) => prev + 100);
  };

  const deleteCargo = useDeleteCargo({
    onSuccess() {
      setData([]);
      getAllUserCargo.refetch();
      toast({
        position: "top-right",
        title: "Груз успешно удален",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError(res) {
      console.error(res);
    },
  });

  const handleDelete = (id) => {
    console.log(`ids`, id);
    deleteCargo.mutate({ id: id?.guid });
    actionCreate({
      data: {
        user_name: authStore.userData.full_name,
        phone_number: authStore.userData?.phone,
        user_id: authStore.userData.guid,
        increment_id: id?.number_of_order,
        action_time: new Date(),
        role_slug: `customer`,
        action_comment: `delete_cargo`,
        role_id: authStore.userData?.role_id,
        action_type: [`update`],
      },
    });
  };

  // console.log(`filter`,data?.filter(item => item?.order_status?.[0] === `active`))

  return {
    cargoData: data,
    isLoading: getAllUserCargo?.isLoading,
    isFetching: getAllUserCargo?.isFetching,
    addPage,
    handleDelete,
  };
};

export default useProps;
