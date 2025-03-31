"use client";
import { Container } from "@/components/Container";
import { Dropdown } from "@/components/Dropdown";
import { Box, Button, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { useProps } from "./useProps";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import cls from "./style.module.scss";
import { DatePicker } from "@/components/DatePicker";

const ActiveUserPage = ({ locale }) => {
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
          <Flex gap={`16px`} alignItems={`center`}>
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
                onChangeSelect={() => setData([])}
                clearFn={() => setData([])}
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
                onChangeSelect={() => setData([])}
                clearFn={() => setData([])}
              />
            </Box>
            <Box className="dateWrap left" width={`280px`}>
              <DatePicker
                isClearable={false}
                endDate={endDate}
                setEndDate={setEndDate}
                range
                startDate={startDate}
                setStartDate={setStartDate}
                placeholder={`По времени`}
                onChange={() => setData([])}
              />
            </Box>
          </Flex>
        </Flex>
        <Box mt={`25px`}>
          <SarbonTable isSticky variant="table" columns={columns} data={data} />
        </Box>
        {data?.length >= 100 && (
          <Box mt={`15px`} width={`fit-content`}>
            <Button isLoading={isFetching} onClick={addPage}>
              Загрузить еще
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ActiveUserPage;
