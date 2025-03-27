import { EditIconTable } from "@/assets/icons/icons";
import {
  useDeleteDis,
  useDispatcherFirms,
  useDispatcherFirmsEdit,
  useGetExcelPost,
  useGetFirmInfo,
  useGetOffer,
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
import { Dropdown } from "@/components/Dropdown";

export const useDashboard = (locale) => {
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

  const filter = {
    [`0`]: `dispatcher`,
    [`1`]: `driver`,
    [`2`]: `ekspiditor`,
    [`3`]: `truck`,
    [`4`]: `cargo`,
    [`5`]: `top_dispatcher`,
    [`6`]: `customer`,
  };

  const { data: firmData } = useGetFirmInfo(firmId?.firm_data?.guid, {
    enabled: Boolean(firmId?.firm_data?.guid),
  });

  const { mutate: filterData, isLoading: filterDataLoadin } =
    useLogistikaGpsTrackingFilterDriverPred({
      onSuccess: (res) => {
        setData(res);
        setCurrentPage(1);
        if (filter[status] === `ekspiditor`) {
          res?.response?.forEach((element) => {
            // return setValue(`cargo_type_${element?.guid}`, {
            //   label: element?.dispatcher_and_firms_data_details.full_name,
            //   value: element?.dispatcher_and_firms_data_details?.guid,
            // });
          });
        }
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
          limit: 2000,
          page: 1,
        },
      },
    });
  }, [startDate, endDate, status, date2, load]);

  const { data: useList } = useGetUserData({
    params: {
      data: JSON.stringify({
        client_type_id: "a1d98b5f-93f1-413a-8515-c99d4f4d6dc5",
      }),
    },
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

  const { data: useExsList } = useGetUserData({
    params: {
      data: JSON.stringify({
        client_type_id: "a25d605c-d153-4ddf-8590-e4cda176ef93",
      }),
    },
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

  const { data: vehicle } = useGetVehicle2({
    params: {
      data: JSON.stringify({
        car_position: ["alive"],
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

  const { data: perfomed } = useGetOffer({
    data: JSON.stringify({
      provisions: [`performed`],
    }),
  });

  const { data: archive } = useGetOffer({
    data: JSON.stringify({
      provisions: [`archive`],
    }),
  });

  const { data: newData } = useGetOffer({
    data: JSON.stringify({
      provisions: [`new`],
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

  const { data: bzData } = useGetOffer({
    data: JSON.stringify({
      users_id_3: null,
      provisions: [`new`],
    }),
  });

  console.log(`bzData`,bzData)

  const newData1 = bzData?.response?.filter(
    (item) =>
      item?.provisions?.includes(`new`) &&
      item?.provisions?.includes(`approve_from_driver`)
  )?.length;
  const newData2 = bzData?.response?.filter(
    (item) =>
      item?.provisions?.includes(`new`) &&
      item?.provisions?.includes(`approve_by_customer`)
  )?.length;


  const topStatis = [
    {
      id: 1,
      total: useList?.count || 0,
      deck: `Общее кол-во водителей`,
      bg: `rgba(0, 51, 153, 1)`,
      color: `rgba(0, 51, 153, 0.3)`,
    },
    {
      id: 2,
      total: useExsList?.count || 0,
      deck: `Общее кол-во перевозчиков`,
      bg: `rgba(21, 186, 77, 1)`,
      color: `rgba(21, 186, 77, 0.3)`,
    },
    {
      id: 3,
      total: vehicle?.count || 0,
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
      total: (newCount || 0) -  (newData1 + newData2 || 0),
      deck: `Общее кол-во предложений `,
      bg: `rgba(142, 170, 219, 1)`,
      color: `rgba(142, 170, 219, 0.3)`,
    },
    {
      id: 2,
      total: newData1 + newData2 || 0,
      deck: `Общее кол-во предложений без диспетчеров`,
      bg: `rgba(165, 165, 165, 1)`,
      color: `rgba(165, 165, 165, 0.3)`,
    },
    {
      id: 3,
      total: perfomed?.count || 0,
      deck: `Общее кол-во в исполнении`,
      bg: `rgba(255, 192, 0, 1)`,
      color: `rgba(255, 192, 0, 0.3)`,
    },
    {
      id: 4,
      total: archive?.count || 0,
      deck: `Общее кол-во завершённых`,
      bg: `rgba(146, 208, 80, 1)`,
      color: `rgba(146, 208, 80, 1)`,
    },
  ];

  const chartData = {
    labels: [
      `Водитель (${data?.driver_count?.[0]?.total_count || 0})`,
      `Перевозчик (${data?.eks_count?.[0]?.total_count || 0})`,
      `Транспорт (${data?.truck_count?.[0]?.total_count || 0})`,
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
          data?.truck_count?.[0]?.total_count || 0,
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

  const handle = (row) => {
    // router.push(`/${locale}/my-loads?guid=${row?.guid}&full_name=${row?.full_name}`);
    router.push(`/${locale}/dispatcher/profile-dispacher?guid=${row?.guid}&date=${row?.user_history_data?.last_move_time || ``}`)

  }

  const columns1 = [
    {
      title: "No",
      dataIndex: `number`,
      width: 40,
    },
    {
      title: "Последняя активность",
      dataIndex: "",
      render: (_, row) => {
        const date = new Date(row?.user_history_data?.last_move_time);
        const currentYear = new Date().getFullYear();
        const year = date.getFullYear();

        if (currentYear === year) {
          return (
            <>
              <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
                {row?.user_history_data?.last_move_time &&
                  format(row?.user_history_data?.last_move_time, `HH:mm`)}
              </p>
              <p style={{ whiteSpace: `nowrap` }}>
                {row?.user_history_data?.last_move_time &&
                  format(row?.user_history_data?.last_move_time, `yyyy-MM-dd`)}
              </p>
            </>
          );
        } else {
          return (
            <>
              <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
                {row?.user_history_data?.last_move_time &&
                  format(row?.user_history_data?.last_move_time, `HH:mm`)}
              </p>
              <p style={{ whiteSpace: `nowrap` }}>
                {row?.user_history_data?.last_move_time &&
                  format(row?.user_history_data?.last_move_time, `yyyy-MM-dd`)}
              </p>
            </>
          );
        }
      },

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
      title: `Фирма`,
      dataIndex: "",
      render: (_, row) =>
        row?.firm_data?.company_name ? (
          <p style={{ width: `200px` }}>{row?.firm_data?.company_name}</p>
        ) : (
          <span
            style={{
              fontSize: `14px`,
              fontWeight: 400,
              fontStyle: `italic`,
              whiteSpace: `nowrap`,
            }}
          >
            Нет названия фирмы
          </span>
        ),
      width: 200,
    },
    {
      title: `ИНН`,
      dataIndex: "",
      render: (_, row) =>
        row?.firm_data?.tin ? (
          <p
            onClick={() => {
              setFirmId(row);
              onOpen();
            }}
            className={cls.tin}
          >
            {row?.firm_data?.tin}
          </p>
        ) : (
          <Flex
            // className={cls.tinWrap}
            gap={`6px`}
            alignItems={`center`}
            whiteSpace={`nowrap`}
            // onClick={() => editFn(row)}
          >
            <span
              style={{
                opacity: 0.5,
                fontSize: `14px`,
                fontWeight: 400,
                fontStyle: `italic`,
              }}
            >
              ИНН отсутствует
            </span>
            {/* <EditIconTable /> */}
          </Flex>
        ),
      width: 200,
    },
    {
      title: `Тип аккаунта`,
      dataIndex: "",
      render: (_, row) =>
        row?.firm_data?.tip_account?.[0] === `legal_owner`
          ? `Юридическое лицо`
          : `Физическое лицо`,
      width: 200,
    },
    {
      title: `Дата созд.`,
      dataIndex: "createdAt",
      render: (_, row) => (
        <p style={{ whiteSpace: `nowrap` }}>
          {row.createdAt && format(row.createdAt, `yyyy-MM-dd`)}
        </p>
      ),

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
      render: (_, row, index) => {
        return (
          <Box key={row?.guid} width={`250px`}>
            <Dropdown
              control={control}
              register={register}
              watch={watch}
              name={`cargo_type_${row?.guid}`}
              options={useListDis}
              errors={errors}
              width={`200px`}
              className={cls.dropdown}
              onChangeSelect={(e) => dispatchAdd(row, e)}
              clearFn={(e) => clearFn(row, e)}
              isClear
              defaultValue={
                row?.dispatcher_and_firms_data_details?.guid
                  ? {
                      label: row?.dispatcher_and_firms_data_details?.full_name,
                      value: row?.dispatcher_and_firms_data_details?.guid,
                    }
                  : {}
              }
            />
          </Box>
        );
      },

      width: 200,
    },
    {
      title: `ID`,
      dataIndex: "your_id",
      render: (_, row) => (
        <p style={{ whiteSpace: `nowrap` }}>{row?.your_id}</p>
      ),
      width: 200,
    },
  ];
  const columns2 = [
    {
      title: "No",
      dataIndex: `number`,
      width: 40,
    },
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
      render: (_, row) => (
        <p style={{ whiteSpace: `nowrap` }}>
          {row.createdAt && format(row.createdAt, `yyyy-MM-dd`)}
        </p>
      ),
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
    {
      title: "Последняя активность",
      dataIndex: "",
      render: (_, row) => {
        const now = new Date(row?.gps_history?.update_time);
        now.setHours(now.getHours() - 5);

        return (
          <>
            <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
              {row?.gps_history?.update_time && format(now, `HH:mm`)}
            </p>
            <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
              {row?.gps_history?.update_time && format(now, `yyyy-MM-dd`)}
            </p>
          </>
        );
      },

      width: 200,
    },
  ];
  const columns3 = [
    {
      title: "No",
      dataIndex: `number`,
      width: 40,
    },
    {
      title: `ID`,
      dataIndex: "unit_id",
      width: 200,
      render: (_, row) => (row.unit_id ? row.unit_id : `Нет ID `),
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
      render: (_, row) => (
        <span style={{ whiteSpace: `nowrap` }}>
          {row.createdAt && format(row.createdAt, `yyyy-MM-dd`)}
        </span>
      ),
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
        <p style={{ textTransform: `capitalize` }}>{row?.eco_standart}</p> || (
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
      title: "No",
      dataIndex: `number`,
      width: 40,
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
      render: (_, row) => (
        <p style={{ whiteSpace: `nowrap` }}>
          {row.createdAt && format(row.createdAt, `yyyy-MM-dd`)}
        </p>
      ),

      width: 200,
    },
    {
      title: `Откуда`,
      dataIndex: "from",
      render: (_, row) =>
        row?.from?.length > 20 ? (
          <Tooltip
            color={`black`}
            boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
            background={`#fff`}
            label={row.from}
          >
            <p style={{ width: `130px` }}>{row?.from?.slice(0, 20)}...</p>
          </Tooltip>
        ) : (
          row?.from
        ),
      width: 500,
    },
    {
      title: `Куда`,
      dataIndex: "to",
      render: (_, row) =>
        row?.to?.length > 20 ? (
          <Tooltip
            color={`black`}
            boxShadow={`0px 4px 8px 0px rgba(0, 0, 0, 0.15)`}
            background={`#fff`}
            label={row.to}
          >
            <p style={{ width: `140px` }}>{row?.to?.slice(0, 20)}...</p>
          </Tooltip>
        ) : (
          row?.to
        ),
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
      render: (_, row) => row?.number_of_cars - row?.accepted_offers,
      width: 200,
    },
    {
      title: `Оставшиеся машины`,
      dataIndex: "accepted_offers",
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

  const columns5 = [
    {
      title: "No",
      dataIndex: `number`,
      width: 40,
    },
    {
      title: `Последняя активность`,
      dataIndex: "createdAt",
      width: 150,
      render: (_, row) => {
        const date = new Date(row?.user_history_data?.last_move_time);

        return (
          <>
            <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
              {row?.user_history_data?.last_move_time &&
                format(row?.user_history_data?.last_move_time, `HH:mm`)}
            </p>
            <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
              {row?.user_history_data?.last_move_time &&
                format(row?.user_history_data?.last_move_time, `yyyy-MM-dd`)}
            </p>
          </>
        );
      },
    },
    {
      title: `Диспетчер`,
      dataIndex: "full_name",
      width: 200,
      render:(_,row) => <p className={cls.nameDis} onClick={() => handle(row)}>{row?.full_name}</p>
    },
    {
      title: `Общее кол-во водителей`,
      dataIndex: "",
      width: 200,
      render: (_, row) => {
        const empty = row?.drivers_count?.empty || 0;
        const someone_cargo = row?.drivers_count?.someone_cargo || 0;
        const broke_down = row?.drivers_count?.broke_down || 0;
        const newDriver = row?.drivers_count?.new || 0;
        const unknown = row?.drivers_count?.unknown || 0;
        const our_cargo = row?.drivers_count?.our_cargo || 0;
        // const waiting_for_driver = row?.drivers_count?.waiting_for_driver || 0;
        return (
          <p style={{ textAlign: `center` }}>
            {empty +
              someone_cargo +
              broke_down +
              newDriver +
              unknown +
              our_cargo}
          </p>
        );
      },
    },
    {
      title: `Общее кол-во свободных`,
      dataIndex: "",
      width: 200,
      render: (_, row) => (
        <p style={{ textAlign: `center` }}>
          {row?.drivers_count?.empty + (row?.drivers_count?.unknown || 0) || 0}
        </p>
      ),
    },
    {
      title: `Занята чужим грузом`,
      dataIndex: "",
      width: 200,
      render: (_, row) => (
        <Flex width={`100%`} justifyContent={`center`}>
          <p style={{ width: `100px`, textAlign: `center` }}>
            {row?.drivers_count?.someone_cargo}
          </p>
        </Flex>
      ),
    },
    {
      title: `Неисправна`,
      dataIndex: "",
      width: 100,
      render: (_, row) => (
        <Flex width={`100%`} justifyContent={`center`}>
          <p style={{ width: `70px`, textAlign: `center` }}>
            {row?.drivers_count?.broke_down}
          </p>
        </Flex>
      ),
    },
    {
      title: `Общее кол-во в исполнении`,
      dataIndex: "",
      width: 200,
      render: (_, row) => {
        // const data = row?.orders_status_counts?.filter((item) =>
        //   item?._id?.includes(`performed`)
        // );
        return (
          <p style={{ textAlign: `center` }}>
            {row?.orders_status_counts?.performed}
          </p>
        );
      },
    },
    // {
    //   title: `Ждём водителя`,
    //   dataIndex: "",
    //   width: 200,
    //   render: (_, row) => {
    //     // const data = row?.orders_status_counts?.filter(
    //     //   (item) =>
    //     //     item?._id?.includes(`new`) &&
    //     //     item?._id?.includes("approve_from_driver")
    //     // );
    //     return row?.drivers_count?.waiting_for_driver ;
    //   },
    // },
    {
      title: `Общее кол-во предложений и ждём вод.`,
      dataIndex: "",
      width: 200,
      render: (_, row) => {
        // const data = row?.orders_status_counts?.filter(
        //   (item) =>
        //     item?._id?.includes(`new`) &&
        //     item?._id?.includes("approve_by_customer")
        // );
        return (
          <p style={{ textAlign: `center` }}>
            {row?.orders_status_counts?.new ||
              0 + row?.orders_status_counts?.approve_by_customer ||
              0 + row?.orders_status_counts?.approve_from_driver ||
              0}
          </p>
        );
      },
    },

    {
      title: `Общее кол-во завершённых`,
      dataIndex: "",
      width: 200,
      render: (_, row) => {
        // const data = row?.orders_status_counts?.filter((item) =>
        //   item?._id?.includes(`archive`)
        // );

        return (
          <p style={{ textAlign: `center` }}>
            {row?.orders_status_counts?.archive}
          </p>
        );
      },
    },
  ];

  const columns6 = [
    {
      title: "No",
      dataIndex: `number`,
      width: 40,
    },
    {
      title: `Последняя активность`,
      dataIndex: "createdAt",
      width: 150,
      render: (_, row) => {
        const date = new Date(row?.user_history_data?.last_move_time);

        return (
          <>
            <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
              {row?.user_history_data?.last_move_time &&
                format(row?.user_history_data?.last_move_time, `HH:mm`)}
            </p>
            <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
              {row?.user_history_data?.last_move_time &&
                format(row?.user_history_data?.last_move_time, `yyyy-MM-dd`)}
            </p>
          </>
        );
      },
    },
    {
      title: `Топ Диспетчер`,
      dataIndex: "full_name",
      width: 200,
      render:(_,row) => <p >{row?.full_name}</p>
    },
    {
      title: `Общее кол-во водителей`,
      dataIndex: "",
      width: 200,
      render: (_, row) => {
        const empty = row?.drivers_count?.empty || 0;
        const someone_cargo = row?.drivers_count?.someone_cargo || 0;
        const broke_down = row?.drivers_count?.broke_down || 0;
        const newDriver = row?.drivers_count?.new || 0;
        const unknown = row?.drivers_count?.unknown || 0;
        const our_cargo = row?.drivers_count?.our_cargo || 0;
        // const waiting_for_driver = row?.drivers_count?.waiting_for_driver || 0;
        return (
          <p style={{ textAlign: `center` }}>
            {empty +
              someone_cargo +
              broke_down +
              newDriver +
              unknown +
              our_cargo}
          </p>
        );
      },
    },
    {
      title: `Общее кол-во свободных`,
      dataIndex: "",
      width: 200,
      render: (_, row) => (
        <p style={{ textAlign: `center` }}>
          {row?.drivers_count?.empty + (row?.drivers_count?.unknown || 0) || 0}
        </p>
      ),
    },
    {
      title: `Занята чужим грузом`,
      dataIndex: "",
      width: 200,
      render: (_, row) => (
        <Flex width={`100%`} justifyContent={`center`}>
          <p style={{ width: `100px`, textAlign: `center` }}>
            {row?.drivers_count?.someone_cargo}
          </p>
        </Flex>
      ),
    },
    {
      title: `Неисправна`,
      dataIndex: "",
      width: 100,
      render: (_, row) => (
        <Flex width={`100%`} justifyContent={`center`}>
          <p style={{ width: `70px`, textAlign: `center` }}>
            {row?.drivers_count?.broke_down}
          </p>
        </Flex>
      ),
    },
    {
      title: `Общее кол-во в исполнении`,
      dataIndex: "",
      width: 200,
      render: (_, row) => {
        // const data = row?.orders_status_counts?.filter((item) =>
        //   item?._id?.includes(`performed`)
        // );
        return (
          <p style={{ textAlign: `center` }}>
            {row?.orders_status_counts?.performed}
          </p>
        );
      },
    },
    // {
    //   title: `Ждём водителя`,
    //   dataIndex: "",
    //   width: 200,
    //   render: (_, row) => {
    //     // const data = row?.orders_status_counts?.filter(
    //     //   (item) =>
    //     //     item?._id?.includes(`new`) &&
    //     //     item?._id?.includes("approve_from_driver")
    //     // );
    //     return row?.drivers_count?.waiting_for_driver ;
    //   },
    // },
    {
      title: `Общее кол-во предложений и ждём вод.`,
      dataIndex: "",
      width: 200,
      render: (_, row) => {
        // const data = row?.orders_status_counts?.filter(
        //   (item) =>
        //     item?._id?.includes(`new`) &&
        //     item?._id?.includes("approve_by_customer")
        // );
        return (
          <p style={{ textAlign: `center` }}>
            {row?.orders_status_counts?.new ||
              0 + row?.orders_status_counts?.approve_by_customer ||
              0 + row?.orders_status_counts?.approve_from_driver ||
              0}
          </p>
        );
      },
    },

    {
      title: `Общее кол-во завершённых`,
      dataIndex: "",
      width: 200,
      render: (_, row) => {
        // const data = row?.orders_status_counts?.filter((item) =>
        //   item?._id?.includes(`archive`)
        // );

        return (
          <p style={{ textAlign: `center` }}>
            {row?.orders_status_counts?.archive}
          </p>
        );
      },
    },
  ];

  const columns7 = [
    {
      title:`Последняя активность`,
      dataIndex:``,
      width:250,
      render: (_, row) => {
        const date = new Date(row?.user_history_data?.last_move_time);

        return (
          <>
            <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
              {row?.user_history_data?.last_move_time &&
                format(row?.user_history_data?.last_move_time, `HH:mm`)}
            </p>
            <p style={{ whiteSpace: `nowrap`, textAlign: `center` }}>
              {row?.user_history_data?.last_move_time &&
                format(row?.user_history_data?.last_move_time, `yyyy-MM-dd`)}
            </p>
          </>
        );
      },  
    },
    {
      title:`Заказчик`,
      dataIndex:`full_name`,
      width:250
    },
    {
      title:`Общее кол-во активных грузов`,
      dataIndex:``,
      width:250,
      render:(_,row) => row?.cargo_status_counts?.active
    },
    {
      title:`Неактивный`,
      dataIndex:``,
      width:250,
      render:(_,row) => row?.cargo_status_counts?.in_active
    },
    {
      title:`В модерация`,
      dataIndex:``,
      width:250,
      render:(_,row) => row?.cargo_status_counts?.in_moderation
    },
    {
      title:`Отклонений`,
      dataIndex:``,
      width:250,
      render:(_,row) => row?.orders_status_counts?.cancellation

    },
    {
      title:`Общее кол-во Завершённых`,
      dataIndex:``,
      width:250,
      render:(_,row) => row?.orders_status_counts?.archive

    },
  ]

  return {
    topStatis,
    topStatis2,
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
    columns5,
    columns6,
    columns7,
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
