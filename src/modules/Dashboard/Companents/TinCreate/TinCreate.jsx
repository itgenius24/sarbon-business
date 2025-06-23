import { Container } from "@/components/Container";
import cls from "./style.module.scss";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useTinCreate } from "./useTinCreate";
import { TextField } from "@/components/TextField";
import { CustomTextarea } from "@/components/CustomTextarea";
import { CheckIcon } from "@/assets/icons/icons";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { ContainerAnalitik } from "@/components/ContainerAnalitik/Container";

const TinCreateModule = () => {
  const { setValue, control, watch, register, errors, t,handleSubmit,onSubmit,your_id,router,handleTinLookup,tinLookupLoading } = useTinCreate();

  return (
    <ContainerAnalitik my={`40px`}>
      <Flex width={"100%"} justifyContent={"space-between"}>
        <Heading size={"md"} mb={"24px"}>
          Данные перевозчика - {your_id}
        </Heading>
        <Flex gap={`10px`} >
          <Button
            width={`fit-content`}
            onClick={() => router.back()}
            variant="secondaryWhite"
            size="md"
            border="1px solid #D0D5DD"
          >
            {t("Отменить изменения")}
          </Button>
          <Button
            width={`fit-content`}

            onClick={handleSubmit(onSubmit)}
            leftIcon={<CheckIcon type={`btn`} />}
          >
            {t("Сохранить изменения")}
          </Button>
        </Flex>
      </Flex>
      <Flex mt={`32px`} width={`100%`} gap={`60px`} justifyContent={`space-between`}>
        <Box width={`100%`}>
          <Text mb={`20px`} fontSize={`20px`} fontWeight={600}>
            Общие сведение
          </Text>
          <Flex
            flexDirection={`column`}
            rowGap={`25px`}
            borderRadius={`12px`}
            background={`white`}
            padding={`28px 30px`}
            width={`100%`}
          >
            <Flex gap="10px" alignItems="end">
              <TextField
                type="number"
                label={`ИНН`}
                register={register}
                errors={errors}
                name="tin"
                placeholder={t("ИНН")}
              />
              <Button
                type="button"
                onClick={() => handleTinLookup(watch('tin'))}
                isLoading={tinLookupLoading}
                isDisabled={!watch('tin') || watch('tin').length < 9}
                size="md"
                colorScheme="blue"
                variant="outline"
              >
                {t("Найти")}
              </Button>
            </Flex>
            <TextField
              type="number"
              label={`Регистрирующий орган`}
              register={register}
              errors={errors}
              name="registration_authority"
              placeholder={t("Регистрирующий орган")}
            />
            <TextField
              label={`Дата государственной регистрации`}
              register={register}
              errors={errors}
              name="data_register"
              placeholder={t("Дата государственной регистрации")}
            />
            <TextField
              type="number"
              label={`Номер регистрации в реестре`}
              register={register}
              errors={errors}
              name="register_number"
              placeholder={t("Номер регистрации в реестре")}
            />
            <CustomTextarea
              label={`Полное наименование`}
              name={"company_name"}
              watch={watch}
              placeholder={t("Полное наименование")}
              onChange={(e) => {
                const value = e.target.value;
                setValue("company_name", value);
              }}
              withLimit={false}
              value={watch("company_name")}
              height={"5px"}
            />
            <TextField
              label={`Сокращенное наименование`}
              register={register}
              errors={errors}
              name="short_name"
              placeholder={t("Сокращенное наименование")}
            />
            <TextField
              label={`Организационно-правовая форма (ОПФ)`}
              register={register}
              errors={errors}
              name="org_and_legal_form"
              placeholder={t("Организационно-правовая форма (ОПФ)")}
            />
            <TextField
              label={`Форма собственности (ФС)`}
              register={register}
              errors={errors}
              name="form_of_ownership"
              placeholder={t("Форма собственности (ФС)")}
            />
            <TextField
              label={`Код ОКЭД (Вид(ы) осуществляемой деятельности)`}
              register={register}
              errors={errors}
              name="oked"
              placeholder={t("Код ОКЭД (Вид(ы) осуществляемой деятельности)")}
            />
            <TextField
              type="number"
              label={`Код СООГУ`}
              register={register}
              errors={errors}
              name="soogu"
              placeholder={t("Код СООГУ")}
            />
            <TextField
              label={`Принадлежность к субъектам малого`}
              register={register}
              errors={errors}
              name="business_entity"
              placeholder={t("Принадлежность к субъектам малого")}
            />
            <TextField
              label={`Состояние деятельности предприятия`}
              register={register}
              errors={errors}
              name="status_of_enterprise"
              placeholder={t("Состояние деятельности предприятия")}
            />
             <TextFieldWithAddition
              label={`Уставный фонд`}
                    
                      errors={errors}
                      control={control}
                      name="capital"
                      register={register}
                      additionalItemName="currency"
                      width="100%"
                      placeholder={t("Уставный фонд")}
                      additionalItemPlaceholder="UZS"
                      additionalItemOptions={[{label:`UZS`,value:`UZS`},{label:`USD`,value:`USD`}]}
                 
                      type="number"
                      zIndex={90}
                    />
            {/* <TextField
              label={`Уставный фонд`}
              register={register}
              errors={errors}
              name="capital"
              placeholder={t("Уставный фонд")}
            /> */}
          </Flex>
        </Box>
        <Box width={`100%`}>
          <Text mb={`20px`} fontSize={`20px`} fontWeight={600}>
            Информация о директоре
          </Text>
          <Flex
            flexDirection={`column`}
            rowGap={`25px`}
            borderRadius={`12px`}
            background={`white`}
            padding={`28px 30px`}
            width={`100%`}
          >
            <TextField
              label={`ФИО руководителя`}
              register={register}
              errors={errors}
              name="information_of_director"
              placeholder={t("ФИО руководителя")}
            />
          </Flex>
          <Box mt={`40px`} width={`100%`}>
            <Text mb={`20px`} fontSize={`20px`} fontWeight={600}>
              Информация об учредителях и их доле в уставном фонде
            </Text>
            <Flex
              flexDirection={`column`}
              rowGap={`25px`}
              borderRadius={`12px`}
              background={`white`}
              padding={`28px 30px`}
              width={`100%`}
            >
              <CustomTextarea
                label={`ФИО и доля в уставном фонде `}
                name={"director_procent"}
                watch={watch}
                placeholder={t("ФИО и доля в уставном фонде ")}
                onChange={(e) => {
                  const value = e.target.value;
                  setValue("director_procent", value);
                }}
                withLimit={false}
                value={watch("director_procent")}
                height={"5px"}
              />
            </Flex>
          </Box>
          <Box mt={`40px`} width={`100%`}>
            <Text mb={`20px`} fontSize={`20px`} fontWeight={600}>
              Контактные данные
            </Text>
            <Flex
              flexDirection={`column`}
              rowGap={`25px`}
              borderRadius={`12px`}
              background={`white`}
              padding={`28px 30px`}
              width={`100%`}
            >
              <TextField
                type="email"
                label={`Email`}
                register={register}
                errors={errors}
                name="email"
                placeholder={t("Email")}
              />
              <TextField
                label={`Номер телефона`}
                register={register}
                errors={errors}
                name="phone_number"
                placeholder={t("Номер телефона")}
              />
              <TextField
                label={`Код СОАТО`}
                register={register}
                errors={errors}
                name="soato"
                placeholder={t("Код СОАТО")}
              />
              <CustomTextarea
                label={`Адрес`}
                name={"address"}
                watch={watch}
                placeholder={t("Введите адрес...")}
                onChange={(e) => {
                  const value = e.target.value;
                  setValue("address", value);
                }}
                withLimit={false}
                value={watch("address")}
                height={"5px"}
              />
            </Flex>
          </Box>
        </Box>
      </Flex>
    </ContainerAnalitik>
  );
};

export default TinCreateModule;
