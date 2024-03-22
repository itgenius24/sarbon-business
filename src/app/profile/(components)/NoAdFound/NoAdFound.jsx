import { Box, Button, Text } from "@chakra-ui/react";

export const NoAdFound = ({ handleNoData=()=>{} }) => {
  return (
    <Box textAlign="center" py="55px">
      <Text color="brand.400" fontSize="20px">
        У вас пока нет
        <br />
        активных объявлений
      </Text>
      <Button onClick={handleNoData} type="button" maxW="320px" mt="24px">
        Добавить публикацию
      </Button>
    </Box>
  );
};
