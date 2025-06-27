import { NotFountIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { Providers } from "./[locale]/providers";
import { Footer } from "@/components/Footer";
import HeaderNotFount from "@/components/HeaderNotFount/Header";

export const metadata = {
  title: "404 - Page Not Found | Sarbon",
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <HeaderNotFount />
          <Container margin={`0 auto`}>
            <div
              style={{
                minHeight: "70vh",
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
                    href="/ru"
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
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
