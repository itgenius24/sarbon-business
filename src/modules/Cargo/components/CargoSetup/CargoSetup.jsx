import cls from "./styles.module.scss";
import { Box, Button, Heading } from "@chakra-ui/react";
import { BargainRadio } from "../BargainRadio";
import { DeleteIcon, HelpCircleIcon, UploadCloudIcon } from "@/assets/icons/icons";
import { userCargoSetupProps } from "./useCargoSetupProps";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Dropdown } from "@/components/Dropdown";
import { PaymentDetail } from "../PaymentDetail";
import { Contacts } from "../Contacts";
import Image from "next/image";

export const CargoSetup = () => {

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

  return <Box as="article" borderRadius="12px" mt="24px" padding="24px" bgColor="baseWhite">
    <Box display="flex" columnGap="12px" alignItems="center" mb="32px">
      <BargainRadio disabled={!canEdit} />
      <HelpCircleIcon />
    </Box>
    <Box pb="24px" borderBottom="1px solid" borderColor="brand.200">
      <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px" mb="24px">Ставка</Heading>
      <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Предлагаемая сумма</Heading>
        </Box>
        <TextFieldWithAddition
          disabled={!canEdit}
          name="price"
          register={register}
          control={control}
          additionalItemName="price_prepayment_unit"
          additionalItemDefaultIndex={0}
          placeholder="Введите сумму"
          errors={errors}
          type="number"
          width="100%"
          additionalItemOptions={currencyOptions}
        />
      </Box>
      <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Сумма предоплаты</Heading>
        </Box>
        <TextFieldWithAddition
          disabled={!canEdit}
          name="price_prepayment"
          register={register}
          control={control}
          additionalItemName="price_prepayment_unit"
          additionalItemDefaultIndex={0}
          placeholder="Введите сумму"
          errors={errors}
          type="number"
          width="100%"
          additionalItemOptions={currencyOptions}
        />
      </Box>
      <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Сумма после завершения заказа </Heading>
        </Box>
        <TextFieldWithAddition
          disabled={!canEdit}
          name="price_after_order"
          register={register}
          control={control}
          additionalItemName="price_prepayment_unit"
          additionalItemDefaultIndex={0}
          placeholder="Введите сумму"
          errors={errors}
          type="number"
          width="100%"
          additionalItemOptions={currencyOptions}
        />
      </Box>
      <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Тип оплаты</Heading>
        </Box>
        <Dropdown
          disabled={!canEdit}
          placeholder="Выберите"
          options={paymentOptions}
          name="payment_type"
          control={control}
          errors={errors}
        />
      </Box>
      <Box display="flex" columnGap="32px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Встречные предложения</Heading>
        </Box>
      </Box>
    </Box>
    <PaymentDetail />
    <Contacts />
    {
      watch("image")
        ? <Box display="flex" position="relative" alignItems="center" justifyContent="center" ml="auto" width={"540px"} height="150px" borderRadius="12px" border="1px solid" borderColor="brand.200" padding="16px 24px">
          <Image className={cls.img} loader={imageLoader} src={process.env.NEXT_PUBLIC_MEDIA_URL + watch("image")} alt="cargo" width={150} height={150} />
          <Button isDisabled={!canEdit} onClick={() => setValue("image", null)} position="absolute" top="10px" left="10px" variant="reset"><DeleteIcon /></Button>
        </Box>
        : <Box
          padding="16px 24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml="auto"
          mt="24px"
          border="1px solid"
          borderColor="brand.200"
          borderRadius="12px"
          as="label"
          width="540px"
          height="126px"
          cursor={canEdit ? "pointer" : "not-allowed"}
          opacity={canEdit ? 1 : 0.5}
        >
          <input disabled={!canEdit} className="visually-hidden" type="file" accept="image/*" onChange={handleImageUpload} />
          <Box>
            <Box mx="auto" mb="12px" width="40px" height="40px" p="10px" boxShadow="0px 1px 2px 0px #1018280D" borderRadius="8px" background="white" border="1px solid" borderColor="brand.200">
              <UploadCloudIcon />
            </Box>
            <Box color="primaryText" textAlign="center">
            Загрузить
            </Box>
            <Box textAlign="center" fontWeight="400" fontSize="14px" lineHeight="18px" color="brand.600">Фото до 10 МБ.</Box>
          </Box>
        </Box>

    }
  </Box>;
};
