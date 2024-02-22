import { Box, Heading } from "@chakra-ui/react";
import { BargainRadio } from "../BargainRadio";
import { HelpCircleIcon } from "@/assets/icons/icons";
import { userCargoSetupProps } from "./useCargoSetupProps";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Dropdown } from "@/components/Dropdown";
import { PaymentDetail } from "../PaymentDetail";
import { Contacts } from "../Contacts";

export const CargoSetup = () => {

  const { register, control, errors, currencyOptions, handleImageUpload } = userCargoSetupProps();

  return <Box as="article" borderRadius="12px" mt="24px" padding="24px" bgColor="baseWhite">
    <Box display="flex" columnGap="12px" alignItems="center" mb="32px">
      <BargainRadio />
      <HelpCircleIcon />
    </Box>
    <Box pb="24px" borderBottom="1px solid" borderColor="brand.200">
      <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px" mb="24px">Ставка</Heading>
      <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Предлагаемая сумма</Heading>
        </Box>
        <TextFieldWithAddition
          name="price"
          register={register}
          control={control}
          additionalItemName="price_prepayment_unit"
          additionalItemDefaultIndex={0}
          placeholder="Введите сумму"
          errors={errors}
          type="number"
          width="100%"
          rules={{
            required: {
              value: true,
              message: "Обязательное поле",
            }
          }}
          additionalItemOptions={currencyOptions}
        />
      </Box>
      <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Сумма предоплаты</Heading>
        </Box>
        <TextFieldWithAddition
          name="price_prepayment"
          register={register}
          control={control}
          additionalItemName="price_prepayment_unit"
          additionalItemDefaultIndex={0}
          placeholder="Введите сумму"
          errors={errors}
          type="number"
          width="100%"
          rules={{
            required: {
              value: true,
              message: "Обязательное поле",
            }
          }}
          additionalItemOptions={currencyOptions}
        />
      </Box>
      <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Сумма после завершения заказа </Heading>
        </Box>
        <TextFieldWithAddition
          name="price_after_order"
          register={register}
          control={control}
          additionalItemName="price_prepayment_unit"
          additionalItemDefaultIndex={0}
          placeholder="Введите сумму"
          errors={errors}
          type="number"
          width="100%"
          rules={{
            required: {
              value: true,
              message: "Обязательное поле",
            }
          }}
          additionalItemOptions={currencyOptions}
        />
      </Box>
      <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Тип оплаты</Heading>
        </Box>
        <Dropdown
          placeholder="Выберите"
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
    <Box padding="16px 24px" display="block" ml="auto" border="1px solid" borderColor="brand.200" borderRadius="12px" as="label" width="416px" height="126px">
      <input className="visually-hidden" type="file" accept="image/*" onChange={handleImageUpload} />
      Загрузить
    </Box>
  </Box>;
};
