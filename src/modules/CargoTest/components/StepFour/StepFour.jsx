import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import cls from "./style.module.scss";
import { LoadStepIcon, NextArrowIcon, NoteIcon } from "@/assets/icons/icons";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import useFourProps from "./useFourProps";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/Checkbox";
import { CustomTextarea } from "@/components/CustomTextarea";
import { useParams, usePathname } from "next/navigation";

const StepFour = ({ status }) => {
  const [value, setValueR] = React.useState("negotiable");
  const {
    register,
    control,
    errors,
    setValue,
    watch,
    setCheck,
    check,
    currencyOptions,
    paymentOptions,
    disabled,
    canEdit,
    order_status,
    canEditActive,
    onSubmit,
    mone,
    setEditModal
  } = useFourProps({});
  const { t } = useTranslation();

  const params = usePathname();

  const [disabledP, setDisabledP] = useState(true);

  useEffect(() => {
    if (canEdit && watch(`prepayment`)) {
      setDisabledP(false);
    } else {
      setDisabledP(true);
    }
  }, [canEdit, watch(`prepayment`)]);

  useEffect(() => {
    if (!watch(`prepayment_percentage`) && params.includes("my-loads")) {
      setValue(`prepayment`, true);
    }
  }, []);

  const negotiableOption = [
    {
      label: "Без торга",
      value: `negotiable`,
    },
    {
      label: "Возможен торг",
      value: `no_negotiable`,
    },
    {
      label: "Запросить",
      value: `request`,
    },
  ];

  useEffect(() => {
    if (!watch(`price_prepayment_unit`)?.label) {
      setValue(`price_prepayment_unit`, currencyOptions?.[2]);
    }
  }, [currencyOptions?.length]);

  const onChange = (e) => {
    setValueR(e);
    const selectedOption = currencyOptions?.filter(
      (item) => item.label === e
    )[0];
    setValue(`price_prepayment_unit`, selectedOption);
  };



  const onChangeNa = (e) => {
    console.log(`negotiable`, e);
    if (e === `negotiable`) {
      setValue(`negotiable`, true);
      setCheck(false);
    } else if (e === `no_negotiable`) {
      setValue(`negotiable`, false);
      setCheck(false);
    } else {
      setCheck(true);
    }
    setValueR(e);
  };

  useEffect(() => {
    if (watch(`money_code`)?.length > 0) {
      console.log(`salomqale`, watch(`money_code`));
      setValue(`negotiable`, false);
      setValueR(`request`);
      setCheck(true);

      setTimeout(() => {
        [`eur`, `free_nds`, `rub`, `spot`, `usd`, `uzs`, `with_nds`].forEach(
          (item) => {
            if (watch(`money_code`).includes(item)) {
              setValue(item, true);
            } else {
              setValue(item, false);
            }
          }
        );
      }, 500);
    }
  }, [watch(`money_code`)?.length > 0]);

  return (
    <Box className={cls.containerCards}>
      <Box className={cls.step1}>
        <Flex width={"100%"} gap={"13px"}>
          <Box className={cls.logoWrap}>
            <NoteIcon />
          </Box>
          <Box width={"100%"}>
            <Flex
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex gap={`50px`}>
                <Flex gap={`8px`} alignItems={`center`}>
                  <Box className={cls.logoWrapMobile}>
                    <NoteIcon />
                  </Box>
                  <p className={cls.stepTitle}>{t(`Оплата`)}</p>
                </Flex>
                <Flex className={cls.radioWrap} gap={"50px"}>
                  {!check && !status && currencyOptions ? (
                    <RadioGroup
                      defaultValue={
                        watch(`price_prepayment_unit`)?.label || `доллар`
                      } // Set the default value
                      onChange={(e) => onChange(e)}
                    >
                      <Flex gap={"19px"}>
                        {currencyOptions &&
                          currencyOptions.map((item) => (
                            <Radio
                              key={item.label}
                              border={"1px solid rgba(208, 213, 221, 1)"}
                              value={item.label}
                              size={"md"}
                              _checked={{
                                bg: "white", // Custom background color
                                border: `5px solid rgba(0, 122, 255, 1)`,
                              }}
                            >
                              <span
                                className={
                                  watch(`price_prepayment_unit`)?.label ===
                                  item.label
                                    ? cls.ActiveRadio
                                    : cls.radio
                                }
                              >
                                {item?.label?.charAt(0).toUpperCase() +
                                  item?.label?.slice(1).toLowerCase()}
                              </span>
                            </Radio>
                          ))}
                      </Flex>
                    </RadioGroup>
                  ) : (
                    status && (
                    <Box onClick={() => !canEdit ? setEditModal(true) : null}>
                    <RadioGroup
                        isDisabled={!canEdit}
                        onChange={(e) => onChangeNa(e)}
                        value={value}
                      >
                        <Flex gap={"10px"}>
                          {negotiableOption &&
                            negotiableOption.map((item) => (
                              <Radio
                                key={item.value}
                                border={"1px solid rgba(208, 213, 221, 1)"}
                                value={item.value}
                                size={"md"}
                              >
                                <span
                                  className={
                                    value === item.value
                                      ? cls.ActiveRadio
                                      : cls.radio
                                  }
                                >
                                  {item?.label?.charAt(0).toUpperCase() +
                                    item?.label?.slice(1).toLowerCase()}
                                </span>
                              </Radio>
                            ))}
                        </Flex>
                      </RadioGroup>
                    </Box>
                    )
                  )}
                </Flex>
              </Flex>

              {!status && (
                <Flex alignItems={"center"} gap={3}>
                  <p>{t(`Запросить цену`)}</p>
                  <Switch
                    isChecked={check}
                    onChange={(e) => setCheck(e.target.checked)}
                    size={"md"}
                    sx={{
                      "& .chakra-switch__track": {
                        backgroundColor: "rgba(230, 224, 233, 1) !important",
                      },
                      "&[data-checked] .chakra-switch__track": {
                        backgroundColor: "#007aff !important",
                      },
                      "& .chakra-switch__thumb": {
                        background: "rgba(121, 116, 126, 1) !important",
                      },
                      "&[data-checked] .chakra-switch__thumb": {
                        background: "rgb(255, 255, 255) !important",
                      },
                    }}
                  />
                </Flex>
              )}
            </Flex>
            {!check ? (
              <Box className={cls.contendWrap} width={"100%"}>
                <Flex
                  mb={`20px`}
                  borderRadius={`8px`}
                  padding={`5px 5px`}
                  justifyContent={`center`}
                  background={`rgba(246, 247, 248, 1)`}
                  gap={"50px"}
                  className={cls.radioWrapMobile}
                >
                  {!check && !status && currencyOptions ? (
                    <RadioGroup
                      defaultValue={
                        watch(`price_prepayment_unit`)?.label || `доллар`
                      } // Set the default value
                      onChange={(e) => onChange(e)}
                    >
                      <Flex justifyContent={`center`} gap={"19px"}>
                        {currencyOptions &&
                          currencyOptions.map((item) => (
                            <Radio
                              key={item.label}
                              border={"1px solid rgba(208, 213, 221, 1)"}
                              value={item.label}
                              size={"md"}
                              _checked={{
                                bg: "white", // Custom background color
                                border: `5px solid rgba(0, 122, 255, 1)`,
                              }}
                            >
                              <span
                                className={
                                  watch(`price_prepayment_unit`)?.label ===
                                  item.label
                                    ? cls.ActiveRadio
                                    : cls.radio
                                }
                              >
                                {item?.label?.charAt(0).toUpperCase() +
                                  item?.label?.slice(1).toLowerCase()}
                              </span>
                            </Radio>
                          ))}
                      </Flex>
                    </RadioGroup>
                  ) : (
                    status && (
                      <RadioGroup
                        isDisabled={!canEdit}
                        onChange={(e) => onChangeNa(e)}
                        value={value}
                      >
                        <Flex gap={"10px"}>
                          {negotiableOption &&
                            negotiableOption.map((item) => (
                              <Radio
                                key={item.value}
                                border={"1px solid rgba(208, 213, 221, 1)"}
                                value={item.value}
                                size={"md"}
                              >
                                <span
                                  className={
                                    value === item.value
                                      ? cls.ActiveRadio
                                      : cls.radio
                                  }
                                >
                                  {item?.label?.charAt(0).toUpperCase() +
                                    item?.label?.slice(1).toLowerCase()}
                                </span>
                              </Radio>
                            ))}
                        </Flex>
                      </RadioGroup>
                    )
                  )}
                </Flex>

                <Flex className={cls.inputWrap} gap={10} width={"100%"}>
                  <Box width={"100%"}>
                    <Flex mb={2} alignItems={"center"} gap={"10px"}>
                      <p className={cls.label}>{t(`Общая сумма`)}</p>
                      {!status && (
                        <Checkbox
                          isDisabled={!canEdit}
                          defaultChecked={watch(`negotiable`)}
                          register={register}
                          name="negotiable"
                        >
                          {t(`Возможен торг`)}
                        </Checkbox>
                      )}
                    </Flex>
                    <TextFieldWithAddition
                      onClick={() => !canEdit ? setEditModal(true) :null}

                      disabled={order_status?.[0] === "active" || !canEdit}
                      name="price"
                      register={register}
                      control={control}
                      additionalItemName="payment_type"
                      additionalItemDefaultIndex={0}
                      placeholder={t("Введите сумму")}
                      errors={errors}
                      onKeyDown={(e) => {
                        if (e.key === "." || e.key === "," || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      type="number"
                      width="100%"
                      additionalItemOptions={paymentOptions}
                      zIndex={20}
                      after={watch(`price_prepayment_unit`)?.label}
                    />
                  </Box>
                  <Box width={"100%"}>
                    <Flex mb={2} alignItems={"center"} gap={"10px"}>
                      <Checkbox
                        register={register}
                        name={`prepayment`}
                        defaultChecked={watch(`prepayment`)}
                        isDisabled={order_status?.[0] === "active" || !canEdit}
                      >
                        {t(`Предоплата`)}
                      </Checkbox>
                    </Flex>
                    <TextFieldWithAddition
                      onClick={() => !canEdit ? setEditModal(true) :null}

                      disabled={order_status?.[0] === "active" || disabledP}
                      name="price_prepayment"
                      register={register}
                      control={control}
                      additionalItemName="payment_type_1"
                      additionalItemDefaultIndex={0}
                      placeholder={t("Введите сумму")}
                      errors={errors}
                      onKeyDown={(e) => {
                        if (e.key === "." || e.key === "," || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      type="number"
                      width="100%"
                      additionalItemOptions={paymentOptions}
                      zIndex={20}
                      after={watch(`price_prepayment_unit`)?.label}
                    />
                  </Box>
                </Flex>
                <Flex className={cls.inputWrap} mt={5} gap={10} width={"100%"}>
                  {!status ? (
                    <Box width={"100%"}>
                      <Flex mb={2} alignItems={"center"} gap={"10px"}>
                        <p className={cls.label}>
                          {t(`Сумма после завершения заказа`)}
                        </p>
                      </Flex>
                      <TextFieldWithAddition
                        disabled={true}
                        name="price_after_order"
                        register={register}
                        control={control}
                        additionalItemName="payment_type"
                        additionalItemDefaultIndex={0}
                        placeholder={t("Введите сумму")}
                        errors={errors}
                        onKeyDown={(e) => {
                          if (e.key === "." || e.key === "," || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        type="number"
                        width="100%"
                        additionalItemOptions={paymentOptions}
                        zIndex={10}
                        after={watch(`price_prepayment_unit`)?.label}
                      />
                    </Box>
                  ) : (
                    <Box width={`100%`}>
                      <p className={cls.totalTEet}>
                        Сумма после завершения заказа
                      </p>
                      <p className={cls.totalSum}>
                        {watch(`price_after_order`) -
                          (watch(`price_prepayment`)
                            ? watch(`price_prepayment`)
                            : 0)}

                        {` ${
                          watch(`price_prepayment_unit`)
                            ?.label?.charAt(0)
                            .toUpperCase() +
                            watch(`price_prepayment_unit`)
                              ?.label?.slice(1)
                              .toLowerCase() || `Доллар`
                        }`}
                      </p>
                    </Box>
                  )}
                  <Box width={"100%"}>
                    <Flex mb={2} alignItems={"center"} gap={"10px"}>
                      <p className={cls.label}>
                        {t(`Заметки по оплате (видно только вам)`)}
                      </p>
                    </Flex>
                    <textarea
                      className={cls.textarea}
                      disabled={!canEdit}
                      value={watch(`payment_description`)}
                      name={"payment_description"}
                      watch={watch}
                      placeholder={t("Пишите здесь")}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 1000) {
                          setValue("payment_description", value);
                        }
                      }}
                    ></textarea>
                    <Text
                      color="brand.600"
                      fontSize="14px"
                      fontWeight="400"
                      lineHeight="20px"
                    >
                      {watch(`payment_description`)?.length || 0}/1000
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ) : (
              <Box mt={"40px"}>
                <h2 className={cls.title}>
                  {t(`Водители SARBON смогут предложить свою ставку`)}
                </h2>
                <p className={cls.subTitle2}>{t(`Можно предлагать`)}</p>
                <Flex className={cls.checkWrap} mt={2} gap={"22px"}>
                  <Checkbox
                    defaultChecked={true}
                    register={register}
                    name="usd"
                  >
                    Доллар
                  </Checkbox>
                  <Checkbox
                    defaultChecked={true}
                    register={register}
                    name="uzs"
                  >
                    Сум
                  </Checkbox>
                  <Checkbox
                    defaultChecked={true}
                    register={register}
                    name="rub"
                  >
                    Рубль
                  </Checkbox>
                  <Checkbox
                    defaultChecked={true}
                    register={register}
                    name="eur"
                  >
                    Евро
                  </Checkbox>
                  <Checkbox
                    defaultChecked={true}
                    register={register}
                    name="spot"
                  >
                    Наличными
                  </Checkbox>
                  <Checkbox
                    defaultChecked={true}
                    register={register}
                    name="with_nds"
                  >
                    С НДС, безнал
                  </Checkbox>
                  <Checkbox
                    defaultChecked={true}
                    register={register}
                    name="free_nds"
                  >
                    Без НДС, безнал
                  </Checkbox>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
      {!status && (
        <Button
          isDisabled={disabled}
          onClick={() => onSubmit()}
          rightIcon={<NextArrowIcon />}
          className={cls.nextBtn}
        >
          Далее
        </Button>
      )}
    </Box>
  );
};

export default StepFour;
