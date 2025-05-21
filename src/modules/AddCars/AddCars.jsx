"use client";

import { Container } from "@/components/Container";
import useProsp from "./useProsp";
import CreateDrivers from "./components/CreateDrivers";
import cls from "./style.module.scss";
import {
  Button,
  Heading,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Box,
} from "@chakra-ui/react";
import CreateCars from "./components/CreateCars";
import { CheckModalIcon } from "@/assets/icons/icons";

const AddCars = () => {
  const {
    isLargerThan845,
    register,
    errors,
    t,
    control,
    watch,
    setValue,
    locale,
    handleSubmit,
    onSubmit,
    isLoading,
    euroTypeOptions,
    setinputValue,
    isBtn,
    copyFunction,
    router,
    id,
    carTypeOptions,
    setLoadingFront,
    setLoadingDriver,
    loadingDriver,
    isOpen,
    onOpen,
    onClose,
    setLoadingBack,
    loadingBack,
    loadingFront,
    uploadAi,
    clearErrors,
    createLoading
  } = useProsp();

  return (
    <>
      <Container p={0} my={isLargerThan845 ? "40px" : `20px`}>
        <CreateDrivers
          register={register}
          errors={errors}
          t={t}
          control={control}
          watch={watch}
          setValue={setValue}
          isLargerThan845={isLargerThan845}
          cls={cls}
          id={id}
          uploadAi={uploadAi}
          setLoadingDriver={setLoadingDriver}
          loadingDriver={loadingDriver}
          clearErrors={clearErrors}
          setLoadingFront={setLoadingFront}
          setLoadingBack={setLoadingBack}
          loadingBack={loadingBack}
          loadingFront={loadingFront}
        />
        <CreateCars
          carTypeOptions={carTypeOptions}
          setinputValue={setinputValue}
          register={register}
          euroTypeOptions={euroTypeOptions}
          errors={errors}
          t={t}
          control={control}
          watch={watch}
          setValue={setValue}
          isLargerThan845={isLargerThan845}
          cls={cls}
          locale={locale}
          uploadAi={uploadAi}
          setLoadingFront={setLoadingFront}
          setLoadingBack={setLoadingBack}
          loadingBack={loadingBack}
          loadingFront={loadingFront}
          clearErrors={clearErrors}
        />

        <Flex pb={`20px`} className={cls.wrapBtn}>
          <Button
            isLoading={createLoading}
            isDisabled={isBtn}
            onClick={handleSubmit(onSubmit)}
            className={cls.nextBtn}
          >
            {t("Сохранить водителя")}
          </Button>
        </Flex>
      </Container>
      <Drawer placement="bottom" isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderRadius="12px 12px 0 0">
          <DrawerHeader>
            <CheckModalIcon />
          </DrawerHeader>
          <DrawerCloseButton top={`15px`} onClick={() => onClose()} />
          <DrawerBody>
            <Flex flexDirection={`column`} rowGap={`20px`}>
           
              <p style={{ fontWeight: 400, fontSize: "16px" }}>
                {t("Аккаунт водителя был создан. Необходимо войти в приложение Sarbon с номером")}: {watch("phone") || ""}
              </p>
        
            </Flex>
          </DrawerBody>
          <DrawerFooter mb={`20px`}>
            <Flex rowGap={`10px`} width={`100%`} flexDirection={`column`}>
              <Button
                onClick={() => copyFunction()}
                width={`100%`}
                backgroundColor={`var(--primary-text)`}
              >
                {t("Скопировать детали")}
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddCars;
