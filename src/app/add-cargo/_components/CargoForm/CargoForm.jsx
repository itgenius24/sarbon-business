import { Dropdown } from "@/components/Dropdown";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useCargoFormProps } from "./useCargoFormProps";

export const CargoForm = () => {

  const { weightOptions } = useCargoFormProps();

  return <Box display="flex" alignItems="start" columnGap="32px" py="24px">
    <Box>
      <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">Груз</Heading>
      <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">В рассчёте на одну машину</Text>
    </Box>
    <Box display="flex" columnGap="24px" flexGrow="1">
      <Dropdown searchable search />
      <TextFieldWithAddition width="134px" placeholder="Вес" additionalItemDefaultIndex={0} additionalItemOptions={weightOptions} />
      <TextFieldWithAddition width="134px" placeholder="Объем" additionalItemPlaceholder={<span>м<sup>3</sup></span>} />
    </Box>
  </Box>;
};
