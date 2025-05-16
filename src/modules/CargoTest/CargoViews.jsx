import cls from "./styles.module.scss";
import {
  CheckIconStep,
  CricleBlueIcon,
  CricleIcon,
  DeleteIcon,
  NavigationBtnLeftIcon,
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
  Radio,
  RadioGroup,
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

import { useRouter } from "next/navigation";

export const CargoViews = observer(({ id, status, locale }) => {
  console.log("status:", status);
  const [cargoIndex, setCargoIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const addCargoProps = useAddCargoProps({ id, status, locale, setCargoIndex });
  const isEditing = !!id;

  const { t } = useTranslation(locale, "translations");

  const [isLargerThan1190] = useMediaQuery("(min-width: 1190px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const router = useRouter();

  useEffect(() => {
    if (
      status === "active" ||
      status === "in_active" ||
      status === "in_moderation" ||
      status === "rejected"
    ) {
      addCargoProps.handleEditActiveToggle();
    }
  }, []);

  const closePopup = () => {
    addCargoProps?.setEditModal(false);
  };

  function getTopContent() {
    if (status === "in_moderation" || status === "rejected") {
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
                {addCargoProps.address1} - {addCargoProps.address2}
              </>
            ) : (
              t(`Редактировать груз`)
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
                onClick={() => addCargoProps?.setEditModal(true)}
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
                isLoading={addCargoProps.updateLoading}
                size="sm"
                maxWidth="323px"
                paddingLeft={`30px`}
                paddingRight={`30px`}
                onClick={addCargoProps.onSubmit}
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
            cargoData={addCargoProps.cargoData}
          />
        </>
      );
    }

    return <></>;
  }

  const negotiableOption = [
    {
      value: `active`,
      label: t(`Активный`),
    },
    {
      value: `in_active`,
      label: t(`Не активен`),
    },
  ];

  const onChangeNa = (e) => {
    addCargoProps.setValue(`order_status`, { value: e, label: e });
    addCargoProps.updateStatus();
  };

  return (
    <AddCargoProvider value={{ ...addCargoProps, isEditing }}>
      <Box pt={isLargerThan1190 ? "48px" : "24px"} pb="128px">
        <Container height="100%">
          <Flex alignItems={`center`} justifyContent={`space-between`}>
            <Button
              leftIcon={<NavigationBtnLeftIcon />}
              borderRadius={`4px`}
              border={`none`}
              variant={`outline`}
              background={`rgba(227, 230, 237, 1)`}
              color={`var(--primary-text)`}
              mb={`26px`}
              width={`fit-content`}
              onClick={() =>
             {
              addCargoProps.handleResetForm();
              router.back()
                // (window.location.href = `${
                //   window.location.origin
                // }/${`${locale}/my-loads`}`)
             }
              }
            >
              {t(`Вернутся в список`)}
            </Button>
            {(addCargoProps.order_status?.[0] === "in_active" ||
              addCargoProps.order_status?.[0] === "active") && (
              <Flex gap={`18px`}>
                <span
                  style={{ color: `rgba(33, 31, 38, 1)`, fontSize: `14px` }}
                >
                  {t(`Статус груза`)}:
                </span>
                <RadioGroup
                  // isDisabled={!canEdit}
                  onChange={(e) => onChangeNa(e)}
                  value={addCargoProps.watch(`order_status`)?.value}
                >
                  <Flex gap={"10px"}>
                    {negotiableOption &&
                      negotiableOption.map((item) => (
                        <Radio
                          key={item.value}
                          border={"1px solid rgba(208, 213, 221, 1)"}
                          value={item.value}
                          size={"md"}
                        >
                          <span
                            className={
                              addCargoProps.watch(`order_status`)?.value ===
                              item.value
                                ? cls.ActiveRadio
                                : cls.radio
                            }
                          >
                            {item?.label?.charAt(0).toUpperCase() +
                              item?.label?.slice(1).toLowerCase()}
                          </span>
                        </Radio>
                      ))}
                  </Flex>
                </RadioGroup>
              </Flex>
            )}
          </Flex>

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
                <>{getTopContent()}</>
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
                      <CargoDetail status={status} locale={locale} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ) : (
                <>
                  <CargoDetail status={status} locale={locale} />
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
              status === "rejected" ||
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
                    {status !== `active` && (
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
                    )}

                    <Button
                      leftIcon={<PencilIconW />}
                      size="sm"
                      isLoading={addCargoProps.updateLoading}
                      maxWidth="323px"
                      paddingLeft={`30px`}
                      paddingRight={`30px`}
                      onClick={() => addCargoProps?.setEditModal(true)}
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
                      onClick={addCargoProps.onSubmit}
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
        isOpen={addCargoProps?.editModal}
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
