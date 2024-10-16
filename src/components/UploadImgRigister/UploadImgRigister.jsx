import cls from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Box, Button } from "@chakra-ui/react";
import { useGetLang } from "@/hooks/useGetLang";
import { DeleteIcon, UploadCloudBlueIcon } from "@/assets/icons/icons";
import { fileUpload } from "@/services/fileUpload";

export const UploadImgRigister = ({ watch,setValue,name,icon,text,isColor = false }) => {

  const locale = useGetLang();
  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    // setValue("image", result?.link);
    setValue(name, process.env.NEXT_PUBLIC_MEDIA_URL + result?.link);
  };

  return (
    <Box
      className={cls.fields}
      display="flex"
      columnGap="24px"
      maxW="540px"
      width="100%"
    >
      {watch(name) ? (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        // ml="auto"
        maxWidth={"540px"}
        width="184px"
        height="184px"
        borderRadius="12px"
        border="1px solid"
        borderColor="brand.200"
        padding="6px"
      >
        <Image
          className={cls.img}
          src={watch(name)}
          alt="cargo"
          width={184}
          height={184}
          objectFit="contend"
         
        />
        <Button
          onClick={() => {
            setValue(name, null);
          }}
          position="absolute"
          borderRadius={"none"}
          bottom="-30px"
          left="40px"
          variant="reset"
          fontWeight={400}
          color={"rgba(255, 0, 0, 1)"}
          borderBottom="1px dashed rgba(255, 0, 0, 1)"
        >
          Удалить фото
        </Button>
      </Box>

    ) : (
      <Box

        display="flex"
        alignItems="center"
        justifyContent="center"
        // mt="24px"
        border="2px solid var(--quat_grey, rgba(219, 216, 227, 1))"
        borderRadius="12px"
        background={isColor ? "rgba(246, 247, 248, 1)":"rgba(255, 255, 255, 1)"}
        as="label"
        // ml="auto"
        width="184px"
        height={"184px"}
        cursor={"pointer"}
      >
        <input
          className="visually-hidden"
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImageUpload(e);
          }}
        />
        <Box  display={'flex'} flexDirection={"column"} alignItems={'center'} width={'100%'}>
          <Box
            mx="auto"
            // mb="12px"
            width="100%"
            height="100%"
            display={'flex'} flexDirection={"column"} alignItems={'center'} 
          >
           {icon}
          </Box>
          <Box
            fontSize={"14px"}
            fontWeight={400}
            textAlign="center"
            // p={"2px"}
            mt={"20px"}
            color="rgba(0, 122, 255, 1)"
            borderBottom="1.5px dashed rgba(0, 122, 255, 1)"
            width={`fit-content`}
           

          >
          {text}
          </Box>
        </Box>
      </Box>
    )}

    </Box>
  )

};
