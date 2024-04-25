"use client";

import React from "react";
import cls from "./styles.module.scss";
import { useLoadingFormProps } from "./useLoadingFormProps";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { DeleteIcon, HelpCircleIcon, LocationMarkIcon, PlusIcon } from "@/assets/icons/icons";
import { Button } from "@chakra-ui/react";
import { Checkbox } from "@/components/Checkbox";
import { Modal } from "@/components/Modal";
import LoadingMap from "../LoadingMap";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import Script from "next/script";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import { DeleteButton } from "@/components/DeleteButton";
import clsx from "clsx";

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
    errors,
    canEdit,
    coordinates,
    onMapClick,
    placeMarkGeometry,
    setYMaps,
    yandexMapRef,
    setIsModalOpen,
    setValue,
    initYmaps,
    router,
  } = useLoadingFormProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <div className={cls.formGroup}>
    {/* <Script
      onLoad={() => ymaps.ready(calculateDistance)}
      src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&load=package.full&lang=en_US`}
    /> */}
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
                  index !== 0 && <DeleteButton
                    isDisabled={!canEdit}
                    variant="reset"
                    onClick={() => handleRemoveLoading(index)}
                  >
                    {t("Загрузка")}
                  </DeleteButton>
                }
              </div>
              <div className={cls.field}>
                {
                  index === 0 && <DropdownWrapper
                    searchable
                    disabled={!canEdit}
                    control={control}
                    required
                    register={register}
                    watch={watch}
                    name={`loadings[${index}].location`}
                    placeholder={t("Населённый пункт")}
                    error={errors["loadings"]?.[index]?.["location"]}
                    searchName={`loadings[${index}].search`}
                    setValue={setValue}
                  />
                }
                <div className={cls.addressLinkWrapper}>
                  <a className={clsx(cls.addressLink, { [cls.disabledLink]: !canEdit })} href={`/${locale || "ru"}/map/loadings/${index}`} />
                  <TextFieldWithAddition
                    placeholder={t("Адрес")}
                    additionalItemTheme="white"
                    register={register}
                    name={`loadings[${index}].address`}
                    // additionalOnclick={() => handleOpenModal("loadings", index)}
                    // onClick={() => handleOpenModal("loadings", index)}
                    // additionalOnclick={() => router.push(`/${locale}/map/loadings/${index}`)}
                    // onClick={() => router.push(`/${locale}/map/loadings/${index}`)}
                    error={errors["loadings"]?.[index]?.["address"]}
                    onlyFieldDisabled={true}
                    disabled={!canEdit}
                    additionalItemPlaceholder={
                      <span className={cls.additionalIcons}>
                        <LocationMarkIcon />
                      </span>
                    }
                  />
                </div>
              </div>
            </div>;
          })
        }
      </div>
    </div>
    <div className={cls.fieldActions}>
      <h2 className={cls.fieldActionsHeading}>{t("Добавить точку маршрута")}</h2>
      <div className={cls.fieldActionsButtons}>
        <Button isDisabled={!canEdit} onClick={handleAppendLoading} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">{t("Ехать через")}</Button>
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
                index !== 0 && <DeleteButton
                  isDisabled={!canEdit}
                  variant="reset"
                  onClick={() => handleUnloadingRemove(index)}
                >
                  {t("Разгрузка")}
                </DeleteButton>
              }
            </div>
            <div className={cls.field}>
              {
                index === 0 && <DropdownWrapper
                  searchable
                  disabled={!canEdit}
                  control={control}
                  required
                  register={register}
                  watch={watch}
                  name={`unloading[${index}].location`}
                  placeholder={t("Населённый пункт")}
                  error={errors["unloading"]?.[index]?.["location"]}
                  searchName={`unloading[${index}].search`}
                  setValue={setValue}
                />
              }
              <div className={cls.addressLinkWrapper}>
                <a className={clsx(cls.addressLink, { [cls.disabledLink]: !canEdit })} href={`/${locale || "ru"}/map/unloading/${index}`}></a>
                <TextFieldWithAddition
                  onlyFieldDisabled={true}
                  disabled={!canEdit}
                  placeholder={t("Адрес")}
                  additionalItemTheme="white"
                  register={register}
                  name={`unloading[${index}].address`}
                  // additionalOnclick={() => handleOpenModal("unloading", index)}
                  // onClick={() => handleOpenModal("unloading", index)}
                  // additionalOnclick={() => router.push(`/${locale}/map/unloading/${index}`)}
                  // onClick={() => router.push(`/${locale}/map/unloading/${index}`)}
                  error={errors["unloading"]?.[index]?.["address"]}
                  additionalItemPlaceholder={
                    <span className={cls.additionalIcons}>
                      <LocationMarkIcon />
                    </span>
                  }
                />
              </div>
            </div>
          </div>;
        }).reverse()
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
    {/* <Modal
      isDisabled={!canEdit}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      firstBtnCallback={handleCloseModal}
      secondBtnCallback={() => setIsModalOpen(false)}
      title={t("Точка маршрута")}
      size="xl"
    >
      <LoadingMap
        isDisabled={!canEdit}
        onMapClick={onMapClick}
        setYMaps={setYMaps}
        yandexMapRef={yandexMapRef}
        placeMarkGeometry={placeMarkGeometry}
        defaultState={
          {
            center: coordinates,
            zoom: 15,
          }
        }
      />
    </Modal> */}
  </div>;
};
