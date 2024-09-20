import { Box, Button, Flex, Heading, Radio, RadioGroup, Switch } from "@chakra-ui/react";
import React from "react";
import cls from "./style.module.scss";
import { LoadStepIcon, NextArrowIcon, NoteIcon } from "@/assets/icons/icons";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import useFourProps from "./useFourProps";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/Checkbox";
import { CustomTextarea } from "@/components/CustomTextarea";

const StepFour = ({ setCargoIndex }) => {
  const [value, setValueR] = React.useState("");
  const {
    register,
    control,
    errors,
    setValue,
    watch,
    setCheck,
    check,
    currencyOptions,
    // handleImageUpload,
    paymentOptions,
    // imageLoader,
    // canEdit,
    canEditActive,
  } = useFourProps()
  const { t } = useTranslation();

  const onChange = (e) => {
    setValueR(e)
  }

  return (
    <>
      <Box className={cls.step1}>
        <Flex width={"100%"} gap={"13px"}>
          <NoteIcon />
          <Box width={'100%'}>
            <Flex width={'100%'} alignItems={"center"} justifyContent={"space-between"}>
              <Flex gap={"50px"}>
                <p className={cls.stepTitle}>Оплата</p>
                {
                  !check && <RadioGroup onChange={ (e) => onChange(e) } value={value}>
                    <Flex gap={"10px"}>
                      {
                        currencyOptions && currencyOptions.map(item => (
                          <Radio
                            key={item.value}
                            border={"1px solid rgba(208, 213, 221, 1)"}


                            value={item.label}
                            size={"md"}
                          >
                            {
                              item?.label?.charAt(0).toUpperCase() + item?.label?.slice(1).toLowerCase()
                            }
                          </Radio>
                        ))
                      }

                    </Flex>
                  </RadioGroup>
                }

              </Flex>
              <Flex alignItems={"center"} gap={3}>
                <p>Запросить цену</p>
                <Switch onChange={(e) => setCheck(e.target.checked)} size={'md'} />
              </Flex>
            </Flex>
            {
            !check ? <Box width={'100%'} mt={'50px'}>
              <Flex gap={10} width={'100%'}>
                <Box width={'100%'}>
                  <Flex mb={2} alignItems={'center'} gap={'10px'}>
                    <p className={cls.label} >{t(`Общая сумма`)}</p>
                    <Checkbox>
                     Возможен торг
                    </Checkbox>
                  </Flex>
                  <TextFieldWithAddition
                    //   disabled={!status}
                    name="price"
                    register={register}
                    control={control}
                    additionalItemName="price_prepayment_unit"
                    additionalItemDefaultIndex={0}
                    placeholder={t("Введите сумму")}
                    errors={errors}
                    type="number"
                    width="100%"
                    additionalItemOptions={paymentOptions}
                    zIndex={20}
                    after={value}
                  />
                </Box>
                <Box width={'100%'}>
                  <Flex mb={2} alignItems={'center'} gap={'10px'}>

                    <Checkbox>
                  Предоплата
                    </Checkbox>
                  </Flex>
                  <TextFieldWithAddition
                    //   disabled={!status}
                    name="price_prepayment"
                    register={register}
                    control={control}
                    additionalItemName="price_prepayment_unit"
                    additionalItemDefaultIndex={0}
                    placeholder={t("Введите сумму")}
                    errors={errors}
                    type="number"
                    width="100%"
                    additionalItemOptions={paymentOptions}
                    zIndex={20}
                    after={value}

                  />
                </Box>
              </Flex>
              <Flex mt={5} gap={10} width={'100%'}>
                <Box width={'100%'}>
                  <Flex mb={2} alignItems={'center'} gap={'10px'}>
                    <p className={cls.label} >{t(`Сумма после завершения заказа`)}</p>
                  </Flex>
                  <TextFieldWithAddition
                    //   disabled={!status}
                    name="price_after_order"
                    register={register}
                    control={control}
                    additionalItemName="price_prepayment_unit"
                    additionalItemDefaultIndex={0}
                    placeholder={t("Введите сумму")}
                    errors={errors}
                    type="number"
                    width="100%"
                    additionalItemOptions={paymentOptions}
                    zIndex={10}
                    after={value}

                  />
                </Box>
                <Box width={'100%'}>
                  <Flex mb={2} alignItems={'center'} gap={'10px'}>
                    <p className={cls.label} >{t(`Заметки по оплате (видно только вам)`)}</p>
                  </Flex>
                  <CustomTextarea
                  // disabled={!canEdit}
                    name={"note1"}
                    watch={watch}
                    placeholder={t("Пишите здесь")}
                    onChange={(e) => {
                      const value = e.target.value;
                      if(value.length <= 1000) {
                        setValue("note1", value);
                      }
                    }}
                    value={watch("note1")}
                    height={'10px'}
                  />
                </Box>
              </Flex>
            </Box>:<Box mt={'40px'}>
              <h2 className={cls.title}>
                Водители FURGO смогут предложить свою ставку

              </h2>
              <p className={cls.subTitle2}>Можно предлагать</p>
              <Flex mt={2} gap={"22px"}>
                <Checkbox>
                    USD
                </Checkbox>
                <Checkbox>
                    UZS
                </Checkbox>
                <Checkbox>
                    RUB
                </Checkbox>
                <Checkbox>
                    EUR
                </Checkbox>
                <Checkbox>
                 Наличными
                </Checkbox>
                <Checkbox>
                 С НДС, безнал
                </Checkbox>
                <Checkbox>
                 Без НДС, безнал
                </Checkbox>
              </Flex>
            </Box>
            }

          </Box>
        </Flex>
      </Box>
      <Button
        onClick={() => setCargoIndex(5)}
        rightIcon={<NextArrowIcon />}
        className={cls.nextBtn}
      >
        Далее
      </Button>
    </>
  );
};

export default StepFour;
