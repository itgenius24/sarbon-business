import authStore from "@/store/auth.store";
import { useGetClientType, useGetCompanyList, useGetRoleList, useRegisterMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";

export const useRegistrationFormProps = () => {
  const locale = useGetLang();
  const router = useRouter();

  const { t } = useTranslation(locale, "translations");

  const { phone } = authStore.getAuthData;

  const { control, register, handleSubmit, watch } = useForm();

  const registerMutation = useRegisterMutation({
    onSuccess: (data) => {
      authStore.login({
        user: { firm_id: authStore.authData.firm_id, ...data?.user },
        token: data?.token,
        role: data?.role
      });
      router.push(`/${locale}`);
    }
  });

  const getRoles = useGetRoleList({ data: JSON.stringify({ client_type_id: "" }) });

  const getClientTypes = useGetClientType();
  const clientTypeOptions =
    getClientTypes.data?.response
      ?.filter(client => client?.name === t("Заказчик") || client?.name === t("Экспидетор"))
      ?.map(role => ({ label: role?.name, value: role?.guid }));

  const getCompanyList = useGetCompanyList({ data: JSON.stringify({ company_direction: ["logistic_company"] }) });
  const companyOptions = getCompanyList.data?.response?.map(company => ({ label: company?.full_name, value: company?.guid }));

  function onSubmit (data) {
    authStore.setAuthData("firm_id", data.company?.value);
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
          firm_id: data.company?.value,
          email: data.email,
        }
      }
    );
  }

  function handleBack(){
    router.push(`/${locale}/auth/registration`);
  }

  return {
    clientTypeOptions,
    control,
    register,
    handleSubmit,
    onSubmit,
    handleBack,
    companyOptions,
    t
  };
};
