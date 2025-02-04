import {
  useGetExcelPost,
  useGetUserCargo,
  useGetUserCargo2,
  useGetUserData,
  useGetVehicle,
  useGetVehicle2,
  useGetVehicleSingle,
  useLogistikaGpsTrackingFilterDriverPred,
} from "@/services/api";
import { Tooltip } from "@chakra-ui/react";

import { format } from "date-fns";
import { color } from "framer-motion";
import React, { useEffect, useState } from "react";

export const useDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [date2, setDate2] = useState([]);
  const [status, setStatus] = useState(0);
  const [date, setDate] = useState(``);
  const [data, setData] = useState({});
  const filter = {
    [`0`]: `driver`,
    [`1`]: `ekspiditor`,
    [`2`]: `truck`,
    [`3`]: `cargo`,
  };

  const { mutate: filterData, isPending } =
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
    filterData({
      data: {
        object_data: {
          filter: filter[status],
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
  }, [startDate, endDate, status, date2]);

  const { data: useList } = useGetUserData({
    params: {
      data: JSON.stringify({
        client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
      }),
    },
  });

  const { data: useExsList } = useGetUserData({
    params: {
      data: JSON.stringify({
        client_type_id: "a25d605c-d153-4ddf-8590-e4cda176ef93",
      }),
    },
  });

  const { data: useCargo, isLoading } = useGetUserCargo2({
    params: {
      data: JSON.stringify({
        order_status: ["active"],
        cargo_type: ["cargo"],
      }),
    },
  });

  const { data: vehicle } = useGetVehicle2({
    params: {
      data: JSON.stringify({
        car_position: ["alive"],
      }),
    },
  });
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
          filter: filter[status],
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

  const topStatis = [
    {
      id: 1,
      total: useList?.count || 0,
      deck: `Общее количество водителей`,
      bg: `rgba(0, 51, 153, 1)`,
      color: `rgba(0, 51, 153, 0.3)`,
    },
    {
      id: 2,
      total: useExsList?.count || 0,
      deck: `Общее количество перевозчиков`,
      bg: `rgba(21, 186, 77, 1)`,
      color: `rgba(21, 186, 77, 0.3)`,
    },
    {
      id: 3,
      total: vehicle?.count || 0,
      deck: `Общее количество транспортных средств `,
      bg: `rgba(0, 122, 255, 1)`,
      color: `rgba(0, 122, 255, 0.3)`,
    },
    {
      id: 4,
      total: useCargo?.count || 0,
      deck: `Общее количество активных грузов`,
      bg: `rgba(193, 187, 32, 1)`,
      color: `rgba(193, 187, 32, 0.3)`,
    },
  ];

  const chartData = {
    labels: [
      `Водитель (${data?.driver_count?.[0]?.total_count || 0})`,
      `Перевозчик (${data?.eks_count?.[0]?.total_count || 0})`,
      `Транспорт (${data?.truck_count?.[0]?.total_count || 0})`,
      `Груз (${data?.cargo_count?.[0]?.total_accepted_offers || 0})`,
    ],
    datasets: [
      {
        label: "",
        data: [
          data?.driver_count?.[0]?.total_count || 0,
          data?.eks_count?.[0]?.total_count || 0,
          data?.truck_count?.[0]?.total_count || 0,
          data?.cargo_count?.[0]?.total_accepted_offers || 0,
        ],
        borderColor: "transparent",
        backgroundColor: [
          "rgba(0, 51, 153, 1)",
          "rgba(21, 186, 77, 1)",
          "rgba(0, 122, 255, 1)",
          "rgba(193, 187, 32, 1)",
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

  const columns1 = [
    {
      title: `ID`,
      dataIndex: "your_id",

      width: 200,
    },
    {
      title: `Тел Номер`,
      dataIndex: "phone",
      width: 350,
    },
    {
      title: `Перевозчик`,
      dataIndex: "",
      render: (_, row) =>
        row?.full_name || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Перевозчик
          </span>
        ),
      width: 200,
    },
    {
      title: `Дата созд.`,
      dataIndex: "createdAt",
      render: (_, row) => format(row.createdAt, `yyyy-MM-dd`),

      width: 200,
    },
    {
      title: `Роль`,
      dataIndex: "",
      render: (_, row) => `Перевозчик`,

      width: 200,
    },

    {
      title: `Диспетчер`,
      dataIndex: "",
      render: (_, row) =>
        row?.dispatcher_details?.full_name || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Диспетчер
          </span>
        ),
      width: 200,
    },
  ];
  const columns2 = [
    {
      title: `ID`,
      dataIndex: "your_id",
      width: 200,
    },
    {
      title: `Тел Номер`,
      dataIndex: "phone",
      width: 300,
    },
    {
      title: `Водитель`,
      dataIndex: "full_name",
      width: 350,
    },
    {
      title: `Дата созд`,
      dataIndex: "createdAt",
      render: (_, row) => format(row.createdAt, `yyyy-MM-dd`),
      width: 200,
    },
    {
      title: `Роль`,
      dataIndex: "",
      render: (_, row) => `Водитель`,
      width: 200,
    },
    {
      title: `Перевозчик`,
      dataIndex: "photo",
      render: (_, row) =>
        row?.firm_id_data?.[0]?.full_name || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Перевозчик
          </span>
        ),
      width: 200,
    },
    {
      title: `Диспетчер`,
      dataIndex: "",
      render: (_, row) =>
        row?.dispatcher_details?.full_name || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Диспетчер
          </span>
        ),
      width: 200,
    },
  ];
  const columns3 = [
    {
      title: `ID`,
      dataIndex: "unit_id",
      width: 200,
      render:(_,row) => row.unit_id ?   row.unit_id : `Нет ID `
    },
    {
      title: `Гос номер`,
      dataIndex: "car_number",
      width: 300,
    },
    {
      title: `Водитель`,
      dataIndex: "",
      render: (_, row) =>
        row?.driver_data?.full_name || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Водитель
          </span>
        ),

      width: 350,
    },
    {
      title: `Дата созд`,
      dataIndex: "createdAt",
      render: (_, row) => format(row.createdAt, `yyyy-MM-dd`),
      width: 200,
    },
    {
      title: `Статус авто`,
      dataIndex: "car_position",
      render: (_, row) =>
        row?.car_position?.[0] === `alive` ? `активный` : `модерация`,

      width: 200,
    },
    {
      title: `Перевозчик`,
      dataIndex: "photo",
      render: (_, row) =>
        row?.firm_data?.full_name || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Перевозчик
          </span>
        ),
      width: 200,
    },
    {
      title: `Топливо`,
      dataIndex: "photo",
      render: (_, row) =>
        row?.fuel_data?.full || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Топливо
          </span>
        ),

      width: 200,
    },
    {
      title: `эко стандарт`,
      dataIndex: "eco_standart",
      render: (_, row) =>
        row?.eco_standart || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет эко стандарт
          </span>
        ),

      width: 200,
    },
  ];
  const columns4 = [
    {
      title: `Id`,
      dataIndex: "number_of_order",
      width: 200,
    },
    {
      title: `Груз id`,
      dataIndex: "number_of_order",
      width: 200,
    },
    {
      title: `Продажник`,
      dataIndex: "",
      render: (_, row) =>
        row?.customer_data?.full_name || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Продажник
          </span>
        ),
      width: 200,
    },
    {
      title: `Дата созд.`,
      dataIndex: "createdAt",
      render: (_, row) => <p style={{whiteSpace:`nowrap`}}>{format(row.createdAt, `yyyy-MM-dd`)}</p>,

      width: 200,
    },
    {
      title: `Откуда`,
      dataIndex: "from",
      render: (_, row) =>
        row?.from?.length > 20 ? (
          <Tooltip color={`black`}
          boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
          background={`#fff`} label={row.from}><p>{row?.from?.slice(0, 20)}...</p></Tooltip>
        ) : 
          row?.from
        ,
      width: 500,
    },
    {
      title: `Куда`,
      dataIndex: "to",
      render: (_, row) =>
        row?.to?.length > 20 ? (
          <Tooltip color={`black`}
          boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
          background={`#fff`} label={row.to}><p>{row?.to?.slice(0, 20)}...</p></Tooltip>
        ) : 
          row?.to
        ,
      width: 500,
    },
    {
      title: `Тип груза`,
      dataIndex: "product_type",
      width: 100,
    },
    
    {
      title: `Тип машина`,
      dataIndex: "car_type",
      width: 200,
    },
    {
      title: `Кол  машин`,
      dataIndex: "number_of_cars",
      width: 200,
    },
    {
      title: `Принятые предл.`,
      dataIndex: "accepted_offers",
      render:(_,row) => row?.number_of_cars - row?.accepted_offers,
      width: 200,
    },
    {
      title: `Общая сумма`,
      dataIndex: "bid_cash",
      width: 300,
    },
    {
      title: `Предоплата`,
      dataIndex: "prepayment_percentage",
      width: 200,
    },
    {
      title: `Сумма после завершения заказа`,
      dataIndex: "dim_length_special",
      width: 450,
    },
    {
      title: `Валюта`,
      dataIndex: "",
      render: (_, row) =>
        row?.currency_id_data?.name || (
          <span
            style={{ fontSize: `14px`, fontWeight: 400, fontStyle: `italic` }}
          >
            Нет Продажник
          </span>
        ),

      width: 200,
    },
    {
      title: `Статус  груза`,
      dataIndex: "",
      render: (_, row) =>
        row?.order_status?.[0] === `active` ? `Активен` : `Не активен`,
      width: 200,
    },
  ];

  return {
    topStatis,
    chartData,
    options,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    columns1,
    columns2,
    columns3,
    columns4,
    data,
    setStatus,
    isPending,
    isLoading,
    date,
    setDate,
    setDate2,
    setCurrentPage,
    currentPage,
    getExcelFileFn,
    isLoadingExe:getExcelFile.isPending,
  };
};
