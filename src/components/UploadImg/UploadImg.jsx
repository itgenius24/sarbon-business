import cls from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Spinner, useMediaQuery } from "@chakra-ui/react";
import { useGetLang } from "@/hooks/useGetLang";
import { DeleteIcon, UploadCloudBlueIcon } from "@/assets/icons/icons";
import { fileUpload } from "@/services/fileUpload";

export const UploadImg = ({
  watch,
  setValue,
  name,
  icon,
  text,
  isColor = false,
  register = () => {},
  errors,
  rules = {},
  setLoading = () => {},
  isLoading = false,
  setFileUploadLoading = () => {},
  uploadAi = () => {},
  type,
  inputProps = {},
}) => {
  const locale = useGetLang();

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const handleImageUpload = async (e) => {
    setLoading(true);
    const result = await fileUpload(e, setFileUploadLoading);

    setValue(name, process.env.NEXT_PUBLIC_MEDIA_URL + result?.link);
    uploadAi(process.env.NEXT_PUBLIC_MEDIA_URL + result?.link, type);
  };

  return (
    <Box
      className={cls.fields}
      // display="flex"
      columnGap="24px"
      maxW="540px"
      width="100%"
    >
      {watch(name)?.length > 0 ? (
        <Box>
          <Box
            display="flex"
            position="relative"
            alignItems="center"
            justifyContent="center"
            ml="auto"
            maxWidth={"540px"}
            width="100%"
            height={isLargerThan845 ? `165px` : "237px"}
            borderRadius="12px"
            border={`2px dashed  rgba(219, 216, 227, 1)`}
            background={
              isColor ? "rgba(246, 247, 248, 1)" : "rgba(255, 255, 255, 1)"
            }
            padding="16px 10px"
          >
            {isLoading ? (
              <>
                <Spinner size="xl" />
              </>
            ) : (
              <Image
                className={cls.img}
                src={watch(name)}
                alt="cargo"
                width={isLargerThan845 ? 250 : 300}
                height={isLargerThan845 ? 250 : 300}
                style={{
                  width: `100%`,
                  height: isLargerThan845 ? `150px` : `210px`,
                  objectFit: `cover`,
                }}
              />
            )}
          </Box>
          {isLoading ? (
            <>
              <></>
            </>
          ) : (
            <Box
              width={`100%`}
              height={`30px`}
              borderRadius={`8px`}
              zIndex={12323231111}
              backgroundColor={`transparent`}
              fontWeight={`400`}
              fontSize={`16px`}
              textAlign={`center`}
              marginTop={`10px`}
            >
              <span
                onClick={() => {
                  setValue(name, null);
                }}
                style={{
                  paddingBottom: `5px`,
                  borderBottom: `1px dashed red`,
                  color: `red`,
                  cursor: `pointer`,
                }}
              >
                Удалить фото
              </span>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          // mt="24px"
          border={
            errors?.[name]
              ? `2px dashed red`
              : `2px dashed  rgba(219, 216, 227, 1)`
          }
          borderRadius="12px"
          background={
            isColor ? "rgba(246, 247, 248, 1)" : "rgba(237, 239, 245, 1)"
          }
          as="label"
          ml="auto"
          width="100%"
          height={isLargerThan845 ? `165px` : "237px"}
          cursor={"pointer"}
        >
          {isLoading ? (
            <>
              <Spinner size="xl" />
            </>
          ) : (
            <>
              <input
                id={name}
                name={name}
                className="visually-hidden"
                type="file"
                accept="image/*"
                {...register(name, rules)}
                onChange={(e) => {
                  handleImageUpload(e);
                }}
              />
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                width={"100%"}
              >
                <Box
                  mx="auto"
                  width="100%"
                  height="100%"
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  {icon}
                </Box>
                <Box
                  fontSize={"14px"}
                  fontWeight={400}
                  textAlign="center"
                  // p={"2px"}
                  mt={"20px"}
                  color={errors?.[name] ? `red` : "rgba(0, 122, 255, 1)"}
                  borderBottom={`1.5px dashed ${
                    errors?.[name] ? `red` : "rgba(0, 122, 255, 1)"
                  }`}
                  width={`fit-content`}
                >
                  {text}
                </Box>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};
