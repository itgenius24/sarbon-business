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

        <Flex className={cls.wrapBtn}>
          <Button
            isLoading={isLoading}
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
              <p style={{ fontWeight: 600, fontSize: "20px" }}>
                {t("Водитель успешно добавлен в систему")}
              </p>
              <p style={{ fontWeight: 400, fontSize: "16px" }}>
                {t("Передайте ему данные для входа в приложение Sarbon")}:
              </p>
              <Box
                borderRadius={`8px`}
                padding={`10px`}
                backgroundColor={`rgba(237, 239, 245, 1)`}
                gap={`20px`}
              >
                <Flex>
                  <p
                    style={{
                      width: `100px`,
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    {t("Его логин")}:
                  </p>
                  <p style={{ fontWeight: 500, fontSize: "16px" }}>
                    {watch(`phone`)}
                  </p>
                </Flex>
                <Flex>
                  <p
                    style={{
                      width: `100px`,
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    {t("Его пароль")}:
                  </p>
                  <p style={{ fontWeight: 500, fontSize: "16px" }}>
                    {watch(`password`)}
                  </p>
                </Flex>
              </Box>
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
              <Button
                style={{
                  background: "white",
                  border: "1px solid rgba(208, 213, 221, 1)",
                  color: "black",
                }}
                className={cls.btngreen}
                onClick={() => router.push(`/${locale}/drivers`)}
              >
                {t("Отправить как смс")}
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddCars;
