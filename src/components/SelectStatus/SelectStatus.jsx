import { Dropdown } from "@/components/Dropdown";
import { useUpdateCargo } from "@/services/api";
import { Box } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

const SelectStatus = ({ row,refetch,t }) => {


  const option = [
    { label: t(`Активный`), value: "active" },
    { label: t(`Не активен`), value: "in_active" },
  ];

  const activeValue =
    option.filter((item) => item.value === row?.order_status?.[0])[0] || {};

  const { control, watch, register, errors } = useForm();

  const updateCargo = useUpdateCargo({
    onSuccess:()=>{
      refetch()
    }
  });

  const updateStatus = (row, e) => {
    const data = {
      order_status: [e.value],
      guid: row?.guid,
      updated_time: new Date(),
    };

    updateCargo.mutate({ data });
  };

  return (
    <Box key={ row?.guid} width={`140px`} >
      <Dropdown
        control={control}
        register={register}
        watch={watch}
        name={`cargo_type_${row?.guid}`}
        options={option}
        errors={errors}
        width={`200px`}
        onChangeSelect={(e) => updateStatus(row, e)}
        defaultValue={row?.order_status?.[0] ? activeValue : {}}
      />
    </Box>
  );
};

export default SelectStatus;
