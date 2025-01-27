import { UserDisIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import cls from "./style.module.scss";
import React from "react";
import { useTranslation } from "react-i18next";

const ProfileDispatcher = () => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { t } = useTranslation();

  return (
    <Container my="40px">
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex  gap={`19px`} alignItems={"center"}>
          {/* <Image
            style={{ width: `100px`, height: `100px`, borderRadius: `100%` }}
            width={150}
            height={150}
          /> */}
          <UserDisIcon />
          <Box>
              <Flex > 
                <p className={cls.disTitle}>Диспетчер</p>
                <span className={cls.date}>Сегодня 12:36</span>
              </Flex>
              <p className={cls.disName}>Шорасулов Олим  </p>
              <p className={cls.disSetting}>Настройки профиля</p>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default ProfileDispatcher;
