import cls from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { fileUpload } from "@/services/fileUpload";
import { Cropper } from "react-cropper";
import { useRef, useState } from "react";
import "../../../node_modules/react-cropper/node_modules/cropperjs/dist/cropper.css";

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
  isCrop = false,
}) => {
  const cropperRef = useRef(null);
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [cropImg, setCropImg] = useState();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && isCrop) {
      const reader = new FileReader();
      reader.onloadend = () => setCropImg(reader.result);
      reader.readAsDataURL(file);
      onOpen();
    }
    if (file && !isCrop) {
      uploadIsCrop(e);
    }
  };

  const uploadIsCrop = async (e) => {
    setLoading(true);
    const result = await fileUpload(e, setFileUploadLoading);

    setValue(name, process.env.NEXT_PUBLIC_MEDIA_URL + result?.link);
    uploadAi(process.env.NEXT_PUBLIC_MEDIA_URL + result?.link, type);
  };

    console.log(`result`,  watch(name));


  const onCropDone = async (file) => {
    onClose();
    setLoading(true);
    const result = await fileUpload(file, setFileUploadLoading, `base64`);
    setValue(name, process.env.NEXT_PUBLIC_MEDIA_URL + result?.link);
    uploadAi(process.env.NEXT_PUBLIC_MEDIA_URL + result?.link, type);
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], "cropped-image.jpg", {
              type: "image/jpeg",
            });
            onCropDone(file);
          }
        },
        "image/jpeg",
        0.95
      );
    }
  };

  const closeModal = () => {
    onClose();
    setCropImg(null);
    setValue(name, null);
  };

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

      <Modal size={`4xl`} isOpen={isOpen} onClose={() => closeModal()}>
        <ModalOverlay onClose={() => closeModal()} />
        <ModalContent>
          <ModalHeader>Обрезать изображение</ModalHeader>
          <ModalCloseButton onClose={() => closeModal()} />
          <ModalBody padding={`8px 5px`}>
            <Cropper
              src={cropImg}
              style={{ height: 600, width: "100%" }}
              initialAspectRatio={1}
              guides={true}
              viewMode={1}
              background={false}
              responsive={true}
              autoCropArea={0.5}
              checkOrientation={false}
              ref={cropperRef}
              zoomTo={0.5}
              preview=".img-preview"
              minCropBoxHeight={10}
              minCropBoxWidth={10}
                movable={true}   
                  dragMode="move" 
               
                 scalable={true}           // rasmni o‘lchamini o‘zgartirish mumkin bo‘ladi
  cropBoxMovable={true}     // crop box'ni o‘zi harakatlansin
  cropBoxResizable={true}
            />
          </ModalBody>

          <ModalFooter paddingTop={`0px`} paddingBottom={`5px`}>
            <Button width={`fit-content`} onClick={handleCrop}>
              Обрезать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
