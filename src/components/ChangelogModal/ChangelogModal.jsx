import React, { useEffect } from "react";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import remoteConfig from "@/utils/fribaseAuth";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import authStore from "@/store/auth.store";
import { useTranslation } from "react-i18next";

const CURRENT_VERSION = "1.2.0";

const ChangelogModal = ({ locale }) => {
  const toast = useToast();

  const token = authStore?.token?.access_token;
  const { isChangelog } = authStore.getAuthData;
  const router = useRouter();
  const { t } = useTranslation(locale, "translations");

  useEffect(() => {
    fetchAndActivate(remoteConfig)
      .then(() => {
        const data = JSON.parse(
          getValue(remoteConfig, "changelog_web").asString()
        );
        const shouldShow =
          data.required || data?.changelog_web[0]?.version === CURRENT_VERSION;

        if (shouldShow && token && isChangelog) {
          setTimeout(() => {
            toast({
              title: data?.changelog_web[0]?.title?.[locale],
              status: "info",
              description: (
                <Box>
                  {data?.changelog_web[0]?.description?.[locale]}
                  <Flex
                    gap={`3px`}
                    alignItems={`center`}
                    justifyContent={`center`}
                  >
                    <Button
                      _hover={{
                        backgroundColor: `transparent`,
                        textDecoration: `underline`,
                      }}
                      onClick={() => toast.closeAll()}
                      color={"white"}
                      backgroundColor={`transparent`}
                    >
                      {t(`Закрыть`)}
                    </Button>
                    <Button
                      _hover={{
                        backgroundColor: `transparent`,
                        textDecoration: `underline`,
                      }}
                      backgroundColor={`transparent`}
                      color={"white"}
                      onClick={() => router.push(`/${locale}/changelog`)}
                    >
                      Batafsil
                    </Button>
                  </Flex>
                </Box>
              ),
              duration: 3000,
              position: "top-right",
              isClosable: true,
            });
            authStore.setAuthData("isChangelog", false);
          }, 4000);
        }
      })
      .catch(console.error);
  }, [isChangelog]);
};

export default ChangelogModal;
