import cls from "./styles.module.scss";
import { DeleteIcon, PencilIcon, PlusIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { CargoDetail } from "./components/CargoDetail";
import { CargoSetup } from "./components/CargoSetup";
import { Stages } from "./components/Stages";
import { AddCargoProvider } from "./providers";
import { useAddCargoProps } from "./useAddCargoProps";
import Link from "next/link";
import { LoadBtn } from "@/components/LoadBtn";
import { statuses } from "@/utils/constants";
import { TopContent } from "./components/TopContent";
import { Popup } from "@/components/Popup";
import { useTranslation } from "@/app/i18n/client";
import { Modal } from "@/components/Modal";
import { Checkbox } from "@/components/Checkbox";
import { observer } from "mobx-react-lite";
import { TextField } from "@/components/TextField";

export const Cargo = observer(({ id, status, locale }) => {
  const addCargoProps = useAddCargoProps({ id, status, locale });
  const isEditing = !!id;

  const { t } = useTranslation(locale, "translations");

  const [isLargerThan1190] = useMediaQuery("(min-width: 1190px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  function getTopContent () {
    if(status === "in_moderation") {
      return <Box display="flex" flexDirection={!isLargerThan800 ? "column" : "row"} justifyContent="space-between" alignItems={!isLargerThan800 ? "start" : "center"} mb="18px">
        <Heading fontSize={!isLargerThan800 ? "24px" : "30px" } size="md">{addCargoProps.address1} - {addCargoProps.address2} <Text as="span" color="brand.500">{addCargoProps.distance} km</Text></Heading>
        <Box Box display="flex" columnGap="8px">
          <LoadBtn icon={<PencilIcon />} onClick={addCargoProps.handleEditToggle}>
            {t("Изменить")}
          </LoadBtn>
          <LoadBtn icon={<DeleteIcon color="#F04438" />} type="delete" onClick={addCargoProps.handleOpenDeletePopup}>
            {t("Удалить")}
          </LoadBtn>
        </Box>
      </Box>;
    } else if(status === "new" || status === "performed"){
      return <TopContent
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
      />;
    }

    return <></>;

  }

  return <AddCargoProvider value={{ ...addCargoProps, isEditing }}>
    <Box pt={isLargerThan1190 ? "48px" : "24px"} pb="128px">
      <Container height="100%">
        {
          isEditing && <Breadcrumb
            mb="16px"
            separator={
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#98A2B3"/>
              </svg>
            }
          >
            <BreadcrumbItem color="#98A2B3">
              <Link href="/my-loads">{t("Мои грузы")}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink color="#344054">{t(statuses[status])}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        { !isLargerThan1190 && !isEditing && <Heading fontSize="22px">{t("Добавить груз")}</Heading> }
        <Box className={cls.contentWrapper} as="article" height="100%" display="flex" alignItems="flex-start" columnGap="32px">
          <Box flexGrow={1} maxW="100%" width="100%" as="form">
            {
              isEditing
              ? getTopContent()
              : <Box display="flex" justifyContent="space-between" alignItems="center" mb="32px">
                { isLargerThan1190 && <Heading size="md">{t("Добавить груз")}</Heading> }
                <Box className={cls.topButtons} display="flex" columnGap="12px">
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
            }
            <CargoDetail />
            <CargoSetup setIsPhotoChanged={addCargoProps.setIsPhotoChanged} />
          </Box>
          {
            !isEditing && <Stages />
          }
        </Box>
        {
          !isEditing && <Box mt="32px">
            <Checkbox name="accept" register={addCargoProps.register} filled >
              <Text fontSize="14px" maxWidth="396px" width="100%">{t("Нажимая кнопку, вы принимаете условия")} <a style={{ color: "#026FE7", fontWeight: "600" }} href="">{t("Пользовательская  соглашения")}</a></Text>
            </Checkbox>
            <Box mt="16px" display="flex" columnGap="12px" justifyContent="flex-start" maxWidth="900px">
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
                isDisabled={!addCargoProps.watch("accept") || addCargoProps?.isClicked}
                isLoading={addCargoProps.loading}
                size="sm"
                maxWidth="223px"
                onClick={ addCargoProps.handleSubmit(addCargoProps.onSubmit)}
              >
                {t("Опубликовать груз")}
              </Button>
            </Box>
          </Box>
        }
        {
          (addCargoProps.isDirty && addCargoProps.canEdit && isEditing) && <Box display="flex" columnGap="12px" mt="32px" maxWidth="900px">
            <Button size="sm" maxWidth="223px" variant="secondaryWhite" onClick={addCargoProps.onCancelClick}>Отменить</Button>
            <Button isLoading={addCargoProps.loading} size="sm" maxWidth="223px" onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}>{t("Сохранить изменение")}</Button>
          </Box>
        }
        {
          status === "new" && <Box display="flex" width="570px" columnGap="12px" mt="32px">
            <Button isLoading={addCargoProps.isAcceptRejectLoading} variant="outlineError" onClick={() => addCargoProps.handleCancel()}>{t("Отказать")}</Button>
            <Button isLoading={addCargoProps.isAcceptRejectLoading} onClick={() => addCargoProps.handleAccept()}>{t("Принять")}</Button>
          </Box>
        }
      </Container>
    </Box>
    <Popup
      isOpen={addCargoProps.isPopupOpen}
      onClose={addCargoProps.handleCloseDeletePopup}
      mainText={t("Вы уверены что хотите удалить груз ?", { name: addCargoProps.cargoName })}
      status="delete"
      btn2Callback={addCargoProps.handleDelete}
    />
    <Modal
      oneBtn
      isOpen={addCargoProps.isTemplateModalOpen}
      title={t("Назовите шаблон")}
      onClose={addCargoProps.handleCloseTemplateModal}
      secondBtnCallback={addCargoProps.handleSubmit((data) => addCargoProps.onSubmit({ ...data, isTemp: true }))}
      isDisabled={!addCargoProps.watch("template_name")}
      secondBtnProps={{ isLoading: addCargoProps.loading }}
      secondBtnText={t("Сохранить")}
    >
      <TextField
        register={addCargoProps.register}
        errors={addCargoProps.errors}
        name="template_name"
        label={t("Название шаблона")}
      />
    </Modal>
    <Modal
      isOpen={addCargoProps.isOpen}
      title={t("Выберите шаблон")}
      onClose={addCargoProps.handleCloseModal}
      withCloseBtn
      withFooter={false}
    >
      <Box display="flex" flexDirection="column" rowGap="20px">
        {
          addCargoProps.templates?.length
            ? addCargoProps.templates?.map((item) => (
              <Box
                onClick={() => addCargoProps.handleSelectTemplate(item)}
                p={isLargerThan800 ? "20px" : "12px"}
                w={"100%"}
                borderRadius={isLargerThan800 ? "20px" : "8px"}
                border="1px solid #EAECF0"
                as="button"
                key={item?.guid}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" columnGap="12px" flexGrow={1} maxWidth="calc(100% - 40px)">
                    <Box flexGrow={1} maxWidth={"calc(50% - 40px)"} flexWrap="wrap" display="flex" flexDirection="column" textAlign="left" rowGap="8px" >
                      <Text as="span" maxWidth="100%" fontWeight={600} fontSize={isLargerThan800 ? "20px" : "16px"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {item?.city_id_data?.["name_" + (locale === "uz" ? "en" : locale)] || item?.city_id_data?.name}
                      </Text>
                      <span>{item?.address_id_data?.["name_" + (locale === "uz" ? "en" : locale)] || item?.address_id_data?.name}</span>
                    </Box>
                    <Box as="span" alignSelf="center">
                  -{">"}
                    </Box>
                    <Box flexGrow={1} maxWidth={"calc(50% - 40px)"} flexWrap="wrap" display="flex" flexDirection="column" rowGap="8px" textAlign="left" pr="10px">
                      <Text as="span" maxWidth="100%" fontWeight={600} fontSize={isLargerThan800 ? "20px" : "16px"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {item?.city_id_2_data?.["name_" + (locale === "uz" ? "en" : locale)] || item?.city_id_2_data?.name}
                      </Text>
                      <span>{item?.address_id_2_data?.["name_" + (locale === "uz" ? "en" : locale)] || item?.address_id_2_data?.name}</span>
                    </Box>
                  </Box>
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    addCargoProps.handleDeleteTemplate(item);
                  }} variant="reset" width="36px" height="36px" border="1px solid #F04438">
                    <DeleteIcon width="16" height="16" color="#F04438" />
                  </Button>
                </Box>
                <Box fontWeight={400} fontSize={isLargerThan800 ? "16px" : "14px"} mt="5px" pt="5px" borderTop="1px solid #EAECF0" textAlign="left">
                  {t("Название")}: {item?.template_name}
                </Box>
              </Box>
            ))
          : <Text>{t("Нет шаблонов")}</Text>
        }
      </Box>
    </Modal>
  </AddCargoProvider>;
});
