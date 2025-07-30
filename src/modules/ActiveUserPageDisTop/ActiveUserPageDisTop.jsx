"use client";
import { Container } from "@/components/Container";
import { Dropdown } from "@/components/Dropdown";
import { Box, Button, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { useProps } from "./useProps";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import cls from "./style.module.scss";
import { DatePicker } from "@/components/DatePicker";
import { format } from "date-fns";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const ActiveUserPageDisTop = ({ locale }) => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const {
    control,
    errors,
    register,
    setError,
    setValue,
    watch,
    t,
    columns,
    data,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    roleData,
    useList,
    addPage,
    isFetching,
    setData,
    dateValues,
    handleSelect,
    startSelectDate,
    setStartSelectDate,
    setDataOld,
  } = useProps();

  return (
    <Box>
      <Container my="40px">
        <Flex
          width={"100%"}
          alignItems={`center`}
          justifyContent={"space-between"}
          mb={isLargerThan845 ? "24px" : "12px"}
        >
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            color={`rgba(33, 31, 38, 1)`}
          >
            Журнал активности
          </Heading>
          <Flex gap={`10px`} alignItems={`center`}>
            <Box width={`252px`}>
              <Dropdown
                control={control}
                required
                register={register}
                watch={watch}
                name="role"
                options={roleData || []}
                errors={errors}
                placeholder={t("Все роли")}
                setValue={setValue}
                isClear
                isCheck={false}
                onChangeSelect={() => {
                  setDataOld([]);
                  setData([]);
                }}
                clearFn={() => {
                  setDataOld([]);
                  setData([]);
                }}
              />
            </Box>
            <Box width={`252px`}>
              <Dropdown
                control={control}
                required
                register={register}
                watch={watch}
                name="user"
                options={useList}
                errors={errors}
                placeholder={t("Пользователь")}
                searchable
                setValue={setValue}
                searchName={`search`}
                isCheck={false}
                onChangeSelect={() => {
                  setDataOld([]);
                  setData([]);
                }}
                clearFn={() => {
                  setDataOld([]);
                  setData([]);
                }}
              />
            </Box>
            <Box width={`160px`}>
              <Dropdown
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
                    setData([]);
                    setDataOld([]);
                    setStartDate(new Date());
                    setEndDate(new Date()), setStartSelectDate(new Date());
                  }
                }}
              />
            </Box>
            <Box className="dateWrap one" width={`160px`}>
              <DatePicker
                isClearable={false}
                dateFormat="dd.MM.yyyy"
                selected={startDate}
                startDate={startDate}
                setStartDate={setStartDate}
                placeholder={`Дата с`}
                leftText={`с`}
                onChange={() => {
                  setValue(`date`, ``);
                  setData([]);
                }}
              />
            </Box>
            <Box className="dateWrap one" width={`160px`}>
              <DatePicker
                isClearable={false}
                dateFormat="dd.MM.yyyy"
                selected={endDate}
                startDate={endDate}
                setStartDate={setEndDate}
                placeholder={`Дата по`}
                leftText={`по`}
                onChange={() => {
                  setValue(`date`, ``);
                  setData([]);
                }}
              />
            </Box>
          </Flex>
        </Flex>
        <Box mt={`25px`}>
          {
                   isFetching ? <LoadingSpinner /> : data?.length > 0 ? <SarbonTable isSticky variant="table" columns={columns} data={data} /> : <Box className={cls.noData}>Пока нет активности </Box>
          }
        </Box>
        {/* {data?.length >= 100 && (
          <Box mt={`15px`} width={`fit-content`}>
            <Button isLoading={isFetching} onClick={addPage}>
              Загрузить еще
            </Button>
          </Box>
        )} */}
      </Container>
    </Box>
  );
};

export default ActiveUserPageDisTop;
