import { useTranslation } from "@/app/i18n/client";
import { FilterIconBlack, LocationMarkIcon } from "@/assets/icons/icons";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useGetNewPredData } from "@/services/api";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
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
  setDriverVal,
  setDisVal,
  setCarsArr,
  mapRef,
  disVal,
  driverVal,
  isFuelMap,
  setIsFuelMap,
  setCarType,
  car_type,
}) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation(locale);
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState();
  const [disName, setDisName] = useState();
  const [debouncedValueDriver] = useDebounce(watch(`driver_search`), 500);
  const [debouncedValue] = useDebounce(address, 800);

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

  const { data: getCarData } = useGetNewPredData({
    data: {
      data: {
        object_data: {
          search: debouncedValueDriver,
          type: "ceo",
          dispetchir_id: watch(`dispatcher`)?.value,
        },
      },
    },
    querySettings: {
      refetchOnWindowFocus: false,
      select: (res) =>
        res?.response?.map((item) => ({
          value: item?.users_data?.guid,
          label: item?.users_data?.full_name || ``,
          gps_data: item?.gps_data,
        })),
    },
  });

  const clearFn = () => {
    handleClear();
    setValue(`dispatcher`, {});
    setValue(`dis_search`, ``);
    setValue(`driver_search`, ``);
    setValue(`driver`, {});
    setDriverVal({});
    setDisVal({});
  };

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
          <p onClick={() => clearFn()} className={cls.clearBtn}>
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
                <p
                  style={{ marginLeft: `4px`, cursor: `default` }}
                  className={cls.additionalIcons}
                >
                  <LocationMarkIcon />
                </p>
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
            placeholder={t("Диспетчер")}
            label={t("Диспетчер")}
            name="dispatcher"
            options={searchUser}
            defaultValue={disVal}
            errors={errors}
            control={control}
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
            placeholder={t("Водитель")}
            label={t("Водитель")}
            name="driver"
            defaultValue={driverVal}
            options={getCarData}
            errors={errors}
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            clearable
            searchable
            clearFn={() => {
              setDriverVal(null);
            }}
            searchName="driver_search"
            isLoading={false}
            onChangeSelect={(e) => {
              setDriverVal(e);
              setCarsArr([]);
              handleInputClear();
            }}
          />
        </Box>

        <Box className={cls.cardWrap}>
          <Flex mb={`10px`} flexDirection={"column"} rowGap={2}>
            <Dropdown
              placeholder={t("Все типы кузова")}
              label={t("Отображать на карте")}
              name="car_type"
              defaultValue={car_type}
              clearFn={() => {
                setCarType(null);
              }}
              options={carTypeOptions}
              errors={errors}
              width="100%"
              control={control}
              watch={watch}
              handleInputClear={() => {
                setCarType(null);
              }}
              setValue={setValue}
              clearable
              onChangeSelect={(e) => {
                setCarType(e);
              }}
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
                handleCheckboxChange("our_cargo", "waiting_for_driver")
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
              defaultChecked={isFuelMap}
              onChange={(e) => setIsFuelMap(e.target.checked)}
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
