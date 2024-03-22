import { Container } from "@/components/Container";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useGetUserInfoHook } from "@/hooks/useGetUserInfo";
import { LeftHeaderCard } from "./components/LeftHeaderCard";
import { Navbar } from "./components/Navbar";

export const ProfileLayout = ({ children }) => {

  const { data } = useGetUserInfoHook();

  return <Container my="40px">
    <Heading size="md" mb="24px">
      Профиль
    </Heading>
    <Flex alignItems="flex-start" columnGap="24px">
      <Box>
        <Flex gap={4} mb="16px">
          <LeftHeaderCard title="Ваш ID:" value={data?.your_id} />
          <LeftHeaderCard title="Баланс" value={data?.balance} />
        </Flex>
        <Navbar />
      </Box>
      <Box flexGrow={1}>
        {children}
      </Box>
    </Flex>
  </Container>;
};
