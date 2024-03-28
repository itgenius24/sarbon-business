import { useLoginMutation, useOneLoginMutation } from "@/services/api";
import authStore from "@/store/auth.store";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useLoginProps = () => {

  const router = useRouter();

  const customerTypeId = process.env.NEXT_PUBLIC_CUSTOMER_TYPE_ID;
  const expeditorTypeId = process.env.NEXT_PUBLIC_EXPEDITOR_TYPE_ID;

  const toast = useToast();


  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const login = useLoginMutation({
    onSuccess: (data) => {
      authStore.login({
        user: data?.user,
        token: data?.token,
        role: data?.role
      });
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginOne = useOneLoginMutation({
    onSuccess: (data) => {

      const clientTypeId = data?.companies?.[0]?.projects?.[0]?.resource_environments?.[0]?.client_types?.response?.[0]?.guid;

      if(clientTypeId === customerTypeId || clientTypeId === expeditorTypeId) {
        login.mutate(
          {
            username: watch("username"),
            password: watch("password"),
            company_id: "b8367a10-5699-4e91-8c1c-71578ca5448e",
            project_id: "f539f64b-961e-4c6c-8534-140091f7f27b",
            environment_id: "11b59b25-8772-456a-84e1-20bdfdd32506",
            client_type: clientTypeId,
            environment_ids: [
              "11b59b25-8772-456a-84e1-20bdfdd32506"
            ]
          }
        );
      } else {
        toast({
          title: "Этот пользователь не заказчик",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function navigateRegistration () {
    router.push("/auth/registration");
  }

  function onSubmit (data) {
    loginOne.mutate(data);
  }

  function onRememberChange (e) {
    authStore.setRemember(e.target.checked);
  }

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    navigateRegistration,
    isPending: loginOne.isPending || login.isPending,
    onRememberChange,
  };

};
