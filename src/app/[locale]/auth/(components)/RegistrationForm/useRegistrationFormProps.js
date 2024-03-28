import authStore from "@/store/auth.store";
import { useGetClientType, useGetCompanyList, useGetRoleList, useRegisterMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useRegistrationFormProps = () => {
  const router = useRouter();

  const { phone } = authStore.getAuthData;

  const { control, register, handleSubmit, watch } = useForm();

  const registerMutation = useRegisterMutation({
    onSuccess: (data) => {
      authStore.login({
        user: data?.user,
        token: data?.token,
        role: data?.role
      });
      router.push("/");
    }
  });

  const getRoles = useGetRoleList({ data: JSON.stringify({ client_type_id: "" }) });

  const getClientTypes = useGetClientType();
  const clientTypeOptions =
    getClientTypes.data?.response
      ?.filter(client => client?.name === "Заказчик" || client?.name === "Экспидетор")
      ?.map(role => ({ label: role?.name, value: role?.guid }));

  const getCompanyList = useGetCompanyList({ data: JSON.stringify({ company_direction: ["logistic_company"] }) });
  const companyOptions = getCompanyList.data?.response?.map(company => ({ label: company?.full_name, value: company?.guid }));

  function onSubmit (data) {
    registerMutation.mutate(
      {
        data:{
          type: "phone",
          client_type_id: data.clientType?.value,
          role_id: getRoles.data?.response?.find(item => item.client_type_id === watch("clientType")?.value)?.guid,
          phone: phone,
          full_name: data.fullName,
          login: data.login,
          password: data.password,
          company_id: data.company?.value,
          email: data.email,
        }
      }
    );
  }

  function handleBack(){
    router.push("/auth/registration");
  }

  return {
    clientTypeOptions,
    control,
    register,
    handleSubmit,
    onSubmit,
    handleBack,
    companyOptions,
  };
};
