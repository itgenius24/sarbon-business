"use client";

import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LocalizedNotFound() {
  const pathname = usePathname();
  const [locale, setLocale] = useState("ru");
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const pathSegments = pathname.split('/');
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
        
        <Heading
          as="h2"
          fontSize={{ base: "24px", md: "32px" }}
          fontWeight="600"
          color="gray.800"
          mb="16px"
          lineHeight="1.3"
        >
          {t("404_title")}
        </Heading>
        
        <Text
          fontSize={{ base: "16px", md: "18px" }}
          color="gray.600"
          mb="32px"
          maxW="500px"
          mx="auto"
          lineHeight="1.6"
        >
          {t("404_message")}
        </Text>
        
        <Link href={`/${locale}`} passHref>
          <Button
            as="a"
            colorScheme="blue"
            size="lg"
            px="32px"
            py="12px"
            fontSize="16px"
            fontWeight="600"
            borderRadius="8px"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
          >
            {t("404_back_home")}
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
