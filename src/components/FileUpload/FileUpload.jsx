import { DeleteIcon, UploadCloudIcon } from "@/assets/icons/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";

export const FileUpload = ({
  watch,
  name,
  handleChange,
  setValue,
  placeholder = "Загрузить",
  variant="cargo", // profile, cargo
  profilePlaceholder,
}) => {
  const canEdit = true;

  const imageLoader = ()=> {
    return `${process.env.NEXT_PUBLIC_MEDIA_URL}${src}`;
  };

  const src = watch(name);
  if (src && variant === "cargo") {
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        ml="auto"
        width="100%"
        height="150px"
        borderRadius="12px"
        border="1px solid"
        borderColor="brand.200"
        padding="16px 24px"
      >
        <Image
          // className={cls.img}
          loader={imageLoader}
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${src}`}
          alt="cargo"
          width={150}
          height={150}
        />
        <Button
          isDisabled={!canEdit}
          onClick={() => setValue(name, null)}
          position="absolute"
          top="10px"
          left="10px"
          variant="reset"
        >
          <DeleteIcon />
        </Button>
      </Box>
    );
  }

  return (
    <Flex alignItems="center" ml="auto" mt="24px" gap="20px">
      {src && variant === "profile" && (
        <Image
        // className={cls.img}
          loader={imageLoader}
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${src}`}
          alt="profile img"
          width={150}
          height={150}
          style={{ borderRadius:"50%", height:"126px", width:"126px", objectFit: "cover" }}
        />)}
      <Box
        padding="16px 24px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor="brand.200"
        borderRadius="12px"
        as="label"
        width="100%"
        height="126px"
        cursor={canEdit ? "pointer" : "not-allowed"}
        opacity={canEdit ? 1 : 0.5}
      >
        <input
          disabled={!canEdit}
          className="visually-hidden"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <Box width="100%">
          <Box
            mx="auto"
            mb="12px"
            width="40px"
            height="40px"
            p="10px"
            boxShadow="0px 1px 2px 0px #1018280D"
            borderRadius="8px"
            background="white"
            border="1px solid"
            borderColor="brand.200"
          >
            <UploadCloudIcon />
          </Box>
          <Box color="primary" textAlign="center">
            {variant === "profile" && src ? profilePlaceholder : placeholder}
          </Box>
          {(!src || variant === "cargo") && (
            <Box
              textAlign="center"
              fontWeight="400"
              fontSize="14px"
              lineHeight="18px"
              color="brand.600"
            >
              Фото до 10 МБ.
            </Box>
          )}
        </Box>
      </Box>
    </Flex>
  );
};
