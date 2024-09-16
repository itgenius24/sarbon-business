import React from "react";
import cls from "./style.module.scss";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import {
  CloseStepIcon,
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
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import LoadingMap from "@/modules/Cargo/components/LoadingMap";
import { Modal } from "@/components/Modal";
import { ModalMap } from "@/components/ModalMap/Modal";
import { DatePickerComponent } from "@/components/DatePickerStep/DatePicker";
import { Dropdown } from "@/components/Dropdown";
import { ChakraSelect } from "@/components/ChakraSelect";
import { Checkbox } from "@/components/Checkbox";

const StepTwo = ({setCargoIndex}) => {
  const {
    loadings,
    register,
    control,
    watch,
    setValue,
    handleAppendLoading,
    handleRemoveLoading,
    handleUnloadingAppend,
    handleUnloadingRemove,
    unloading,
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
    setIsModalOpen,
    onMapClick,
    setYMaps,
    yandexMapRef,
    placeMarkGeometry,
    coordinates,
    setAddress,
    results,
    setActiveIndex,
    activeIndex,
    hanleAdress,
    address,
  } = useStepTwoProps();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");

  return (
    <>
      <Flex position={`relative`} width={`100%`} gap={`24px`}>
        <Box className={cls.step}>
          {loadings?.map((item, index) => (
            <Flex key={index} width={"100%"} gap={"13px"}>
              {index === 0 ? (
                <IconAStep />
              ) : (
                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={() => handleRemoveLoading(index)}
                  variant={"outline"}
                />
              )}
              <Box width={"100%"}>
                <Flex justifyContent={`space-between`} alignItems={`center`}>
                  <p className={cls.stepTitle}>
                    {index === 0
                      ? ` Адрес загрузки груза`
                      : `${index + 1}-й адрес загрузки груза `}
                  </p>
                  <p className={cls.adressBtn}>Выбрать на карте</p>
                </Flex>
                <Box gap={"24px"} mt={"20px"} mb={`20px`}>
                  <Box className={cls.locationWrap}>
                    <TextFieldWithAddition
                      // onlyFieldDisabled={true}
                      // disabled={!canEdit}
                      placeholder={t("Укажите пункт назначения")}
                      additionalItemTheme="white"
                      register={register}
                      onChange={(e) => {
                        setActiveIndex(`loadings[${index}].address`),
                        setAddress(e.target.value);
                      }}
                      name={`loadings[${index}].address`}
                      // additionalOnclick={() => handleOpenModal("unloading", index)}
                      // onClick={() => handleOpenModal("unloading", index)}
                      additionalOnclick={() =>
                        handleOpenModal(
                          `loadings[${index}].address`,
                          index,
                          "loading"
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
                    {activeIndex === `loadings[${index}].address` &&
                      results.length > 0 &&
                      address?.length > 0 && (
                      <Box className={cls.optionsWrap}>
                        {results?.map((location, idx) => (
                          <Flex
                            onClick={() =>
                              hanleAdress(
                                location,
                                `loadings[${index}].address`,
                                index,
                                "loading"
                              )
                            }
                            key={idx}
                            gap={3}
                            alignItems={"center"}
                          >
                            <LocationIconStep />

                            <p className={cls.item}>
                              {location?.GeoObject?.name}
                            </p>
                          </Flex>
                        ))}
                      </Box>
                    )}
                  </Box>
                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    width={"fit-content"}
                    mt={"20px"}
                  >
                    <Box width={"154px"}>
                      <span className={cls.label}>Когда забрать</span>
                      <DatePickerComponent
                        control={control}
                        name={`loadings[${index}].to_date`}
                      />
                    </Box>
                    <Box mt={5}>
                      <PlusIocnStep />
                    </Box>
                    <Box width={"12 4px"}>
                      <span className={cls.label}>Ожидание</span>
                      <ChakraSelect
                        options={[]}
                        name="ojidaniya"
                        placeholder={t("5 дн. ")}
                        control={control}
                      />
                    </Box>
                    <Box mt={5} >
                      <Checkbox
                        width={"16px"}
                        height={"16px"}
                        // defaultChecked={checkboxStatuses.broke_down}
                        onChange={() => {}}
                      >
                         Как можно скорее
                      </Checkbox>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          ))}
          <Button
            // key="packagingBtn"
            leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
            variant="reset"
            onClick={handleAppendLoading}
            color="rgba(126, 123, 134, 1)"
            fontWeight={400}
            marginLeft={"40px"}
          >
            {t("Еще адрес ")}
          </Button>
        </Box>

        <Box className={cls.centerIcon}>
          <IconCEnterStepTwoIcon />
        </Box>

        <Box className={cls.step}>
          {unloading.map((item, index) => (
            <Flex key={index} width={"100%"} gap={"13px"}>
              {index === 0 ? (
                <IconBStep />
              ) : (
                <IconButton
                  border={"none"}
                  width={"fit-content"}
                  icon={<CloseStepIcon />}
                  onClick={() => handleUnloadingRemove(index)}
                  variant={"outline"}
                />
              )}
              <Box width={"100%"}>
                <Flex justifyContent={`space-between`} alignItems={`center`}>
                  <p className={cls.stepTitle}>
                    {index === 0
                      ? ` Адрес доставки груза`
                      : `${index + 1}-й адрес доставки груза `}
                  </p>
                  <p className={cls.adressBtn}>Выбрать на карте</p>
                </Flex>
                <Box gap={"24px"} mt={"20px"} mb={`20px`}>
                  <Box className={cls.locationWrap}>
                    <TextFieldWithAddition
                      // onlyFieldDisabled={true}
                      // disabled={!canEdit}
                      placeholder={t("Укажите пункт назначения")}
                      additionalItemTheme="white"
                      register={register}
                      onChange={(e) => {
                        setActiveIndex(`unloading[${index}].address`),
                        setAddress(e.target.value);
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
                      address?.length && (
                      <Box className={cls.optionsWrap}>
                        {results?.map((location, idx) => (
                          <Flex
                            onClick={() =>
                              hanleAdress(
                                location,
                                `unloading[${index}].address`,
                                index,
                                "unloading"
                              )
                            }
                            key={idx}
                            gap={3}
                            alignItems={"center"}
                          >
                            <LocationIconStep />
                            <p className={cls.item}>
                              {location?.GeoObject?.name}
                            </p>
                          </Flex>
                        ))}
                      </Box>
                    )}
                  </Box>
                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    width={"fit-content"}
                    mt={"20px"}
                  >
                    <Box width={"154px"}>
                      <span className={cls.label}>Когда доставить</span>
                      <DatePickerComponent
                        control={control}
                        name={`unloading[${index}].to_date`}
                      />
                    </Box>
                 
              
                    <Box mt={5} >
                      <Checkbox
                        width={"16px"}
                        height={"16px"}
                        // defaultChecked={checkboxStatuses.broke_down}
                        onChange={() => {}}
                      >
                         Как можно скорее
                      </Checkbox>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          ))}
          <Button
            // key="packagingBtn"
            leftIcon={<PlusIcon color="rgba(126, 123, 134, 1)" />}
            variant="reset"
            onClick={handleUnloadingAppend}
            color="rgba(126, 123, 134, 1)"
            fontWeight={400}
            marginLeft={"40px"}
          >
            {t("Еще адрес ")}
          </Button>
        </Box>
      </Flex>
      {/* {
        isModalOpen && <ModalMap onClose={handleCloseModal}>
          <LoadingMap
            onMapClick={onMapClick}
            setYMaps={setYMaps}
            yandexMapRef={yandexMapRef}
            placeMarkGeometry={placeMarkGeometry}
            defaultState={{
              center:  placeMarkGeometry ? placeMarkGeometry : [41.299497, 69.240076],
              zoom: 15,
            }}
          />
        </ModalMap>
      } */}
      <Modal
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
      </Modal>
      <Button onClick={() => setCargoIndex(3) } rightIcon={<NextArrowIcon />} className={cls.nextBtn}>
        Далее
      </Button>
    </>
  );
};

export default StepTwo;
