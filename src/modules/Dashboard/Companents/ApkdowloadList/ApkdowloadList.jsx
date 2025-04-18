import CTable from "@/components/CTable";
import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { useGetCountApk } from "@/services/api";
import { Box, Flex } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ApkdowloadList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const [startSelectDate, setStartSelectDate] = useState(new Date());

  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    return lastWeek;
  });

  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return today; // YYYY-MM-DD format
  });

  const formatDate = (date, hours, minutes, seconds) => {
    const newDate = new Date(date);
    newDate.setHours(hours + 5, minutes, seconds);
    return newDate;
  };
  const { watch, setValue, register, control, errors } = useForm();

  const { data, refetch } = useGetCountApk({
    params: {
      data: JSON.stringify({
        create_time: {
          $gte: formatDate(startDate, 0, 0, 0),
          $lt: formatDate(endDate, 23, 59, 59),
        },
      }),
    },
  });

  const dateValues = [
    { label: `Сегодня`, value: `Сегодня` },
    { label: `3 дня`, value: `3 дня` },
    { label: `Неделя`, value: `Неделя` },
    { label: `Месяц`, value: `Месяц` },
    { label: `3 месяца`, value: `3 месяца` },
  ];

  function handleSelect(e) {
    const selected = e.value;
    const today = new Date();
    let newStartDate = new Date();

    switch (selected) {
      case "Сегодня":
        newStartDate = today;
        break;
      case "3 дня":
        newStartDate.setDate(today.getDate() - 2);
        break;
      case "Неделя":
        newStartDate.setDate(today.getDate() - 6);
        break;
      case "Месяц":
        newStartDate.setMonth(today.getMonth() - 1);
        break;
      case "3 месяца":
        newStartDate.setMonth(today.getMonth() - 3);
        break;
      default:
        newStartDate = today;
    }

    setStartDate(newStartDate);
    setEndDate(today);
    setStartSelectDate(newStartDate);

    if (
      format(newStartDate, `dd.MM.yyyy`) === format(startDate, `dd.MM.yyyy`)
    ) {
      return;
    } else {
      refetch();
    }
  }

  const columns = [
    {
      title: `No`,
      dataIndex: "number",
      width: 40,
    },
    {
      title: `Устройство`,
      dataIndex: "app_name",
      width: 350,
    },
    {
      title: `Дата созд.`,
      dataIndex: "create_time",
      render: (_, row) => (
        <p style={{ whiteSpace: `nowrap` }}>
          {row?.create_time &&
            format(new Date(row?.create_time), `yyyy-MM-dd HH:mm`)}
        </p>
      ),
      width: 350,
    },
  ];

  return (
    <Box>
      <Flex mb={`20px`} gap={`16px`} alignItems={`center`}>
        <Box width={`160px`}>
          <Dropdown
            disabled={watch(`driver`)?.label === `Без диспетчера`}
            control={control}
            register={register}
            watch={watch}
            name="date"
            isClear
            options={dateValues}
            errors={errors}
            placeholder={t("Период")}
            setValue={setValue}
            isCheck={false}
            onChangeSelect={(e) => handleSelect(e)}
            clearFn={() => {
              if (
                format(startDate, `dd.MM.yyyy`) ===
                format(startSelectDate, `dd.MM.yyyy`)
              ) {
                return;
              } else {
                setStartDate(new Date());
                setEndDate(new Date()), setStartSelectDate(new Date());
              }
            }}
          />
        </Box>
        <Box className="dateWrap one" width={`160px`}>
          <DatePicker
            disabled={watch(`driver`)?.label === `Без диспетчера`}
            isClearable={false}
            dateFormat="dd.MM.yyyy"
            selected={startDate}
            startDate={startDate}
            setStartDate={setStartDate}
            placeholder={`Дата с`}
            leftText={`с`}
            onChange={() => {
              setValue(`date`, ``);
              refetch();
            }}
          />
        </Box>
        <Box className="dateWrap one" width={`160px`}>
          <DatePicker
            disabled={watch(`driver`)?.label === `Без диспетчера`}
            isClearable={false}
            dateFormat="dd.MM.yyyy"
            selected={endDate}
            startDate={endDate}
            setStartDate={setEndDate}
            placeholder={`Дата по`}
            leftText={`по`}
            onChange={() => {
              setValue(`date`, ``);
              refetch();
            }}
          />
        </Box>
      </Flex>
      <CTable
        columns={columns}
        data={data?.response?.map((item, index) => ({
          ...item,
          number: index + 1,
        }))}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Box>
  );
};

export default ApkdowloadList;
