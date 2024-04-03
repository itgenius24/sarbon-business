"use client";

import cls from "./styles.module.scss";
import VerificationInput from "react-verification-input";
import { useOtpProps } from "./useOtpProps";
import { AuthTitle } from "../AuthTitle";
import { Box, Button, Text } from "@chakra-ui/react";
import { ArrowLeft } from "@/assets/icons/icons";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

export const Otp = observer(() => {

  const { onChange, handleSendOtp, navigateBack, value, phone, t, error } = useOtpProps();

  return <Box>
    <Button
      onClick={navigateBack}
      variant="reset"
      size="sm"
      color="brand.600"
      leftIcon={<ArrowLeft />}
      mb="32px"
    >
      {t("Назад")}
    </Button>
    <AuthTitle
      mb="32px"
      title="Проверьте свой телефон"
      subtitle={
        <p>
          {t("Мы отправили вам код подтверждения на ваш указанный номер")}
          <span className={cls.phone}>{phone}</span>
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
        character: clsx(cls.character, { [cls.error]: !!error }),
        characterSelected: cls.characterSelected,
      }}
    />
    <Button mt="44px" onClick={handleSendOtp}>{t("Подтвердить")}</Button>
    <Box mt="32px" display="flex" columnGap="4px">
      <Text fontSize="14px" color="brand.600" lineHeight="20px">{t("Не пришло сообщение?")}</Text>
      <Button onClick={handleSendOtp} variant="reset">{t("Отправить ещё раз")}</Button>
    </Box>
  </Box>;
});
