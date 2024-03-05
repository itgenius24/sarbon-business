import { Email } from "@/assets/icons/icons";
import { TextField } from "@/components/TextField";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

import { fileUpload } from "@/services/fileUpload";
import FileUpload from "@/components/FileUpload";

export const ProfileInfoForm = ({ errors, watch, register, setValue }) => {
  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    setValue("profileImage", result?.link);
  };
  function imageLoader() {
    return process.env.NEXT_PUBLIC_MEDIA_URL + watch("image");
  }

  const rules = { required: { value: true, message: "Это поле обязательно для заполнения" } };


  return (
    <>
      <Flex gap="24px">
        <TextField
          register={register}
          errors={errors}
          name="name"
          label="Имя"
          rules={rules}
        />
        <TextField
          register={register}
          errors={errors}
          name="fName"
          label="Фамилия"
        />
      </Flex>

      <Box mt="24px">
        <TextField
          addonBefore={<Email />}
          register={register}
          errors={errors}
          type="email"
          name="email"
          label="Почта"
          rules={rules}
        />
      </Box>
      <Box mt="24px">
        <FileUpload
          profilePlaceholder={
            <>
              <Box fontSize="14px" lineHeight="20px">
                Нажмите, чтобы изменить фото{" "}
                <Text as="span" color="brand.600">
                  или перетащите
                </Text>
                <Text color="brand.600" fontSize="12px">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </Text>
              </Box>
            </>
          }
          variant="profile"
          name="profileImage"
          watch={watch}
          handleChange={handleImageUpload}
          imageLoader={imageLoader}
          setValue={setValue}
        />
      </Box>
    </>
  );
};
