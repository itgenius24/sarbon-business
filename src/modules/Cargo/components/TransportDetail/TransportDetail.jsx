import { TextField } from "@/components/TextField";
import { Box, Button, Heading } from "@chakra-ui/react";
import { Checkbox } from "@/components/Checkbox";
import { DeleteIcon, HelpCircleIcon, PlusIcon } from "@/assets/icons/icons";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useTransportDetailProps } from "./useTransportDetailProps";
import { Dropdown } from "@/components/Dropdown";

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
    isEditing
  } = useTransportDetailProps();

  return <Box>
    <Box py="24px" display="flex" columnGap="32px" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">Транспорт</Heading>
      </Box>
      <Box display="flex" columnGap="24px" flexGrow={1}>
        <Dropdown
          disabled={!canEdit}
          placeholder="Транспорт"
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
          placeholder="Количество машин"
        />
      </Box>
    </Box>
    <Box py="24px" display="flex" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="500" lineHeight="20px">Загрузка</Heading>
      </Box>
      <Box display="flex" flexDirection="column" rowGap="12px">
        <Checkbox disabled={!canEdit} register={register} onChange={handleCheckboxChange} defaultChecked={!isEditing} name="is_ftl" >
          <Box display="flex" alignItems="center">
            <span>отдельной машиной (FTL)</span><HelpCircleIcon />
          </Box>
        </Checkbox>
        <Checkbox disabled={!canEdit} register={register} onChange={handleCheckboxChange} name="is_ltl" >
          отдельной машиной или догрузом (FTL или LTL)
        </Checkbox>
      </Box>
    </Box>
    <Box py="24px" display="flex" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="500" lineHeight="20px">Добавить</Heading>
      </Box>
      <Box display="flex" gap="12px" flexWrap="wrap">
        {
          !isAccessOpen && <Button
            isDisabled={!canEdit}
            onClick={handleOpenAccess}
            leftIcon={<PlusIcon color="#007AFF" /> }
            variant="reset"
          >
          TIR,CMR, T1, Медкнижка
          </Button>
        }
        {
          !isRequirementOpen && <Button
            isDisabled={!canEdit}
            onClick={handleOpenRequirement}
            leftIcon={<PlusIcon color="#007AFF" />}
            variant="reset"
          >
          Сцепка, пневмоход, коники
          </Button>
        }
        {
          !isBeltsOpen && <Button
            isDisabled={!canEdit}
            onClick={handleOpenBelts}
            leftIcon={<PlusIcon color="#007AFF" />}
            variant="reset"
          >
          Ремней (шт)
          </Button>
        }
        {
          !isLiftingCapacityOpen && <Button
            isDisabled={!canEdit}
            onClick={handleOpenLiftingCapacity}
            leftIcon={<PlusIcon color="#007AFF" />}
            variant="reset"
          >
          Грузоподъемность
          </Button>
        }
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
          Требования
          </Button>
        </Box>
        <Box display="flex" columnGap="10px" flexGrow={1}>
          <Checkbox disabled={!canEdit} register={register} name="is_adr_requirement">
            Сцепка
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="is_pneumatic_requirement">
            Пневмоход
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="is_tir_requirement">
            Коники
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
          Разрешения
          </Button>
        </Box>
        <Box display="flex" columnGap="10px" flexGrow={1}>
          <Checkbox disabled={!canEdit} register={register} name="tir">
          TIR
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="t1">
          T1
          </Checkbox>
          <Checkbox disabled={!canEdit} register={register} name="cmr">
          CMR
          </Checkbox>
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
          Ремней
          </Button>
        </Box>
        <Box flexGrow={1}>
          <TextField disabled={!canEdit} placeholder="Штук" type="number" register={register} name="remains" />
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
          Грузоподъемность
          </Button>
        </Box>
        <Box flexGrow={1}>
          <TextFieldWithAddition
            disabled={!canEdit}
            additionalItemOptions={[{ label: "т", value: "t" }, { label: "кг", value: "kg" }]}
            placeholder="Штук"
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
