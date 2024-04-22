import cls from "./styles.module.scss";
import { TextField } from "@/components/TextField";
import { Box, Button, Heading } from "@chakra-ui/react";
import { Checkbox } from "@/components/Checkbox";
import { DeleteIcon, HelpCircleIcon, PlusIcon } from "@/assets/icons/icons";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useTransportDetailProps } from "./useTransportDetailProps";
import { Dropdown } from "@/components/Dropdown";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { ChakraSelect } from "@/components/ChakraSelect";
import { DeleteButton } from "@/components/DeleteButton";

export const TransportDetail = () => {
  const {
    control,
    isRequirementOpen,
    isAccessOpen,
    isBeltsOpen,
    isLiftingCapacityOpen,
    carTypeOptions,
    register,
    handleOpenRequirement,
    handleCloseRequirement,
    handleOpenAccess,
    handleCloseAccess,
    handleOpenBelts,
    handleCloseBelts,
    handleOpenLiftingCapacity,
    handleCloseLiftingCapacity,
    errors,
    canEdit,
    handleCheckboxChange,
    isEditing,
    watch,
  } = useTransportDetailProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Box>
    <Box className={cls.transportDetail} py="24px" display="flex" columnGap="32px" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">{t("Транспорт")}</Heading>
      </Box>
      <Box className={cls.transportDetailFields} display="flex" columnGap="24px" flexGrow={1}>
        <Dropdown
          disabled={!canEdit}
          placeholder={t("Транспорт")}
          name="car_type"
          options={carTypeOptions}
          errors={errors}
          control={control}
        />
        <TextField
          disabled={!canEdit}
          register={register}
          type="number"
          errors={errors}
          name="transport_count"
          placeholder={t("Количество машин")}
        />
      </Box>
    </Box>
    <Box className={cls.transportDetail} py="24px" display="flex" columnGap="32px" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="500" lineHeight="20px">{t("Загрузка")}</Heading>
      </Box>
      <Box className={cls.transportDetailFields} display="flex" flexDirection="column" rowGap="12px" maxW={isEditing ? "856px" : "540px"} width="100%">
        <Checkbox disabled={!canEdit} register={register} onChange={handleCheckboxChange} defaultChecked={!isEditing} name="is_ftl" >
          <Box display="flex" alignItems="center">
            <span>{t("отдельной машиной (FTL)")}</span><HelpCircleIcon />
          </Box>
        </Checkbox>
        <Checkbox disabled={!canEdit} register={register} onChange={handleCheckboxChange} name="is_ltl" >
          {t("отдельной машиной или догрузом (FTL или LTL)")}
        </Checkbox>
      </Box>
    </Box>
    <Box className={cls.transportDetail} py="24px" display="flex" columnGap="32px">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="500" lineHeight="20px">{t("Добавить")}</Heading>
      </Box>
      <Box zIndex={30}>
        <Box display="flex" gap="12px" flexWrap="wrap" maxW={isEditing ? "856px" : "540px"} width="100%">
          {
            !isAccessOpen && <Button
              isDisabled={!canEdit}
              onClick={handleOpenAccess}
              leftIcon={<PlusIcon color="#007AFF" /> }
              variant="reset"
            >
              {t("TIR")},
              {t("CMR")},
              {t("T1")},
              {t("ADR")},
              {t("Медкнижка")},
            </Button>
          }
          {
            !isRequirementOpen && <Button
              isDisabled={!canEdit}
              onClick={handleOpenRequirement}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
            >
              {t("Сцепка, пневмоход, коники")}
            </Button>
          }
          {
            !isBeltsOpen && <Button
              isDisabled={!canEdit}
              onClick={handleOpenBelts}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
            >
              {t("Ремней (шт)")}
            </Button>
          }
          {
            !isLiftingCapacityOpen && <Button
              isDisabled={!canEdit}
              onClick={handleOpenLiftingCapacity}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
            >
              {t("Грузоподъемность")}
            </Button>
          }
          {/* {
            !isPermissionOpen && <Button
              isDisabled={!canEdit}
              onClick={handleOpenPermission}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
            >
              {t("Разрешение")}
            </Button>
          } */}
        </Box>
      </Box>
    </Box>
    {/* <Box py="24px" display="flex" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Button variant="reset"
          onClick={handleCloseAdr}
          color="brand.700"
          leftIcon={<DeleteIcon />}
        >
          ADR
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" rowGap="10px" flexGrow={1}>
        <TextField register={register} type="number" name="adr" placeholder="1-9" />
        <Box as="span">Класс опасности груза</Box>
      </Box>
    </Box> */}
    {
      isRequirementOpen && <Box
        py="24px"
        display="flex"
        columnGap="32px"
        className={cls.transportDetail}
      >
        <Box width="280px" flexShrink="0">
          <DeleteButton
            variant="reset"
            isDisabled={!canEdit}
            onClick={handleCloseRequirement}
          >
            {t("Требования")}
          </DeleteButton>
        </Box>
        <Box className={cls.transportDetailFields} display="flex" columnGap="10px" flexGrow={1}>
          <Checkbox disabled={!canEdit} register={register} name="hitch">
            {t("Сцепка")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="pneumatic">
            {t("Пневмоход")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="bunks">
            {t("Коники")}
          </Checkbox>
        </Box>
      </Box>
    }
    {
      isAccessOpen && <Box className={cls.transportDetail} py="24px" display="flex" columnGap="32px">
        <Box width="280px" flexShrink="0">
          <DeleteButton
            isDisabled={!canEdit}
            variant="reset"
            onClick={handleCloseAccess}
          >
            {t("Разрешения")}
          </DeleteButton>
        </Box>
        <Box className={cls.transportDetailFields} display="flex" columnGap="10px" flexGrow={1}>
          <Checkbox disabled={!canEdit} register={register} name="tir">
            {t("TIR")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="t1">
            {t("T1")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="cmr">
            {t("CMR")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="medic_certificate">
            {t("Медкнижка")}
          </Checkbox>
          <Box flexGrow={1}>
            <Dropdown
              isMulti
              name="permission"
              isDisabled={!canEdit}
              register={register}
              control={control}
              watch={watch}
              options={[
                { label: "ADR 1", value: "adr_1" },
                { label: "ADR 2", value: "adr_2" },
                { label: "ADR 3", value: "adr_3" },
                { label: "ADR 4", value: "adr_4" },
                { label: "ADR 5", value: "adr_5" },
                { label: "ADR 6", value: "adr_6" },
                { label: "ADR 7", value: "adr_7" },
                { label: "ADR 8", value: "adr_8" },
                { label: "ADR 9", value: "adr_9" },
              ]}
            />
          </Box>
          {/* <Checkbox disabled={!canEdit} register={register} name="is_med_access">
          Медкнижка
          </Checkbox> */}
        </Box>
      </Box>
    }
    {
      isBeltsOpen && <Box className={cls.transportDetail} py="24px" display="flex" columnGap="32px">
        <Box width="280px" flexShrink="0">
          <DeleteButton
            isDisabled={!canEdit}
            variant="reset"
            onClick={handleCloseBelts}
          >
            {t("Ремней")}
          </DeleteButton>
        </Box>
        <Box flexGrow={1}>
          <TextField disabled={!canEdit} placeholder={t("Штук")} type="number" register={register} name="straps_number" />
        </Box>
      </Box>
    }
    {
      isLiftingCapacityOpen && <Box className={cls.transportDetail} py="24px" display="flex" columnGap="32px">
        <Box width="280px" flexShrink="0">
          <DeleteButton
            isDisabled={!canEdit}
            variant="reset"
            onClick={handleCloseLiftingCapacity}
          >
            {t("Грузоподъемность")}
          </DeleteButton>
        </Box>
        <Box className={cls.transportDetail} flexGrow={1}>
          <TextFieldWithAddition
            className={cls.field}
            disabled={!canEdit}
            additionalItemOptions={[{ label: t("т"), value: "t" }, { label: t("кг"), value: "kg" }]}
            placeholder={t("Грузоподъемность")}
            width="135px"
            type="number"
            register={register}
            name="capacity"
            additionalItemName="capacity_unit"
            additionalItemDefaultIndex={0}
            defaultValue=""
          />
        </Box>
      </Box>
    }
  </Box>;
};
