"use client";

import cls from "./styles.module.scss";
import VerificationInput from "react-verification-input";
import { useOtpProps } from "./useOtpProps";
import { AuthTitle } from "../AuthTitle";
import { Box, Button, Text } from "@chakra-ui/react";
import { ArrowLeft } from "@/assets/icons/icons";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { MobileLogo } from "../MobileLogo";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

export const Otp = observer(() => {
  const {
    onChange,
    handleSendOtp,
    navigateBack,
    value,
    phone,
    t,
    error,
    timer,
    handleResendOtp,
    isLoading,
    success,
    typeSms
  } = useOtpProps();


  return (
    <Box className={cls.otpWrap} height={"650px"}>
      <div className={cls.buttonWrapper}>
        <Button
          onClick={navigateBack}
          variant="reset"
          size="sm"
          color="brand.600"
          leftIcon={<ArrowLeft />}
        >
          {t("Назад")}
        </Button>
      </div>

      <AuthTitle
        mb="32px"
        title={t("Проверьте свой телефон")}
        subtitle={
          <p style={{ marginTop: `40px` }}>
            {t("Мы отправили вам код подтверждения на ваш указанный номер")}
            <span className={cls.phone}> {formatPhoneNumber(phone)}</span>
          </p>
        }
      />
      <span className={cls.subtitle}>{typeSms === `PHONE` ? t("СМС-код") : t(`Telegram-код`)}</span>
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
          character: clsx(
            cls.character,
            { [cls.success]: success },
            { [cls.error]: !!error }
          ),
          characterSelected: cls.characterSelected,
        }}
      />
      <Box fontSize={`14px`} color={`red`} fontWeight={500} mt="32px">{error && t(`Введен неверный код`)}</Box>
      <Box
        display="flex"
        flexDirection="column"
        // justifyContent="center"
        // textAlign="center"
        // alignItems="center"
        mt="10px"
      >
        {timer > 0 && (
          <Text fontSize="14px" color="brand.600" lineHeight="20px">
            00:{timer < 10 ? `0${timer}` : timer}
          </Text>
        )}
        {
          timer === 0 && <Box mt="16px" display="flex" columnGap="4px">
            <Text fontSize="14px" color="brand.600" lineHeight="20px">
              {t("Не пришло сообщение?")}
            </Text>
            <Box display="flex" columnGap="4px" alignItems="center">
              <Button
                isDisabled={timer > 0}
                onClick={handleResendOtp}
                variant="reset"
              >
                {t("Отправить ещё раз")}
              </Button>
            </Box>
          </Box>
        }

      </Box>
    </Box>
  );
});
