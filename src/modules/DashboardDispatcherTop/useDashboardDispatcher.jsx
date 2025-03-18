import { EditIconTable } from "@/assets/icons/icons";
import {
  useDeleteDis,
  useDispatcherFirms,
  useDispatcherFirmsEdit,
  useGetExcelPost,
  useGetFirmInfo,
  useGetNewPredData,
  useGetOffer,
  useGetOfferDispatcher,
  useGetOfferDispatcherFirms,
  useGetUserCargo2,
  useGetUserData,
  useGetVehicle2,
  useLogistikaGpsTrackingFilterDriverPred,
} from "@/services/api";
import { Box, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
import cls from "./style.module.scss";

import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import authStore from "@/store/auth.store";

export const useDashboardDispatcher = (locale) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { control, register, setValue, errors, watch } = useForm();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [date2, setDate2] = useState([]);
  const [status, setStatus] = useState(0);
  const [date, setDate] = useState(``);
  const [data, setData] = useState({});
  const [firmId, setFirmId] = useState(``);
  const [load, setLoad] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatcher_type = authStore?.userData?.dispatcher_type;

  const filter = {
    [`0`]: `dispatcher`,
    [`1`]: `driver`,
    [`2`]: `ekspiditor`,
    [`3`]: `truck`,
    [`4`]: `cargo`,
  };

  const { data: firmData } = useGetFirmInfo(firmId?.firm_data?.guid, {
    enabled: Boolean(firmId?.firm_data?.guid),
  });

  const { mutate: filterData, isLoading: filterDataLoadin } =
    useLogistikaGpsTrackingFilterDriverPred({
      onSuccess: (res) => {
        setData(res);
        setCurrentPage(1);
      },
    });

  const formatDate = (date, hours, minutes, seconds) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, seconds, 0);
    return newDate;
  };

  const getWeekRange = () => {
    setStartDate(``);
    setEndDate(``);
    const today = new Date();
    const dayOfWeek = today.getUTCDay(); // Yakshanba=0, Dushanba=1, ..., Shanba=6
    const weekStart = new Date(today);
    weekStart.setUTCDate(
      today.getUTCDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );
    weekStart.setUTCHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
    weekEnd.setUTCHours(23, 59, 59, 999);
    setDate2([weekStart, weekEnd]);
  };

  const getMonthRange = () => {
    setStartDate(``);
    setEndDate(``);
    const today = new Date();
    const monthStart = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1, 0, 0, 0)
    );
    const nextMonth = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth() + 1,
      0
    );
    const monthEnd = new Date(
      Date.UTC(
        nextMonth.getUTCFullYear(),
        nextMonth.getUTCMonth(),
        nextMonth.getUTCDate(),
        23,
        59,
        59
      )
    );

    setDate2([monthStart, monthEnd]);
  };

  useEffect(() => {
    if (date === "weekly") {
      getWeekRange();
    } else if (date === "monthly") {
      getMonthRange();
    } else if (date === "clear") {
      setDate2([]);
      setEndDate(``);
      setStartDate(``);
      setCurrentPage(1);
    }
  }, [date, endDate, startDate]);

  useEffect(() => {
    setLoad(false);
    filterData({
      data: {
        object_data: {
          dispatcher_id: authStore.userData?.guid,

          filter:
            dispatcher_type?.[0] === `first_dispatcher`
              ? `dispatcher`
              : `top_dispatcher`,
          start_date:
            date2.length > 0
              ? date2[0]
              : startDate
              ? startDate?.getDate() === endDate?.getDate()
                ? formatDate(startDate, 0, 0, 0)
                : new Date(startDate)
              : ``,
          end_date:
            date2.length > 0
              ? date2[1]
              : endDate
              ? startDate?.getDate() === endDate?.getDate()
                ? formatDate(endDate, 23, 59, 59)
                : new Date(endDate)
              : ``,
          all_date:
            startDate || endDate ? false : date2.length > 0 ? false : true,
          type: "dashboard",
          limit: 1000,
          page: 1,
        },
      },
    });
  }, [startDate, endDate, status, date2, load]);

  const { data: useList } = useGetOfferDispatcher({
    data: JSON.stringify({
      users_id_2: authStore?.userData?.guid,
    }),
  });

  const { data: useListDis } = useGetUserData({
    params: {
      data: JSON.stringify({
        client_type_id: "2ae57983-f68f-487a-b76c-c7166c35dbba",
      }),
    },
    querySettings: {
      select: (res) =>
        res?.response?.map((item) => ({
          label: item?.full_name,
          value: item?.guid,
        })),
    },
  });

  const { data: useExsList } = useGetOfferDispatcherFirms({
    data: JSON.stringify({
      users_id: authStore?.userData?.guid,
    }),
  });

  const {
    data: useCargo,
    isLoading,
    isFetching,
  } = useGetUserCargo2({
    params: {
      data: JSON.stringify({
        order_status: ["active"],
        cargo_type: ["cargo"],
      }),
    },
  });

  const { mutate } = useDispatcherFirms({
    onSuccess: () => {
      setLoad(true);
    },
  });

  const { mutate: editDis } = useDispatcherFirmsEdit({
    onSuccess: () => {
      setLoad(true);
    },
  });

  const dispatchAdd = (row, e) => {
    if (row.dispatcher_and_firms_data_details?.guid) {
      editDis({
        data: {
          firm_id: row?.firm_data?.guid,
          users_id: e.value,
          guid: row?.dispatcher_and_firms_data?.guid,
        },
      });
    } else {
      mutate({
        data: {
          firm_id: row?.firm_data?.guid,
          users_id: e.value,
        },
      });
    }
  };

  const { mutate: dalete } = useDeleteDis({
    onSuccess: () => {
      setLoad(true);
    },
  });

  const clearFn = (row, e) => {
    const data = {
      id: row?.dispatcher_and_firms_data?.guid,
    };
    dalete(data);
    setValue(e, {});
  };

  const downloadByLanguage = async (url) => {
    try {
      const link = document.createElement("a");
      const res = `https://pub-be0226dfadb94399a1ec5722d30b655b.r2.dev/${url}`;
      link.href = res;
      link.target = "_blank";
      link.download = `Груз`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log(2);
    }
  };

  const getExcelFile = useGetExcelPost({
    onSuccess: (res) => {
      downloadByLanguage(res?.url);
    },
  });

  const getExcelFileFn = () => {
    getExcelFile.mutate({
      data: {
        object_data: {
          filter: ``,
          start_date:
            date2.length > 0
              ? date2[0]
              : startDate
              ? startDate?.getDate() === endDate?.getDate()
                ? formatDate(startDate, 0, 0, 0)
                : new Date(startDate)
              : ``,
          end_date:
            date2.length > 0
              ? date2[1]
              : endDate
              ? startDate?.getDate() === endDate?.getDate()
                ? formatDate(endDate, 23, 59, 59)
                : new Date(endDate)
              : ``,
          all_date:
            startDate || endDate ? false : date2.length > 0 ? false : true,
          type: "analitik",
        },
      },
    });
  };

  const editFn = (row) => {
    router.push(
      `/${locale}/tin-create?id=${row?.your_id}&guid=${row?.firm_data?.guid}&isEdit=false`
    );
  };

  const { data: archive } = useGetOffer({
    data: JSON.stringify({
      users_id_3: authStore?.userData?.guid,
      with_relations: true,
      provisions: [`archive`],
    }),
  });

  const { data: newData } = useGetOffer({
    data: JSON.stringify({
      provisions: [`new`],
      users_id_3: authStore?.userData?.id,
    }),
  });

  const { data: bzData } = useGetNewPredData({
    data: {
      data: {
        object_data: {
          dispetchir_id: ``,
          provisions: [`new`],
        },
      },
    },
  });

  const { data: perfomed } = useGetOffer({
    data: JSON.stringify({
      users_id_3: authStore?.userData?.guid,
      with_relations: true,
      provisions: ["performed"],
    }),
  });
  const newCount =
    newData?.response?.filter(
      (item) =>
        item.provisions.includes("new") &&
        item.provisions.includes("approve_from_driver")
    )?.length +
    newData?.response?.filter(
      (item) =>
        item.provisions.includes("new") &&
        item.provisions.includes("approve_by_customer")
    )?.length;

  const topStatis = [
    {
      id: 1,
      total: data?.driver_count?.[0]?.total_count || 0,
      deck: `Общее кол-во водителей`,
      bg: `rgba(0, 51, 153, 1)`,
      color: `rgba(0, 51, 153, 0.3)`,
    },
    {
      id: 2,
      total: data?.eks_count?.[0]?.total_count || 0,
      deck: `Общее кол-во перевозчиков`,
      bg: `rgba(21, 186, 77, 1)`,
      color: `rgba(21, 186, 77, 0.3)`,
    },
    {
      id: 3,
      total: data?.drivers_unit_count?.[0]?.total_count || 0,
      deck: `Общее кол-во транспортных средств `,
      bg: `rgba(0, 122, 255, 1)`,
      color: `rgba(0, 122, 255, 0.3)`,
    },
    {
      id: 4,
      total:
        useCargo?.response?.reduce(
          (sum, item) => sum + item?.accepted_offers,
          0
        ) || 0,
      deck: `Общее кол-во активных грузов`,
      bg: `rgba(193, 187, 32, 1)`,
      color: `rgba(193, 187, 32, 0.3)`,
    },
  ];

  const topStatis2 = [
    {
      id: 1,
      total: data?.new?.[0]?.total_count || 0,
      deck: `Общее кол-во предложений `,
      bg: `rgba(142, 170, 219, 1)`,
      color: `rgba(142, 170, 219, 0.3)`,
    },
    {
      id: 2,
      total:data?.free?.[0]?.total_count || 0,
      deck: `Общее кол-во предложений без диспетчеров`,
      bg: `rgba(165, 165, 165, 1)`,
      color: `rgba(165, 165, 165, 0.3)`,
    },
    {
      id: 3,
      total: data?.performed?.[0]?.total_count || 0,
      deck: `Общее кол-во в исполнении`,
      bg: `rgba(255, 192, 0, 1)`,
      color: `rgba(255, 192, 0, 0.3)`,
    },
    {
      id: 4,
      total: data?.archive?.[0]?.total_count || 0,
      deck: `Общее кол-во завершённых`,
      bg: `rgba(146, 208, 80, 1)`,
      color: `rgba(146, 208, 80, 1)`,
    },
  ];

  const chartData = {
    labels: [
      `Водитель (${data?.driver_count?.[0]?.total_count || 0})`,
      `Перевозчик (${data?.eks_count?.[0]?.total_count || 0})`,
      `Транспорт (${data?.drivers_unit_count?.[0]?.total_count || 0})`,
      `Груз (${data?.cargo_count?.[0]?.total_accepted_offers || 0})`,
      `Предложений (${
        (data?.new?.[0]?.total_count || 0) - (data?.free?.[0]?.total_count || 0)
      })`,
      `Предложений б-д (${data?.free?.[0]?.total_count || 0})`,
      `В исполнении (${data?.performed?.[0]?.total_count || 0})`,
      `Завершённых (${data?.archive?.[0]?.total_count || 0})`,
    ],
    datasets: [
      {
        label: "",
        data: [
          data?.driver_count?.[0]?.total_count || 0,
          data?.eks_count?.[0]?.total_count || 0,
          data?.drivers_unit_count?.[0]?.total_count || 0,
          data?.cargo_count?.[0]?.total_accepted_offers || 0,
          (data?.new?.[0]?.total_count || 0) -
            (data?.free?.[0]?.total_count || 0),
          data?.free?.[0]?.total_count || 0,
          data?.performed?.[0]?.total_count || 0,
          data?.archive?.[0]?.total_count || 0,
        ],
        borderColor: "transparent",
        backgroundColor: [
          "rgba(0, 51, 153, 1)",
          "rgba(21, 186, 77, 1)",
          "rgba(0, 122, 255, 1)",
          "rgba(193, 187, 32, 1)",
          "rgba(142, 170, 219, 1)",
          "rgba(165, 165, 165, 1)",
          "rgba(255, 192, 0, 1)",
          "rgba(146, 208, 80, 1)",
        ],
        barPercentage: 0.4,
        categoryPercentage: 0.4,
      },
    ],
  };

  const colorArea = {
    id: "colorArea",
    beforeDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const { top, left, width, height } = chart.chartArea;
      ctx.save();
      ctx.fillStyle = "rgb(245, 245, 245)";
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    },
  };

  const options = {
    maintainAspectRatio: false,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0,
        borderRadius: 10,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Horizontal Bar Chart",
      },
      datasets: {
        display: false,
      },
      colorArea,
    },
    scales: {
      x: {
        ticks: {
          color: "#222", // Label color
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: "#222",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return {
    topStatis,
    topStatis2,
    chartData,
    options,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    data,
    setStatus,
    isLoading,
    filterDataLoadin: filterDataLoadin,
    date,
    setDate,
    setDate2,
    setCurrentPage,
    currentPage,
    getExcelFileFn,
    isLoadingExe: getExcelFile.isLoading,
    firmData: firmData?.response,
    isOpen,
    onOpen,
    onClose,
    firmId,
    editFn,
  };
};
