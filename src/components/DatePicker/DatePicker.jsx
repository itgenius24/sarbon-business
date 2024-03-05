"use client";

import cls from "./styles.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { CustomInputDate } from "./components/CustomInputDate";

export const DatePicker = ({
  onChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  monthsShown,
  range,
  withLeftSide,
  inputWidth,
  placeholder,
  label,
  disabled,
}) => {
  if (!onChange || !startDate || (!endDate && range)) {
    // console.warn("onChange, startDate and endDate are required props for RangePicker component");
  }

  const [innerStartDate, setInnerStartDate] = useState();
  const [innerEndDate, setInnerEndDate] = useState(null);

  const innerOnChange = (dates) => {
    if (range) {
      const [start, end] = dates;
      setInnerStartDate(start);
      setInnerEndDate(end);
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(dates);
      setInnerStartDate(dates);
    }

    if (onChange) {
      onChange(dates);
    }
  };

  const renderDayContents = (day) => (
    <span className="react-datepicker__day-text">{day}</span>
  );
  return (
    <div className={cls.dateWrapper}>
      {label && <span className={cls.label}>{label}</span>}
      {withLeftSide && <div className={cls.leftSide}></div>}
      {range ? (
        <ReactDatePicker
          dateFormat={"dd.MM.yyyy"}
          disabled={disabled}
          selected={startDate || innerStartDate}
          onChange={innerOnChange}
          startDate={startDate || innerStartDate}
          endDate={endDate || innerEndDate}
          monthsShown={monthsShown || 2}
          customInput={
            <CustomInputDate disabled={disabled} cPlaceholder={placeholder} width={inputWidth} />
          }
          renderDayContents={renderDayContents}
          selectsRange
        />
      ) : (
        <ReactDatePicker
          dateFormat={"dd.MM.yyyy"}
          disabled={disabled}
          selected={startDate || innerStartDate}
          onChange={innerOnChange}
          startDate={startDate || innerStartDate}
          monthsShown={monthsShown || 1}
          customInput={
            <CustomInputDate disabled={disabled} cPlaceholder={placeholder} width={inputWidth} />
          }
          renderDayContents={renderDayContents}
        />
      )}
    </div>
  );
};
