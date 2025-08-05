"use client";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useElements } from "@/layouts/MainLayout/elements";
import { NotFountIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";

export default function LocalizedNotFound() {
  const pathname = usePathname();
  const [locale, setLocale] = useState("ru");
  const [isLoaded, setIsLoaded] = useState(false);
  const elements = useElements(locale);
  useEffect(() => {
    const pathSegments = pathname.split("/");
    const extractedLocale = pathSegments[1];
    const supportedLocales = ["ru", "en", "uz", "tr", "zh"];

    if (supportedLocales.includes(extractedLocale)) {
      setLocale(extractedLocale);
    } else {
      setLocale("ru"); // fallback to Russian
    }
    setIsLoaded(true);
  }, [pathname]);

  const { t } = useTranslation(locale, "translation");

  if (!isLoaded) {
    return (
      <Container
        maxW="container.lg"
        py={{ base: "40px", md: "80px" }}
        px={{ base: "16px", md: "24px" }}
      >
        <Box
          textAlign="center"
          bg="white"
          borderRadius="12px"
          p={{ base: "32px", md: "48px" }}
          boxShadow="sm"
        >
          <Heading
            as="h1"
            fontSize={{ base: "48px", md: "72px" }}
            fontWeight="bold"
            color="brand.500"
            mb="16px"
            lineHeight="1.2"
          >
            404
          </Heading>
        </Box>
      </Container>
    );
  }

  return (
    <Container margin={`0 auto`}>

      <div
        style={{
          minHeight: "90vh",
          width: `100%`,
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 1)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <Flex gap={`30px`}>
          <NotFountIcon />
          <Box>
            <Flex flexDirection={`column`} rowGap={`12px`}>
              <p
                style={{
                  fontSize: `16px`,
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Ошибка 404
              </p>
              <p
                style={{
                  fontSize: `44px`,
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: `44px`,
                }}
              >
                Страница не найдена
              </p>
              <p
                style={{
                  fontSize: `16px`,
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Вы пытались перейти по несуществующему адресу
              </p>
            </Flex>
            <Link
              href="/ru/auth"
              style={{
                display: "inline-block",
                backgroundColor: "rgba(38, 189, 73, 1)",
                color: "white",
                padding: "14px 20px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.2s",
                marginTop: `40px`,
              }}
            >
              Перейти на главную
            </Link>
          </Box>
        </Flex>
      </div>
    </Container>
  );
}
