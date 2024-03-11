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

  return <div className={cls.formGroup}>
    <div className={cls.formContent}>
      <div className={cls.fields}>
        {
          loadings.map((loading, index) => {
            return <div className={cls.fieldsWrapper} key={loading.id}>
              <div className={cls.fieldsWrapperActions}>
                {
                  index === 0 && <h2 className={cls.heading}>Загрузка</h2>
                }
                {
                  index !== 0 && <Button
                    isDisabled={!canEdit}
                    variant="reset"
                    onClick={() => handleRemoveLoading(index)}
                    color="brand.700"
                    leftIcon={<DeleteIcon />}
                  >
                  Удалить
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
                  placeholder="Населённый пункт"
                  options={getAddressOptions}
                  errors={errors}
                  disabled={!canEdit}
                />
                <TextFieldWithAddition
                  placeholder="Адрес"
                  additionalItemTheme="white"
                  register={register}
                  name={`loadings[${index}].address`}
                  additionalOnclick={() => handleOpenModal("loadings", index)}
                  onClick={() => handleOpenModal("loadings", index)}
                  errors={errors}
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
      <h2 className={cls.fieldActionsHeading}>Добавить точку маршрута</h2>
      <div className={cls.fieldActionsButtons}>
        <Button isDisabled={!canEdit} onClick={handleAppendLoading} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">Загрузка</Button>
        <Button isDisabled={!canEdit} onClick={handleUnloadingAppend} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">Разгрузка</Button>
        <Button isDisabled={!canEdit} onClick={handleAppendLoading} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">Ехать через</Button>
        <Button isDisabled={!canEdit} onClick={handleAppendLoading} leftIcon={<PlusIcon color="#007AFF" />} variant="reset">Таможня</Button>
      </div>
    </div>
    <div className={cls.fields}>
      {
        unloading.map((loading, index) => {
          return <div className={cls.fieldsWrapper} key={loading.id}>
            <div className={cls.fieldsWrapperActions}>
              {
                index === 0 && <h2 className={cls.heading}>Разгрузка</h2>
              }
              {
                index !== 0 && <Button
                  isDisabled={!canEdit}
                  variant="reset"
                  onClick={() => handleUnloadingRemove(index)}
                  color="brand.700"
                  leftIcon={<DeleteIcon />}
                >
                  Удалить
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
                placeholder="Населённый пункт"
                options={getAddressOptions}
                errors={errors}
              />
              <TextFieldWithAddition
                onlyFieldDisabled={true}
                disabled={!canEdit}
                placeholder="Адрес"
                additionalItemTheme="white"
                register={register}
                name={`unloading[${index}].address`}
                additionalOnclick={() => handleOpenModal("unloading", index)}
                onClick={() => handleOpenModal("unloading", index)}
                errors={errors}
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
      <h2 className={cls.heading}>Маршрут</h2>
      <div className={cls.routeContent}>
        <Checkbox register={register} name="gps_monitoring" disabled={!canEdit}>
          <span className={cls.checkboxInner}>
            <span>Кругорейс</span>
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
      title="Точка маршрута"
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
