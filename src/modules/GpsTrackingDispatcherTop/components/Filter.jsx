import { FilterIconBlack, LocationMarkIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useTranslation } from "@/app/i18n/client";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useForm } from "react-hook-form";
import { useGetCarData } from "@/services/api";
import authStore from "@/store/auth.store";

const Filter = ({
  cls,
  locale,
  carTypeOptions,
  handleClear,
  checkboxStatuses,
  handleCheckboxChange,
  setModalType,
  handleInputClear,
  setLoadCheck,
  loadCheck,
  dataDis,
  setCarsArr,
  mapRef,
  setDisVal,
  setDriverVal,
  disVal,driverVal,
}) => {
  const { t } = useTranslation(locale);

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState();
  const [debouncedValue] = useDebounce(address, 800);
  const [debouncedValueDriver] = useDebounce(watch(`driver_search`), 500);
  const [disName, setDisName] = useState();

  const hanleAdress = (location, name) => {
    mapRef.current.setCenter(
      location?.GeoObject?.Point?.pos.split(` `).reverse(),
      11
    );

    setValue(name, `${location?.GeoObject?.name}`);
    setResults([]);
  };

  const handleGeocode = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY;
    const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${debouncedValue}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.response) {
        const geoObjects = data.response.GeoObjectCollection.featureMember;
        setResults(geoObjects);
      } else {
        console.log("Manzil topilmadi");
      }
    } catch (error) {
      console.error("Geokodlashda xatolik:", error);
    }
  };

  useEffect(() => {
    if (debouncedValue?.length >= 3) {
      handleGeocode();
    }
  }, [debouncedValue]);

  const searchUser = useMemo(() => {
    if (disName) {
      return dataDis?.filter((user) =>
        user?.label?.toLowerCase()?.includes(disName?.toLowerCase())
      );
    } else {
      return dataDis;
    }
  }, [disName, dataDis]);

  const { data: getCarData } = useGetCarData({
    data: {
      data: {
        object_data: {
          page: debouncedValueDriver?.length > 0 ? 0 : 1,
          search: debouncedValueDriver,
          limit: debouncedValueDriver?.length > 0 ? 1000 : 500,
          type: "dispatcher",
          dispatcher_id: authStore.userData.guid,
          first_dispatcher_id: watch(`dispatcher`)?.value,
          sort_time: `default`,
        },
      },
    },
    querySettings: {
      refetchOnWindowFocus: false,
      select: (res) =>
        res?.response
          ?.filter((item) => item?.gps_data)
          ?.map((item) => ({
            value: item?.guid,
            label: item?.full_name,
            gps_data: item?.gps_data,
          })),
    },
  });

  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={4} alignItems={"flex-start"}>
        <Flex
          mb={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Flex
            onClick={() => {
              setModalType(``);
            }}
            alignItems={"center"}
            gap={"10px"}
          >
            <FilterIconBlack />{" "}
            <span className={cls.filterText}>{t("Фильтр")}</span>
          </Flex>
          <p onClick={() => handleClear()} className={cls.clearBtn}>
            {t("Сбросить")}
          </p>
        </Flex>
        <Box className={cls.cardWrap}>
          <Box mb={`10px`} className={cls.locationWrap}>
            <TextFieldWithAddition
                 placeholder={t("Город или страна")}
              rules={{ required: true }}
              label={t("Поиск на карте")}
              additionalItemTheme="white"
              register={register}
              name={"address"}
              error={errors["address"]}
              onChange={(e) => {
                setAddress(e.target.value);
                if (e.target.value.length === 0) {
                  setValue(`address`, ``);
                }
              }}
              onlyFieldDisabled={false}
              additionalItemPlaceholder={
                <span className={cls.additionalIcons}>
                  <LocationMarkIcon />
                </span>
              }
            />
            {results.length > 0 && address?.length > 0 && (
              <Box className={cls.optionsWrap}>
                {results?.map((location, idx) => {
                  const text = location?.GeoObject?.name || "";

                  const highlightText = (text, search) => {
                    if (!search) return text;
                    const regex = new RegExp(`(${search})`, "gi");
                    return text.replace(
                      regex,
                      `<span class="${cls.bold}">$1</span>`
                    );
                  };
                  return (
                    <Flex
                      onClick={() => hanleAdress(location, "address")}
                      key={idx}
                      gap={3}
                      alignItems={"center"}
                    >
                      <p
                        className={cls.item}
                        dangerouslySetInnerHTML={{
                          __html: highlightText(text, address),
                        }}
                      />{" "}
                    </Flex>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
        <Box
          display={`flex`}
          flexDirection={`column`}
          rowGap={`10px`}
          className={cls.cardWrap}
        >
          <Dropdown
            placeholder={t("Все диспетчеры")}
            inputPlaceholder={t(`Все диспетчеры`)}
            label={t("Диспетчер")}
            name="dispatcher"
            options={searchUser}
            errors={errors}
            control={control}
            defaultValue={disVal}
            watch={watch}
            setValue={setValue}
            clearFn={() => {
              setDisName(``);
              setDisVal(null);
            }}
            clearable
            searchable
            register={register}
            searchName="dis_search"
            onSearchChange={(e) => setDisName(e.target.value)}
            onChangeSelect={(e) => {
              setDisVal(e);
              setCarsArr([]);
              handleInputClear();
            }}
          />
          <Dropdown
            inputPlaceholder={t(`Все водители`)}
            defaultValue={driverVal}
            placeholder={t("Водитель")}
            label={t("Водитель")}
            name="driver"
            options={getCarData}
            errors={errors}
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            handleInputClear={handleInputClear}
            clearable
            searchable
            searchName="driver_search"
            isLoading={false}
            clearFn={() => {
              setDriverVal(null);
            }}
            onChangeSelect={(e) => {
              setDriverVal(e);
              setCarsArr([]);
              handleInputClear;
            }}
          />
        </Box>

        <Box className={cls.cardWrap}>
          <Flex mb={`10px`} flexDirection={"column"} rowGap={2}>
            <Dropdown
              placeholder={t("Все типы кузова")}
              label={t("Отображать на карте")}
              name="car_type"
              options={carTypeOptions}
              errors={errors}
              width="100%"
              control={control}
              watch={watch}
              handleInputClear={handleInputClear}
              setValue={setValue}
              clearable
            />
          </Flex>
          <Flex mt={2} flexDirection={"column"} rowGap={2}>
            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={checkboxStatuses.empty}
              onChange={() => handleCheckboxChange("empty")}
            >
              {t("Свободные машины")}
            </Checkbox>

            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={checkboxStatuses.our_cargo}
              onChange={() =>
                handleCheckboxChange("our_cargo", `waiting_for_driver`)
              }
            >
              {t("Занятые с нашим грузом")}
            </Checkbox>

            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={checkboxStatuses.someone_cargo}
              onChange={() => handleCheckboxChange("someone_cargo")}
            >
              {t("Занятые с чужим грузом")}
            </Checkbox>

            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={checkboxStatuses.broke_down}
              onChange={() => handleCheckboxChange("broke_down")}
            >
              {t("Сломанные машины")}
            </Checkbox>

            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={loadCheck}
              onChange={() => setLoadCheck(!loadCheck)}
            >
              {t("Грузы")}
            </Checkbox>
            <Checkbox
              width={"16px"}
              height={"16px"}
              defaultChecked={Boolean(watch(`refuelingState`))}
              onChange={() =>
                setValue(`refuelingState`, !watch(`refuelingState`))
              }
            >
              {t("Заправки")}
            </Checkbox>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default Filter;
