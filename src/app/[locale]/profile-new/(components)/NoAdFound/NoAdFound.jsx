import { Box, Button, Text } from "@chakra-ui/react";

export const NoAdFound = ({ handleNoData=()=>{}, status }) => {
  return (
    <Box textAlign="center" py="55px">
      <Text color="brand.400" fontSize="20px">
        У вас пока нет
        <br />
        активных объявлений
      </Text>
      {
        status !== "archive" && <Button onClick={handleNoData} type="button" maxW="320px" mt="24px">
          Добавить публикацию
        </Button>
      }
    </Box>
  );
};
