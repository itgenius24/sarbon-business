import { Box, Button, Heading } from "@chakra-ui/react";
import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useAddCargoContext } from "../../_providers";
import { Checkbox } from "@/components/Checkbox";

export const PaymentDetail = () => {
  const { control, register, errors } = useAddCargoContext();

  return <Box py="24px">
    <Box display="flex" columnGap="32px" mb="24px" >
      <Box width="280px" flexShrink={0}>
        <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Оплата через</Heading>
      </Box>
      <TextFieldWithAddition
        name="payment_deadline"
        register={register}
        control={control}
        additionalItemDefaultIndex={0}
        placeholder="Кол-во дней"
        additionalItemPlaceholder="банковских дней"
        errors={errors}
        type="number"
        width="100%"
        rules={{
          required: {
            value: true,
            message: "Обязательное поле",
          }
        }}
      />
    </Box>
    <Box display="flex" columnGap="32px" pb="24px" borderBottom="1px solid" borderColor="brand.200" >
      <Box width="280px" flexShrink={0}>
        <Heading fontWeight="500" fontSize="14px" lineHeight="20px">Добавить</Heading>
      </Box>
      <Box display="flex" gap="12px" flexWrap="wrap">
        <Button variant="reset" leftIcon={<PlusIcon color="#007AFF" />}>Предоплата деньгами или топливом</Button>
        <Button variant="reset" leftIcon={<PlusIcon color="#007AFF" />}>Оплата на выгрузке</Button>
        <Button variant="reset" leftIcon={<PlusIcon color="#007AFF" />}>Прямой договор</Button>
      </Box>
    </Box>
    <Box display="flex" alignItems="center" columnGap="32px" pt="24px">
      <Box width="280px" flexShrink={0}>
        <Button variant="reset"
          onClick={() => {}}
          color="brand.700"
          leftIcon={<DeleteIcon />}
        >
          Предоплата
        </Button>
      </Box>
      <Box flexGrow={1} display="flex" flexDirection="column" rowGap="16px">
        <TextFieldWithAddition
          name="prepayment_percent"
          placeholder="10"
          additionalItemPlaceholder="%"
          register={register}
          errors={errors}
          rules={{
            max: {
              value: 100,
              message: "Максимум 100%",
            },
            required: {
              value: true,
              message: "Обязательное поле",
            }
          }}
        />
        <Checkbox name="prepayment_with_fuel" register={register}>
          Предоплата топливом
        </Checkbox>
        <Checkbox name="prepayment_with_payment" register={register}>
          Оплата на выгрузке (скрывает оплату через)
        </Checkbox>
      </Box>
    </Box>
    <Box display="flex" alignItems="center" columnGap="32px" pt="24px">
      <Box width="280px" flexShrink={0}>
        <Button variant="reset"
          onClick={() => {}}
          color="brand.700"
          leftIcon={<DeleteIcon />}
        >
          Прямой договор
        </Button>
      </Box>
      <Box flexGrow={1} display="flex" flexDirection="column" rowGap="16px">
        <Checkbox name="contract" register={register}>
          Заключаю договор с перевозчиком от своей фирмы
        </Checkbox>
      </Box>
    </Box>
  </Box>;
};
