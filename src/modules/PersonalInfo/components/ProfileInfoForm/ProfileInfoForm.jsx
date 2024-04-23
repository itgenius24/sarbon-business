import cls from "./styles.module.scss";
import { Email, PhotoIcon } from "@/assets/icons/icons";
import { TextField } from "@/components/TextField";
import { Box, Flex, Text } from "@chakra-ui/react";
import UserImg from "@/assets/images/user.png";
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
    <div className={cls.profileInfo}>
      <label className={cls.profilePhoto}>
        <img className={cls.profileImg} src={(photo && photo?.includes("http")) ? process.env.NEXT_PUBLIC_MEDIA_URL + photo : UserImg} width="104" height="104" />
        <span className={cls.profileIcon}>
          <PhotoIcon />
        </span>
        <input
          className="visually-hidden"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
      <div className={cls.fields}>
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
      </div>

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
      <Box mt="24px" className={cls.fileUpload}>
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
