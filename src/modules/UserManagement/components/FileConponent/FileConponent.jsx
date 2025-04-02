import { DeleteFileIcon, FileUploadIcon } from "@/assets/icons/icons";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import cls from "./style.module.scss";

const FileConponent = ({ item, isCreate = false, deleteFile = () => {} }) => {
  return (
    <Flex
      className={cls.mediaWrap}
      padding={isCreate ? `10px 30px 10px 13px ` : `10px 13px `}
      key={item.name}
    >
      {item.type === `file` ? (
        <FileUploadIcon />
      ) : (
        <Image
          className={cls.image}
          src={item.link}
          width={300}
          height={300}
          alt="file-img"
        />
      )}
      <Box>
        <p className={cls.fileName}>{item.name}</p>
        <p className={cls.type}>
          {item.type === `file` ? `Документ` : `Фотография`}
        </p>
      </Box>
      {
        isCreate &&  <Box onClick={() => deleteFile(item)} className={cls.deleIcon}>
        <DeleteFileIcon />
      </Box>
      }
     
    </Flex>
  );
};

export default FileConponent;
