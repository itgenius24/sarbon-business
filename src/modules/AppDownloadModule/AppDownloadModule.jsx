"use client"
import { Container } from "@/components/Container";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import AndroidPlay from "../../assets/images/android_apk.svg";
import AppStore from "../../assets/images/app-store.svg";
import cls from "./style.module.scss";
import { useTranslation } from "react-i18next";

const AppDownloadModule = () => {
  const { t } = useTranslation();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <Container my={ isLargerThan845 ? `40px` : `40px`}>
      <Flex justifyContent={`center`} alignItems={`center`} width={`100%`}>
        <Box>
          <p className={cls.mobileAppsHeading}>
            {t("Мобильные приложения Furgo")}
          </p>
          <ul className={cls.mobileAppList}>
            <li className={cls.mobileAppItem}>
              <a
                className={cls.mobileAppLink}
                href={"https://apps.apple.com/uz/app/furgo/id6475668788"}
                target="_blank"
              >
                <Image src={AppStore} alt="App store" width={250} height={250} />
              </a>
            </li>
            <li className={cls.mobileAppItem}>
              <a
                style={{ cursor: `pointer` }}
                className={cls.mobileAppLink}
                href="https://bit.ly/sarbonnew"
                target="_blank"
              >
                <Image
                  src={AndroidPlay}
                  alt="Google play"
                  width={250}
                  height={250}
                />
              </a>
            </li>
            {/* <li className={cls.mobileAppItem}>
                <a className={cls.mobileAppLink} href={"/"} target="_blank">
                  <Image
                    src={GalaxyStore}
                    alt="Galaxy store"
                    width={147}
                    height={40}
                  />
                </a>
              </li> */}
          </ul>
        </Box>
      </Flex>
    </Container>
  );
};

export default AppDownloadModule;
