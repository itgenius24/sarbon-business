"use client";

import React from "react";
import { Dropdown } from "@/components/Dropdown";
import cls from "./styles.module.scss";
import { useLoadingFormProps } from "./useLoadingFormProps";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { DeleteIcon, DotPointIcon, HelpCircleIcon, LocationMarkIcon, PlusIcon } from "@/assets/icons/icons";
import { Button } from "@chakra-ui/react";
import { Checkbox } from "@/components/Checkbox";
import { Modal } from "@/components/Modal";
import LoadingMap from "../LoadingMap";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const LoadingForm = () => {

  const {
    control,
    loadings,
    register,
    watch,
    handleAppendLoading,
    handleRemoveLoading,
    handleUnloadingAppend,
    handleUnloadingRemove,
    unloading,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    getAddressOptions,
    errors,
    canEdit,
    coordinates,
    onMapClick,
    placeMarkGeometry,
    setYMaps,
    yandexMapRef,
    setIsModalOpen,
  } = useLoadingFormProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <div className={cls.formGroup}>
    <div className={cls.formContent}>
      <div className={cls.fields}>
        {
          loadings.map((loading, index) => {
            return <div className={cls.fieldsWrapper} key={loading.id}>
              <div className={cls.fieldsWrapperActions}>
                {
                  index === 0 && <h2 className={cls.heading}>{t("Загрузка")}</h2>
                }
                {
                  index !== 0 && <Button
                    isDisabled={!canEdit}
                    variant="reset"
                    onClick={() => handleRemoveLoading(index)}
                    color="brand.700"
                    leftIcon={<DeleteIcon />}
                  >
                    {t("Удалить")}
                  </Button>
                }
              </div>
              <div className={cls.field}>
                <Dropdown
                  control={control}
                  required
                  register={register}
                  watch={watch}
                  name={`loadings[${index}].location`}
                  placeholder={t("Населённый пункт")}
                  options={getAddressOptions}
                  error={errors["loadings"]?.[index]?.["location"]}
                  disabled={!canEdit}
                />
                <TextFieldWithAddition
                  placeholder={t("Адрес")}
                  additionalItemTheme="white"
                  register={register}
                  name={`loadings[${index}].address`}
                  additionalOnclick={() => handleOpenModal("loadings", index)}
                  onClick={() => handleOpenModal("loadings", index)}
                  error={errors["loadings"]?.[index]?.["address"]}
                  onlyFieldDisabled={true}
                  disabled={!canEdit}
                  additionalItemPlaceholder={
                    <span className={cls.additionalIcons}>
                      <LocationMarkIcon />
                      <DotPointIcon />
                    </span>
                  }
                />
              </div>
            </div>;
          })
        }
      </div>
    </div>
    <div className={cls.fieldActions}>
      <h2 className={cls.fieldActionsHeading}>{t("Добавить точку маршрута")}</h2>
      <div className={cls.fieldActionsButtons}>
        <Button isDisabled={!canEdit} onClick={handleAppendLoading} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">{t("Загрузка")}</Button>
        <Button isDisabled={!canEdit} onClick={handleUnloadingAppend} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">{t("Разгрузка")}</Button>
        {/* <Button isDisabled={!canEdit} onClick={handleAppendLoading} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">{t("Ехать через")}</Button>
        <Button isDisabled={!canEdit} onClick={handleAppendLoading} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">{t("Таможня")}</Button> */}
      </div>
    </div>
    <div className={cls.fields}>
      {
        unloading.map((loading, index) => {
          return <div className={cls.fieldsWrapper} key={loading.id}>
            <div className={cls.fieldsWrapperActions}>
              {
                index === 0 && <h2 className={cls.heading}>{t("Разгрузка")}</h2>
              }
              {
                index !== 0 && <Button
                  isDisabled={!canEdit}
                  variant="reset"
                  onClick={() => handleUnloadingRemove(index)}
                  color="brand.700"
                  leftIcon={<DeleteIcon />}
                >
                  {t("Удалить")}
                </Button>
              }
            </div>
            <div className={cls.field}>
              <Dropdown
                disabled={!canEdit}
                control={control}
                required
                register={register}
                watch={watch}
                name={`unloading[${index}].location`}
                placeholder={t("Населённый пункт")}
                options={getAddressOptions}
                error={errors["unloading"]?.[index]?.["location"]}
              />
              <TextFieldWithAddition
                onlyFieldDisabled={true}
                disabled={!canEdit}
                placeholder={t("Адрес")}
                additionalItemTheme="white"
                register={register}
                name={`unloading[${index}].address`}
                additionalOnclick={() => handleOpenModal("unloading", index)}
                onClick={() => handleOpenModal("unloading", index)}
                error={errors["unloading"]?.[index]?.["address"]}
                additionalItemPlaceholder={
                  <span className={cls.additionalIcons}>
                    <LocationMarkIcon />
                    <DotPointIcon />
                  </span>
                }
              />
            </div>
          </div>;
        })
      }
    </div>
    <div className={cls.route}>
      <h2 className={cls.heading}>{t("Маршрут")}</h2>
      <div className={cls.routeContent}>
        <Checkbox register={register} name="gps_monitoring" disabled={!canEdit}>
          <span className={cls.checkboxInner}>
            <span>{t("Кругорейс")}</span>
            <HelpCircleIcon />
          </span>
        </Checkbox>
      </div>
    </div>
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      firstBtnCallback={handleCloseModal}
      secondBtnCallback={() => setIsModalOpen(false)}
      title={t("Точка маршрута")}
      size="xl"
    >
      <LoadingMap
        onMapClick={onMapClick}
        setYMaps={setYMaps}
        yandexMapRef={yandexMapRef}
        placeMarkGeometry={placeMarkGeometry}
        defaultState={
          {
            center: [41.40587471972005, 69.46086540238926],
            zoom: 15,
          }
        }
      />
    </Modal>
  </div>;
};
