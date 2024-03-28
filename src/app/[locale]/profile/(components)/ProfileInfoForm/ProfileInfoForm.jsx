import { Email } from "@/assets/icons/icons";
import { TextField } from "@/components/TextField";
import { Box, Flex, Text } from "@chakra-ui/react";

import FileUpload from "@/components/FileUpload";
import { SkeletonComp } from "@/components/Skeleton";
import { useProfileInfoFormProps } from "./useProfileInfoFormProps";

export const ProfileInfoForm = ({ errors, watch, register, setValue }) => {
  const {
    rules,
    full_name,
    email,
    photo,
    isLoading,
    handleImageUpload
  } = useProfileInfoFormProps(setValue);

  if (isLoading) return <SkeletonComp/>;

  return (
    <div>
      <Flex gap="24px">
        <TextField
          register={register}
          errors={errors}
          name="name"
          label="Имя"
          rules={rules}
          defaultValue={full_name?.split(" ")?.[0]}
        />

        <TextField
          register={register}
          errors={errors}
          name="fName"
          label="Фамилия"
          defaultValue={full_name?.split(" ")?.[1]}
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
          defaultValue={email}
        />
      </Box>
      <Box mt="24px">
        <FileUpload
          defaultValue={photo}
          profilePlaceholder={<FileUploadPlaceholder />}
          variant="profile"
          name="photo"
          register={register}
          watch={watch}
          handleChange={handleImageUpload}
          setValue={setValue}
        />
      </Box>
    </div>
  );
};

function FileUploadPlaceholder() {
  return (
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
  );
}
