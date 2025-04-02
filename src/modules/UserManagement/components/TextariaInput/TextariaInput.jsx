import { Box, Flex, Textarea } from "@chakra-ui/react";
import React from "react";
import cls from "./style.module.scss";
import { DeleteFileIcon, FileUploadIcon } from "@/assets/icons/icons";
import Image from "next/image";
import FileConponent from "../FileConponent/FileConponent";

const TextariaInput = ({ files, deleteFile }) => {
  return (
    <Box className={cls.inputWrap}>
      {files?.length > 0 && (
        <Flex className={cls.filesWrap}>
          {files.map((item) => (
            <FileConponent
              deleteFile={deleteFile}
              isCreate
              cls={cls}
              key={item.name}
              item={item}
            />
          ))}
        </Flex>
      )}
      <Textarea
        placeholder="Напишите текст..."
        _placeholder={{
          fontSize: "16px",
          color: "rgba(102, 112, 133, 1)",
          fontWeight: 400,
        }}
        paddingTop={files.length > 0 ? `0px` : `10px`}
        focusBorderColor="transparent"
        _hover={{ borderColor: "transparent" }}
        className={cls.textarea}
      />
    </Box>
  );
};

export default TextariaInput;
