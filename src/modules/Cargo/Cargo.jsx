import { DeleteIcon, PencilIcon, PlusIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading, Text } from "@chakra-ui/react";
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

export const Cargo = ({ id, status, locale }) => {

  const addCargoProps = useAddCargoProps({ id, status, locale });
  const isEditing = !!id;

  const { t } = useTranslation(locale, "translations");

  function getTopContent () {
    if(status === "in_moderation") {
      return <Box display="flex" justifyContent="space-between" alignItems="center" mb="18px">
        <Heading size="md">{addCargoProps.address1} - {addCargoProps.address2} <Text as="span" color="brand.500">{addCargoProps.distance} km</Text></Heading>
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
      />;
    }

    return <></>;

  }

  return <AddCargoProvider value={{ ...addCargoProps, isEditing }}>
    <Box pt="48px" pb="128px">
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
        <Box as="article" height="100%" display="flex" alignItems="flex-start" columnGap="32px">
          <Box flexGrow={1} maxW={id ? "100%" : "900px"} as="form">
            {
              isEditing
              ? getTopContent()
              : <Box display="flex" justifyContent="space-between" alignItems="center" mb="32px">
                <Heading size="md">{t("Добавить груз")}</Heading>
                <Box display="flex" columnGap="12px">
                  <Button onClick={addCargoProps.handleOpenModal} leftIcon={<PlusIcon />} size="sm" >Заполнить из шаблона</Button>
                  <Button
                    leftIcon={<DeleteIcon color="#344054" />}
                    onClick={() => addCargoProps.handleResetForm()}
                    variant="secondaryWhite"
                    size="sm"
                    border="1px solid #D0D5DD"
                  >{t("Очистить форму")}</Button>
                </Box>
              </Box>
            }
            <CargoDetail />
            <CargoSetup />
          </Box>
          {
            !isEditing && <Stages />
          }
        </Box>
        {
          !isEditing && <Box mt="32px">
            <Checkbox name="accept" register={addCargoProps.register} filled >
              <Text width="396px">{t("Нажимая кнопку, вы принимаете условия")} <a style={{ color: "#026FE7", fontWeight: "600" }} href="">{t("Пользовательская  соглашения")}</a></Text>
            </Checkbox>
            <Box mt="16px" display="flex" columnGap="12px" justifyContent="flex-start" maxWidth="900px">
              <Button
                onClick={addCargoProps.handleSubmit((data) => addCargoProps.onSubmit({ ...data, isTemp: true }))}
                isLoading={addCargoProps.loading}
                size="sm"
                maxWidth="223px"
                variant="secondaryWhite"
              >
                {t("Сохранить как шаблон")}
              </Button>
              <Button
                isDisabled={!addCargoProps.watch("accept")}
                isLoading={addCargoProps.loading}
                size="sm"
                maxWidth="223px"
                onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}
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
            <Button variant="outlineError" onClick={() => addCargoProps.handleCancel()}>{t("Отказать")}</Button>
            <Button onClick={() => addCargoProps.handleAccept()}>{t("Принять")}</Button>
          </Box>
        }
      </Container>
    </Box>
    <Popup
      isOpen={addCargoProps.isPopupOpen}
      onClose={addCargoProps.handleCloseDeletePopup}
      mainText={t("Вы уверены что хотите удалить груз “Ташкент-Бухара” ?")}
      status="delete"
      btn2Callback={addCargoProps.handleDelete}
    />
    <Modal
      isOpen={addCargoProps.isOpen}
      title={t("Выберите шаблон")}
      onClose={addCargoProps.handleCloseModal}
      withCloseBtn
      withFooter={false}
    >
      <Box display="flex" flexDirection="column" rowGap="20px">
        {
          addCargoProps.templates?.map((item) => (
            <Box
              onClick={() => addCargoProps.handleSelectTemplate(item)}
              p="20px"
              w={"100%"}
              borderRadius="20px"
              border="1px solid #EAECF0"
              as="button"
              key={item?.guid}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text as="span" fontWeight={600} fontSize="24px">{item?.address_id_data?.name} -{">"} {item?.address_id_2_data?.name}</Text>
              <Button onClick={(e) => {
                e.stopPropagation();
                addCargoProps.handleDeleteTemplate(item);
              }} variant="reset" width="36px" height="36px" border="1px solid #F04438">
                <DeleteIcon width="16" height="16" color="#F04438" />
              </Button>
            </Box>
          ))
        }
      </Box>
    </Modal>
  </AddCargoProvider>;
};
