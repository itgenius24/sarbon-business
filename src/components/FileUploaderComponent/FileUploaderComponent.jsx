import cls from "./styles.module.scss";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { fileUpload } from "@/services/fileUpload";
import { FileUploadIconOutline } from "@/assets/icons/icons";
import { useState } from "react";

export const FileUploaderComponent = ({
  setFileFn,
}) => {
  const [loading,setLoading] = useState(false)
  const handleImageUpload = async (e) => {
    const result = await fileUpload(e,setLoading);
    setFileFn(result);
  };

  return (
    <Box  cursor={`pointer`} display={`flex`} alignItems={`center`}   width={`100%`} as={loading ? `div` : "label"}>
      <input
        className="visually-hidden"
        type="file"
        onChange={(e) => {
          handleImageUpload(e);
        }}
      />
      <Flex
        padding={`9px`}
        gap={`5px`}
        display={"flex"}
        alignItems={"center"}
        width={"100%"}
      >
      {
        loading ? <Spinner size='sm' color="rgba(126, 123, 134, 1)" /> : <FileUploadIconOutline />
      }
        <span className={cls.uploadName}>Прикрепить файл</span>
      </Flex>
    </Box>
  );
};
