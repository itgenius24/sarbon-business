import cls from "./styles.module.scss";
import Image from "next/image";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { fileUpload } from "@/services/fileUpload";
import { CameraIcon, PicturesIcon } from "@/assets/icons/icons";
import { useRef } from "react";

export const UploadImgMobile = ({
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
  inputProps = {},
  type = ``,
  clearErrors,
}) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const handleImageUpload = async (e) => {
    setLoading(true);
    onClose();
    const result = await fileUpload(e, setFileUploadLoading);
    clearErrors(name);

    setValue(name, process.env.NEXT_PUBLIC_MEDIA_URL + result?.link, {
      shouldValidate: true,
      shouldDirty: true,
    });

    uploadAi(process.env.NEXT_PUBLIC_MEDIA_URL + result?.link, type);
  };

  const openCamera = () => {
    const input = document.getElementById(name);
    input.removeAttribute("accept");
    input.setAttribute("capture", "environment");
    input.click();
  };
  const openGallery = () => {
    const input = document.getElementById(name);
    input.removeAttribute("capture");
    input.setAttribute("accept", "image/*");
    input.click();
  };

  console.log(`salom`);

  return (
    <>
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
                    objectFit: `contain`,
                    objectPosition: `center`,
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
            ml="auto"
            width="100%"
            height={isLargerThan845 ? `165px` : "237px"}
            cursor={"pointer"}
            onClick={onOpen}
          >
            {isLoading ? (
              <>
                <Spinner size="xl" />
              </>
            ) : (
              <>
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

      {!watch(name)?.length > 0 && (
        <input
          id={name}
          name={name}
          className="visually-hidden"
          type="file"
          {...register(name, rules)}
          onChange={(e) => {
            handleImageUpload(e);
          }}
        />
      )}

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          borderTopLeftRadius={`12px`}
          borderTopRightRadius={`12px`}
        >
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody
            borderTopLeftRadius={`12px`}
            borderTopRightRadius={`12px`}
            mb={`20px`}
          >
            <Box mb={`30px`} mt={`14px`}>
              <p className={cls.drawerText}>Водител. удостоверение (права)</p>
              <p className={cls.drawerSubText}>
                Выберите, откуда загрузить документ
              </p>
            </Box>
            <Box
              padding={`14px`}
              borderRadius={`8px`}
              color={`white`}
              display={`flex`}
              alignItems={`center`}
              backgroundColor={`var(--primary-text)`}
              justifyContent={`center`}
              gap="8px"
              fontSize={`18px`}
              fontWeight={600}
              onClick={openCamera}
            >
              <CameraIcon />
              <span>Открыть камеру</span>
            </Box>
            <Box
              padding={`14px`}
              borderRadius={`8px`}
              color={`var(--primary-text)`}
              display={`flex`}
              alignItems={`center`}
              border={`1px solid rgba(208, 213, 221, 1)`}
              justifyContent={`center`}
              gap="8px"
              fontSize={`18px`}
              fontWeight={600}
              mt={`10px`}
              onClick={openGallery}
            >
              <PicturesIcon />
              <span>Выбрать из галереи</span>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
