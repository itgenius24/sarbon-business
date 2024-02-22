import { Box, Heading, Text, Textarea } from "@chakra-ui/react";
import { useAddCargoContext } from "../../_providers";
import { TextField } from "@/components/TextField";

export const Contacts = () => {

  const { register, setValue, watch } = useAddCargoContext();

  return <Box pt="24px" borderTop="1px solid" borderColor="brand.200" >
    <Box display="flex" columnGap="32px" mb="24px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">Контакты</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">укажите, к кому обратиться по объявлению</Text>
      </Box>
      <TextField
        placeholder="+998 (99) 999-99-99"
        name="contact"
        register={register}
        rules={{
          required: {
            value: true,
            message: "Обязательное поле",
          }
        }}
      />
    </Box>
    <Box display="flex" columnGap="32px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">Примечание</Heading>
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">Не указывайте контакты (телефоны, скайп и пр.), иначе ваш груз удалит модератор.</Text>
      </Box>

      <Box display="flex" flexDirection="column" rowGap="6px" alignItems="flex-start" flexGrow={1}>
        <Textarea
          height="154px"
          width="100%"
          borderRadius="8px"
          borderColor="brand.200"
          _placeholder={{ color: "brand.300" }}
          resize="none"
          name="note"
          placeholder="Пишите здесь"
          value={watch("note")}
          onChange={(e) => {
            const value = e.target.value;
            if(value.match(/\S*\d+\S*/)) {
              return;
            }
            if(e.target.value.length <= 1000) {
              setValue("note", e.target.value);
            }
          }}
        />
        <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">{watch("note")?.length || 0}/1000</Text>
      </Box>
    </Box>
  </Box>;
};
