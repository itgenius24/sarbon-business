import cls from "./styles.module.scss";
import {
  CricleBlueIcon,
  CricleIcon,
  DeleteIcon,

  PlusIcon,
  SearchIcon,
} from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import {

  Box,

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
import { Modal } from "@/components/Modal";

import { observer } from "mobx-react-lite";
import { TextField } from "@/components/TextField";
import { useEffect, useState } from "react";
import clsx from "clsx";
import StepOne from "./components/StepOne/StepOne";
import StepTwo from "./components/StepTwo/StepTwo";
import StepThere from "./components/StepThere/StepThere";

export const CargoTest = observer(({ id, status, locale }) => {
  const addCargoProps = useAddCargoProps({ id, status, locale });
  const isEditing = !!id;

  const { t } = useTranslation(locale, "translations");
  const [cargoIndex,setCargoIndex] = useState(1)
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

  return (
    <AddCargoProvider value={{ ...addCargoProps, isEditing }}>
      <Box pt={isLargerThan1190 ? "48px" : "24px"} pb="128px">
        <Container height="100%">
          <Box
            className={cls.contentWrapper}
            as="article"
            height="100%"
            display="flex"
            alignItems="flex-start"
            columnGap="32px"
          >
            <Box flexGrow={1} maxW="100%" width="100%" as="form">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb="32px"
              >
                {isLargerThan1190 && (
                  <Heading size="md">{t("Добавить груз")}</Heading>
                )}
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
              <Flex gap={2} mb={'50px'} mt={"50px"}>
                <div className={cls.arrowWrap}>
                  <div  onClick={() => setCargoIndex(1)} className={clsx(cls.arrow, { [cls.active]: cargoIndex === 1 })}>
                    {cargoIndex === 1 ? <CricleBlueIcon /> : <CricleIcon />}
                    <div className={cls.text}>
                      <p>1. Груз</p>
                      <span>не заполнено</span>
                    </div>
                  </div>
                </div>
                <div className={cls.arrowWrap}>
                <div  onClick={() => setCargoIndex(2)} className={clsx(cls.arrow, { [cls.active]: cargoIndex === 2 })}>
                    {cargoIndex === 2 ? <CricleBlueIcon /> : <CricleIcon />}
                    <div className={cls.text}>
                      <p>2. Маршрут и время</p>
                      <span>Москва Ташкент</span>
                    </div>
                  </div>
                </div>
                <div className={cls.arrowWrap}>
                <div  onClick={() => setCargoIndex(3)} className={clsx(cls.arrow, { [cls.active]: cargoIndex === 3 })}>
                {cargoIndex === 3 ? <CricleBlueIcon /> : <CricleIcon />}
                    <div className={cls.text}>
                      <p>3. Транспорт</p>
                      <span>не заполнено</span>
                    </div>
                  </div>
                </div>
                <div className={cls.arrowWrap}>
                <div  onClick={() => setCargoIndex(4)} className={clsx(cls.arrow, { [cls.active]: cargoIndex === 4 })}>
                {cargoIndex === 4 ? <CricleBlueIcon /> : <CricleIcon />}
                    <div className={cls.text}>
                      <p>4. Оплата</p>
                      <span>не заполнено</span>
                    </div>
                  </div>
                </div>
              </Flex>

              {
                cargoIndex === 1 && 
                <StepOne setCargoIndex={setCargoIndex} />
              }
              {cargoIndex === 2 && <StepTwo setCargoIndex={setCargoIndex} />}
              {cargoIndex === 3 && <StepThere setCargoIndex={setCargoIndex} />}
            </Box>
          </Box>
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
      <Modal
        oneBtn
        isOpen={addCargoProps.isTemplateModalOpen}
        title={t("Назовите шаблон")}
        onClose={addCargoProps.handleCloseTemplateModal}
        secondBtnCallback={addCargoProps.handleSubmit((data) =>
          addCargoProps.onSubmit({ ...data, isTemp: true })
        )}
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
          <InputGroup>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input
              onChange={(e) => addCargoProps.setTemplateVal(e.target.value)}
            />
          </InputGroup>
          {addCargoProps.templates?.length ? (
            addCargoProps.templates?.map((item) => (
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
                  <Box
                    display="flex"
                    columnGap="12px"
                    flexGrow={1}
                    maxWidth="calc(100% - 40px)"
                  >
                    <Box
                      flexGrow={1}
                      maxWidth={"calc(50% - 40px)"}
                      flexWrap="wrap"
                      display="flex"
                      flexDirection="column"
                      textAlign="left"
                      rowGap="8px"
                    >
                      <Text
                        as="span"
                        maxWidth="100%"
                        fontWeight={600}
                        fontSize={isLargerThan800 ? "20px" : "16px"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {item?.city_id_data?.[
                          "name_" + (locale === "uz" ? "en" : locale)
                        ] || item?.city_id_data?.name}
                      </Text>
                      <span>
                        {item?.address_id_data?.[
                          "name_" + (locale === "uz" ? "en" : locale)
                        ] || item?.address_id_data?.name}
                      </span>
                    </Box>
                    <Box as="span" alignSelf="center">
                      -{">"}
                    </Box>
                    <Box
                      flexGrow={1}
                      maxWidth={"calc(50% - 40px)"}
                      flexWrap="wrap"
                      display="flex"
                      flexDirection="column"
                      rowGap="8px"
                      textAlign="left"
                      pr="10px"
                    >
                      <Text
                        as="span"
                        maxWidth="100%"
                        fontWeight={600}
                        fontSize={isLargerThan800 ? "20px" : "16px"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {item?.city_id_2_data?.[
                          "name_" + (locale === "uz" ? "en" : locale)
                        ] || item?.city_id_2_data?.name}
                      </Text>
                      <span>
                        {item?.address_id_2_data?.[
                          "name_" + (locale === "uz" ? "en" : locale)
                        ] || item?.address_id_2_data?.name}
                      </span>
                    </Box>
                  </Box>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addCargoProps.handleDeleteTemplate(item);
                    }}
                    variant="reset"
                    width="36px"
                    height="36px"
                    border="1px solid #F04438"
                  >
                    <DeleteIcon width="16" height="16" color="#F04438" />
                  </Button>
                </Box>
                <Box
                  fontWeight={400}
                  fontSize={isLargerThan800 ? "16px" : "14px"}
                  mt="5px"
                  pt="5px"
                  borderTop="1px solid #EAECF0"
                  textAlign="left"
                >
                  {t("Название")}: {item?.template_name}
                </Box>
              </Box>
            ))
          ) : (
            <Text>{t("Нет шаблонов")}</Text>
          )}
        </Box>
      </Modal>
    </AddCargoProvider>
  );
});
