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
  } = useTransportDetailProps();

  return <Box>
    <Box py="24px" display="flex" columnGap="32px" justifyContent="space-between" borderBottom="1px solid" borderColor="brand.200">
      <Box width="280px" flexShrink="0">
        <Heading color="brand.700" fontSize="14px" fontWeight="600" lineHeight="20px">Транспорт</Heading>
      </Box>
      <Box display="flex" columnGap="24px" flexGrow={1}>
        <Dropdown placeholder="Транспорт" name="car_type" options={carTypeOptions} control={control} />
        <TextField
          register={register}
          type="number"
          rules={{ required: { value: true, message: "Обязательное поле" } }}
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
        <Checkbox register={register} name="is_ftl">
          <Box display="flex" alignItems="center">
            <span>отдельной машиной (FTL)</span><HelpCircleIcon />
          </Box>
        </Checkbox>
        <Checkbox register={register} name="is_ltl">
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
            onClick={handleOpenAccess}
            leftIcon={<PlusIcon color="#007AFF" /> }
            variant="reset"
          >
          TIR,CMR, T1, Медкнижка
          </Button>
        }
        {
          !isRequirementOpen && <Button
            onClick={handleOpenRequirement}
            leftIcon={<PlusIcon color="#007AFF" />}
            variant="reset"
          >
          Сцепка, пневмоход, коники
          </Button>
        }
        {
          !isBeltsOpen && <Button
            onClick={handleOpenBelts}
            leftIcon={<PlusIcon color="#007AFF" />}
            variant="reset"
          >
          Ремней (шт)
          </Button>
        }
        {
          !isLiftingCapacityOpen && <Button
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
          <Button variant="reset"
            onClick={handleCloseRequirement}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
          Требования
          </Button>
        </Box>
        <Box display="flex" columnGap="10px" flexGrow={1}>
          <Checkbox register={register} name="is_adr_requirement">
          Сцепка
          </Checkbox>
          <Checkbox register={register} name="is_pneumatic_requirement">
          Пневмоход
          </Checkbox>
          <Checkbox register={register} name="is_tir_requirement">
          Коники
          </Checkbox>
        </Box>
      </Box>
    }
    {
      isAccessOpen && <Box py="24px" display="flex" justifyContent="space-between">
        <Box width="280px" flexShrink="0">
          <Button variant="reset"
            onClick={handleCloseAccess}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
          Разрешения
          </Button>
        </Box>
        <Box display="flex" columnGap="10px" flexGrow={1}>
          <Checkbox register={register} name="is_tir_access">
          TIR
          </Checkbox>
          <Checkbox register={register} name="is_t1_access">
          T1
          </Checkbox>
          <Checkbox register={register} name="is_cmr_access">
          CMR
          </Checkbox>
          <Checkbox register={register} name="is_med_access">
          Медкнижка
          </Checkbox>
        </Box>
      </Box>
    }
    {
      isBeltsOpen && <Box py="24px" display="flex" justifyContent="space-between">
        <Box width="280px" flexShrink="0">
          <Button variant="reset"
            onClick={handleCloseBelts}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
          Ремней
          </Button>
        </Box>
        <Box flexGrow={1}>
          <TextField placeholder="Штук" type="number" register={register} name="remains" />
        </Box>
      </Box>
    }
    {
      isLiftingCapacityOpen && <Box py="24px" display="flex" justifyContent="space-between">
        <Box width="280px" flexShrink="0">
          <Button variant="reset"
            onClick={handleCloseLiftingCapacity}
            color="brand.700"
            leftIcon={<DeleteIcon />}
          >
          Грузоподъемность
          </Button>
        </Box>
        <Box flexGrow={1}>
          <TextFieldWithAddition
            additionalItemOptions={[{ label: "т", value: "t" }, { label: "кг", value: "kg" }]}
            placeholder="Штук"
            width="135px"
            type="number"
            register={register}
            name="capacity"
            additionalItemName="capacity_unit"
            additionalItemDefaultIndex={0}
          />
        </Box>
      </Box>
    }
  </Box>;
};
