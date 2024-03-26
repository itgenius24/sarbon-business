import { Box, Heading, Text } from "@chakra-ui/react";

export const DigitalFacts = ({
  completed,
  downloads,
  investment,
}) => {

  return <Box py="96px">
    <Heading textAlign="center" mb="20px" fontSize="36px" lineHeight="44px">Мы в цифрах</Heading>
    <Text color="brand.600" textAlign="center" fontSize="20px" lineHeight="30px">Наши данные в цифрах для более точного информации</Text>
    <Box maxW="906px" mx="auto" mt="64px" p="64px 30px" bgColor="baseWhite" borderRadius="16px" display="flex" justifyContent="space-between">
      <Box w="261px" textAlign="center">
        <Text fontWeight="600" fontSize="60px" lineHeight="72px" color="primary">{completed}+</Text>
        <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Projects completed</Text>
      </Box>
      <Box w="261px" textAlign="center">
        <Text fontWeight="600" fontSize="60px" lineHeight="72px" color="primary">{investment}%</Text>
        <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Return on investment</Text>
      </Box>
      <Box w="261px" textAlign="center">
        <Text fontWeight="600" fontSize="60px" lineHeight="72px" color="primary">{downloads}</Text>
        <Text fontWeight="500" fontSize="18px" lineHeight="28px" >Global downloads</Text>
      </Box>
    </Box>
  </Box>;
};
