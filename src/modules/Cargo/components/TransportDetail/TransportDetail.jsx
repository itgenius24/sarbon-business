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
    isPermissionOpen,
    handleOpenPermission,
    handleClosePermission
  } = useTransportDetailProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <Box>
    <Box py="24px" display="flex" columnGap="32px" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">{t("Транспорт")}</Heading>
      </Box>
      <Box display="flex" columnGap="24px" flexGrow={1}>
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
    <Box py="24px" display="flex" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="500" lineHeight="20px">{t("Загрузка")}</Heading>
      </Box>
      <Box display="flex" flexDirection="column" rowGap="12px">
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
    <Box py="24px" display="flex" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="500" lineHeight="20px">{t("Добавить")}</Heading>
      </Box>
      <Box zIndex={30}>
        <Box display="flex" gap="12px" flexWrap="wrap">
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
              {t("Разрешения")},
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
          {
            !isPermissionOpen && <Button
              isDisabled={!canEdit}
              onClick={handleOpenPermission}
              leftIcon={<PlusIcon color="#007AFF" />}
              variant="reset"
            >
              {t("Разрешение")}
            </Button>
          }
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
        justifyContent="space-between"
      >
        <Box width="280px" flexShrink="0">
          <Button
            variant="reset"
            isDisabled={!canEdit}
            onClick={handleCloseRequirement}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
            {t("Требования")}
          </Button>
        </Box>
        <Box display="flex" columnGap="10px" flexGrow={1}>
          <Checkbox disabled={!canEdit} register={register} name="is_adr_requirement">
            {t("Сцепка")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="is_pneumatic_requirement">
            {t("Пневмоход")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="is_tir_requirement">
            {t("Коники")}
          </Checkbox>
        </Box>
      </Box>
    }
    {
      isAccessOpen && <Box py="24px" display="flex" justifyContent="space-between">
        <Box width="280px" flexShrink="0">
          <Button
            isDisabled={!canEdit}
            variant="reset"
            onClick={handleCloseAccess}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
            {t("Разрешения")}
          </Button>
        </Box>
        <Box display="flex" columnGap="10px" flexGrow={1}>
          <Checkbox disabled={!canEdit} register={register} name="tir">
            {t("TIR")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="t1">
            {t("T1")}
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="cmr">
            {t("CMR")}
          </Checkbox>
          <Box flexGrow={1}>
            <ChakraSelect
              isMulti
              name="permission"
              control={control}
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
      isBeltsOpen && <Box py="24px" display="flex" justifyContent="space-between">
        <Box width="280px" flexShrink="0">
          <Button
            isDisabled={!canEdit}
            variant="reset"
            onClick={handleCloseBelts}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
            {t("Ремней")}
          </Button>
        </Box>
        <Box flexGrow={1}>
          <TextField disabled={!canEdit} placeholder={t("Штук")} type="number" register={register} name="remains" />
        </Box>
      </Box>
    }
    {
      isLiftingCapacityOpen && <Box py="24px" display="flex" justifyContent="space-between">
        <Box width="280px" flexShrink="0">
          <Button
            isDisabled={!canEdit}
            variant="reset"
            onClick={handleCloseLiftingCapacity}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
            {t("Грузоподъемность")}
          </Button>
        </Box>
        <Box flexGrow={1}>
          <TextFieldWithAddition
            disabled={!canEdit}
            additionalItemOptions={[{ label: t("т"), value: "t" }, { label: t("кг"), value: "kg" }]}
            placeholder={t("Штук")}
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
    {/* {
      isPermissionOpen && <Box py="24px" display="flex" justifyContent="space-between">
        <Box width="280px" flexShrink="0">
          <Button
            isDisabled={!canEdit}
            variant="reset"
            onClick={handleClosePermission}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
            {t("Разрешения")}
          </Button>
        </Box>
        <Box flexGrow={1} zIndex={100}>
          <ChakraSelect
            isMulti
            name="permission"
            control={control}
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
      </Box>
    } */}
  </Box>;
};
