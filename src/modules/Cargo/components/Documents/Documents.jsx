import { useTranslation } from "@/app/i18n/client";
import { DocumentFileIcon, DocumentUploadIcon, UploadCloudIcon } from "@/assets/icons/icons";
import { useGetLang } from "@/hooks/useGetLang";
import { fileUpload } from "@/services/fileUpload";
import { Box, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useMemo } from "react";
import { useDocuments } from "./useDocuments";

export const Documents = ({ handleUploadDocument = () => {}, getEmptyFileName = () => {}, getValues = () => {} }) => {

  const { documents, handleImageUpload, canEdit, t } = useDocuments({ handleUploadDocument, getEmptyFileName, getValues });

  return (
    <Box p="24px" bgColor="baseWhite" borderRadius="12px" mb="16px">
      <Heading fontSize="30px" lineHeight="38px" mb="20px">{t("Документация")}</Heading>
      {documents.map((doc, idx, arr) => {
        if(!doc) return;
        const isLast = arr.length === (idx+1);
        const text = doc.split?.("/")?.at(-1).split("_")?.at(-1);
        return <>
          <Flex justifyContent="space-between" align="center" p="12px 16px" bgColor="baseWhite" borderRadius="12px" mb={isLast ? "20px" : "10px"} shadow="0px 0px 10px 0px #0000001A">
            <Flex align="center" justifyContent="center" width="42px" height="42px" bg="#F2F4F7" borderRadius="12px">
              <DocumentFileIcon />
            </Flex>
            <Text m="0 auto 0 16px">{text}</Text>
            <a href={doc} download target="_blank" rel="noopener noreferrer">
              <DocumentUploadIcon />
            </a>
          </Flex>
        </>;
      })}
      <Box
        padding="16px 24px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt="24px"
        border="1px solid"
        borderColor="brand.200"
        borderRadius="12px"
        as="label"
        maxWidth={"100%"}
        ml="auto"
        width="100%"
        height="126px"
        cursor={canEdit ? "pointer" : "not-allowed"}
        opacity={canEdit ? 1 : 0.5}
      >
        <input disabled={!canEdit} className="visually-hidden" type="file" accept="image/*" onChange={(e) => {
          handleImageUpload(e);
        }} />
        <Box>
          <Box mx="auto" mb="12px" width="40px" height="40px" p="10px" boxShadow="0px 1px 2px 0px #1018280D" borderRadius="8px" background="white" border="1px solid" borderColor="brand.200">
            <UploadCloudIcon />
          </Box>
          <Box color="primaryText" textAlign="center">
            {t("Загрузить")}
          </Box>
          <Box textAlign="center" fontWeight="400" fontSize="14px" lineHeight="18px" color="brand.600">
            {t("Фото или документы до 10 МБ. Не более 10 файлов")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
