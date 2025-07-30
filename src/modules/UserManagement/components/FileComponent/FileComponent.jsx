import { DeleteFileIcon, FileUploadIcon } from "@/assets/icons/icons";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import React, { useCallback } from "react";
import cls from "./style.module.scss";

/**
 * FileComponent displays a file or image with optional delete functionality
 * @param {Object} props - Component props
 * @param {Object} props.item - File item object
 * @param {string} props.item.name - File name
 * @param {string} props.item.type - File type: "file" or "image"
 * @param {string} props.item.link - File URL/link
 * @param {boolean} props.isCreate - Whether component is in create mode (shows delete button)
 * @param {Function} props.deleteFile - Callback function to handle file deletion
 * @returns {JSX.Element} File component with preview and optional delete button
 * @example
 * <FileComponent
 *   item={{ name: "document.pdf", type: "file", link: "/path/to/file" }}
 *   isCreate={true}
 *   deleteFile={(item) => console.log('Delete', item)}
 * />
 */
const FileComponent = React.memo(({ item, isCreate = false, deleteFile = () => {} }) => {
  // Memoize delete handler to prevent unnecessary re-renders
  const handleDelete = useCallback(() => {
    deleteFile(item);
  }, [deleteFile, item]);

  if (!item) {
    return null;
  }

  return (
    <Flex
      className={cls.mediaWrap}
      padding={isCreate ? "10px 30px 10px 13px" : "10px 13px"}
      role="listitem"
      aria-label={`Файл: ${item.name}`}
    >
      {item.type === "file" ? (
        <Box aria-label="Иконка документа" role="img">
          <FileUploadIcon />
        </Box>
      ) : (
        <Image
          className={cls.image}
          src={item.link}
          width={300}
          height={300}
          alt={`Изображение: ${item.name}`}
          loading="lazy"
        />
      )}
      <Box>
        <p className={cls.fileName} aria-label={`Имя файла: ${item.name}`}>
          {item.name}
        </p>
        <p className={cls.type} aria-label={`Тип файла: ${item.type === "file" ? "Документ" : "Фотография"}`}>
          {item.type === "file" ? "Документ" : "Фотография"}
        </p>
      </Box>
      {isCreate && (
        <Box
          onClick={handleDelete}
          className={cls.deleteIcon}
          role="button"
          tabIndex={0}
          aria-label={`Удалить файл ${item.name}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleDelete();
            }
          }}
        >
          <DeleteFileIcon />
        </Box>
      )}
    </Flex>
  );
});

FileComponent.displayName = "FileComponent";

export default FileComponent;
