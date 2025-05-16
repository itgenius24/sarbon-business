import React from "react";
import cls from "./style.module.scss";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import {
  CloseStepIcon,
  DeleteStepIcon,
  IconAStep,
  IconBStep,
  IconCEnterStepTwoIcon,
  LoadStepIcon,
  LocationIconStep,
  LocationMarkIcon,
  NextArrowIcon,
  PlusIcon,
  PlusIocnStep,
} from "@/assets/icons/icons";
import useStepTwoProps from "./useStepTwoProps";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "react-i18next";
// import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import LoadingMap from "@/modules/Cargo/components/LoadingMap";
// import { Modal } from "@/components/ModalS";
import { ModalMap } from "@/components/ModalMap/Modal";
import { DatePickerComponent } from "@/components/DatePickerStep/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { ChakraSelect } from "@/components/ChakraSelect";
import { Checkbox } from "@/components/Checkbox";
import { ModalS } from "@/components/Modal";
import { TextFieldWithAdditionMap } from "@/components/TextFieldWithAddition/TextFieldWithAdditionMap";

const StepTwo = ({ status,locale }) => {
  const {
    // loadings,
    register,
    control,
    watch,
    setValue,
    handleAppendLoading,
    handleRemoveLoading,
    handleUnloadingAppend,
    handleUnloadingRemove,
    // unloading,
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
    setIsModalOpen,
    onMapClick,
    setYMaps,
    disabled,
    yandexMapRef,
    placeMarkGeometry,
    coordinates,
    setAddress,
    results,
    canEdit,
    setActiveIndex,
    activeIndex,
    hanleAdress,
    as_soon_as_b,
    loadingNumF,
    address,
    lodingChangeDate,
    as_soon_as_a,
    onCreateCargoSuccess,
    handLeCheck,
    handLeCheck2,
    handleResetForm,
    setDisabled,
    setEditModal,
  } = useStepTwoProps({locale});

  const { t } = useTranslation(locale, "translations");
  return (
    <Box className={cls.containerCards}>
      <Flex
        className={cls.addressContainer}
        position={`relative`}
        width={`100%`}
        gap={`24px`}
      >
        <Box className={cls.step}>
          {watch(`loadings`)?.map((item, index) => (
            <Flex key={index} width={"100%"} gap={"13px"}>
              <Box className={cls.buttonWrap}>
                {index === 0 ? (
                  <IconAStep />
                ) : (
                  <IconButton
                    border={"none"}
                    width={"fit-content"}
                    icon={<CloseStepIcon />}
                    onClick={() => handleRemoveLoading(index, item.guid)}
                    variant={"outline"}
                  />
                )}
              </Box>
              <Box width={"100%"}>
                <Flex
                  width={`100%`}
                  justifyContent={`space-between`}
                  alignItems={`center`}
                >
                  <Flex gap={"10px"}>
                    <Box className={cls.mobailIcon}>
                      <IconAStep />
                    </Box>
                    <p className={cls.stepTitle}>
                      {index === 0
                        ? t(`Адрес загрузки груза`)
                        : `${index + 1}-${t(`й адрес загрузки груза`)}`}
                    </p>
                  </Flex>
                  <Box className={cls.mobailIconButton}>
                    {index !== 0 && (
                      <IconButton
                        border={"none"}
                        width={"fit-content"}
                        icon={<CloseStepIcon />}
                        onClick={() => handleRemoveLoading(index, item.guid)}
                        variant={"outline"}
                      />
                    )}
                  </Box>
                  {/* {canEdit && <p className={cls.adressBtn}>Выбрать на карте</p>} */}
                </Flex>
                <Box gap={"24px"} mt={"20px"} mb={`20px`}>
                  <Box className={cls.locationWrap}>
                    <TextFieldWithAdditionMap
                      onClick={() => (!canEdit ? setEditModal(true) : null)}
                      disabled={!canEdit}
                      placeholder={t("Укажите пункт назначения")}
                      additionalItemTheme="white"
                      register={register}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" || e.key === "Delete") {
                          setDisabled(true);
                        }
                      }}
                      onChange={(e) => {
                        setActiveIndex(`loadings[${index}].address`),
                          setAddress(e.target.value);
                        setValue(`addressFrom`, e.target.value);
                      }}
                      name={`loadings[${index}].address`}
                      additionalOnclick={() =>
                        handleOpenModal(
                          `loadings[${index}].address`,
                          index,
                          "loading"
                        )
                      }
                      additionalItemPlaceholder={
                        <span className={cls.additionalIcons}>
                          <LocationMarkIcon />
                        </span>
                      }
                    />
                    {activeIndex === `loadings[${index}].address` &&
                      results.length > 0 &&
                      address?.length > 0 && (
                        <Box className={cls.optionsWrap}>
                          {results?.map((location, idx) => {
                            const text =
                              location?.GeoObject?.metaDataProperty
                                ?.GeocoderMetaData?.text || "";

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
                                onClick={() =>
                                  hanleAdress(
                                    location,
                                    `loadings[${index}].address`,
                                    index,
                                    "loading",
                                    item?.guid
                                  )
                                }
                                key={idx}
                                gap={3}
                                alignItems={"center"}
                              >
                                
                                <p
                                  className={cls.item}
                                  dangerouslySetInnerHTML={{
                                    __html: highlightText(text, address),
                                  }}
                                />
                              </Flex>
                            );
                          })}
                        </Box>
                      )}
                  </Box>
                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    width={"100%"}
                    mt={"20px"}
                  >
                    <Box width={"198px"}>
                      <span className={cls.label}>{t(`Когда забрать`)}</span>
                      <DatePickerComponent
                        width={198}
                        handleDisabled={() => setEditModal(true)}
                        showTimeSelect
                        timeFormat="HH:mm" // 24 soatlik format
                        timeIntervals={15}
                        isDisabled={!canEdit || watch(`as_soon_as_a`)}
                        canEdit={canEdit}
                        onChange={(date) => {
                          lodingChangeDate("loading", date, index, item?.guid);
                        }}
                        control={control}
                           minDate={
                          
                          new Date()
                        }
                        name={`loadings[${index}].from_date`}
                      />
                    </Box>
                    <Box mt={5}>
                      <PlusIocnStep />
                    </Box>
                    <Box width={"124px"}>
                      <span className={cls.label}>{t(`Ожидание`)}</span>
                      <ChakraSelect
                        isDisabled={!canEdit}
                        options={[
                          { label: 1, value: 1 },
                          { label: 2, value: 2 },
                          { label: 3, value: 3 },
                          { label: 4, value: 4 },
                          { label: 5, value: 5 },
                          { label: 6, value: 6 },
                          { label: 7, value: 7 },
                          { label: 8, value: 8 },
                          { label: 9, value: 9 },
                          { label: 10, value: 10 },
                        ]}
                        name={`loadings[${index}].loading_num`}
                        customOnChange={(e) =>
                          loadingNumF(e.value, index, item?.guid)
                        }
                        placeholder={t("5 дн. ")}
                        control={control}
                        isClearable={false}
                      />
                    </Box>
                    <Box
                      onClick={() => (!canEdit ? setEditModal(true) : null)}
                      className={cls.disabledCeck}
                      mt={5}
                    >
                      <Checkbox
                        isDisabled={!canEdit}
                        width={"16px"}
                        height={"16px"}
                        checked={watch(`as_soon_as_a`)}
                        defaultChecked={watch(`as_soon_as_a`)}
                        onChange={(e) => handLeCheck(e)}
                      >
                        {t(`Готов к загрузке`)}
                      </Checkbox>
                    </Box>
                  </Flex>
                  <Box className={cls.disabledCeckMobile} mt={5}>
                    <Checkbox
                      isDisabled={!canEdit}
                      width={"16px"}
                      height={"16px"}
                      checked={watch(`as_soon_as_a`)}
                      defaultChecked={watch(`as_soon_as_a`)}
                      onChange={(e) => handLeCheck(e)}
                    >
                      {t(`Готов к загрузке`)}
                    </Checkbox>
                  </Box>
                </Box>
              </Box>
            </Flex>
          ))}
          {!status && (
            <Button
              className={cls.button}
              // key="packagingBtn"
              leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
              variant="reset"
              onClick={handleAppendLoading}
              color="rgba(126, 123, 134, 1)"
              fontWeight={400}
              marginLeft={"40px"}
            >
              {t("Еще адрес")}
            </Button>
          )}
        </Box>

        <Flex justifyContent={`center`}>
          <Box className={cls.centerIcon}>
            <IconCEnterStepTwoIcon />
          </Box>
        </Flex>

        <Box className={cls.step}>
          {watch(`unloading`)?.map((item, index) => (
            <Flex key={index} width={"100%"} gap={"13px"}>
              <Box onClick={() => (!canEdit ? setEditModal(true) : null)} className={cls.buttonWrap}>
                {index === 0 ? (
                  <IconBStep />
                ) : (
                  <IconButton
                    isDisabled={!canEdit}
                    border={"none"}
                    width={"fit-content"}
                    icon={<CloseStepIcon />}
                    onClick={() => handleUnloadingRemove(index, item?.guid)}
                    variant={"outline"}
                  />
                )}
              </Box>

              <Box width={"100%"}>
                <Flex
                  width={`100%`}
                  justifyContent={`space-between`}
                  alignItems={`center`}
                >
                  <Flex gap={"10px"}>
                    <Box className={cls.mobailIcon}>
                      <IconBStep />
                    </Box>
                    <p className={cls.stepTitle}>
                      {index === 0
                        ? t(`Адрес доставки груза`)
                        : `${index + 1}-${t(`й адрес доставки груза`)}`}
                    </p>
                  </Flex>
                  <Box  onClick={() => (!canEdit ? setEditModal(true) : null)} className={cls.mobailIconButton}>
                    {index !== 0 && (
                      <IconButton
                        isDisabled={!canEdit}
                        border={"none"}
                        width={"fit-content"}
                        icon={<CloseStepIcon />}
                        onClick={() => handleUnloadingRemove(index, item?.guid)}
                        variant={"outline"}
                      />
                    )}
                  </Box>
                </Flex>

                <Box gap={"24px"} mt={"20px"} mb={`20px`}>
                  <Box className={cls.locationWrap}>
                    <TextFieldWithAdditionMap
                      // onlyFieldDisabled={true}
                      onClick={() => (!canEdit ? setEditModal(true) : null)}
                      disabled={!canEdit}
                      placeholder={t("Укажите пункт назначения")}
                      additionalItemTheme="white"
                      register={register}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" || e.key === "Delete") {
                          setDisabled(true);
                        }
                      }}
                      onChange={(e) => {
                        setActiveIndex(`unloading[${index}].address`),
                          setAddress(e.target.value);
                        setValue(`addressTo`, e.target.value);
                      }}
                      name={`unloading[${index}].address`}
                      // additionalOnclick={() => handleOpenModal("unloading", index)}
                      // onClick={() => handleOpenModal("unloading", index)}
                      additionalOnclick={() =>
                        handleOpenModal(
                          `unloading[${index}].address`,
                          index,
                          "unloading"
                        )
                      }
                      // onClick={() => router.push(`/${locale}/map/unloading/${index}`)}
                      // error={errors["unloading"]?.[index]?.["address"]}
                      additionalItemPlaceholder={
                        <span className={cls.additionalIcons}>
                          <LocationMarkIcon />
                        </span>
                      }
                    />
                    {activeIndex === `unloading[${index}].address` &&
                    results.length > 0 &&
                    address?.length > 0 ? (
                      <Box className={cls.optionsWrap}>
                        {results?.map((location, idx) => {
                          const text =
                            location?.GeoObject?.metaDataProperty
                              ?.GeocoderMetaData?.text || "";

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
                              onClick={() =>
                                hanleAdress(
                                  location,
                                  `unloading[${index}].address`,
                                  index,
                                  "unloading",
                                  item?.guid
                                )
                              }
                              key={idx}
                              gap={3}
                              alignItems={"center"}
                            >
                              
                              <p
                                className={cls.item}
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(text, address),
                                }}
                              />
                            </Flex>
                          );
                        })}
                      </Box>
                    ) : (
                      ``
                    )}
                  </Box>
                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    width={"fit-content"}
                    mt={"20px"}
                  >
                    <Box width={"198px"}>
                      <span className={cls.label}>{t(`Когда доставить`)}</span>
                      <DatePickerComponent
                        isDisabled={!canEdit || watch(`as_soon_as_b`)}
                        handleDisabled={() => setEditModal(true)}
                        canEdit={canEdit}
                        width={198}
                        showTimeSelect
                        timeFormat="HH:mm" // 24 soatlik format
                        timeIntervals={15}
                        onChange={(date) => {
                          lodingChangeDate(
                            "unLoading",
                            date,
                            index,
                            item?.guid
                          );
                        }}
                        control={control}
                        name={`unloading[${index}].to_date`}
                        minDate={
                          new Date(watch(`loadings[${index}].from_date`)) ||
                          new Date()
                        }
                      />
                    </Box>

                    <Box
                      onClick={() => (!canEdit ? setEditModal(true) : null)}
                      mt={5}
                    >
                      <Checkbox
                        isDisabled={!canEdit}
                        width={"16px"}
                        height={"16px"}
                        checked={watch(`as_soon_as_b`)}
                        defaultChecked={watch(`as_soon_as_b`)}
                        onChange={(e) => handLeCheck2(e)}
                      >
                        {t(`Как можно скорее`)}
                      </Checkbox>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          ))}
          {!status && (
            <Button
              className={cls.button}
              // key="packagingBtn"
              leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
              variant="reset"
              onClick={handleUnloadingAppend}
              color="rgba(126, 123, 134, 1)"
              fontWeight={400}
              marginLeft={"40px"}
            >
              {t("Еще адрес")}
            </Button>
          )}
        </Box>
      </Flex>

      <ModalS
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        firstBtnCallback={handleCloseModal}
        secondBtnCallback={() => {
          setIsModalOpen(false);
        }}
        title={t("Точка маршрута")}
        size="xxl"
      >
        <LoadingMap
          onMapClick={onMapClick}
          setYMaps={setYMaps}
          yandexMapRef={yandexMapRef}
          placeMarkGeometry={placeMarkGeometry}
          defaultState={{
            center: coordinates,
            zoom: 15,
          }}
        />
      </ModalS>
      {!status && (
        <Flex flexDirection={`column`} rowGap={`10px`}>
          <Button
            isDisabled={disabled}
            onClick={() => onCreateCargoSuccess()}
            rightIcon={<NextArrowIcon />}
            className={cls.nextBtn}
          >
            Далее
          </Button>
          <Button
            onClick={() => handleResetForm()}
            leftIcon={<DeleteStepIcon />}
            variant="secondaryWhite"
            color={`rgba(126, 123, 134, 1)`}
            fontWeight={500}
            fontSize={`14px`}
            className={cls.clearBtn}
          >
            Очистить форму
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default StepTwo;
