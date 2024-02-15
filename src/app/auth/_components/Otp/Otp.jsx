import cls from "./styles.module.scss";
import VerificationInput from "react-verification-input";
import { useOtpProps } from "./useOtpProps";
import { AuthTitle } from "../AuthTitle";
import { Box, Button, Text } from "@chakra-ui/react";
import { ArrowLeft } from "@/assets/icons/icons";

export const Otp = () => {

  const { onChange, handleSendOtp, navigateLogin, value } = useOtpProps();

  return <Box>
    <AuthTitle
      mb="32px"
      title="Проверьте свой телефон"
      subtitle={
        <p>
          Мы отправили вам код подтверждения на ваш указанный номер
          <span className={cls.phone}>+998 (99) 999-99-99</span>
        </p>
      }
    />
    <VerificationInput
      removeDefaultStyles
      autoFocus={() => true}
      placeholder=""
      type="number"
      validChars="0-9"
      length={6}
      inputProps={{ inputMode: "numeric" }}
      inputMode="numeric"
      onChange={onChange}
      value={value}
      containerProps={{ className: cls.otpContainer }}
      classNames={{
        container: cls.container,
        character: cls.character,
        characterSelected: cls.characterSelected,
      }}
    />
    <Button mt="44px" onClick={handleSendOtp}>Подтвердить</Button>
    <Box mt="32px" display="flex" columnGap="4px">
      <Text fontSize="14px" color="brand.600" lineHeight="20px">Не пришло сообщение?</Text>
      <Button variant="reset">Отправить ещё раз</Button>
    </Box>
    <Button
      onClick={navigateLogin}
      variant="reset"
      size="sm"
      color="brand.600"
      leftIcon={<ArrowLeft />}
      mt="32px"
    >
      Вернуться на Войти
    </Button>
  </Box>;
};
