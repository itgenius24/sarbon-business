import { Box, Button, Heading } from "@chakra-ui/react";
import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useAddCargoContext } from "../../providers";
import { Checkbox } from "@/components/Checkbox";
import { usePaymentDetailProps } from "./usePaymentDetailProps";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

export const PaymentDetail = () => {
  const { control, register, errors, setValue } = useAddCargoContext();

  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");

  const {
    directContractOpen,
    prepaymentFuelOpen,
    setDirectContractOpen,
    setPrepaymentFuelOpen
  } = usePaymentDetailProps();

  const { canEdit, watch } = useAddCargoContext();

  return <Box py="24px">
    {
      watch("payment_type")?.value === "269551bf-09f5-4ebe-936b-889ba5ae1c10" && <Box display="flex" columnGap="32px" mb="24px" >
        <Box width="280px" flexShrink={0}>
          <Heading fontWeight="500" fontSize="14px" lineHeight="20px">{t("Оплата через")}</Heading>
        </Box>
        <TextFieldWithAddition
          disabled={!canEdit}
          name="payment_deadline"
          register={register}
          control={control}
          additionalItemDefaultIndex={0}
          placeholder={t("Кол-во дней")}
          additionalItemPlaceholder={t("банковских дней")}
          errors={errors}
          type="number"
          width="100%"
        />
      </Box>
    }
    <Box display="flex" columnGap="32px" pb="24px" borderBottom="1px solid" borderColor="brand.200" >
      <Box width="280px" flexShrink={0}>
        <Heading fontWeight="500" fontSize="14px" lineHeight="20px">{t("Добавить")}</Heading>
      </Box>
      <Box display="flex" gap="12px" flexWrap="wrap">
        {
          !prepaymentFuelOpen && <Button isDisabled={!canEdit} variant="reset" onClick={() => setPrepaymentFuelOpen(true)} leftIcon={<PlusIcon color="#007AFF" />}>{t("Предоплата деньгами или топливом")}</Button>
        }
        {/* <Button variant="reset" leftIcon={<PlusIcon color="#007AFF" />}>Оплата на выгрузке</Button> */}
        {
          !directContractOpen && <Button isDisabled={!canEdit} variant="reset" onClick={() => setDirectContractOpen(true)} leftIcon={<PlusIcon color="#007AFF" />}>{t("Договор")}</Button>
        }
      </Box>
    </Box>
    {
      prepaymentFuelOpen && <Box display="flex" alignItems="center" columnGap="32px" pt="24px">
        <Box width="280px" flexShrink={0}>
          <Button
            isDisabled={!canEdit}
            variant="reset"
            onClick={() => setPrepaymentFuelOpen(false)}
            color="brand.700"
            leftIcon={<DeleteIcon color="#344054" />}
          >
            {t("Предоплата")}
          </Button>
        </Box>
        <Box flexGrow={1} display="flex" flexDirection="column" rowGap="16px">
          <TextFieldWithAddition
            disabled={!canEdit}
            name="prepayment_percent"
            placeholder="10"
            additionalItemPlaceholder="%"
            register={register}
            errors={errors}
            type="number"
            max={100}
            onChange={(e) => {
              const value = e.target.value;
              if(+value > 100) {
                setValue("prepayment_percent", 100);
              }
            }}
          />
          <Checkbox disabled={!canEdit} name="prepayment_with_fuel" register={register}>
            {t("Предоплата топливом")}
          </Checkbox>
          <Checkbox disabled={!canEdit} name="prepayment_with_payment" register={register}>
            {t("Оплата на выгрузке (скрывает оплату через)")}
          </Checkbox>
        </Box>
      </Box>
    }
    {
      directContractOpen && <Box display="flex" alignItems="center" columnGap="32px" pt="24px">
        <Box width="280px" flexShrink={0}>
          <Button
            isDisabled={!canEdit}
            variant="reset"
            onClick={() => setDirectContractOpen(false)}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
            {t("Прямой договор")}
          </Button>
        </Box>
        <Box flexGrow={1} display="flex" flexDirection="column" rowGap="16px">
          <Checkbox disabled={!canEdit} name="contract" register={register}>
            {t("Заключаю договор с перевозчиком от своей фирмы")}
          </Checkbox>
        </Box>
      </Box>
    }
  </Box>;
};
