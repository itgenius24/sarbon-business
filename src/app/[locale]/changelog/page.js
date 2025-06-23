"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import {
  Box,
  Heading,
  Text,
  useMediaQuery,
  VStack,
  HStack,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex
} from "@chakra-ui/react";
import { useChangelogProps } from "./useChangelogProps";

export default function ChangelogPage({ params }) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { locale } = params;

  const { changelogData, loading, error, crumbs, t } = useChangelogProps(locale);

  if (loading) {
    return (
      <Container mt="50px">
        {isLargerThan768 && <BreadCrumb crumbs={crumbs} />}
        <Flex justify="center" align="center" minH="400px">
          <VStack spacing={4}>
            <Spinner size="xl" color="primary" />
            <Text color="brand.600">{t("Загрузка журнала изменений...")}</Text>
          </VStack>
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container mt="50px">
        {isLargerThan768 && <BreadCrumb crumbs={crumbs} />}
        <Alert status="error" borderRadius="12px">
          <AlertIcon />
          <Box>
            <AlertTitle>{t("Ошибка загрузки!")}</AlertTitle>
            <AlertDescription>
              {t("Не удалось загрузить журнал изменений. Попробуйте позже.")}
            </AlertDescription>
          </Box>
        </Alert>
      </Container>
    );
  }

  return (
    <Container mt="50px">
      {isLargerThan768 && <BreadCrumb crumbs={crumbs} />}

      <Box
        padding={isLargerThan768 ? 0 : "12px"}
        borderRadius={isLargerThan768 ? 0 : "12px"}
        bgColor={isLargerThan768 ? "transparent" : "white"}
      >
        <Heading
          fontSize={isLargerThan768 ? "36px" : "25px"}
          lineHeight="44px"
          mb={isLargerThan768 ? "24px" : "16px"}
          color="brand.900"
        >
          {t("Журнал изменений")}
        </Heading>

        <Text
          fontWeight="400"
          fontSize="20px"
          lineHeight="30px"
          color="brand.600"
          mb={isLargerThan768 ? "48px" : "32px"}
        >
          {t("Следите за последними обновлениями и улучшениями платформы Sarbon")}
        </Text>

        {changelogData.length === 0 ? (
          <Box
            textAlign="center"
            py="64px"
            borderRadius="12px"
            bg="brand.50"
            border="1px solid"
            borderColor="brand.200"
          >
            <Text fontSize="18px" color="brand.600">
              {t("Журнал изменений пока пуст")}
            </Text>
            <Text fontSize="14px" color="brand.500" mt={2}>
              {t("Здесь будут отображаться обновления платформы")}
            </Text>
          </Box>
        ) : (
          <VStack spacing={isLargerThan768 ? "48px" : "32px"} align="stretch">
            {changelogData.map((version, index) => (
              <Box
                key={index}
                p={isLargerThan768 ? "32px" : "24px"}
                borderRadius="16px"
                bg="baseWhite"
                border="1px solid"
                borderColor="brand.200"
                boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1)"
                _hover={{
                  boxShadow: "0px 4px 8px rgba(16, 24, 40, 0.12)",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s ease"
              >
                <HStack
                  justify="space-between"
                  align="flex-start"
                  mb="16px"
                  flexDirection={isLargerThan768 ? "row" : "column"}
                  spacing={isLargerThan768 ? 4 : 2}
                >
                  <VStack align="flex-start" spacing={2}>
                    <Heading
                      fontSize={isLargerThan768 ? "24px" : "20px"}
                      fontWeight="600"
                      color="brand.900"
                    >
                      {typeof version.title === 'string'
                        ? version.title
                        : version.title?.[locale] || version.title?.ru || `${t("Версия")} ${version.version}`
                      }
                    </Heading>
                    {version.created_at && (
                      <Text fontSize="14px" color="brand.500">
                        {new Date(version.created_at).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'uz-UZ')}
                      </Text>
                    )}
                  </VStack>

                  <Badge
                    colorScheme="green"
                    variant="subtle"
                    fontSize="12px"
                    px="8px"
                    py="4px"
                    borderRadius="6px"
                    fontWeight="500"
                  >
                    v{version.version}
                  </Badge>
                </HStack>

                <Box>
                  {version.banner && (
                    <Box mb="20px">
                      <img 
                        src={version.banner} 
                        alt={typeof version.title === 'string' 
                          ? version.title 
                          : version.title?.[locale] || version.title?.ru || `${t("Версия")} ${version.version}`
                        }
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '12px'
                        }}
                      />
                    </Box>
                  )}
                  
                  <Text
                    fontSize="16px"
                    lineHeight="24px"
                    color="brand.700"
                    whiteSpace="pre-line"
                    mb="20px"
                  >
                    {typeof version.description === 'string' 
                      ? version.description 
                      : version.description?.[locale] || version.description?.ru || t("Описание недоступно")
                    }
                  </Text>
                  
                  {version.new && version.new.length > 0 && (
                    <Box mt="20px">
                      <Text fontSize="14px" fontWeight="600" color="brand.800" mb="12px">
                        🆕 {t("Новое")}
                      </Text>
                      <VStack align="stretch" spacing={3}>
                        {version.new.map((newItem, idx) => (
                          <Box key={idx} pl="16px">
                            <Text fontSize="14px" fontWeight="500" color="brand.700" mb="4px">
                              • {typeof newItem === 'string' 
                                  ? newItem 
                                  : newItem?.title?.[locale] || newItem?.title?.ru || newItem?.title?.en || 'New Item'
                                }
                            </Text>
                            {newItem?.description && (
                              <Text fontSize="13px" color="brand.600" pl="8px">
                                {newItem.description?.[locale] || newItem.description?.ru || newItem.description?.en || ''}
                              </Text>
                            )}
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  )}

                  {version.features && version.features.length > 0 && (
                    <Box mt="20px">
                      <Text fontSize="14px" fontWeight="600" color="brand.800" mb="12px">
                        ✨ {t("Новые функции")}
                      </Text>
                      <VStack align="stretch" spacing={3}>
                        {version.features.map((feature, idx) => (
                          <Box key={idx} pl="16px">
                            <Text fontSize="14px" fontWeight="500" color="brand.700" mb="4px">
                              • {typeof feature === 'string' 
                                  ? feature 
                                  : feature?.title?.[locale] || feature?.title?.ru || feature?.title?.en || 'Feature'
                                }
                            </Text>
                            {feature?.description && (
                              <Text fontSize="13px" color="brand.600" pl="8px">
                                {feature.description?.[locale] || feature.description?.ru || feature.description?.en || ''}
                              </Text>
                            )}
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  )}

                  {version.improvements && version.improvements.length > 0 && (
                    <Box mt="20px">
                      <Text fontSize="14px" fontWeight="600" color="brand.800" mb="12px">
                        🚀 {t("Улучшения")}
                      </Text>
                      <VStack align="stretch" spacing={3}>
                        {version.improvements.map((improvement, idx) => (
                          <Box key={idx} pl="16px">
                            <Text fontSize="14px" fontWeight="500" color="brand.700" mb="4px">
                              • {typeof improvement === 'string' 
                                  ? improvement 
                                  : improvement?.title?.[locale] || improvement?.title?.ru || improvement?.title?.en || 'Improvement'
                                }
                            </Text>
                            {improvement?.description && (
                              <Text fontSize="13px" color="brand.600" pl="8px">
                                {improvement.description?.[locale] || improvement.description?.ru || improvement.description?.en || ''}
                              </Text>
                            )}
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  )}

                  {version.fixes && version.fixes.length > 0 && (
                    <Box mt="20px">
                      <Text fontSize="14px" fontWeight="600" color="brand.800" mb="12px">
                        🐛 {t("Исправления")}
                      </Text>
                      <VStack align="stretch" spacing={3}>
                        {version.fixes.map((fix, idx) => (
                          <Box key={idx} pl="16px">
                            <Text fontSize="14px" fontWeight="500" color="brand.700" mb="4px">
                              • {typeof fix === 'string' 
                                  ? fix 
                                  : fix?.title?.[locale] || fix?.title?.ru || fix?.title?.en || 'Fix'
                                }
                            </Text>
                            {fix?.description && (
                              <Text fontSize="13px" color="brand.600" pl="8px">
                                {fix.description?.[locale] || fix.description?.ru || fix.description?.en || ''}
                              </Text>
                            )}
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </Container>
  );
}
