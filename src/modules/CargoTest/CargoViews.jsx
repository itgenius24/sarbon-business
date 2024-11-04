import cls from "./styles.module.scss";
import {
  CheckIconStep,
  CricleBlueIcon,
  CricleIcon,
  DeleteIcon,
  PencilIcon,
  PencilIconW,
  PlusIcon,
  SearchIcon,
} from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { AddCargoProvider } from "./providers";
import { useAddCargoProps } from "./useAddCargoProps";

import { Popup } from "@/components/Popup";
import { useTranslation } from "@/app/i18n/client";
// import { Modal } from "@/components/Modal";

import { observer } from "mobx-react-lite";
import { TextField } from "@/components/TextField";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import { CargoDetail } from "./components/CargoDetail";
import { TopContent } from "../Cargo/components/TopContent";
import Link from "next/link";
import { statuses } from "@/utils/constants";


export const CargoViews = observer(({ id, status, locale }) => {
  const [cargoIndex, setCargoIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const addCargoProps = useAddCargoProps({ id, status, locale, setCargoIndex });
  const isEditing = !!id;

  const { t } = useTranslation(locale, "translations");

  const [isLargerThan1190] = useMediaQuery("(min-width: 1190px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  useEffect(() => {
    if (
      status === "active" ||
      status === "in_active" ||
      status === "in_moderation"
    ) {
      addCargoProps.handleEditActiveToggle();
    }
  }, []);

  const closePopup = () => {
    setOpen(false);
  };

  function getTopContent() {
    if (status === "in_moderation") {
      return (
        <Box
          display="flex"
          flexDirection={!isLargerThan800 ? "column" : "row"}
          justifyContent="space-between"
          alignItems={!isLargerThan800 ? "start" : "center"}
          mb="18px"
        >
      
          <Heading fontSize={!isLargerThan800 ? "24px" : "30px"} size="md">
            {!addCargoProps.canEdit ? (
              <>
                {
                  console.log(`addCargoProps.address2`,addCargoProps.address2)
                }
                {addCargoProps.address1} - {addCargoProps.address2}
                {/* <Text as="span" color="brand.500">
                  {addCargoProps.distance} km
                </Text> */}
              </>
            ) : (
              `Редактировать груз`
            )}
          </Heading>
          {!addCargoProps.canEdit ? (
            <Box display="flex" columnGap="8px">
              <Button
                leftIcon={<DeleteIcon />}
                size="sm"
                maxWidth="323px"
                variant="secondaryWhite"
                onClick={addCargoProps.handleOpenDeletePopup}
                border="1px solid #D0D5DD"
              >
                {t("Удалить")}
              </Button>

              <Button
                leftIcon={<PencilIconW />}
                size="sm"
                maxWidth="323px"
                paddingLeft={`30px`}
                paddingRight={`30px`}
                onClick={() => setOpen(true)}
              >
                {t("Редактировать")}
              </Button>
            </Box>
          ) : (
            <Box display="flex" columnGap="8px">
              <Button
                //  leftIcon={<DeleteIcon  />}
                size="sm"
                maxWidth="323px"
                variant="secondaryWhite"
                paddingRight={`30px`}
                onClick={addCargoProps.handleEditToggle}
                border="1px solid #D0D5DD"
              >
                {t("Отменить изменения")}
              </Button>

              <Button
                leftIcon={<PencilIconW />}
                size="sm"
                maxWidth="323px"
                paddingLeft={`30px`}
                paddingRight={`30px`}
                onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}
              >
                {t("Сохранить изменения")}
              </Button>
            </Box>
          )}
        </Box>
      );
    } else if (status === "new" || status === "performed") {
      return (
        
     <>
 
         <TopContent
          status={status}
          address1={addCargoProps.address1}
          address2={addCargoProps.address2}
          city1={addCargoProps.city1}
          city2={addCargoProps.city2}
          userName={addCargoProps.userName}
          proposedAmount={addCargoProps.proposedAmount}
          rating={addCargoProps.rating}
          transportModel={addCargoProps.transportModel}
          phoneNumber={addCargoProps.phoneNumber}
          prepayment={addCargoProps.prepayment}
          paymentAfterFinish={addCargoProps.paymentAfterFinish}
          driverComment={addCargoProps.driverComment}
          permission={addCargoProps.permission}
          currency={addCargoProps.currency}
          distance={addCargoProps.distance}
          userId2={addCargoProps.userId2}
          getMaps={addCargoProps.getMaps}
          id={id}
        />
     </>
      );
    }

    return <></>;
  }

  console.log(`getTopContent`,getTopContent())

  return (
    <AddCargoProvider value={{ ...addCargoProps, isEditing }}>
      <Box pt={isLargerThan1190 ? "48px" : "24px"} pb="128px">
        <Container height="100%">
          {isEditing && (
            <Breadcrumb
              mb="16px"
              separator={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="4"
                  viewBox="0 0 4 4"
                  fill="none"
                >
                  <circle cx="2" cy="2" r="2" fill="#98A2B3" />
                </svg>
              }
            >
              <BreadcrumbItem color="#98A2B3">
                <Link href="/my-loads">{t("Мои грузы")}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink color="#344054">
                  {t(statuses[status])}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          )}
          {!isLargerThan1190 && !isEditing && (
            <Heading fontSize="22px">{t("Добавить груз")}</Heading>
          )}
          <Box
            className={cls.contentWrapper}
            as="article"
            height="100%"
            display="flex"
            alignItems="flex-start"
            columnGap="32px"
          >
            <Box flexGrow={1} maxW="100%" width="100%" as="form">
              {isEditing ? (
                <>
                  {getTopContent()}
                </>
              ) : (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb="32px"
                >
                  {isLargerThan1190 && (
                    <Heading size="md">{t("Добавить груз")}</Heading>
                  )}
                  <Box
                    className={cls.topButtons}
                    display="flex"
                    columnGap="12px"
                  >
                    <Button
                      className={cls.topButton}
                      onClick={addCargoProps.handleOpenModal}
                      leftIcon={<PlusIcon />}
                      size="sm"
                    >
                      {t("Заполнить из шаблона")}
                    </Button>
                    <Button
                      className={cls.topButton}
                      leftIcon={<DeleteIcon color="#344054" />}
                      onClick={() => addCargoProps.handleResetForm()}
                      variant="secondaryWhite"
                      size="sm"
                      border="1px solid #D0D5DD"
                    >
                      {t("Очистить форму")}
                    </Button>
                  </Box>
                </Box>
              )}

              {status === "performed" ? (
                <Accordion mt={4} allowToggle>
                  <AccordionItem className={cls.accordionItem}>
                    <AccordionButton className={cls.accordionButton}>
                      <Heading fontSize="24px" mb="10px">
                        {t("Детали груза")}
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <CargoDetail status={status} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ) : (
                <>
                  <CargoDetail status={status} />
                </>
              )}
            </Box>
          </Box>
          {!isEditing && (
            <Box mt="32px">
              <Checkbox name="accept" register={addCargoProps.register} filled>
                <Text fontSize="14px" maxWidth="396px" width="100%">
                  {t("Нажимая кнопку, вы принимаете условия")}{" "}
                  <a style={{ color: "#026FE7", fontWeight: "600" }} href="">
                    {t("Пользовательская  соглашения")}
                  </a>
                </Text>
              </Checkbox>
              <Box
                mt="16px"
                display="flex"
                columnGap="12px"
                justifyContent="flex-start"
                maxWidth="900px"
              >
                <Button
                  onClick={addCargoProps.handleOpenTemplateModal}
                  // isLoading={addCargoProps.loading}
                  size="sm"
                  maxWidth="223px"
                  variant="secondaryWhite"
                >
                  {t("Сохранить как шаблон")}
                </Button>
                <Button
                  isDisabled={
                    !addCargoProps.watch("accept") || addCargoProps?.isClicked
                  }
                  isLoading={addCargoProps.loading}
                  size="sm"
                  maxWidth="223px"
                  onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}
                >
                  {t("Опубликовать груз")}
                </Button>
              </Box>
            </Box>
          )}
          {/* {addCargoProps.isDirty && addCargoProps.canEdit && isEditing && (
            <Box display="flex" columnGap="12px" mt="32px" maxWidth="900px">
              <Button
                size="sm"
                maxWidth="223px"
                variant="secondaryWhite"
                onClick={addCargoProps.onCancelClick}
              >
                Отменить
              </Button>
              <Button
                isLoading={addCargoProps.loading}
                size="sm"
                maxWidth="223px"
                onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}
              >
                {t("Сохранить изменение")}
              </Button>
            </Box>
          )} */}

          {addCargoProps.canEditActive &&
            (status === "active" ||
              status === "in_active" ||
              status === "in_moderation") && (
              <Box
                display="flex"
                justifyContent={`flex-end`}
                columnGap="12px"
                mt="32px"
                width={`100%`}
              >
                {!addCargoProps.canEdit ? (
                  <Box display={`flex`} columnGap="8px">
                    <Button
                      leftIcon={<DeleteIcon />}
                      size="sm"
                      maxWidth="323px"
                      variant="secondaryWhite"
                      onClick={addCargoProps.handleOpenDeletePopup}
                      border="1px solid #D0D5DD"
                    >
                      {t("Удалить")}
                    </Button>

                    <Button
                      leftIcon={<PencilIconW />}
                      size="sm"
                      maxWidth="323px"
                      paddingLeft={`30px`}
                      paddingRight={`30px`}
                      onClick={() => setOpen(true)}
                    >
                      {t("Редактировать")}
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex" columnGap="8px">
                    <Button
                      //  leftIcon={<DeleteIcon  />}
                      size="sm"
                      maxWidth="323px"
                      variant="secondaryWhite"
                      paddingRight={`30px`}
                      onClick={addCargoProps.handleEditToggle}
                      border="1px solid #D0D5DD"
                    >
                      {t("Отменить изменения")}
                    </Button>

                    <Button
                      leftIcon={<PencilIconW />}
                      size="sm"
                      maxWidth="323px"
                      paddingLeft={`30px`}
                      paddingRight={`30px`}
                      onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}
                    >
                      {t("Сохранить изменения")}
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          {status === "new" && (
            <Box display="flex" width="570px" columnGap="12px" mt="32px">
              <Button
                isLoading={addCargoProps.isAcceptRejectLoading}
                variant="outlineError"
                onClick={() => addCargoProps.handleCancel()}
              >
                {t("Отказать")}
              </Button>
              <Button
                isLoading={addCargoProps.isAcceptRejectLoading}
                onClick={() => addCargoProps.handleAccept()}
              >
                {t("Принять")}
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      <Popup
        isOpen={addCargoProps.isPopupOpen}
        onClose={addCargoProps.handleCloseDeletePopup}
        mainText={t("Вы уверены что хотите удалить груз ?", {
          name: addCargoProps.cargoName,
        })}
        status="delete"
        btn2Callback={addCargoProps.handleDelete}
      />
      <Popup
        isOpen={open}
        onClose={closePopup}
        mainText={t("Хотите перейти в режим редактирования?", {
          name: addCargoProps.cargoName,
        })}
        status="second"
        btn2Callback={() => {
          addCargoProps.handleEditToggle();
          closePopup();
        }}
        btn2Text="Редактировать"
        btn1Text="Отмена"
      />
    </AddCargoProvider>
  );
});
