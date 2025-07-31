import authStore from "@/store/auth.store";
import remoteConfig from "@/utils/fribaseAuth";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ChangelogModal = ({ locale }) => {
  const toast = useToast();

  const token = authStore?.token?.access_token;
  const { changelog_dismissed_version } = authStore.getAuthData;
  const router = useRouter();
  const { t } = useTranslation(locale, "translations");

  useEffect(() => {
    fetchAndActivate(remoteConfig)
      .then(() => {
        const data = JSON.parse(
          getValue(remoteConfig, "changelog_web").asString()
        );

        const changelog = data?.changelog_web?.[0];
        const shouldShow = changelog?.is_active && changelog?.version;

        if (
          shouldShow &&
          changelog_dismissed_version !== changelog?.version &&
          token
        ) {
          setTimeout(() => {
            toast({
              title: changelog?.title?.[locale],

              duration: 10000,
              position: "top-right",
              isClosable: true,
              render: () => (
                <Box
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  p={4}
                  color="black"
                >
                  <Text fontWeight="bold" mb={2}>
                    {changelog?.short_title?.[locale]}
                  </Text>
                  <Box>
                    <Text mb={2}>{changelog?.short_description?.[locale]}</Text>
                    <Flex
                      gap={`3px`}
                      alignItems={`center`}
                      justifyContent={`center`}
                    >
                      <Button
                        border={`1px solid rgba(199, 199, 204, 1)`}
                        color={"rgb(90, 89, 94)"}
                        _hover={{ backgroundColor: `transparent`, }}
                        onClick={() => toast.closeAll()}
                        backgroundColor={``}
                      >
                        {t(`Закрыть`)}
                      </Button>
                      <Button
                        _hover={{ backgroundColor: `var(--primary)`, }}
                        backgroundColor={`var(--primary)`}
                        color={"rgb(255, 255, 255)"}
                        onClick={() => {
                          toast.closeAll();
                          router.push(`/${locale}/changelog`);
                        }}
                      >
                        {t(`Подробнее`)}
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              ),
            });
            authStore.setAuthData(
              `changelog_dismissed_version`,
              changelog?.version
            );
          }, 4000);
        }
      })
      .catch(console.error);
  }, [changelog_dismissed_version]);
};

export default ChangelogModal;
