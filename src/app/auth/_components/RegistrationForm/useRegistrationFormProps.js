import { useGetCompanyList, useRegisterMutation } from "@/services/api";
import authStore from "@/store/auth.store";
import { clientTypeIds, userRoleOptions } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useRegistrationFormProps = () => {
  const router = useRouter();

  const { phone, role } = authStore.getAuthData;

  const roleOptions = userRoleOptions;

  const { control, register, handleSubmit } = useForm();

  const registerMutation = useRegisterMutation({
    onSuccess: (data) => {
      console.log(data);
    }
  });

  const getCompanyList = useGetCompanyList({ data: JSON.stringify({ company_direction: ["logistic_company"] }) });

  const companyOptions = getCompanyList.data?.response?.map(company => ({ label: company?.full_name, value: company?.guid }));

  function onSubmit (data) {
    console.log(data);
    // registerMutation.mutate(
    //   {
    //     data:{
    //       type: "phone",
    //       client_type_id: clientTypeIds[data.role],
    //       role_id: data.role,
    //       phone: phone,
    //       full_name: data.fullName,
    //       login: data.login,
    //       password: data.password,
    //       company_id: data.company
    //     }
    //   }
    // );
  }

  function handleBack(){
    router.push("/auth/registration");
  }

  return {
    roleOptions,
    control,
    register,
    handleSubmit,
    onSubmit,
    handleBack,
    companyOptions,
  };
};
