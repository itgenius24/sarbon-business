"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { Box, Heading, Text, useMediaQuery, VStack, Flex } from "@chakra-ui/react";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { PageContentLayout } from "@/layouts/PageContentLayout";
import Link from "next/link";
import cls from "./styles.module.scss";

export default function LegalPage() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");

  const crumbs = [
    {
      title: t("Главная"),
      href: "/",
    },
    { title: t("Правовая информация") },
  ];

  const legalSections = {
    useful: [
      {
        title: t("Расчет расстояний"),
        link: `/${locale}/distance-calculation`,
      },
      {
        title: t("Журнал изменений"),
        link: `/${locale}/changelog`,
      },
    ],
    contacts: [
      {
        title: t("О системе Sarbon"),
        link: `/${locale}/about-us`,
      },
      {
        title: t("Контактная информация"),
        link: `/${locale}/contact`,
      },
    ],
    information: [
      {
        title: t("Политика конфиденциальности"),
        link: `/${locale}/privacy-policy`,
      },
      {
        title: t("Карта сайта"),
        link: `/${locale}/site-map`,
      },
    ],
  };

  return (
    <PageContentLayout>
      <Container mt="50px">
        {isLargerThan768 && <BreadCrumb crumbs={crumbs} />}
        <Box 
          padding={isLargerThan768 ? 0 : "12px"} 
          borderRadius={isLargerThan768 ? 0 : "12px"} 
          bgColor={isLargerThan768 ? "transparent" : "white"}
        >
          <Heading 
            fontSize={isLargerThan768 ? 48 : 20} 
            lineHeight={isLargerThan768 ? "60px" : "20px"} 
            mb="24px"
          >
            {t("Правовая информация")}
          </Heading>
          
          <VStack spacing={8} align="stretch">
            {/* Useful Section */}
            <Box className={cls.section}>
              <Heading 
                fontSize={isLargerThan768 ? 24 : 18} 
                mb="16px" 
                color="brand.600"
              >
                {t("Полезное")}
              </Heading>
              <VStack spacing={3} align="stretch">
                {legalSections.useful.map((item) => (
                  <Link key={item.title} href={item.link} className={cls.link}>
                    <Flex 
                      p="12px" 
                      borderRadius="8px" 
                      bg="gray.50" 
                      _hover={{ bg: "gray.100" }}
                      justify="space-between"
                      align="center"
                    >
                      <Text fontSize="16px" color="brand.600">
                        {item.title}
                      </Text>
                      <Box>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L10 8L6 4"
                            stroke="#7E7B86"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                    </Flex>
                  </Link>
                ))}
              </VStack>
            </Box>

            {/* Contacts Section */}
            <Box className={cls.section}>
              <Heading 
                fontSize={isLargerThan768 ? 24 : 18} 
                mb="16px" 
                color="brand.600"
              >
                {t("Контакты и тарифы")}
              </Heading>
              <VStack spacing={3} align="stretch">
                {legalSections.contacts.map((item) => (
                  <Link key={item.title} href={item.link} className={cls.link}>
                    <Flex 
                      p="12px" 
                      borderRadius="8px" 
                      bg="gray.50" 
                      _hover={{ bg: "gray.100" }}
                      justify="space-between"
                      align="center"
                    >
                      <Text fontSize="16px" color="brand.600">
                        {item.title}
                      </Text>
                      <Box>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L10 8L6 4"
                            stroke="#7E7B86"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                    </Flex>
                  </Link>
                ))}
              </VStack>
            </Box>

            {/* Information Section */}
            <Box className={cls.section}>
              <Heading 
                fontSize={isLargerThan768 ? 24 : 18} 
                mb="16px" 
                color="brand.600"
              >
                {t("Информация")}
              </Heading>
              <VStack spacing={3} align="stretch">
                {legalSections.information.map((item) => (
                  <Link key={item.title} href={item.link} className={cls.link}>
                    <Flex 
                      p="12px" 
                      borderRadius="8px" 
                      bg="gray.50" 
                      _hover={{ bg: "gray.100" }}
                      justify="space-between"
                      align="center"
                    >
                      <Text fontSize="16px" color="brand.600">
                        {item.title}
                      </Text>
                      <Box>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L10 8L6 4"
                            stroke="#7E7B86"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                    </Flex>
                  </Link>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Container>
    </PageContentLayout>
  );
}
