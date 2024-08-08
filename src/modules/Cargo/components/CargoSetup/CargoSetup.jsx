import cls from "./styles.module.scss";
import { Box, Button, Heading, useMediaQuery } from "@chakra-ui/react";
import { BargainRadio } from "../BargainRadio";
import { DeleteIcon, HelpCircleIcon, UploadCloudIcon } from "@/assets/icons/icons";
import { userCargoSetupProps } from "./useCargoSetupProps";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Dropdown } from "@/components/Dropdown";
import { PaymentDetail } from "../PaymentDetail";
import { Contacts } from "../Contacts";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export const CargoSetup = ({ setIsPhotoChanged }) => {

  const {
    register,
    watch,
    control,
    errors,
    currencyOptions,
    handleImageUpload,
    paymentOptions,
    imageLoader,
    setValue,
    canEdit
  } = userCargoSetupProps();
  const {t} = useTranslation();
  const [islargerThan768] = useMediaQuery("(min-width: 768px)");

  return <Box className={cls.cargoSetup} as="article" borderRadius="12px" mt="24px" padding="24px" bgColor="baseWhite">
    <Box display="flex" columnGap="12px" alignItems="center" mb="32px">
      <BargainRadio watch={watch} register={register} disabled={!canEdit} />
      {/* <HelpCircleIcon /> */}
    </Box>
    {
      watch("bargain") !== "request" && <>
        <Box pb="24px" borderBottom="1px solid" borderColor="brand.200">
          <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px" mb="24px">{t(`Ставка`)}</Heading>
          <Box className={cls.fieldsWrapper} display="flex" columnGap="32px" mb="24px" >
            <Box width="280px" flexShrink={0}>
              <Heading fontWeight="500" fontSize="14px" lineHeight="20px">{t(`Предлагаемая сумма`)}</Heading>
            </Box>
            <TextFieldWithAddition
              disabled={!canEdit}
              name="price"
              register={register}
              control={control}
              additionalItemName="price_prepayment_unit"
              additionalItemDefaultIndex={0}
              placeholder={t("Введите сумму")}
              errors={errors}
              type="number"
              width="100%"
              additionalItemOptions={currencyOptions}
              zIndex={20}
            />
          </Box>
          <Box className={cls.fieldsWrapper} display="flex" columnGap="32px" mb="24px" >
            <Box width="280px" flexShrink={0}>
              <Heading fontWeight="500" fontSize="14px" lineHeight="20px">{t(`Сумма предоплаты`)}</Heading>
            </Box>
            <TextFieldWithAddition
              disabled={!canEdit}
              name="price_prepayment"
              register={register}
              control={control}
              additionalItemName="price_prepayment_unit"
              additionalItemDefaultIndex={0}
              placeholder={t("Введите сумму")}
              errors={errors}
              type="number"
              width="100%"
              additionalItemOptions={currencyOptions}
              zIndex={19}
            />
          </Box>
          <Box className={cls.fieldsWrapper} display="flex" columnGap="32px" mb="24px" >
            <Box width="280px" flexShrink={0}>
              <Heading fontWeight="500" fontSize="14px" lineHeight="20px">{t(`Сумма после завершения заказа`)} </Heading>
            </Box>
            <TextFieldWithAddition
              disabled={!canEdit}
              name="price_after_order"
              register={register}
              control={control}
              additionalItemName="price_prepayment_unit"
              additionalItemDefaultIndex={0}
              placeholder={t("Введите сумму")}
              errors={errors}
              type="number"
              width="100%"
              additionalItemOptions={currencyOptions}
              zIndex={18}
            />
          </Box>
          <Box className={cls.fieldsWrapper} display="flex" columnGap="32px" mb="24px" >
            <Box width="280px" flexShrink={0}>
              <Heading fontWeight="500" fontSize="14px" lineHeight="20px">{t(`Тип оплаты`)}</Heading>
            </Box>
            <Dropdown
              disabled={!canEdit}
              placeholder={t("Выберите")}
              options={paymentOptions}
              name="payment_type"
              control={control}
              errors={errors}
            />
          </Box>
          <Box className={cls.fieldsWrapper} display="flex" columnGap="32px" >
            <Box width="280px" flexShrink={0}>
              <Heading fontWeight="500" fontSize="14px" lineHeight="20px">{t(`Встречные предложения`)}</Heading>
            </Box>
          </Box>
        </Box>
        <PaymentDetail />
      </>
    }
    <Contacts />
    {
      watch("image")
        ? <Box display="flex" position="relative" alignItems="center" justifyContent="center" ml="auto" maxWidth={"540px"} width="100%" height="150px" borderRadius="12px" border="1px solid" borderColor="brand.200" padding="16px 24px">
          <Image className={cls.img} loader={imageLoader} src={watch("image")} alt="cargo" width={150} height={150} />
          <Button
            isDisabled={!canEdit}
            onClick={() => {
              setValue("image", null);
              setIsPhotoChanged(true);
            }}
            position="absolute"
            top="10px"
            left="10px"
            variant="reset"
          >
            <DeleteIcon />
          </Button>
        </Box>
        : <Box
          padding="16px 24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="24px"
          border="1px solid"
          borderColor="brand.200"
          borderRadius="12px"
          as="label"
          maxWidth={islargerThan768 ? "540px" : "100%"}
          ml="auto"
          width="100%"
          height="126px"
          cursor={canEdit ? "pointer" : "not-allowed"}
          opacity={canEdit ? 1 : 0.5}
        >
          <input disabled={!canEdit} className="visually-hidden" type="file" accept="image/*" onChange={(e) => {
            handleImageUpload(e);
            setIsPhotoChanged(true);
          }} />
          <Box>
            <Box mx="auto" mb="12px" width="40px" height="40px" p="10px" boxShadow="0px 1px 2px 0px #1018280D" borderRadius="8px" background="white" border="1px solid" borderColor="brand.200">
              <UploadCloudIcon />
            </Box>
            <Box color="primaryText" textAlign="center">
            {t(`Загрузить`)}
            </Box>
            <Box textAlign="center" fontWeight="400" fontSize="14px" lineHeight="18px" color="brand.600">{t(`Фото до 10 МБ.`)}</Box>
          </Box>
        </Box>

    }
  </Box>;
};
