import { useGetUserGpsByIDData, useLogistikaGpsTrackingFilterDriverPred } from "@/services/api";
import { Avatar, Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useProfileDis = () => {
  const [status, setStatus] = useState(false);
  const [tab, setTabs] = useState(`new`);
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();
  const [filter, setFilter] = useState(1);
  const [dateType, setDateType] = useState(``);
  const router = useRouter();
  const params = useSearchParams();
  const guid = params.get(`guid`) || 0;
  const date = params.get(`date`) || 0;
  const [data, setData] = useState({});
  const [date2, setDate2] = useState([]);


    const { mutate: filterData, isLoading: filterDataLoadin } =
      useLogistikaGpsTrackingFilterDriverPred({
        onSuccess: (res) => {
          setData(res);
        },
      });
  

  const getWeekRange = () => {
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
    }
  }, [date]);


  // useEffect(() => {
  //   filterData({
  //     data: {
  //       object_data: {
  //         dispatcher_id:guid,

  //         filter: filter[status],
  //         start_date:
  //           date2.length > 0
  //             ? date2[0]
  //             : startDate
  //             ? startDate?.getDate() === endDate?.getDate()
  //               ? formatDate(startDate, 0, 0, 0)
  //               : new Date(startDate)
  //             : ``,
  //         end_date:
  //           date2.length > 0
  //             ? date2[1]
  //             : endDate
  //             ? startDate?.getDate() === endDate?.getDate()
  //               ? formatDate(endDate, 23, 59, 59)
  //               : new Date(endDate)
  //             : ``,
  //         all_date:
  //           startDate || endDate ? false : date2.length > 0 ? false : true,
  //         type: "dashboard",
  //         limit: 1000,
  //         page: 1,
  //       },
  //     },
  //   });
  // }, [startDate, endDate, status, date2, load]);


  const columns = [
    {
      title: `Водитель`,
      filter: filter,
      key: `driver`,
      filterType: (type) => console.log(`type`, type),
      width: 200,
      render: (row, index) => (
        <Flex gap={`10px`} alignItems={`center`}>
          <Avatar src="sa" name="bobur" />
          <Box>
            <p>Bobur</p>
            <p>+998979136919</p>
          </Box>
        </Flex>
      ),
    },
    {
      title: `Транпортная компания`,

      width: 200,
      render: (row, index) => `Транпортная компания`,
    },
    {
      title: `Машина`,
      width: 200,
      render: (row, index) => `Транпортная компания`,
    },
    {
      title: `Статус`,
      filter: filter,
      key: `status`,
      filterType: (type) => console.log(`type1`, type),
      width: 300,
      render: (row, index) => `Транпортная компания`,
    },
  ];

  const getUserGps = useGetUserGpsByIDData({
    params: {
      data: JSON.stringify({
        // client_type_id: "2ae57983-f68f-487a-b76c-c7166c35dbba",
        //  firm_id,
        guid: guid,
        with_relations: true,
      }),
    },
  });

  return {
    status,
    t,
    tab,
    setTabs,
    columns,
    router,
    guid,
    userData: getUserGps?.data?.response?.[0],
    date,
    setDateType,
    dateType,
  };
};
