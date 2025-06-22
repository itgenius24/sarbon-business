import { FilterIconBlack, LocationMarkIcon } from "@/assets/icons/icons";
import { ChakraSelect } from "@/components/ChakraSelect";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useTranslation } from "@/app/i18n/client";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Filter = ({
  cls,
  locale,
  control,
  watch,
  register,
  setValue,
  errors,
  carTypeOptions,
  getUserOption,
  handleClear,
  checkboxStatuses,
  handleCheckboxChange,
  setModalType,
  handleInputClear,
  setLoadCheck,
  loadCheck,
  mapRef,
  isFuelMap,
  setIsFuelMap,
}) => {
  const { t } = useTranslation(locale);

  const [results, setResults] = useState([]);
  const [address, setAddress] = useState();
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
                <p
                  style={{ marginLeft: `4px`,cursor:`default` }}
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
              defaultChecked={isFuelMap}
              onChange={(e) => setIsFuelMap(e.target.checked)}
            >
              {t("Заправки")}
            </Checkbox>
          </Flex>
        </Box>
        <Box className={cls.cardWrap}>
          <Box>
            <p className={cls.checkCardTitle}>{t("Поиск по водителю")}</p>
            <ChakraSelect
              options={getUserOption}
              name="users_id"
              placeholder={t("Имя, номер телефона или номер машины...")}
              control={control}
            />
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default Filter;
