
import { useAddCargoContext } from "../../providers";
export const useReceiptPlaceProps = () => {

  const {register,  errors, canEdit } = useAddCargoContext();
  return {
    register,
    errors,
    canEdit,
  };
};
