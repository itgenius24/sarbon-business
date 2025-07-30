"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@chakra-ui/react";
import cls from "./style.module.scss";
import { useMyCarsDispatcher } from "./useMyCarsDispatcher";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import ModalStatus from "./component/ModalStatus/ModalStatus";
import ModalAddDis from "./component/ModalAddDis/ModalAddDis";
import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { SearchIcon } from "@/assets/icons/icons";
import { format } from "date-fns";

export const MyCarsDispatcherModule = () => {
  const {
    t,
    data,
    deleteFuntion,
    nameFilter,
    isLoading,
    setSearchFn,
    search,
    statusData,
    count,
    addPage,
    open,
    setOpen,
    iconStatus,
    setIconStatus,
    statusIconChange,
    columns,
    rowClassName,
    ids,
    userdata,
    setUserData,
    dataDis,
    addSubDis,
    onOpen,
    isOpen,
    onClose,
    createDisLoading,
    searchDis,
    setSearchDIs,
    removeSubDis,
    removeDisLoading,
    deleteLoding,
    negotiableOption,
    onChange,
    handleCheckboxChange,
    value,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    control,
    errors,
    register,
    setError,
    setValue,
    watch,
    clearFn,
    userDisResOption,
    dateValues,
    startSelectDate,
    handleSelect,
    setStartSelectDate,
  } = useMyCarsDispatcher();

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const isRemoveDisBtn = ids?.filter((item) => item.first_dispatcher_data);

  return (
    <>
      <Container maxW={`1444px`} my="40px">
        <Box position={`relative`} h={`100%`}>
          <Flex width={"100%"} justifyContent={"space-between"}>
            <Heading
              size={isLargerThan845 ? "md" : "sm"}
              mb={isLargerThan845 ? "24px" : "12px"}
              color={`var(--primary-text)`}
            >
              {t("Ваши водители")}
            </Heading>
          </Flex>
          <Flex
            width={`100%`}
            alignItems={`flex-end`}
            justifyContent={`space-between`}
          >
            <Box width={`40%`}>
              <InputGroup>
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  value={search}
                  className={cls.input}
                  placeholder={t("Имя водителя, номер машины или телефон")}
                  onChange={(e) => setSearchFn(e.target?.value)}
                />
              </InputGroup>
            </Box>

            <Flex gap={`16px`} justifyContent={`flex-end`} width={`50%`}>
              <Box>
                <p className={cls.label}>Выбор периода</p>
                <Flex gap={`16px`} alignItems={`center`}>
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
                          clearFn();
                          setStartDate(new Date());
                          setEndDate(new Date()),
                          setStartSelectDate(new Date());
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
                        clearFn();
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
                        clearFn();
                      }}
                    />
                  </Box>
                </Flex>
              </Box>

              {/* <Box className="dateWrap" width={`35%`}>
                <DatePicker
                  disabled={watch(`driver`)?.label === `Без диспетчера`}
                  isClearable={false}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  range
                  startDate={startDate}
                  onChange={clearFn}
                  setStartDate={setStartDate}
                  maxDate={new Date()}
                />
              </Box> */}
              <Box className="dateWrap" width={`35%`}>
                <p className={cls.label}>Диспетчер</p>
                <Dropdown
                  control={control}
                  required
                  register={register}
                  onChangeSelect={(e) => clearFn()}
                  clearFn={clearFn}
                  watch={watch}
                  name="driver"
                  options={userDisResOption?.map((item) => ({
                    value: item?.first_dispatcher_data?.guid,
                    label: item?.first_dispatcher_data?.full_name,
                  }))}
                  errors={errors}
                  placeholder={t("Все диспетчеры")}
                  setValue={setValue}
                  isClear
                />
              </Box>
            </Flex>
          </Flex>

          {data?.length > 0 && (
            <Box mt={"37px"}>
              <SarbonTable
                rowClassName={rowClassName}
                onRow={(row) => handleCheckboxChange(row)}
                variant="card"
                columns={columns}
                data={data}
              />
            </Box>
          )}

          {data?.length === 0 && !isLoading && (
            <Box mt={"37px"} className={cls.noData}>
              {t("Водители не найдены")}
            </Box>
          )}

          {isLoading && data?.length <= 50 && (
            <Box pt={`20px`}>
              <LoadingSpinner />
            </Box>
          )}

          {data?.length > 0 && (
            <Flex
              className={cls.sticiy}
              alignItems={`center`}
              justifyContent={`center`}
              mt={`20px`}
            >
              <Flex gap={`16px`} className={cls.addUser}>
                <p className={cls.addText}>
                  {t(`Выбрано`)}: {ids?.length}
                </p>
                <Button
                  isLoading={createDisLoading}
                  onClick={onOpen}
                  isDisabled={ids?.length === 0}
                  className={cls.btnAddLoad}
                >
                  {t(`Назначить диспетчера`)}
                </Button>
                {isRemoveDisBtn?.length > 0 && (
                  <Button
                    isLoading={removeDisLoading}
                    onClick={removeSubDis}
                    isDisabled={ids?.length === 0}
                    className={cls.btnAddLoad}
                  >
                    {t(`Открепить диспетчера`)}
                  </Button>
                )}

                {/* <Button
                  isLoading={deleteLoding}
                  onClick={deleteFuntion}
                  isDisabled={ids?.length === 0}
                  _disabled={{
                    background: `rgba(249, 245, 255, 1)`,
                    opacity: 0.5,
                  }}
                  className={cls.btnDelete}
                >
                  {t(`Удалить выбранные`)}
                </Button> */}
              </Flex>
            </Flex>
          )}

          <div>
            {data?.length >= 50 && (
              <Box
                position={`absolute`}
                zIndex={`876543`}
                bottom={`25px`}
                left={`32px`}
                width={`fit-contend`}
              >
                <Button
                  width={`fit-contend`}
                  isLoading={isLoading}
                  onClick={addPage}
                  className={cls.btnLoad}
                >
                  Загрузить еще 50
                </Button>
              </Box>
            )}
          </div>
        </Box>
      </Container>

      <ModalStatus
        open={open}
        setOpen={setOpen}
        statusData={statusData}
        setIconStatus={setIconStatus}
        iconStatus={iconStatus}
        cls={cls}
        statusIconChange={statusIconChange}
      />

      <ModalAddDis
        userdataDis={dataDis}
        userdata={userdata}
        open={isOpen}
        cls={cls}
        onClose={onClose}
        setUserData={setUserData}
        createDisLoading={createDisLoading}
        addUserFn={addSubDis}
        searchDis={searchDis}
        setSearchDIs={setSearchDIs}
        ids={ids}
      />
    </>
  );
};
