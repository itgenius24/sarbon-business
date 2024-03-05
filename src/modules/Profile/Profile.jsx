
import { Container } from "@/components/Container";
import { Heading } from "@chakra-ui/react";
import { MainContent } from "./components/MainContent";
import { Popup } from "@/components/Popup";

export const Profile = () => {
  return (
    <Container my="40px">
      <Heading size="md" mb="24px">
        Профиль
      </Heading>
      <MainContent />
    </Container>
  );
};
