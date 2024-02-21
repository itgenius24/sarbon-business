import { useFieldArray } from "react-hook-form";
import { useAddCargoContext } from "../../_providers";

export const useLoadingFormProps = () => {

  const { control, register, watch, setValue } = useAddCargoContext();

  const { fields: loadings, append: appendLoading, remove: removeLoading } = useFieldArray({
    control,
    name: "loadings"
  });

  const { fields: unloading, append: appendUnloading, remove: removeUnloading } = useFieldArray({
    control,
    name: "unloading"
  });

  function handleAppendLoading() {
    appendLoading({
      location: "",
      address: ""
    });
  }

  function handleRemoveLoading(index) {
    removeLoading(index);
  }

  function handleUnloadingAppend() {
    appendUnloading({
      location: "",
      address: ""
    });
  }

  function handleUnloadingRemove(index) {
    removeUnloading(index);
  }

  return {
    loadings,
    register,
    control,
    watch,
    setValue,
    handleAppendLoading,
    handleRemoveLoading,
    handleUnloadingAppend,
    handleUnloadingRemove,
    unloading
  };
};
