import clsx from "clsx";
import cls from "./styles.module.scss";
import { Box, Text, Textarea } from "@chakra-ui/react";

export const CustomTextarea = ({
  disabled,
  watch = () => {},
  withLimit = true,
  placeholder="Пишите здесь",
  name,
  className,
  register = () => {},
  ...props
}) => {

  return <Box display="flex" flexDirection="column" rowGap="6px" alignItems="flex-start" flexGrow={1}>
    <Textarea
      className={clsx(cls.textarea, className)}
      isDisabled={disabled}
      height="154px"
      width="100%"
      borderRadius="8px"
      borderColor="brand.200"
      _placeholder={{ color: "brand.300" }}
      resize="none"
      name={name}
      placeholder={placeholder}
      {...register(name)}
      {...props}
    />
    {
      withLimit && <Text color="brand.600" fontSize="14px" fontWeight="400" lineHeight="20px">{watch(name)?.length || 0}/1000</Text>
    }
  </Box>;
};
