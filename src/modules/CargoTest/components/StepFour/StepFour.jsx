import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import cls from "./style.module.scss";
import { NextArrowIcon, NoteIcon, PlusIcon } from "@/assets/icons/icons";
import {
  TextFieldWithAddition,
  TextFieldWithAdditionPayment,
} from "@/components/TextFieldWithAddition";
import useFourProps from "./useFourProps";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/Checkbox";
import { usePathname } from "next/navigation";
import { PaymentComponents } from "./components/PaymentComponents";

const StepFour = ({ status, locale }) => {
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
    onSubmit,
    setEditModal,
    handleAppendAllPrice,
    handleAppendAllPrepayment,
    removeInput,
    removeInputAllPrepayment,
    handleAppendPriceAfterOrder,
    removeInputPriceAfterOrder,
  } = useFourProps({ locale });
  const { t } = useTranslation();


  const params = usePathname();

  useEffect(() => {
    if (watch(`price_prepayment`) > 0 && params.includes("my-loads")) {
      setTimeout(() => {
        setValue(`prepayment`, true, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }, 1000);
    }
  }, [!watch(`price_prepayment`) && params.includes("my-loads")]);

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
                    <>
                      {/* <RadioGroup
                      defaultValue={
                        watch(`price_prepayment_unit`)?.label || `доллар`
                      } 
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
                                bg: "white", 
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
                    </RadioGroup> */}
                    </>
                  ) : (
                    status && (
                      <Box
                        onClick={() => (!canEdit ? setEditModal(true) : null)}
                      >
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
                                    {t(item?.label)}
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

                <Flex
                  alignItems={`start`}
                  className={cls.inputWrap}
                  gap={10}
                  width={"100%"}
                >
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

                    <Flex flexDirection={`column`} gap={`6px`} width={`100%`}>
                      {watch(`allPrice`)?.map((item, index) => (
                        <>
                          <PaymentComponents
                            key={item}
                            canEdit={canEdit}
                            order_status={order_status}
                            register={register}
                            control={control}
                            setEditModal={setEditModal}
                            paymentOptions={paymentOptions}
                            errors={errors}
                            t={t}
                            currencyOptions={currencyOptions}
                            disabled={
                              order_status?.[0] === "active" || !canEdit
                            }
                            additionalItemName={`allPrice[${index}].payment_type`}
                            paymentName={`allPrice[${index}].payment`}
                            name={`allPrice[${index}].price`}
                            index={index}
                            removeInput={removeInput}
                          />
                        </>
                      ))}
                      <Button
                        width={`fit-content`}
                        leftIcon={
                          <PlusIcon
                            width="16"
                            height="16"
                            color="rgba(126, 123, 134, 1)"
                          />
                        }
                        variant="reset"
                        color="rgba(126, 123, 134, 1)"
                        fontWeight={400}
                        onClick={handleAppendAllPrice}
                        mt={`6px`}
                      >
                        {t("Добавить поле")}
                      </Button>
                    </Flex>
                  </Box>

                  <Box width={"100%"}>
                    <Flex
                      onClick={() => (!canEdit ? setEditModal(true) : null)}
                      mb={2}
                      alignItems={"center"}
                      gap={"10px"}
                    >
                      <Checkbox
                        register={register}
                        name={`prepayment`}
                        defaultChecked={watch(`prepayment`)}
                        isDisabled={order_status?.[0] === "active" || !canEdit}
                      >
                        {t(`Предоплата`)}
                      </Checkbox>
                    </Flex>

                    <Flex flexDirection={`column`} gap={`6px`} width={`100%`}>
                      {watch(`allPrepayment`)?.map((item, index) => (
                        <>
                          <PaymentComponents
                            key={item}
                            canEdit={canEdit}
                            order_status={order_status}
                            register={register}
                            control={control}
                            setEditModal={setEditModal}
                            paymentOptions={paymentOptions}
                            errors={errors}
                            t={t}
                            currencyOptions={currencyOptions}
                            disabled={
                              order_status?.[0] === "active" ||
                              !canEdit ||
                              !watch(`prepayment`)
                            }
                            additionalItemName={`allPrepayment[${index}].payment_type`}
                            paymentName={`allPrepayment[${index}].payment`}
                            name={`allPrepayment[${index}].price`}
                            index={index}
                            removeInput={removeInputAllPrepayment}
                          />
                        </>
                      ))}
                      <Button
                        isDisabled={
                          order_status?.[0] === "active" ||
                          !canEdit ||
                          !watch(`prepayment`)
                        }
                        width={`fit-content`}
                        leftIcon={
                          <PlusIcon
                            width="16"
                            height="16"
                            color="rgba(126, 123, 134, 1)"
                          />
                        }
                        variant="reset"
                        color="rgba(126, 123, 134, 1)"
                        fontWeight={400}
                        onClick={handleAppendAllPrepayment}
                        mt={`6px`}
                      >
                        {t("Добавить поле")}
                      </Button>
                    </Flex>

                    {/* <TextFieldWithAddition
                      onClick={() => (!canEdit ? setEditModal(true) : null)}
                      isEdit={!canEdit}
                     
                      name="price_prepayment"
                      register={register}
                      control={control}
                      additionalItemName="payment_type_1"
                      additionalItemPlaceholder={paymentOptions?.[0]?.label}
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
                      after={
                        currencyOptions?.find(
                          (opt) =>
                            opt.value === watch(`price_prepayment_unit`)?.value
                        )?.label
                      }
                    /> */}
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

                      <Flex flexDirection={`column`} gap={`6px`} width={`100%`}>
                        {watch(`priceAfterOrder`)?.map((item, index) => (
                          <>
                            <PaymentComponents
                              key={item}
                              canEdit={canEdit}
                              order_status={order_status}
                              register={register}
                              control={control}
                              setEditModal={setEditModal}
                              paymentOptions={paymentOptions}
                              errors={errors}
                              t={t}
                              currencyOptions={currencyOptions}
                              disabled={!canEdit}
                              additionalItemName={`priceAfterOrder[${index}].payment_type`}
                              paymentName={`priceAfterOrder[${index}].payment`}
                              name={`priceAfterOrder[${index}].price`}
                              index={index}
                              removeInput={removeInputPriceAfterOrder}
                              zIndex={100}
                            />
                          </>
                        ))}
                        <Button
                          width={`fit-content`}
                          leftIcon={
                            <PlusIcon
                              width="16"
                              height="16"
                              color="rgba(126, 123, 134, 1)"
                            />
                          }
                          variant="reset"
                          color="rgba(126, 123, 134, 1)"
                          fontWeight={400}
                          onClick={handleAppendPriceAfterOrder}
                          mt={`6px`}
                        >
                          {t("Добавить поле")}
                        </Button>
                      </Flex>

                      {/* <TextFieldWithAddition
                        disabled={true}
                        name="price_after_order"
                        register={register}
                        control={control}
                        additionalItemName="payment_type"
                        additionalItemPlaceholder={paymentOptions?.[0]?.label}
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
                        after={
                          currencyOptions?.find(
                            (opt) =>
                              opt.value ===
                              watch(`price_prepayment_unit`)?.value
                          )?.label
                        }
                      /> */}
                    </Box>
                  ) : (
                    <Box width={`100%`}>
                      <p className={cls.totalTEet}>
                        {t(`Сумма после завершения заказа`)}
                      </p>
                      <p className={cls.totalSum}>
                        {watch(`price`) -
                          (watch(`prepayment`) ? watch(`price_prepayment`) : 0)}

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
                  <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      defaultChecked={true}
                      register={register}
                      name="usd"
                      isDisabled={!canEdit}
                    >
                      Доллар
                    </Checkbox>
                  </Box>
                  <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      isDisabled={!canEdit}
                      defaultChecked={true}
                      register={register}
                      name="uzs"
                    >
                      Сум
                    </Checkbox>
                  </Box>
                  <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      isDisabled={!canEdit}
                      defaultChecked={true}
                      register={register}
                      name="rub"
                    >
                      Рубль
                    </Checkbox>
                  </Box>
                  <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      isDisabled={!canEdit}
                      defaultChecked={true}
                      register={register}
                      name="eur"
                    >
                      Евро
                    </Checkbox>
                  </Box>

                  {/* <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      isDisabled={!canEdit}
                      defaultChecked={true}
                      register={register}
                      name="spot"
                    >
                      Наличными
                    </Checkbox>
                  </Box>
                      <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      isDisabled={!canEdit}
                      defaultChecked={true}
                      register={register}
                      name="spot"
                    >
                      Предоплата
                    </Checkbox>
                  </Box> */}
                  <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      isDisabled={!canEdit}
                      defaultChecked={true}
                      register={register}
                      name="spot"
                    >
                      Перечисление
                    </Checkbox>
                  </Box>

                  <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      isDisabled={!canEdit}
                      defaultChecked={true}
                      register={register}
                      name="with_nds"
                    >
                      С НДС, безнал
                    </Checkbox>
                  </Box>

                  <Box onClick={() => (!canEdit ? setEditModal(true) : null)}>
                    <Checkbox
                      isDisabled={!canEdit}
                      defaultChecked={true}
                      register={register}
                      name="free_nds"
                    >
                      Без НДС, безнал
                    </Checkbox>
                  </Box>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
      {!status && (
        <Button
          isDisabled={false}
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
