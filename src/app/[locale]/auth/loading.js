import { Flex, Spinner, Text } from "@chakra-ui/react";

/**
 * Auth loading component displayed during authentication processes
 * @returns {JSX.Element} Loading spinner with text
 */
export default function AuthLoader() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      gap={4}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text fontSize="lg" color="gray.600">
        Загрузка...
      </Text>
    </Flex>
  );
}
