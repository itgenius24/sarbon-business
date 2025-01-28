import { DeleteIcon, DocumentFileIcon, DocumentUploadIcon, UploadCloudIcon } from "@/assets/icons/icons";
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useAddCargoContext } from "../../providers";
import { useDocuments } from "./useDocuments";

export const Documents = () => {
  let { handleUploadDocument, getEmptyFileName, getValues , isAcceptRejectLoading, handleDeleteDocument = () => {} } = useAddCargoContext();

  const { documents, handleImageUpload, fileKey, t } = useDocuments({ handleUploadDocument, getEmptyFileName, getValues });

  return (
    <Box p="24px" bgColor="baseWhite" borderRadius="12px" mb="16px">
    
      {documents.map((doc, idx, arr) => {
        if(!doc.value) return;
        const isLast = arr.length === (idx+1);
        const text = doc.value.split?.("/")?.at(-1).split("_")?.at(-1);
        return <>
          <Flex justifyContent="space-between" align="center" p="12px 16px" bgColor="baseWhite" borderRadius="12px" mb={isLast ? "20px" : "10px"} shadow="0px 0px 10px 0px #0000001A">
            <Flex align="center" justifyContent="center" width="42px" height="42px" bg="#F2F4F7" borderRadius="12px">
              <DocumentFileIcon />
            </Flex>
            <Text m="0 auto 0 16px">{text}</Text>
            <Box onClick={() => handleDeleteDocument(doc.key) } mr="10px" cursor="pointer">
              <DeleteIcon color="#F04438" />
            </Box>
            <a href={doc.value} download target="_blank" rel="noopener noreferrer">
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
        cursor={fileKey && !isAcceptRejectLoading ? "pointer" : "not-allowed"}
        opacity={fileKey ? 1 : 0.5}
      >
        <input  className="visually-hidden" type="file" accept="image/*" onChange={(e) => {
          handleImageUpload(e);
        }} />
        <Box>
          <Box display="grid" placeContent="center" mx="auto" mb="12px" width="40px" height="40px" p="10px" boxShadow="0px 1px 2px 0px #1018280D" borderRadius="8px" background="white" border="1px solid" borderColor="brand.200">
            {isAcceptRejectLoading ? <Spinner /> : <UploadCloudIcon />}
          </Box>
          <Box color="primaryText" textAlign="center">
            {t("Загрузить")}
          </Box>
          <Box textAlign="center" fontWeight="400" fontSize="14px" lineHeight="18px" color="brand.600">
            {t("Фото или документы до 10 МБ. Не более 5 файлов")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
